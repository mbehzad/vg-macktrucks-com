"use strict";
(self["webpackChunk_adobe_helix_project_boilerplate"] = self["webpackChunk_adobe_helix_project_boilerplate"] || []).push([["v2-icon-cards"],{

/***/ "./blocks/v2-icon-cards/v2-icon-cards.js":
/*!***********************************************!*\
  !*** ./blocks/v2-icon-cards/v2-icon-cards.js ***!
  \***********************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _scripts_common_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../scripts/common.js */ "./scripts/common.js");
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([_scripts_common_js__WEBPACK_IMPORTED_MODULE_0__]);
_scripts_common_js__WEBPACK_IMPORTED_MODULE_0__ = (__webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__)[0];


const blockName = 'v2-icon-cards';
const variantClasses = ['no-background', 'alt-font-size'];

async function decorate(block) {
  (0,_scripts_common_js__WEBPACK_IMPORTED_MODULE_0__.variantsClassesToBEM)(block.classList, variantClasses, blockName);
  const rows = [...block.querySelectorAll(':scope > div')];
  const columns = [...block.querySelectorAll(':scope > div > div')];

  rows.forEach((row) => {
    row.classList.add(`${blockName}__row`);
  });

  const parentSection = block.parentElement.parentElement;
  const hasHeader = parentSection.classList.contains('header-with-mark');
  const hasExtraColumn = columns.length === 4;

  if (hasExtraColumn) block.classList.add(`${blockName}--4-cols`);
  if (hasExtraColumn && hasHeader) parentSection.querySelector('.default-content-wrapper').classList.add(`${blockName}--4-cols-header`);

  columns.forEach((col, idx) => {
    const isExtraColumn = idx === 3;
    col.classList.add(`${blockName}__column`);

    const allTextElmts = col.querySelectorAll('p');
    const bodyElmts = [];

    allTextElmts.forEach((e) => {
      const nextElmt = e.nextElementSibling;

      const isButton = [...e.classList].includes('button-container');
      const isPretitle = nextElmt?.tagName.toLowerCase()[0] === 'h';

      if (!isPretitle && !isButton) bodyElmts.push(e);
    });
    bodyElmts.forEach((e) => e.classList.add(`${blockName}__body`));

    const buttons = [...block.querySelectorAll('.button-container a')];
    buttons.forEach((btn) => {
      const buttonContainer = btn.closest('.button-container');
      if (buttonContainer) {
        buttonContainer.replaceWith(btn);
      }

      if (btn.classList.contains('button--primary')
          || btn.classList.contains('button--secondary')
          || btn.classList.contains('button--red')) {
        btn.classList.add('button--small');
      } else {
        btn.classList.add('standalone-link', `${blockName}__button`);
      }
    });

    if (isExtraColumn) {
      col.classList.add(`${blockName}__column--extra-col`);
      col.dataset.theme = 'gold';
    }

    const headings = [...col.querySelectorAll('h1, h2, h3, h4, h5, h6')];
    headings.forEach((heading) => heading.classList.add(`${blockName}__heading`, 'h2'));

    // icons
    [...col.querySelectorAll('.icon')].forEach((icon, index) => {
      const iconParentEl = icon.parentElement;
      if (iconParentEl.children.length === 1 && index === 0) {
        icon.classList.add('top-icon');
        iconParentEl.replaceWith(icon);
      }
    });

    const prevEl = headings[0]?.previousElementSibling;
    const pretitleText = prevEl && !prevEl.classList.contains('icon') && prevEl.textContent;

    if (pretitleText) {
      const pretitle = (0,_scripts_common_js__WEBPACK_IMPORTED_MODULE_0__.createElement)('span', { classes: 'pretitle' });
      pretitle.textContent = pretitleText;
      prevEl.replaceWith(pretitle);
    }
  });

  const headings = [...block.querySelectorAll('h3, h4, h5, h6')];
  const h2List = [...block.querySelectorAll('h2')];

  headings.forEach((h) => {
    h.classList.add('h5');
    h.classList.remove('h2');
  });

  h2List.forEach((h) => {
    h.classList.add('with-marker', 'h2');
    h.classList.remove('h1');
    h.closest(`.${blockName}__column`)?.classList.add(`${blockName}__column--main`);
  });

  // replacing headings (h3, h4, h5, h6) with strong so the block will not break semantic
  // (example breaking semantic: col 1 -> h5, col 2 -> h2)
  headings.forEach((heading) => {
    const newHeadingEl = (0,_scripts_common_js__WEBPACK_IMPORTED_MODULE_0__.createElement)('strong', { classes: [...heading.classList] });
    newHeadingEl.innerHTML = heading.innerHTML;
    heading.replaceWith(newHeadingEl);
  });
}

__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ })

},
/******/ __webpack_require__ => { // webpackRuntimeModules
/******/ var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
/******/ var __webpack_exports__ = (__webpack_exec__("./blocks/v2-icon-cards/v2-icon-cards.js"));
/******/ }
]);