"use strict";
(self["webpackChunk_adobe_helix_project_boilerplate"] = self["webpackChunk_adobe_helix_project_boilerplate"] || []).push([["explore-articles"],{

/***/ "./blocks/explore-articles/explore-articles.js":
/*!*****************************************************!*\
  !*** ./blocks/explore-articles/explore-articles.js ***!
  \*****************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ decorate)
/* harmony export */ });
/* harmony import */ var _scripts_common_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../scripts/common.js */ "./scripts/common.js");
/* harmony import */ var _recent_articles_recent_articles_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../recent-articles/recent-articles.js */ "./blocks/recent-articles/recent-articles.js");
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([_scripts_common_js__WEBPACK_IMPORTED_MODULE_0__, _recent_articles_recent_articles_js__WEBPACK_IMPORTED_MODULE_1__]);
([_scripts_common_js__WEBPACK_IMPORTED_MODULE_0__, _recent_articles_recent_articles_js__WEBPACK_IMPORTED_MODULE_1__] = __webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__);



const allArticles = await (0,_recent_articles_recent_articles_js__WEBPACK_IMPORTED_MODULE_1__.getAllArticles)();
const allCategories = [...new Set(allArticles.map((article) => article.category))];
const allTrucks = [...new Set(allArticles.map((article) => article.truck))];

const [categoryPlaceholder, truckPlaceholder] = (0,_scripts_common_js__WEBPACK_IMPORTED_MODULE_0__.getTextLabel)('Article filter placeholder').split(',');

const articlesPerChunk = 4;
let counter = 1;

const divideArray = (mainArray, perChunk) => {
  const dividedArrays = mainArray.reduce((resultArray, item, index) => {
    const chunkIndex = Math.floor(index / perChunk);
    if (!resultArray[chunkIndex]) {
      resultArray[chunkIndex] = [];
    }
    resultArray[chunkIndex].push(item);
    return resultArray;
  }, []);
  return dividedArrays;
};

const getOptions = (list, placeholder) => {
  const options = [];
  list.unshift(placeholder);
  list.forEach((el) => {
    const option = (0,_scripts_common_js__WEBPACK_IMPORTED_MODULE_0__.createElement)('option', { props: { value: el } });
    option.innerText = el;
    if (el.length !== 0) options.push(option);
  });
  return options;
};

const buildSelect = (type, array, text) => {
  const select = (0,_scripts_common_js__WEBPACK_IMPORTED_MODULE_0__.createElement)('select', { classes: ['input-field', `${type}-input`], props: { id: type, name: type } });
  const options = getOptions(array, text);
  options.forEach((option) => {
    select.append(option);
  });
  return select;
};

const buildArticle = (e) => {
  const article = (0,_scripts_common_js__WEBPACK_IMPORTED_MODULE_0__.createElement)('div', { classes: ['article'] });
  const articleImage = (0,_scripts_common_js__WEBPACK_IMPORTED_MODULE_0__.createElement)('div', { classes: 'article-image' });
  const articleContent = (0,_scripts_common_js__WEBPACK_IMPORTED_MODULE_0__.createElement)('div', { classes: 'article-content' });

  const linkUrl = new URL(e.path, window.location.origin);

  const categoriesWithDash = e.category.replaceAll(' ', '-').toLowerCase();
  const categoryUrl = new URL(`magazine/categories/${categoriesWithDash}`, window.location.origin);

  const image = (0,_scripts_common_js__WEBPACK_IMPORTED_MODULE_0__.createElement)('img', {
    classes: 'image',
    props: { src: e.image },
  });
  articleImage.append(image);

  const category = (0,_scripts_common_js__WEBPACK_IMPORTED_MODULE_0__.createElement)('a', {
    classes: 'article-category',
    props: { href: categoryUrl },
  });
  category.innerText = e.category;

  const link = (0,_scripts_common_js__WEBPACK_IMPORTED_MODULE_0__.createElement)('a', {
    classes: 'article-link',
    props: { href: linkUrl },
  });
  const title = (0,_scripts_common_js__WEBPACK_IMPORTED_MODULE_0__.createElement)('h3', { classes: 'article-title' });
  title.innerText = e.title;
  const subtitle = (0,_scripts_common_js__WEBPACK_IMPORTED_MODULE_0__.createElement)('p', { classes: 'article-subtitle' });
  subtitle.innerText = e.subtitle;

  link.append(title);
  if (e.subtitle.length !== 0) link.append(subtitle);

  const truck = (0,_scripts_common_js__WEBPACK_IMPORTED_MODULE_0__.createElement)('div', { classes: 'article-truck' });
  const truckText = (0,_scripts_common_js__WEBPACK_IMPORTED_MODULE_0__.createElement)('p', { classes: 'article-truck-text' });
  truckText.innerText = e.truck;
  const truckIcon = (0,_scripts_common_js__WEBPACK_IMPORTED_MODULE_0__.createElement)('img', {
    classes: 'article-truck-icon',
    props: { src: '/icons/Truck_Key_icon.svg', alt: 'truck icon' },
  });
  truck.append(truckIcon, truckText);

  articleContent.append(category, link);
  if (e.truck.length !== 0) articleContent.append(truck);

  article.append(articleImage, articleContent);
  return article;
};

