"use strict";
(self["webpackChunk_adobe_helix_project_boilerplate"] = self["webpackChunk_adobe_helix_project_boilerplate"] || []).push([["fragment"],{

/***/ "./blocks/fragment/fragment.js":
/*!*************************************!*\
  !*** ./blocks/fragment/fragment.js ***!
  \*************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ decorate)
/* harmony export */ });
/* harmony import */ var _scripts_scripts_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../scripts/scripts.js */ "./scripts/scripts.js");
/* harmony import */ var _scripts_aem_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../scripts/aem.js */ "./scripts/aem.js");
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([_scripts_scripts_js__WEBPACK_IMPORTED_MODULE_0__]);
_scripts_scripts_js__WEBPACK_IMPORTED_MODULE_0__ = (__webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__)[0];
/*
 * Fragment Block
 * Include content from one Helix page in another.
 * https://www.hlx.live/developer/block-collection/fragment
 */





/**
   * Loads a fragment.
   * @param {string} path The path to the fragment
   * @returns {HTMLElement} The root element of the fragment
   */
async function loadFragment(path) {
  const link = path && path.startsWith('/') ? path : new URL(path).pathname;

  if (link) {
    const resp = await fetch(`${link}.plain.html`);
    if (resp.ok) {
      const main = document.createElement('main');
      main.innerHTML = await resp.text();
      (0,_scripts_scripts_js__WEBPACK_IMPORTED_MODULE_0__.decorateMain)(main);
      await (0,_scripts_aem_js__WEBPACK_IMPORTED_MODULE_1__.loadBlocks)(main);
      return main;
    }
  }
  return null;
}

async function decorate(block) {
  const link = block.querySelector('a');
  const path = link ? link.getAttribute('href') : block.textContent.trim();
  const fragment = await loadFragment(path);

  if (fragment) {
    const fragmentSection = fragment.querySelector(':scope .section');

    if (fragmentSection) {
      block.classList.add(...fragmentSection.classList, 'fragment');
      block.replaceChildren(...fragmentSection.childNodes);
    }
  }
}

__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ })

},
/******/ __webpack_require__ => { // webpackRuntimeModules
/******/ var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
/******/ var __webpack_exports__ = (__webpack_exec__("./blocks/fragment/fragment.js"));
/******/ }
]);