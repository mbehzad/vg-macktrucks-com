"use strict";
(self["webpackChunk_adobe_helix_project_boilerplate"] = self["webpackChunk_adobe_helix_project_boilerplate"] || []).push([["find-dealer"],{

/***/ "./blocks/find-dealer/find-dealer.js":
/*!*******************************************!*\
  !*** ./blocks/find-dealer/find-dealer.js ***!
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
  const container = block.querySelector(':scope > div > div');
  const inputContainer = (0,_scripts_common_js__WEBPACK_IMPORTED_MODULE_0__.createElement)('div', { classes: 'find-dealer-input-wrapper' });
  const input = (0,_scripts_common_js__WEBPACK_IMPORTED_MODULE_0__.createElement)('input', {
    classes: 'find-dealer-input',
    props: {
      title: 'code',
      type: 'text',
      placeholder: 'Enter Zip',
    },
  });
  container.className = 'find-dealer-form-container';
  input.onkeydown = (e) => {
    if (e.key === 'Enter') {
      const url = new URL('/buy-mack/find-a-dealer/', window.location.href);
      url.searchParams.set('l', e.target.value);
      window.location.href = url.toString();
    }
  };

  inputContainer.appendChild(input);
  container.appendChild(inputContainer);
}

__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ })

},
/******/ __webpack_require__ => { // webpackRuntimeModules
/******/ var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
/******/ var __webpack_exports__ = (__webpack_exec__("./blocks/find-dealer/find-dealer.js"));
/******/ }
]);