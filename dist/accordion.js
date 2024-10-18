"use strict";
(self["webpackChunk_adobe_helix_project_boilerplate"] = self["webpackChunk_adobe_helix_project_boilerplate"] || []).push([["accordion"],{

/***/ "./blocks/accordion/accordion.js":
/*!***************************************!*\
  !*** ./blocks/accordion/accordion.js ***!
  \***************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ decorate)
/* harmony export */ });
/* harmony import */ var _scripts_common_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../scripts/common.js */ "./scripts/common.js");
/* harmony import */ var _fragment_fragment_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../fragment/fragment.js */ "./blocks/fragment/fragment.js");
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([_scripts_common_js__WEBPACK_IMPORTED_MODULE_0__, _fragment_fragment_js__WEBPACK_IMPORTED_MODULE_1__]);
([_scripts_common_js__WEBPACK_IMPORTED_MODULE_0__, _fragment_fragment_js__WEBPACK_IMPORTED_MODULE_1__] = __webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__);



/* Function checks if the content of the provied element is just a link to other doc */
function isContentLink(el) {
  // The assumpions:
  // 1. The content is just plain text - no HTML inside
  // 2. The link starts from '/' and doesn't contain any white space character
  return el.innerHTML === el.textContent && /^\/(\S+)$/g.test(el.innerHTML);
}

async function decorate(block) {
  const rows = [...block.querySelectorAll(':scope > div')];
  const accordionsPromises = rows.map(async (row) => {
    const accordionHeader = row.querySelector(
      ':scope > div > h1, :scope > div > h2, :scope > div > h3, :scope > div > h4, :scope > div > h5, :scope > div > h6',
    );
    const accordionContent = row.querySelector(
      ':scope > div:nth-child(2)',
    );

    const headerButton = (0,_scripts_common_js__WEBPACK_IMPORTED_MODULE_0__.createElement)('button', { classes: 'accordion-header-button' });
    const headerEl = (0,_scripts_common_js__WEBPACK_IMPORTED_MODULE_0__.createElement)('h2', { classes: 'accordion-header' });
    const plusEl = (0,_scripts_common_js__WEBPACK_IMPORTED_MODULE_0__.createElement)('div', { classes: 'accordion-close' });
    headerEl.innerHTML = accordionHeader?.innerHTML;
    headerButton.append(headerEl, plusEl);

    const contentEl = (0,_scripts_common_js__WEBPACK_IMPORTED_MODULE_0__.createElement)('div', { classes: ['accordion-content', 'accordion-content-close'] });

    if (isContentLink(accordionContent)) {
      await (0,_fragment_fragment_js__WEBPACK_IMPORTED_MODULE_1__["default"])(accordionContent);
    }

    if (accordionContent.textContent.startsWith('#id-') && accordionContent.innerHTML === accordionContent.textContent) {
      const pointedContent = document.querySelector(`.${accordionContent.textContent.substring(1)}`);

      if (pointedContent) {
        const prevDisaply = pointedContent.parentElement.style.display;
        pointedContent.parentElement.style.display = 'none';
        // lets wait for loading of the content that we want to put inside the accordion
        new MutationObserver((_, observer) => {
          if (pointedContent.dataset.blockStatus === 'loaded') {
            observer.disconnect();
            contentEl.innerHTML = '';
            contentEl.append(pointedContent.parentElement);
            pointedContent.parentElement.style.display = prevDisaply;
          }
        }).observe(pointedContent, { attributes: true });
      }
    }

    contentEl.innerHTML = accordionContent.innerHTML;

    const accordionEl = (0,_scripts_common_js__WEBPACK_IMPORTED_MODULE_0__.createElement)('div', { classes: ['accordion-item', 'accordion-item-close'] });
    accordionEl.append(headerButton);
    accordionEl.append(contentEl);

    headerButton.addEventListener('click', () => {
      accordionEl.classList.toggle('accordion-item-close');
    });

    return accordionEl;
  });

  block.innerHTML = '';
  await Promise.allSettled(accordionsPromises);
  accordionsPromises.forEach(async (acc) => {
    const result = await acc;
    block.append(result);
  });
}

__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ }),

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
/******/ var __webpack_exports__ = (__webpack_exec__("./blocks/accordion/accordion.js"));
/******/ }
]);