const loadMoreArticles = (evt, articleGroups, amountOfGroups) => {
  evt.preventDefault();
  const activeButton = evt.srcElement;
  const allShownArticles = document.querySelectorAll('.article');
  const lastShownArticle = allShownArticles[allShownArticles.length - 1];
  const lastShownId = +(lastShownArticle.id.split('-').pop());
  const nextArticleGroup = articleGroups[lastShownId + 1];

  nextArticleGroup.forEach((e, idx) => {
    if (idx !== 0) lastShownArticle.insertAdjacentElement('afterend', e);
  });

  if ((amountOfGroups - 1) <= counter) activeButton.remove();

  counter += 1;
};

const addAllArrays = (array) => {
  const initialValue = 0;
  const totalArticles = array.reduce(
    (acc, curr) => acc + curr.length,
    initialValue,
  );
  return totalArticles;
};

const getArticleGroups = (artGroup) => {
  const groups = [];
  artGroup.forEach((articleGroup, idx) => {
    const group = [idx];
    articleGroup.forEach((el) => {
      const article = buildArticle(el);
      article.id = `group-${idx}`;
      group.push(article);
    });
    groups.push(group);
  });
  return groups;
};

const buildFirstArticles = (art, section) => {
  const firstArticles = art[0];
  firstArticles.forEach((e, idx) => {
    if (idx !== 0) section.append(e);
  });
};

const buildArticleList = (articles) => {
  const groupedArticles = divideArray(articles, articlesPerChunk);
  const articleGroups = getArticleGroups(groupedArticles);
  const totalArticlesNumber = addAllArrays(groupedArticles);
  const amountOfGroups = articleGroups.length;

  const paginationSection = (0,_scripts_common_js__WEBPACK_IMPORTED_MODULE_0__.createElement)('div', { classes: 'pagination-section' });
  const articlesSection = (0,_scripts_common_js__WEBPACK_IMPORTED_MODULE_0__.createElement)('div', { classes: 'explore-articles-articles' });

  const amountOfArticles = (0,_scripts_common_js__WEBPACK_IMPORTED_MODULE_0__.createElement)('p', { classes: 'article-amount' });
  amountOfArticles.textContent = (totalArticlesNumber !== 0) ? `${totalArticlesNumber} articles` : (0,_scripts_common_js__WEBPACK_IMPORTED_MODULE_0__.getTextLabel)('No article Message');

  paginationSection.append(amountOfArticles);
  articlesSection.append(paginationSection);

  const moreSection = (0,_scripts_common_js__WEBPACK_IMPORTED_MODULE_0__.createElement)('div', { classes: 'explore-articles-more' });
  const moreButton = (0,_scripts_common_js__WEBPACK_IMPORTED_MODULE_0__.createElement)('button', { classes: 'more-btn' });
  moreButton.textContent = (0,_scripts_common_js__WEBPACK_IMPORTED_MODULE_0__.getTextLabel)('Load more articles button');
  moreButton.addEventListener('click', (evt) => loadMoreArticles(evt, articleGroups, amountOfGroups));
  if (totalArticlesNumber > articlesPerChunk) moreSection.append(moreButton);

  if (articleGroups.length !== 0) {
    const articleListSection = (0,_scripts_common_js__WEBPACK_IMPORTED_MODULE_0__.createElement)('div', { classes: 'article-list' });
    buildFirstArticles(articleGroups, articleListSection);
    articlesSection.append(articleListSection, moreSection);
  }
  return articlesSection;
};

