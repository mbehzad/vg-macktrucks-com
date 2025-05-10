"use strict";
(self["webpackChunk_adobe_helix_project_boilerplate"] = self["webpackChunk_adobe_helix_project_boilerplate"] || []).push([["templates_body-builder-news_body-builder-news_js"],{

/***/ "./templates/body-builder-news/body-builder-news.js":
/*!**********************************************************!*\
  !*** ./templates/body-builder-news/body-builder-news.js ***!
  \**********************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ decorate)
/* harmony export */ });
/* harmony import */ var _scripts_aem_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../scripts/aem.js */ "./scripts/aem.js");
/* harmony import */ var _scripts_scripts_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../scripts/scripts.js */ "./scripts/scripts.js");
/* harmony import */ var _scripts_common_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../scripts/common.js */ "./scripts/common.js");
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([_scripts_scripts_js__WEBPACK_IMPORTED_MODULE_1__, _scripts_common_js__WEBPACK_IMPORTED_MODULE_2__]);
([_scripts_scripts_js__WEBPACK_IMPORTED_MODULE_1__, _scripts_common_js__WEBPACK_IMPORTED_MODULE_2__] = __webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__);




async function buildNewsData(h1) {
  const pubdate = (0,_scripts_aem_js__WEBPACK_IMPORTED_MODULE_0__.getMetadata)('date');
  const stats = (0,_scripts_common_js__WEBPACK_IMPORTED_MODULE_2__.createElement)('div', { classes: 'news-stats' });
  const pubDateSpan = (0,_scripts_common_js__WEBPACK_IMPORTED_MODULE_2__.createElement)('span', { classes: 'pubdate' });
  pubDateSpan.innerHTML = pubdate;
  stats.append(pubDateSpan);

  h1.insertAdjacentElement('afterend', stats);
  (0,_scripts_common_js__WEBPACK_IMPORTED_MODULE_2__.decorateIcons)(h1.parentElement);
}

async function decorate(doc) {
  const h1 = doc.querySelector('h1');
  buildNewsData(h1);

  const classes = ['section'];
  const sidebarSection = (0,_scripts_common_js__WEBPACK_IMPORTED_MODULE_2__.createElement)('div', {
    classes,
    props: {
      'data-section-status': 'initialized',
    },
  });
  const sidebarContainer = (0,_scripts_common_js__WEBPACK_IMPORTED_MODULE_2__.createElement)('div');
  sidebarSection.append(sidebarContainer);

  const bodyBuilderNewsContent = doc.querySelector('main .section:not(.related-content-container, .news-cards-container)');
  bodyBuilderNewsContent.classList.add('body-builder-news-content');

  (0,_scripts_scripts_js__WEBPACK_IMPORTED_MODULE_1__.findAndCreateImageLink)(bodyBuilderNewsContent);

  // finding picture/video wrappers
  [...bodyBuilderNewsContent.querySelectorAll('picture, a.image-link')].forEach((pic) => {
    const parent = pic.parentElement;
    const isParentPicturesWrapper = [...parent.children].every((el) => el.tagName.toLowerCase() === 'picture'
        || el.classList.contains('image-link')
        || el.tagName.toLowerCase() === 'br');

    if (isParentPicturesWrapper) {
      parent.classList.add('body-builder-news-pictures-wrapper');
      // removing break lines - they aren't needed for images dispalyed in one row
      parent.querySelectorAll('br').forEach((br) => br.remove());
    }
  });

  const newsSidebar = (0,_scripts_aem_js__WEBPACK_IMPORTED_MODULE_0__.buildBlock)('news-sidebar', '');
  sidebarContainer.append(newsSidebar);
  // for performance (Speed Index) the sidebar is added after the mack news
  // and displayed before mack news content thanks to CSS rule
  bodyBuilderNewsContent.insertAdjacentElement('afterend', sidebarSection);
  (0,_scripts_aem_js__WEBPACK_IMPORTED_MODULE_0__.decorateBlock)(newsSidebar);
}

__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ })

}]);