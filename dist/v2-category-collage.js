"use strict";
(self["webpackChunk_adobe_helix_project_boilerplate"] = self["webpackChunk_adobe_helix_project_boilerplate"] || []).push([["v2-category-collage"],{

/***/ "./blocks/v2-category-collage/v2-category-collage.js":
/*!***********************************************************!*\
  !*** ./blocks/v2-category-collage/v2-category-collage.js ***!
  \***********************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ decorate)
/* harmony export */ });
/* harmony import */ var _scripts_common_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../scripts/common.js */ "./scripts/common.js");
/* harmony import */ var _scripts_video_helper_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../scripts/video-helper.js */ "./scripts/video-helper.js");
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([_scripts_common_js__WEBPACK_IMPORTED_MODULE_0__, _scripts_video_helper_js__WEBPACK_IMPORTED_MODULE_1__]);
([_scripts_common_js__WEBPACK_IMPORTED_MODULE_0__, _scripts_video_helper_js__WEBPACK_IMPORTED_MODULE_1__] = __webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__);



const blockName = 'v2-category-collage';

const CLASSES = {
  itemContainer: `${blockName}__item-container`,
  itemContent: `${blockName}__item-content`,
  itemTitle: `${blockName}__item-title`,
  itemCategoryTitle: `${blockName}__item-category-title`,
  itemMedia: `${blockName}__item-media`,
  itemLinkClass: `${blockName}__item-link`,
};

const getItemTitleContainer = (item) => item.querySelector('div:nth-child(3)');
const getItemCategoryTitleContainer = (item) => item.querySelector('div:nth-child(2)');
const getItemLink = (item) => item.querySelector('div:nth-child(3) > a');

const arrowButtonElement = () => (0,_scripts_common_js__WEBPACK_IMPORTED_MODULE_0__.createElement)('span', { classes: ['icon', 'icon-arrow-right'] });

const decorateImage = (itemLink, itemImage) => {
  const hasImageContainer = itemImage.parentElement === itemLink;

  if (!hasImageContainer) {
    const imageContainer = itemImage.parentElement;
    itemImage.classList.add(CLASSES.itemMedia);
    itemLink.prepend(itemImage);
    imageContainer.remove();
  }

  itemImage.setAttribute('tabindex', 0);
};

const movePlayButton = (itemLink, item) => {
  const playButton = itemLink.querySelector('.v2-video__playback-button');
  if (playButton) {
    item.prepend(playButton);
  }
};

const decorateVideo = (itemLink, item) => {
  const videoLink = itemLink.querySelector('a.text-link-with-video');

  if (!videoLink || !(0,_scripts_video_helper_js__WEBPACK_IMPORTED_MODULE_1__.isVideoLink)(videoLink)) {
    return;
  }

  (0,_scripts_video_helper_js__WEBPACK_IMPORTED_MODULE_1__.createVideo)(itemLink, videoLink.getAttribute('href'), CLASSES.itemMedia, {
    muted: true,
    autoplay: true,
    loop: true,
    playsinline: true,
    tabindex: 0,
  });

  videoLink.remove();

  movePlayButton(itemLink, item);
};

const decorateMedia = (item, itemImage) => {
  const itemLink = item.querySelector(`.${CLASSES.itemLinkClass}`);

  if (itemImage) {
    decorateImage(itemLink, itemImage);
  } else {
    decorateVideo(itemLink, item);
  }
};

const removeInnerLink = (link) => {
  const text = link.parentElement;
  const linkText = link.innerHTML;

  text.innerHTML = linkText;
};

const decorateNewItemContainer = (item, itemContainer, innerLink) => {
  const { href, title } = innerLink;
  const newItemContainer = (0,_scripts_common_js__WEBPACK_IMPORTED_MODULE_0__.createElement)('a', {
    classes: CLASSES.itemLinkClass,
    props: { href, title, tabindex: -1 },
  });
  const itemContent = (0,_scripts_common_js__WEBPACK_IMPORTED_MODULE_0__.createElement)('div', {
    classes: CLASSES.itemContent,
  });
  const itemCategoryTitleContainer = getItemCategoryTitleContainer(item);
  const itemTitleContainer = getItemTitleContainer(item);

  removeInnerLink(innerLink);
  item.classList.add(CLASSES.itemContainer);
  (0,_scripts_common_js__WEBPACK_IMPORTED_MODULE_0__.clearElementAttributes)(itemTitleContainer)
    .classList.add(CLASSES.itemTitle);
  (0,_scripts_common_js__WEBPACK_IMPORTED_MODULE_0__.clearElementAttributes)(itemCategoryTitleContainer)
    .classList.add(CLASSES.itemCategoryTitle);

  itemTitleContainer.append(arrowButtonElement());

  itemContent.append(itemCategoryTitleContainer);
  itemContent.append(itemTitleContainer);

  newItemContainer.innerHTML = itemContainer.innerHTML;
  newItemContainer.prepend(itemContent);
  itemContainer.remove();
  item.append(newItemContainer);
};

const decorateCollageItems = (items) => {
  items.forEach((item) => {
    const itemContainer = item.firstElementChild;
    const itemLink = getItemLink(item);

    decorateNewItemContainer(item, itemContainer, itemLink);
    decorateMedia(item, item.querySelector('picture'));
  });
};

function decorate(block) {
  const blockWrapper = block.parentElement;
  const collageItemContainers = block.querySelectorAll(':scope > div');

  blockWrapper.classList.add('full-width');

  decorateCollageItems([...collageItemContainers]);
  (0,_scripts_common_js__WEBPACK_IMPORTED_MODULE_0__.decorateIcons)(block);
}

__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ })

},
/******/ __webpack_require__ => { // webpackRuntimeModules
/******/ var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
/******/ var __webpack_exports__ = (__webpack_exec__("./blocks/v2-category-collage/v2-category-collage.js"));
/******/ }
]);