const handleForm = () => {
  counter = 1;
  const fieldset = document.querySelector('#explore-magazine-fieldset');
  const selects = fieldset.querySelectorAll('select');
  const [category, truck] = selects;

  const filteredList = allArticles.filter((article) => {
    const criteria = [
      category.value === categoryPlaceholder && truck.value === truckPlaceholder,
      category.value === categoryPlaceholder && truck.value === article.truck,
      category.value === article.category && truck.value === truckPlaceholder,
      category.value === article.category && truck.value === article.truck,
    ];
    const [criteria1, criteria2, criteria3, criteria4] = criteria;

    if (criteria1 || criteria2 || criteria3 || criteria4) {
      return article;
    }
    return null;
  });

  const articleList = document.querySelector('.explore-articles-articles');

  articleList.textContent = '';
  const filteredArticles = buildArticleList(filteredList, 0);
  articleList.append(filteredArticles);
};

const buildFieldset = () => {
  const formSection = (0,_scripts_common_js__WEBPACK_IMPORTED_MODULE_0__.createElement)('div', { classes: 'explore-articles-fieldset' });
  const form = (0,_scripts_common_js__WEBPACK_IMPORTED_MODULE_0__.createElement)('form', ['form', 'filter-list'], { method: 'get', name: 'article-fieldset' });
  form.addEventListener('change', handleForm);

  const fieldset = (0,_scripts_common_js__WEBPACK_IMPORTED_MODULE_0__.createElement)('fieldset', { classes: ['fieldset', 'filter-list'], props: { method: 'get', name: 'article-fieldset', id: 'explore-magazine-fieldset' } });

  const categoryField = (0,_scripts_common_js__WEBPACK_IMPORTED_MODULE_0__.createElement)('div', { classes: 'category-field' });
  const trucksField = (0,_scripts_common_js__WEBPACK_IMPORTED_MODULE_0__.createElement)('div', { classes: 'trucks-field' });

  categoryField.append(buildSelect('categories', allCategories, categoryPlaceholder));
  trucksField.append(buildSelect('trucks', allTrucks, truckPlaceholder));

  fieldset.append(categoryField, trucksField);

  form.append(fieldset);
  formSection.append(form);

  return formSection;
};

async function decorate(block) {
  const children = block.querySelectorAll('p');
  const [title, text] = children;

  const generalSection = (0,_scripts_common_js__WEBPACK_IMPORTED_MODULE_0__.createElement)('div', { classes: 'explore-articles-section' });

  const headingSection = (0,_scripts_common_js__WEBPACK_IMPORTED_MODULE_0__.createElement)('div', { classes: 'explore-articles-heading' });
  const contentSection = (0,_scripts_common_js__WEBPACK_IMPORTED_MODULE_0__.createElement)('div', { classes: 'explore-articles-content' });

  const h4Element = (0,_scripts_common_js__WEBPACK_IMPORTED_MODULE_0__.createElement)('h4', { classes: 'explore-articles-title' });
  h4Element.innerText = title.innerText;
  text.classList.add('explore-articles-text');

  headingSection.append(h4Element, text);
  contentSection.append(buildFieldset());

  contentSection.append(buildArticleList(allArticles, 0));

  generalSection.append(headingSection, contentSection);

  block.textContent = '';
  block.append(generalSection);
}

__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } }, 1);

/***/ }),

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

/***/ })

},
/******/ __webpack_require__ => { // webpackRuntimeModules
/******/ var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
/******/ var __webpack_exports__ = (__webpack_exec__("./blocks/explore-articles/explore-articles.js"));
/******/ }
]);