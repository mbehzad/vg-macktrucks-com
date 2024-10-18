"use strict";
(self["webpackChunk_adobe_helix_project_boilerplate"] = self["webpackChunk_adobe_helix_project_boilerplate"] || []).push([["breadcrumb"],{

/***/ "./blocks/breadcrumb/breadcrumb.js":
/*!*****************************************!*\
  !*** ./blocks/breadcrumb/breadcrumb.js ***!
  \*****************************************/
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
  const breadcrumbItems = (0,_scripts_common_js__WEBPACK_IMPORTED_MODULE_0__.createElement)('ul', { classes: 'breadcrumb-list' });

  const articleUrl = (window.location.href).split('/').pop();
  const articleName = articleUrl.replaceAll('-', ' ').toLowerCase();
  const homeUrl = `${window.location.origin}/magazine/`;

  breadcrumbItems.innerHTML = `
    <li class="breadcrumb breadcrumb-home">
      <a href='${homeUrl}'>
        Home
      </a>
    </li>
    <li class="breadcrumb breadcrumb-current">
      ${articleName}
    </li>`;

  block.textContent = '';
  block.append(breadcrumbItems);
}

__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ })

},
/******/ __webpack_require__ => { // webpackRuntimeModules
/******/ var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
/******/ var __webpack_exports__ = (__webpack_exec__("./blocks/breadcrumb/breadcrumb.js"));
/******/ }
]);