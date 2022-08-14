import View from "./View.js";
import icons from "url:../../img/icons.svg";

class PaginationView extends View {
  _parentElement = document.querySelector(".pagination");

  // here we are going to use Event deligation
  addHandlerClick(handler) {
    this._parentElement.addEventListener("click", function (e) {
      const btn = e.target.closest(".btn--inline");

      if (!btn) return;

      const goToPage = +btn.dataset.goto;

      handler(goToPage);
    });
  }
  _generateMarkUp() {
    const curPage = this._data.page;
    const numPages = Math.ceil(
      this._data.results.length / this._data.resultsPerPage
    );
    // Page 1, adn there are other pages
    if (curPage === 1 && numPages > 1) {
      return this._generateNextBtn(curPage, icons);
    }
    // Last Page
    if (curPage === numPages && numPages > 1) {
      return this._generatePrevBtn(curPage, icons);
    }
    // Other Page
    if (curPage < numPages) {
      return [
        this._generateNextBtn(curPage, icons),
        this._generatePrevBtn(curPage, icons),
      ];
    }

    // page 1, and there are not any other pages
    return "";
  }

  _generatePrevBtn(current, icons) {
    return `
      <button data-goto="${
        current - 1
      }" class="btn--inline pagination__btn--prev">
      <svg class="search__icon">
        <use href="${icons}#icon-arrow-left"></use>
      </svg>
      <span>Page ${current - 1}</span>
     </button>
      `;
  }

  _generateNextBtn(current, icons) {
    const markup = `
    <button data-goto="${
      current + 1
    }" class="btn--inline pagination__btn--next">
      <span>Page ${current + 1}</span>
        <svg class="search__icon">
        <use href="${icons}#icon-arrow-right"></use>
      </svg>
     </button>
    `;
    return markup;
  }
}

export default new PaginationView();
