"use strict";
(self["webpackChunk_adobe_helix_project_boilerplate"] = self["webpackChunk_adobe_helix_project_boilerplate"] || []).push([["teaser-grid"],{

/***/ "./blocks/teaser-grid/teaser-grid.js":
/*!*******************************************!*\
  !*** ./blocks/teaser-grid/teaser-grid.js ***!
  \*******************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ decorate)
/* harmony export */ });
/* harmony import */ var _scripts_common_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../scripts/common.js */ "./scripts/common.js");
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([_scripts_common_js__WEBPACK_IMPORTED_MODULE_0__]);
_scripts_common_js__WEBPACK_IMPORTED_MODULE_0__ = (__webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__)[0];


function decorate(block) {
  const children = [...block.children];

  const teaserGridList = (0,_scripts_common_js__WEBPACK_IMPORTED_MODULE_0__.createElement)('ul', { classes: 'teaser-grid-list' });

  children.forEach((e, idx) => {
    const teaserGridItem = (0,_scripts_common_js__WEBPACK_IMPORTED_MODULE_0__.createElement)('li', { classes: ['teaser-grid-item', `teaser-grid-item-${idx + 1}`] });

    const image = e.querySelector('picture').innerHTML;
    const linkUrl = e.querySelector('a').getAttribute('href');
    const texts = e.querySelectorAll('li');

    const buttonText = texts[0].innerText;
    const title = texts[1].innerText;
    const subtitle = `${texts[2].innerText} >`;

    let categoriesUrl = buttonText.replaceAll(' ', '-').toLowerCase();
    categoriesUrl = `${window.location.href}categories/${categoriesUrl}`;

    teaserGridItem.innerHTML = `
        <div class='teaser-card'>
          <picture class='teaser-image'>
            ${image}
          </picture>
          <div class='teaser-card-content'>
            <a class='teaser-button teaser-button-${idx + 1}' href=${categoriesUrl}>
              ${buttonText}
            </a>
            <a class='teaser-link' href=${linkUrl}>
              <h3 class='teaser-title'>
                ${title}
              </h3>
              <h4 class='teaser-subtitle'>
                ${subtitle}
              </h4>
            </a>
          </div>
        </div>
        `;
    teaserGridList.append(teaserGridItem);
  });

  block.textContent = '';
  block.append(teaserGridList);
}

__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ })

},
/******/ __webpack_require__ => { // webpackRuntimeModules
/******/ var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
/******/ var __webpack_exports__ = (__webpack_exec__("./blocks/teaser-grid/teaser-grid.js"));
/******/ }
]);