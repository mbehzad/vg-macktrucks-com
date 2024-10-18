"use strict";
(self["webpackChunk_adobe_helix_project_boilerplate"] = self["webpackChunk_adobe_helix_project_boilerplate"] || []).push([["news-list"],{

/***/ "./blocks/news-list/news-list.js":
/*!***************************************!*\
  !*** ./blocks/news-list/news-list.js ***!
  \***************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ decorate)
/* harmony export */ });
/* harmony import */ var _scripts_common_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../scripts/common.js */ "./scripts/common.js");
/* harmony import */ var _scripts_news_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../scripts/news.js */ "./scripts/news.js");
/* harmony import */ var _scripts_aem_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../scripts/aem.js */ "./scripts/aem.js");
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([_scripts_common_js__WEBPACK_IMPORTED_MODULE_0__]);
_scripts_common_js__WEBPACK_IMPORTED_MODULE_0__ = (__webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__)[0];




async function decorate(block) {
  const config = (0,_scripts_aem_js__WEBPACK_IMPORTED_MODULE_2__.readBlockConfig)(block);

  const type = window.location.pathname.startsWith('/parts-and-services/support/body-builders')
    ? 'body-builder-news'
    : 'mack-news';

  const filter = config.filter || '';
  block.textContent = '';

  // eslint-disable-next-line function-call-argument-newline,function-paren-newline
  const rssLink = (0,_scripts_common_js__WEBPACK_IMPORTED_MODULE_0__.createElement)('a', {
    classes: ['title-with-icon'],
    props: { href: _scripts_news_js__WEBPACK_IMPORTED_MODULE_1__.feedsInfo[type].feedPath, target: '_blank' },
  });
  rssLink.textContent = 'News RSS';
  block.append(rssLink);

  const pagingInfo = new _scripts_news_js__WEBPACK_IMPORTED_MODULE_1__.PagingInfo();
  const posts = type === 'body-builder-news'
    ? await (0,_scripts_news_js__WEBPACK_IMPORTED_MODULE_1__.getBodyBuilderNews)(pagingInfo)
    : await (0,_scripts_news_js__WEBPACK_IMPORTED_MODULE_1__.getMackNews)(window.location.pathname, pagingInfo, filter);

  const list = (0,_scripts_common_js__WEBPACK_IMPORTED_MODULE_0__.createElement)('ul', { classes: ['news-sidebar-list'] });
  list.append(...posts.map((post) => {
    const articleLink = (0,_scripts_common_js__WEBPACK_IMPORTED_MODULE_0__.createElement)('a', { props: { href: post.path } });

    const heading = (0,_scripts_common_js__WEBPACK_IMPORTED_MODULE_0__.createElement)('h3');
    heading.textContent = (post.title && post.title !== '0') ? post.title : '';
    articleLink.append(heading);

    const summary = (0,_scripts_common_js__WEBPACK_IMPORTED_MODULE_0__.createElement)('p');
    summary.textContent = post.summary;
    articleLink.append(summary);

    const li = (0,_scripts_common_js__WEBPACK_IMPORTED_MODULE_0__.createElement)('li');
    li.append(articleLink);
    return li;
  }));
  block.append(list);
}

__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ }),

/***/ "./scripts/news.js":
/*!*************************!*\
  !*** ./scripts/news.js ***!
  \*************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   PagingInfo: () => (/* binding */ PagingInfo),
/* harmony export */   feedsInfo: () => (/* binding */ feedsInfo),
/* harmony export */   getBodyBuilderNews: () => (/* binding */ getBodyBuilderNews),
/* harmony export */   getMackNews: () => (/* binding */ getMackNews)
/* harmony export */ });
/* harmony import */ var _aem_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./aem.js */ "./scripts/aem.js");


const feedsInfo = {
  'mack-news': {
    feedPath: '/mack-news/feed.xml',
    jsonSource: '/mack-news/feed.json',
  },
  'body-builder-news': {
    feedPath: '/parts-and-services/support/body-builders/news-and-events/feed.xml',
    jsonSource: '/body-builder-news.json',
  },
};

/**
 * @typedef {Object} NewsPost
 * @property {string} path
 * @property {string} title
 * @property {string} summary
 * @property {string} template
 * @property {string} publicationDate
 */

