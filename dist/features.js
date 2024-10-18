"use strict";
(self["webpackChunk_adobe_helix_project_boilerplate"] = self["webpackChunk_adobe_helix_project_boilerplate"] || []).push([["features"],{

/***/ "./blocks/features/features.js":
/*!*************************************!*\
  !*** ./blocks/features/features.js ***!
  \*************************************/
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
  block.querySelectorAll('h1, h2, h3, h4, h5, h6').forEach((title) => {
    // convert to h4 because it might be any header level
    const h4 = (0,_scripts_common_js__WEBPACK_IMPORTED_MODULE_0__.createElement)('h4', { classes: 'feature-title' });
    h4.innerHTML = title.innerHTML;
    title.replaceWith(h4);
  });

  block.querySelectorAll(':scope > div').forEach((row) => row.classList.add('row'));
  block.querySelectorAll(':scope > div > div').forEach((cell) => cell.classList.add('feature'));

  // unwrap picture so that text styles are not applied to this paragraph
  block.querySelectorAll('picture').forEach((picture) => picture.closest('p').replaceWith(picture));
}

__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ })

},
/******/ __webpack_require__ => { // webpackRuntimeModules
/******/ var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
/******/ var __webpack_exports__ = (__webpack_exec__("./blocks/features/features.js"));
/******/ }
]);