"use strict";
(self["webpackChunk_adobe_helix_project_boilerplate"] = self["webpackChunk_adobe_helix_project_boilerplate"] || []).push([["recommendations"],{

/***/ "./blocks/recent-articles/recent-articles.js":
/*!***************************************************!*\
  !*** ./blocks/recent-articles/recent-articles.js ***!
  \***************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   clearRepeatedArticles: () => (/* binding */ clearRepeatedArticles),
/* harmony export */   "default": () => (/* binding */ decorate),
/* harmony export */   getAllArticles: () => (/* binding */ getAllArticles),
/* harmony export */   getLimit: () => (/* binding */ getLimit),
/* harmony export */   sortArticles: () => (/* binding */ sortArticles)
/* harmony export */ });
/* harmony import */ var _scripts_common_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../scripts/common.js */ "./scripts/common.js");
/* harmony import */ var _scripts_aem_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../scripts/aem.js */ "./scripts/aem.js");
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([_scripts_common_js__WEBPACK_IMPORTED_MODULE_0__]);
_scripts_common_js__WEBPACK_IMPORTED_MODULE_0__ = (__webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__)[0];



const sectionTitle = (0,_scripts_common_js__WEBPACK_IMPORTED_MODULE_0__.getTextLabel)('Recent article text');
const readNowText = (0,_scripts_common_js__WEBPACK_IMPORTED_MODULE_0__.getTextLabel)('READ NOW');

const getAllArticles = async () => {
  const response = await fetch('/magazine-articles.json');
  const json = await response.json();
  return json.data;
};

const getLimit = (block) => {
  const classes = block.classList;
  let limit;
  classes.forEach((e) => {
    const [name, value] = e.split('-');
    if (name === 'limit') limit = value;
  });
  return limit;
};

const clearRepeatedArticles = (articles) => articles.filter((e) => {
  const currentArticlePath = window.location.href.split('/').pop();
  const path = e.path.split('/').pop();
  if (path !== currentArticlePath) return e;
  return null;
});

const sortArticles = (articles) => articles.sort((a, b) => {
  a.lastModified = +(a.lastModified);
  b.lastModified = +(b.lastModified);
  return b.lastModified - a.lastModified;
});

async function decorate(block) {
  const limit = Number(getLimit(block));
  const allArticles = await getAllArticles();

  const sortedArticles = sortArticles(allArticles);
  const filteredArticles = clearRepeatedArticles(sortedArticles);
  const selectedArticles = filteredArticles.slice(0, limit);

  const recentArticlesSection = (0,_scripts_common_js__WEBPACK_IMPORTED_MODULE_0__.createElement)('div', { classes: 'recent-articles-section' });
  const recentArticlesTitle = (0,_scripts_common_js__WEBPACK_IMPORTED_MODULE_0__.createElement)('h3', { classes: 'recent-articles-section-title' });
  recentArticlesTitle.innerText = sectionTitle;

  const recentArticleList = (0,_scripts_common_js__WEBPACK_IMPORTED_MODULE_0__.createElement)('ul', { classes: 'recent-articles-list' });

  selectedArticles.forEach((e, idx) => {
    const linkUrl = new URL(e.path, (0,_scripts_common_js__WEBPACK_IMPORTED_MODULE_0__.getOrigin)());
    const firstOrRest = (idx === 0) ? 'first' : 'rest';

    const item = (0,_scripts_common_js__WEBPACK_IMPORTED_MODULE_0__.createElement)('li', { classes: `recent-articles-${firstOrRest}-item` });

    const image = (0,_scripts_common_js__WEBPACK_IMPORTED_MODULE_0__.createElement)('div', { classes: `recent-articles-${firstOrRest}-image` });
    const picture = (0,_scripts_aem_js__WEBPACK_IMPORTED_MODULE_1__.createOptimizedPicture)(e.image, e.title);
    const pictureTag = picture.outerHTML;
    image.innerHTML = `<a href='${linkUrl}'>
      ${pictureTag}
    </a>`;

    // TODO: to be updated if the category is not properly gathered from magazine-articles.json
    const categoriesWithDash = e.category.replaceAll(' ', '-').toLowerCase();
    const categoryUrl = new URL(`magazine/categories/${categoriesWithDash}`, (0,_scripts_common_js__WEBPACK_IMPORTED_MODULE_0__.getOrigin)());
    const category = (0,_scripts_common_js__WEBPACK_IMPORTED_MODULE_0__.createElement)('a', {
      classes: `recent-articles-${firstOrRest}-category`,
      props: { href: categoryUrl },
    });
    category.innerText = e.category;

    const title = (0,_scripts_common_js__WEBPACK_IMPORTED_MODULE_0__.createElement)('a', {
      classes: `recent-articles-${firstOrRest}-title`,
      props: { href: linkUrl },
    });
    title.innerText = e.title;

    const subtitle = (0,_scripts_common_js__WEBPACK_IMPORTED_MODULE_0__.createElement)('p', { classes: `recent-articles-${firstOrRest}-subtitle` });
    subtitle.innerText = e.subtitle;

    const link = (0,_scripts_common_js__WEBPACK_IMPORTED_MODULE_0__.createElement)('a', {
      classes: `recent-articles-${firstOrRest}-link`,
      props: { href: linkUrl },
    });
    link.innerText = readNowText;

    if (idx === 0) {
      item.append(image, category, title, subtitle, link);
    } else {
      item.append(image, title);
    }
    recentArticleList.append(item);
  });
  recentArticlesSection.append(recentArticlesTitle, recentArticleList);

  block.style.display = 'block';
  block.textContent = '';
  block.append(recentArticlesSection);
}

