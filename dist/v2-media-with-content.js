"use strict";
(self["webpackChunk_adobe_helix_project_boilerplate"] = self["webpackChunk_adobe_helix_project_boilerplate"] || []).push([["v2-media-with-content"],{

/***/ "./blocks/v2-media-with-content/v2-media-with-content.js":
/*!***************************************************************!*\
  !*** ./blocks/v2-media-with-content/v2-media-with-content.js ***!
  \***************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ decorate)
/* harmony export */ });
/* harmony import */ var _scripts_common_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../scripts/common.js */ "./scripts/common.js");
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([_scripts_common_js__WEBPACK_IMPORTED_MODULE_0__]);
_scripts_common_js__WEBPACK_IMPORTED_MODULE_0__ = (__webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__)[0];


async function decorate(block) {
  const blockName = 'v2-media-with-content';
  const variantClasses = ['with-icons'];
  (0,_scripts_common_js__WEBPACK_IMPORTED_MODULE_0__.variantsClassesToBEM)(block.classList, variantClasses, blockName);

  const contentWrapper = block.querySelector(':scope > div');
  contentWrapper.classList.add(`${blockName}__content-wrapper`);

  const content = [...block.querySelectorAll(':scope > div > div')];
  content.forEach((col) => {
    col.classList.add(`${blockName}__column`);
    if (col.firstElementChild.tagName === 'PICTURE') {
      col.classList.add('column-with-image');
    } else {
      col.classList.add('column-with-text');
    }
  });

  if (content[1].firstElementChild.tagName === 'PICTURE') contentWrapper.classList.add(`${blockName}__content-wrapper--image-right`);

  const header = [...block.querySelectorAll('h1, h2, h3, h4, h5, h6')];
  header.forEach((h) => { h.classList.add(`${blockName}__title`); });

  const text = [...block.querySelectorAll('p')];
  text.forEach((t) => { t.classList.add(`${blockName}__text`); });

  if (block.classList.contains(`${blockName}--with-icons`)) {
    const iconList = block.querySelector('ul');
    iconList.classList.add(`${blockName}__icon-list`);

    const items = iconList.querySelectorAll('li');
    items.forEach((item) => {
      item.classList.add(`${blockName}__list-item`);
      const figure = (0,_scripts_common_js__WEBPACK_IMPORTED_MODULE_0__.createElement)('figure');
      const image = item.querySelector('picture');
      const pElmt = (0,_scripts_common_js__WEBPACK_IMPORTED_MODULE_0__.createElement)('figcaption');
      const liText = item.innerText.trim();
      pElmt.textContent = liText;
      figure.append(image, pElmt);
      item.textContent = '';
      item.append(figure);
    });
  } else {
    block.querySelectorAll('li').forEach((item) => {
      item.classList.add('li--hyphen');
    });
  }

  (0,_scripts_common_js__WEBPACK_IMPORTED_MODULE_0__.unwrapDivs)(block);
}

__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ })

},
/******/ __webpack_require__ => { // webpackRuntimeModules
/******/ var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
/******/ var __webpack_exports__ = (__webpack_exec__("./blocks/v2-media-with-content/v2-media-with-content.js"));
/******/ }
]);