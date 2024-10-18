"use strict";
(self["webpackChunk_adobe_helix_project_boilerplate"] = self["webpackChunk_adobe_helix_project_boilerplate"] || []).push([["v2-accordion-column"],{

/***/ "./blocks/v2-accordion-column/v2-accordion-column.js":
/*!***********************************************************!*\
  !*** ./blocks/v2-accordion-column/v2-accordion-column.js ***!
  \***********************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ decorate)
/* harmony export */ });
/* harmony import */ var _scripts_common_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../scripts/common.js */ "./scripts/common.js");
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([_scripts_common_js__WEBPACK_IMPORTED_MODULE_0__]);
_scripts_common_js__WEBPACK_IMPORTED_MODULE_0__ = (__webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__)[0];


const CLASSES = {
  blockName: 'v2-accordion-column',
  left: 'left',
};

const { blockName, left } = CLASSES;
const variants = Object.values(CLASSES).splice(1);

const addAccordionClass = (item) => {
  const hasPicture = item.querySelector('picture');
  if (hasPicture) item.classList.add(`${blockName}__item-image`);
  else {
    const header = item.querySelector(':is(h1, h2, h3, h4, h5, h6)');
    if (header) header.classList.add(`${blockName}__item-title`);
    item.classList.add(`${blockName}__item-description`);
  }
};

function decorate(block) {
  const accordionItems = [...block.querySelectorAll(':scope > div')];
  const accordionContainer = (0,_scripts_common_js__WEBPACK_IMPORTED_MODULE_0__.createElement)('div', { classes: `${blockName}__accordion-container` });
  const itemsContainer = (0,_scripts_common_js__WEBPACK_IMPORTED_MODULE_0__.createElement)('div', { classes: `${blockName}__items-container` });
  const hasLeftClass = block.classList.contains(left); // accordion at left side
  /** @type {boolean} */
  const isLeftVariant = hasLeftClass
    || (!hasLeftClass && !!accordionItems[0].lastElementChild.querySelector('picture'));
  if (!hasLeftClass && isLeftVariant) block.classList.add(left);
  (0,_scripts_common_js__WEBPACK_IMPORTED_MODULE_0__.variantsClassesToBEM)(block.classList, variants, blockName);
  block.parentElement.classList.add('full-width');

  // is responsibility of the author to add the proper amount of images and text
  accordionItems.forEach((item, i) => {
    const buttons = [...block.querySelectorAll('.button-container')];
    buttons.forEach((el) => {
      el.classList.add(`${blockName}__button-container`);
      [...el.querySelectorAll('a')].forEach((link) => {
        if (link.classList.contains('button--primary')
            || link.classList.contains('button--secondary')
            || link.classList.contains('button--red')) {
          link.classList.add('button--small');
        } else {
          link.classList.add('standalone-link', `${blockName}__button`);
        }
      });
    });

    const colBtnTitle = (0,_scripts_common_js__WEBPACK_IMPORTED_MODULE_0__.createElement)('button', {
      classes: `${blockName}__item-header-button`,
      props: { type: 'button' },
    });
    const dropdownArrowIcon = (0,_scripts_common_js__WEBPACK_IMPORTED_MODULE_0__.createElement)('span', { classes: [`${blockName}__icon`, 'icon', 'icon-dropdown-caret'] });
    const colItems = [...item.querySelectorAll(':scope > div')];

    // add the proper classes to each accordion item
    item.classList.add(`${blockName}__item`);
    if (i === 0) item.classList.add('active');
    colItems.forEach((col) => addAccordionClass(col));
    colBtnTitle.prepend(item.querySelector(`.${blockName}__item-title`), dropdownArrowIcon);
    colBtnTitle.onclick = () => {
      const active = accordionContainer.querySelector('.active');
      if (active && active !== item) active.classList.remove('active');
      item.classList.add('active');
    };
    item.prepend(colBtnTitle);
    itemsContainer.appendChild(item);
  });

  accordionContainer.append(itemsContainer);

  block.appendChild(accordionContainer);
  (0,_scripts_common_js__WEBPACK_IMPORTED_MODULE_0__.decorateIcons)(block);
}

__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ })

},
/******/ __webpack_require__ => { // webpackRuntimeModules
/******/ var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
/******/ var __webpack_exports__ = (__webpack_exec__("./blocks/v2-accordion-column/v2-accordion-column.js"));
/******/ }
]);