__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ }),

/***/ "./blocks/recommendations/recommendations.js":
/*!***************************************************!*\
  !*** ./blocks/recommendations/recommendations.js ***!
  \***************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ decorate)
/* harmony export */ });
/* harmony import */ var _scripts_common_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../scripts/common.js */ "./scripts/common.js");
/* harmony import */ var _recent_articles_recent_articles_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../recent-articles/recent-articles.js */ "./blocks/recent-articles/recent-articles.js");
/* harmony import */ var _scripts_aem_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../scripts/aem.js */ "./scripts/aem.js");
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([_scripts_common_js__WEBPACK_IMPORTED_MODULE_0__, _recent_articles_recent_articles_js__WEBPACK_IMPORTED_MODULE_1__]);
([_scripts_common_js__WEBPACK_IMPORTED_MODULE_0__, _recent_articles_recent_articles_js__WEBPACK_IMPORTED_MODULE_1__] = __webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__);




const recommendationsText = (0,_scripts_common_js__WEBPACK_IMPORTED_MODULE_0__.getTextLabel)('Recommendations text');
const readNowText = (0,_scripts_common_js__WEBPACK_IMPORTED_MODULE_0__.getTextLabel)('READ NOW');

async function decorate(block) {
  const limit = Number((0,_recent_articles_recent_articles_js__WEBPACK_IMPORTED_MODULE_1__.getLimit)(block));
  const category = await (0,_scripts_common_js__WEBPACK_IMPORTED_MODULE_0__.getArticleTags)('categories') || (0,_scripts_aem_js__WEBPACK_IMPORTED_MODULE_2__.getMetadata)('category');
  const allArticles = await (0,_recent_articles_recent_articles_js__WEBPACK_IMPORTED_MODULE_1__.getAllArticles)();

  const recommendedArticles = allArticles.filter((e) => e.category === category);
  const soredtArticles = (0,_recent_articles_recent_articles_js__WEBPACK_IMPORTED_MODULE_1__.sortArticles)(recommendedArticles);
  const filteredArticles = (0,_recent_articles_recent_articles_js__WEBPACK_IMPORTED_MODULE_1__.clearRepeatedArticles)(soredtArticles);
  const selectedArticles = filteredArticles.slice(0, limit);

  const recommendationsSection = (0,_scripts_common_js__WEBPACK_IMPORTED_MODULE_0__.createElement)('div', { classes: 'recommendations-section' });
  const recommendationsTitle = (0,_scripts_common_js__WEBPACK_IMPORTED_MODULE_0__.createElement)('h3', { classes: 'recommendations-section-title' });
  recommendationsTitle.innerText = recommendationsText;

  const recommendationsList = (0,_scripts_common_js__WEBPACK_IMPORTED_MODULE_0__.createElement)('ul', { classes: 'recommendations-list' });

  selectedArticles.forEach((e, idx) => {
    const item = (0,_scripts_common_js__WEBPACK_IMPORTED_MODULE_0__.createElement)('li', { classes: ['recommendations-item', `recommendations-item-${idx}`] });
    const linkUrl = new URL(e.path, (0,_scripts_common_js__WEBPACK_IMPORTED_MODULE_0__.getOrigin)());

    const image = (0,_scripts_common_js__WEBPACK_IMPORTED_MODULE_0__.createElement)('div', { classes: 'recommendations-image' });
    const picture = (0,_scripts_aem_js__WEBPACK_IMPORTED_MODULE_2__.createOptimizedPicture)(e.image, e.title);
    const pictureTag = picture.outerHTML;
    image.innerHTML = `<a href="${linkUrl}" class="image-link">
      ${pictureTag}
    </a>`;

    const categoriesWithDash = e.category.replaceAll(' ', '-').toLowerCase();
    const categoryUrl = new URL(`magazine/categories/${categoriesWithDash}`, (0,_scripts_common_js__WEBPACK_IMPORTED_MODULE_0__.getOrigin)());

    const content = (0,_scripts_common_js__WEBPACK_IMPORTED_MODULE_0__.createElement)('div', { classes: 'recommendations-text-content' });
    const categoryLink = (0,_scripts_common_js__WEBPACK_IMPORTED_MODULE_0__.createElement)('a', {
      classes: 'recommendations-category',
      props: { href: categoryUrl },
    });
    categoryLink.innerText = e.category;

    const title = (0,_scripts_common_js__WEBPACK_IMPORTED_MODULE_0__.createElement)('a', {
      classes: 'recommendations-title',
      props: { href: linkUrl },
    });
    title.innerText = e.title;

    const truck = (0,_scripts_common_js__WEBPACK_IMPORTED_MODULE_0__.createElement)('div', { classes: 'recommendations-truck' });
    const truckText = (0,_scripts_common_js__WEBPACK_IMPORTED_MODULE_0__.createElement)('p', { classes: 'recommendations-truck-text' });
    truckText.innerText = e.truck;
    const truckIcon = (0,_scripts_common_js__WEBPACK_IMPORTED_MODULE_0__.createElement)('img', {
      classes: 'truck-icon',
      props: { src: '/icons/Truck_Key_icon.svg', alt: 'truck icon' },
    });
    if (e.truck.length !== 0) truck.append(truckIcon, truckText);

    const link = (0,_scripts_common_js__WEBPACK_IMPORTED_MODULE_0__.createElement)('a', {
      classes: 'recommendations-link',
      props: { href: linkUrl },
    });
    link.innerText = readNowText;

    content.append(categoryLink, title);

    const subtitle = (0,_scripts_common_js__WEBPACK_IMPORTED_MODULE_0__.createElement)('a', {
      classes: 'recommendations-subtitle',
      props: { href: linkUrl },
    });
    subtitle.innerText = e.subtitle;
    if (e.subtitle.length !== 0) {
      content.append(subtitle);
    }
    content.append(truck, link);
    item.append(image, content);
    recommendationsList.append(item);
  });
  recommendationsSection.append(recommendationsTitle, recommendationsList);

  block.textContent = '';
  block.append(recommendationsSection);
}

__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ })

},
/******/ __webpack_require__ => { // webpackRuntimeModules
/******/ var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
/******/ var __webpack_exports__ = (__webpack_exec__("./blocks/recommendations/recommendations.js"));
/******/ }
]);