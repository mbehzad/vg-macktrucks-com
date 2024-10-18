"use strict";
(self["webpackChunk_adobe_helix_project_boilerplate"] = self["webpackChunk_adobe_helix_project_boilerplate"] || []).push([["v2-explore-articles"],{

/***/ "./blocks/v2-explore-articles/v2-explore-articles.js":
/*!***********************************************************!*\
  !*** ./blocks/v2-explore-articles/v2-explore-articles.js ***!
  \***********************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ decorate)
/* harmony export */ });
/* harmony import */ var _scripts_common_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../scripts/common.js */ "./scripts/common.js");
/* harmony import */ var _scripts_aem_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../scripts/aem.js */ "./scripts/aem.js");
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([_scripts_common_js__WEBPACK_IMPORTED_MODULE_0__]);
_scripts_common_js__WEBPACK_IMPORTED_MODULE_0__ = (__webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__)[0];



const LABELS = {
  SHOW_MORE: (0,_scripts_common_js__WEBPACK_IMPORTED_MODULE_0__.getTextLabel)('Show More'),
  SEARCH: (0,_scripts_common_js__WEBPACK_IMPORTED_MODULE_0__.getTextLabel)('Search'),
  FILTERS_PLACEHOLDERS: (0,_scripts_common_js__WEBPACK_IMPORTED_MODULE_0__.getTextLabel)('Magazine filters placeholders'),
  SHOWING_PLACEHOLDER: (0,_scripts_common_js__WEBPACK_IMPORTED_MODULE_0__.getTextLabel)('Showing placeholder'),
  SORT_BY: (0,_scripts_common_js__WEBPACK_IMPORTED_MODULE_0__.getTextLabel)('Sort by'),
  SORT_PLACEHOLDERS: (0,_scripts_common_js__WEBPACK_IMPORTED_MODULE_0__.getTextLabel)('Sort filter placeholders'),
};

const blockName = 'v2-explore-articles';
const CLASSES = {
  filters: `${blockName}__filters`,
  extraLine: `${blockName}__extra-line`,
  filterItem: `${blockName}__filter-item`,
  showing: `${blockName}__showing`,
  sortBy: `${blockName}__sort-by`,
  collageWrapper: `${blockName}__collage-wrapper`,
  collage: `${blockName}__collage`,
  collageItemContainer: `${blockName}__collage-item-container`,
  collageItemLink: `${blockName}__collage-item-link`,
  collageItemContent: `${blockName}__collage-item-content`,
  collageItemCategoryTitle: `${blockName}__collage-item-category-title`,
  collageItemTitle: `${blockName}__collage-item-title`,
  showMoreButton: `${blockName}__show-more-button`,
  showMoreButtonWrapper: `${blockName}__show-more-container`,
};

const docRange = document.createRange();
const defaultAmount = 9;
let currentAmount = 0;

const getData = async () => {
  const allArticlesRaw = await (0,_scripts_common_js__WEBPACK_IMPORTED_MODULE_0__.getJsonFromUrl)('/magazine-articles.json');
  const allArticles = allArticlesRaw ? allArticlesRaw.data : [];

  // sort data by date from newest to oldest
  allArticles.sort((a, b) => {
    const aPath = a.path.split('/');
    const bPath = b.path.split('/');
    const aYear = aPath[3];
    const aMonth = aPath[4];
    const bYear = bPath[3];
    const bMonth = bPath[4];

    const aDate = new Date(`${aYear}-${aMonth}`);
    const bDate = new Date(`${bYear}-${bMonth}`);

    if (aDate.getTime() === bDate.getTime()) {
      return b.lastModified - a.lastModified;
    }

    return bDate - aDate;
  });

  // Preparing the data for every collage item
  const collageItemsData = allArticles.map((article) => {
    const {
      title, image, path, category,
    } = article;
    const linkUrl = new URL(path, window.location.origin);
    const picture = (0,_scripts_aem_js__WEBPACK_IMPORTED_MODULE_1__.createOptimizedPicture)(new URL(image, window.location.origin), title, true);
    picture.setAttribute('tabindex', '0');
    return {
      title, picture, linkUrl, category,
    };
  });

  // TODO: prepare the data to fill the categories, topics, and trucks filters

  return {
    articles: collageItemsData,
    // categories: [],
    // topics: [],
    // trucks: [],
  };
};

// TODO: to be restored to enable the filters
// const buildFiltersTemplate = () => {
//   const filtersPlaceholderList = LABELS.FILTERS_PLACEHOLDERS.split(',');
//   return filtersPlaceholderList.reduce((accumulator, placeholder) => {
//     const filterFragment = `
//     <select class="${CLASSES.filterItem}" name="${placeholder}">
//       <option value="">${placeholder}</option>
//     </select>`;
//     return `${accumulator}${filterFragment}`;
//   }, '');
// };

