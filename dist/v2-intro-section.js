"use strict";
(self["webpackChunk_adobe_helix_project_boilerplate"] = self["webpackChunk_adobe_helix_project_boilerplate"] || []).push([["v2-intro-section"],{

/***/ "./blocks/v2-intro-section/v2-intro-section.js":
/*!*****************************************************!*\
  !*** ./blocks/v2-intro-section/v2-intro-section.js ***!
  \*****************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ decorate)
/* harmony export */ });
/* harmony import */ var _scripts_common_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../scripts/common.js */ "./scripts/common.js");
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([_scripts_common_js__WEBPACK_IMPORTED_MODULE_0__]);
_scripts_common_js__WEBPACK_IMPORTED_MODULE_0__ = (__webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__)[0];


const blockName = 'v2-intro-section';

function decorate(block) {
  const content = block.querySelector(':scope > div > div:first-child');
  const image = block.querySelector(':scope > div > div:nth-child(2) > picture');
  const button = content.querySelector('.button-container');

  const parent = block.parentElement;
  parent.classList.add(button ? `${blockName}__with-button` : 'full-width');

  content.classList.add(`${blockName}__text-content`);

  const heading = content.querySelectorAll('h1, h2, h3, h4, h5, h6');
  heading[0].classList.add(`${blockName}__heading`, (button && 'with-marker'));

  if (button) {
    const texts = (0,_scripts_common_js__WEBPACK_IMPORTED_MODULE_0__.createElement)('div', { classes: `${blockName}__content` });
    texts.append(content, button);
    block.append(texts);
  }

  parent.prepend(image);
  (0,_scripts_common_js__WEBPACK_IMPORTED_MODULE_0__.unwrapDivs)(block);
}

__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ })

},
/******/ __webpack_require__ => { // webpackRuntimeModules
/******/ var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
/******/ var __webpack_exports__ = (__webpack_exec__("./blocks/v2-intro-section/v2-intro-section.js"));
/******/ }
]);