"use strict";
(self["webpackChunk_adobe_helix_project_boilerplate"] = self["webpackChunk_adobe_helix_project_boilerplate"] || []).push([["table"],{

/***/ "./blocks/table/table.js":
/*!*******************************!*\
  !*** ./blocks/table/table.js ***!
  \*******************************/
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
  const headings = block.querySelectorAll('table h1, table h2, table h3, table h4, table h5, table h6');

  headings.forEach((heading) => {
    // unifing headings
    const newHeading = (0,_scripts_common_js__WEBPACK_IMPORTED_MODULE_0__.createElement)('h5', { classes: 'table-cell-heading' });
    newHeading.innerHTML = heading.innerHTML;
    heading.replaceWith(newHeading);
    newHeading.closest('tr')?.classList.add('table-heading');
  });

  const isRowHeader = block.classList.contains('row-header');
  if (isRowHeader) {
    const firstColumn = block.querySelectorAll('table td:first-child');
    firstColumn.forEach((cell) => {
      const newP = (0,_scripts_common_js__WEBPACK_IMPORTED_MODULE_0__.createElement)('p');
      newP.textContent = cell.querySelector('strong').textContent;
      cell.replaceChild(newP, cell.querySelector('strong'));
      cell.addEventListener('click', () => {
        cell.classList.toggle('open');
        cell.nextElementSibling.classList.toggle('open');
      });
    });
  }

  return block;
}

__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ })

},
/******/ __webpack_require__ => { // webpackRuntimeModules
/******/ var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
/******/ var __webpack_exports__ = (__webpack_exec__("./blocks/table/table.js"));
/******/ }
]);