const buildFiltersExtraLine = (articlesAmount) => {
  // TODO: to be restored to enable the sort filter
  // const sortPlaceholderList = LABELS.SORT_PLACEHOLDERS.split(',');
  const showingText = LABELS.SHOWING_PLACEHOLDER.replace('$0', defaultAmount)
    .replace('$1', articlesAmount);
  return `
    <div class="${CLASSES.showing}">
      ${showingText}
    </div>
  `;
  // TODO: add the sort filter below the showing div element
  // <div class="${CLASSES.sortBy}">
  //   <span>${LABELS.SORT_BY}</span>
  //   <select class="${CLASSES.filterItem}" name="${LABELS.SORT_BY}">
  //     ${sortPlaceholderList.reduce((accumulator, placeholder) => `
  //       ${accumulator}<option value="${placeholder.toLowerCase()}">${placeholder}</option>`, '')}
  //   </select>
  // </div>
};

const buildArticlesTemplate = (articles) => articles.reduce((accumulator, article) => {
  const collageItemFragment = `
    <a class="${CLASSES.collageItemLink}" href="${article.linkUrl.toString()}">
      <div class="${CLASSES.collageItemContent}">
        <div class="${CLASSES.collageItemCategoryTitle}">${article.category}</div>
        <div class="${CLASSES.collageItemTitle}">
          ${article.title.split('|')[0]}
          <span class="icon icon-arrow-right"></span>
        </div>
      </div>
      ${article.picture.outerHTML}
    </a>
  `;
  return `${accumulator}
    <div class="${CLASSES.collageItemContainer}">${collageItemFragment}</div>`;
}, '');

// TODO: replace the filters div with the following code
/*
  <div class="${CLASSES.filters}">
    <input class="${CLASSES.filterItem}" type="search" placeholder="${LABELS.SEARCH}" />
    <span class="icon icon-search"></span>
    ${buildFiltersTemplate()}
  </div>
*/
const buildTemplate = (articles, articlesAmount) => docRange.createContextualFragment(`
  <div class="${CLASSES.filters}">
  </div>
  <div class="${CLASSES.extraLine}">
    ${buildFiltersExtraLine(articlesAmount)}
  </div>
  <div class="${CLASSES.collageWrapper}">
    <div class="${CLASSES.collage}">
      ${buildArticlesTemplate(articles)}
    </div>
  </div>
  <div class="${CLASSES.showMoreButtonWrapper}">
    <button class="${CLASSES.showMoreButton} button button--secondary button--large">
      ${LABELS.SHOW_MORE}
    </button>
  </div>
`);

const addEventListeners = (block, articles) => {
  const showMoreButtonEl = block.querySelector(`.${CLASSES.showMoreButton}`);

  showMoreButtonEl.addEventListener('click', () => {
    const collageEl = block.querySelector(`.${CLASSES.collage}`);
    const amountEl = block.querySelector(`.${CLASSES.showing} strong span`);
    const newArticles = articles.slice(currentAmount, currentAmount + defaultAmount);
    const newArticlesTemplate = buildArticlesTemplate(newArticles);
    const newArticlesFragment = docRange.createContextualFragment(newArticlesTemplate);
    collageEl.appendChild(newArticlesFragment);

    currentAmount += defaultAmount;
    if (currentAmount >= articles.length) {
      showMoreButtonEl.remove();
      currentAmount = articles.length;
    }
    amountEl.textContent = currentAmount;
    (0,_scripts_common_js__WEBPACK_IMPORTED_MODULE_0__.decorateIcons)(block);
  });
};

async function decorate(block) {
  const {
    articles, // TODO: categories, topics, trucks, are missing
  } = await getData();
  const blockWrapper = block.closest(`.${blockName}-wrapper`);
  const initialArticles = articles.slice(0, defaultAmount);
  const template = buildTemplate(initialArticles, articles.length);

  currentAmount += defaultAmount;
  blockWrapper.classList.add('full-width');

  block.appendChild(template);
  (0,_scripts_common_js__WEBPACK_IMPORTED_MODULE_0__.decorateIcons)(block);
  addEventListeners(block, articles);
}

__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ })

},
/******/ __webpack_require__ => { // webpackRuntimeModules
/******/ var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
/******/ var __webpack_exports__ = (__webpack_exec__("./blocks/v2-explore-articles/v2-explore-articles.js"));
/******/ }
]);