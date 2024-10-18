"use strict";
(self["webpackChunk_adobe_helix_project_boilerplate"] = self["webpackChunk_adobe_helix_project_boilerplate"] || []).push([["v2-accordion"],{

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

/***/ }),

/***/ "./blocks/v2-accordion/v2-accordion.js":
/*!*********************************************!*\
  !*** ./blocks/v2-accordion/v2-accordion.js ***!
  \*********************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _scripts_common_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../scripts/common.js */ "./scripts/common.js");
/* harmony import */ var _fragment_fragment_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../fragment/fragment.js */ "./blocks/fragment/fragment.js");
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([_scripts_common_js__WEBPACK_IMPORTED_MODULE_0__, _fragment_fragment_js__WEBPACK_IMPORTED_MODULE_1__]);
([_scripts_common_js__WEBPACK_IMPORTED_MODULE_0__, _fragment_fragment_js__WEBPACK_IMPORTED_MODULE_1__] = __webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__);



const blockName = 'v2-accordion';

function isContentLinkedCheck(el, startsWithString) {
  if (
    (el.children.length === 1 &&
      el.children[0].tagName.toLowerCase() === 'p') ||
    (el.children.length === 0 && el.textContent === el.innerHTML)
  ) {
    return el.textContent.startsWith(startsWithString);
  }
  return false;
}

/* Function checks if the content of the provided element is just a link to other doc */
function isContentLink(el) {
  return isContentLinkedCheck(el, '/');
}

function isContentInsideAnotherElement(el) {
  return isContentLinkedCheck(el, '#id-');
}

function loaded(element, pointedContent, display) {
  element.innerHTML = '';
  element.append(pointedContent.parentElement);
  pointedContent.parentElement.style.display = display;
}

async function decorate(block) {
  block.querySelectorAll(`.${blockName}__item`).forEach((accordionEl) => {
    accordionEl
      .querySelector(`.${blockName}__button`)
      .addEventListener('click', () => {
        accordionEl.classList.toggle(`${blockName}__item-close`);
      });
  });
}


document.querySelectorAll('.v2-accordion').forEach(decorate);

__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ })

},
/******/ __webpack_require__ => { // webpackRuntimeModules
/******/ var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
/******/ var __webpack_exports__ = (__webpack_exec__("./blocks/v2-accordion/v2-accordion.js"));
/******/ }
]);