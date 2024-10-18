"use strict";
(self["webpackChunk_adobe_helix_project_boilerplate"] = self["webpackChunk_adobe_helix_project_boilerplate"] || []).push([["v2-navigation-hub"],{

/***/ "./blocks/v2-navigation-hub/v2-navigation-hub.js":
/*!*******************************************************!*\
  !*** ./blocks/v2-navigation-hub/v2-navigation-hub.js ***!
  \*******************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ decorate)
/* harmony export */ });
/* harmony import */ var _scripts_common_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../scripts/common.js */ "./scripts/common.js");
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([_scripts_common_js__WEBPACK_IMPORTED_MODULE_0__]);
_scripts_common_js__WEBPACK_IMPORTED_MODULE_0__ = (__webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__)[0];


const blockName = 'v2-navigation-hub';
const variantClasses = ['media-left', 'media-right', 'overlap'];
const blockNames = {
  column: `${blockName}__column`,
  card: `${blockName}__card-container`,
  cardContent: `${blockName}__card-content`,
  cardNavigation: `${blockName}__card-navigation`,
  cardNavTitle: `${blockName}__card-nav-title`,
  cardNavList: `${blockName}__card-nav-list`,
  media: `${blockName}__media-container`,
  mediaRight: `${blockName}__media-right`,
  mediaLeft: `${blockName}__media-left`,
  mediaImage: `${blockName}__image`,
};

function decorate(block) {
  (0,_scripts_common_js__WEBPACK_IMPORTED_MODULE_0__.variantsClassesToBEM)(block.classList, variantClasses, blockName);
  const blockWrapper = block.closest(`.${blockName}-wrapper`);
  // Card elements
  const cardContainer = block.querySelector(':scope > div:first-child');
  const cardContent = cardContainer.querySelector(':scope > div:first-child');
  const cardButton = cardContent.querySelector(':scope .button-container a');
  const cardNavigation = cardContainer.querySelector(':scope > div:last-child');
  const cardNavTitle = cardNavigation.querySelector(':scope > :first-child');
  const cardNavList = cardNavigation.querySelector(':scope > ul');
  const cardNavLinks = [...cardNavList.querySelectorAll('a')];
  // Media element
  const mediaContainer = block.querySelector(':scope > div:last-child');
  const mediaImage = mediaContainer.querySelector('img');
  const isMediaLeft = mediaContainer.firstElementChild.children.length > 0;
  // By default, media is on the left side
  const mediaPosition = isMediaLeft ? blockNames.mediaLeft : blockNames.mediaRight;

  blockWrapper.classList.add('full-width');
  cardContainer.className = `${blockNames.card} ${blockNames.column}`;
  cardContent.className = blockNames.cardContent;
  cardButton.classList.add('button--large');
  cardNavigation.className = blockNames.cardNavigation;
  cardNavTitle.className = blockNames.cardNavTitle;
  cardNavList.className = blockNames.cardNavList;
  cardNavLinks.forEach((link) => { link.className = 'standalone-link'; });
  mediaContainer.className = `${blockNames.media} ${blockNames.column}`;
  mediaImage.className = blockNames.mediaImage;

  block.classList.add(mediaPosition);

  (0,_scripts_common_js__WEBPACK_IMPORTED_MODULE_0__.unwrapDivs)(mediaContainer);
}

__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ })

},
/******/ __webpack_require__ => { // webpackRuntimeModules
/******/ var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
/******/ var __webpack_exports__ = (__webpack_exec__("./blocks/v2-navigation-hub/v2-navigation-hub.js"));
/******/ }
]);