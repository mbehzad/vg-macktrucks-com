"use strict";
(self["webpackChunk_adobe_helix_project_boilerplate"] = self["webpackChunk_adobe_helix_project_boilerplate"] || []).push([["v2-cards"],{

/***/ "./blocks/v2-cards/v2-cards.js":
/*!*************************************!*\
  !*** ./blocks/v2-cards/v2-cards.js ***!
  \*************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _scripts_common_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../scripts/common.js */ "./scripts/common.js");
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([_scripts_common_js__WEBPACK_IMPORTED_MODULE_0__]);
_scripts_common_js__WEBPACK_IMPORTED_MODULE_0__ = (__webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__)[0];


async function decorate(block) {
  const blockName = 'v2-cards';
  const variantClasses = [
    'no-background',
    'horizontal',
    'image-aspect-ratio-7-5',
    'large-heading',
    '4-cards-row',
    '2-cards-row',
    'spaced',
    'with-border',
  ];
  (0,_scripts_common_js__WEBPACK_IMPORTED_MODULE_0__.variantsClassesToBEM)(block.classList, variantClasses, blockName);

  const cardsItems = [...block.querySelectorAll(':scope > div')];
  cardsItems.forEach((el) => el.classList.add(`${blockName}__card-item`));

  const cardsSections = [...block.querySelectorAll(':scope > div > div')];
  cardsSections.forEach((el) => {
    el.classList.add(`${blockName}__text-wrapper`);
  });

  const pictures = [...block.querySelectorAll('picture')];
  pictures.forEach((el) => {
    el.classList.add(`${blockName}__picture`);
    el.parentElement.classList.add(`${blockName}__picture-wrapper`);
    el.parentElement.classList.remove(`${blockName}__text-wrapper`);
  });

  const images = [...block.querySelectorAll('img')];
  images.forEach((el) => el.classList.add(`${blockName}__image`));

  const cardsHeadings = [...block.querySelectorAll('h1, h2, h3, h4, h5, h6')];
  cardsHeadings.forEach((el) => {
    el.classList.add(`${blockName}__heading`);
    if (el.querySelector('a')) block.classList.add(`${blockName}--heading-with-arrow`);
  });

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
      if (block.classList.contains(`${blockName}--spaced`)) {
        link.classList.replace('button--small', 'button--large');
      }
    });
  });
}

__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ })

},
/******/ __webpack_require__ => { // webpackRuntimeModules
/******/ var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
/******/ var __webpack_exports__ = (__webpack_exec__("./blocks/v2-cards/v2-cards.js"));
/******/ }
]);