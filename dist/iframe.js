"use strict";
(self["webpackChunk_adobe_helix_project_boilerplate"] = self["webpackChunk_adobe_helix_project_boilerplate"] || []).push([["iframe"],{

/***/ "./blocks/iframe/iframe.js":
/*!*********************************!*\
  !*** ./blocks/iframe/iframe.js ***!
  \*********************************/
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
  const link = block.querySelector('a')?.getAttribute('href');
  const iframe = (0,_scripts_common_js__WEBPACK_IMPORTED_MODULE_0__.createElement)('iframe', {
    props: { frameborder: 0, src: link },
  });
  const fixedHeightClass = [...block.classList].find((el) => /[0-9]+px/.test(el));
  const maxWidthClass = [...block.classList].find((el) => /width-[0-9]+px/.test(el));

  if (fixedHeightClass) {
    iframe.height = fixedHeightClass;
  }
  if (maxWidthClass) {
    const maxWidth = maxWidthClass.split('width-')[1];
    iframe.style.maxWidth = maxWidth;
  }
  block.replaceChildren(iframe);
}

__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ })

},
/******/ __webpack_require__ => { // webpackRuntimeModules
/******/ var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
/******/ var __webpack_exports__ = (__webpack_exec__("./blocks/iframe/iframe.js"));
/******/ }
]);