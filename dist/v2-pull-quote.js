"use strict";
(self["webpackChunk_adobe_helix_project_boilerplate"] = self["webpackChunk_adobe_helix_project_boilerplate"] || []).push([["v2-pull-quote"],{

/***/ "./blocks/v2-pull-quote/v2-pull-quote.js":
/*!***********************************************!*\
  !*** ./blocks/v2-pull-quote/v2-pull-quote.js ***!
  \***********************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ decorate)
/* harmony export */ });
/* harmony import */ var _scripts_common_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../scripts/common.js */ "./scripts/common.js");
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([_scripts_common_js__WEBPACK_IMPORTED_MODULE_0__]);
_scripts_common_js__WEBPACK_IMPORTED_MODULE_0__ = (__webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__)[0];


const blockName = 'v2-pull-quote';
const variantClasses = ['half-width'];
let quoteIsRight = true;

function decorate(block) {
  (0,_scripts_common_js__WEBPACK_IMPORTED_MODULE_0__.variantsClassesToBEM)(block.classList, variantClasses, blockName);
  const parentWrapper = block.parentElement;

  const isHalfWidth = block.classList.contains(`${blockName}--half-width`);
  const previousTextEl = parentWrapper.previousElementSibling.lastChild;

  if (isHalfWidth && previousTextEl) {
    parentWrapper.classList.add(`${blockName}-wrapper--half-width`,
      quoteIsRight ? 'quote-right' : 'quote-left');
    quoteIsRight = !quoteIsRight;
    previousTextEl.classList.add('half-width-text');
    parentWrapper.prepend(previousTextEl);
  }
  (0,_scripts_common_js__WEBPACK_IMPORTED_MODULE_0__.unwrapDivs)(block);
}

__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ })

},
/******/ __webpack_require__ => { // webpackRuntimeModules
/******/ var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
/******/ var __webpack_exports__ = (__webpack_exec__("./blocks/v2-pull-quote/v2-pull-quote.js"));
/******/ }
]);