/**
 * This method can be called multiple times with the same parameters as the pagingInfo is
 * automatically updated to track the offset.
 *
 * @param pagingInfo {PagingInfo}  paging metadata
 * @returns {Promise<NewsPost[]>}
 */
async function getBodyBuilderNews(pagingInfo) {
  const allPosts = await fetchJsonFeed(feedsInfo['body-builder-news'].jsonSource, pagingInfo);
  allPosts.sort(sortNewsByDate);

  if (pagingInfo.pageSize > 0) {
    return allPosts.slice(0, pagingInfo.pageSize);
  }
  return allPosts;
}

/**
 * Get the list of news posts from the index. This method can be called multiple times with the
 * same parameters as the pagingInfo is automatically updated to track the offset.
 *
 * News are auto-filtered based on page context e.g tags, etc. and sorted by date.
 *
 * @param path {string}  the path of the current page, used to filter by year
 * @param pagingInfo {PagingInfo}  paging metadata
 * @param filter "auto"|"topic"|"subtopic"|"author"|"tag"|"post"|"auto"|"none"} filter to apply.
 * @returns {Promise<NewsPost[]>}
 */
async function getMackNews(path, pagingInfo, filter = 'none') {
  const allPosts = await fetchJsonFeed(feedsInfo['mack-news'].jsonSource, pagingInfo);
  let filteredPosts = allPosts.filter((page) => page.template === 'mack-news');
  filteredPosts.sort(sortNewsByDate);

  const year = path ? extractYearFromPath(path) : null;
  if (year) {
    filteredPosts = filterNewsByDate(filteredPosts, year);
  }

  // TODO: filter by topic, subtopic, author, tag, post
  let applicableFilter = filter ? filter.toLowerCase() : 'none';
  if (applicableFilter === 'auto') {
    if ((0,_aem_js__WEBPACK_IMPORTED_MODULE_0__.getMetadata)('template') === 'mack-news') {
      applicableFilter = 'mack-news';
    } else {
      applicableFilter = 'none';
    }
  }

  if (pagingInfo.pageSize > 0) {
    return filteredPosts.slice(0, pagingInfo.pageSize);
  }
  return filteredPosts;
}

/**
 * Stores the paging metadata so that additional pages can be fetched.
 * @type {PagingInfo}
 * @property {number} offset  the offset of the next page to fetch
 * @property {boolean} allLoaded  true if all pages have been fetched
 * @property {number} pageSize  the number of items to return per page. -1 means all.
 */
class PagingInfo {
  constructor() {
    this.offset = 0;
    this.allLoaded = false;
    this.pageSize = -1;
  }
}

/**
 * loads more data from the query index
 * @param jsonFeedPath {string}  path to the json feed to fetch
 * @param {PagingInfo} pagingInfo
 * @returns {Promise<NewsPost[]>}
 */
async function fetchJsonFeed(jsonFeedPath, pagingInfo) {
  if (!pagingInfo.allLoaded) {
    const queryLimit = 600;
    const resp = await fetch(`${jsonFeedPath}?limit=${queryLimit}&offset=${pagingInfo.offset}`);
    const json = await resp.json();
    const { total, data } = json;
    window.mack.newsData.news.push();
    pagingInfo.allLoaded = total <= (window.mack.newsData.offset + queryLimit);
    pagingInfo.offset += queryLimit;
    return data;
  }

  return [];
}

/**
 * A function for sorting an array of posts by date
 */
function sortNewsByDate(newsA, newsB) {
  const aDate = Number(newsA.publicationDate || newsA.lastModified);
  const bDate = Number(newsB.publicationDate || newsB.lastModified);
  return bDate - aDate;
}

/**
 * A function for filter news results by date
 */
function filterNewsByDate(posts, year) {
  return posts.filter((post) => {
    const resultYear = new Date(post.publicationDate * 1000).getFullYear();
    return resultYear === year;
  });
}

/**
 * A function for extract year from url pathname
 */
function extractYearFromPath(path) {
  const yearRegex = /\/(\d{4})\//;
  const matches = path.match(yearRegex);

  if (matches && matches.length >= 2) {
    return parseInt(matches[1], 10);
  }

  return null;
}


/***/ })

},
/******/ __webpack_require__ => { // webpackRuntimeModules
/******/ var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
/******/ var __webpack_exports__ = (__webpack_exec__("./blocks/news-list/news-list.js"));
/******/ }
]);