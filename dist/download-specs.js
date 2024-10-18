"use strict";
(self["webpackChunk_adobe_helix_project_boilerplate"] = self["webpackChunk_adobe_helix_project_boilerplate"] || []).push([["download-specs"],{

/***/ "./blocks/download-specs/download-specs.js":
/*!*************************************************!*\
  !*** ./blocks/download-specs/download-specs.js ***!
  \*************************************************/
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

  const downloadSpecsSection = (0,_scripts_common_js__WEBPACK_IMPORTED_MODULE_0__.createElement)('div', { classes: 'download-specs-section' });
  const specsTitle = children.shift().querySelector('h3');
  const downloadSpecsList = (0,_scripts_common_js__WEBPACK_IMPORTED_MODULE_0__.createElement)('ul', { classes: 'download-specs-list' });

  children.forEach((e, idx) => {
    const downloadItem = (0,_scripts_common_js__WEBPACK_IMPORTED_MODULE_0__.createElement)('li', { classes: ['download-specs-item', `download-specs-item-${idx + 1}`] });

    const anchorElement = (0,_scripts_common_js__WEBPACK_IMPORTED_MODULE_0__.createElement)('a', { classes: 'anchor-element' });
    const linkUrl = e.querySelector('a').getAttribute('href');
    anchorElement.setAttribute('href', linkUrl);
    anchorElement.setAttribute('target', '_blank');

    const img = (0,_scripts_common_js__WEBPACK_IMPORTED_MODULE_0__.createElement)('img', { classes: 'download-specs-icon' });
    img.src = '/icons/pdficon.png';

    const pElement = (0,_scripts_common_js__WEBPACK_IMPORTED_MODULE_0__.createElement)('p', { classes: 'p-element' });
    const text = e.querySelector('div').innerText;
    pElement.textContent = text;

    anchorElement.append(img, pElement);
    downloadItem.append(anchorElement);
    downloadSpecsList.append(downloadItem);
  });
  downloadSpecsSection.append(specsTitle, downloadSpecsList);

  block.textContent = '';
  block.append(downloadSpecsSection);
}

__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ })

},
/******/ __webpack_require__ => { // webpackRuntimeModules
/******/ var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
/******/ var __webpack_exports__ = (__webpack_exec__("./blocks/download-specs/download-specs.js"));
/******/ }
]);