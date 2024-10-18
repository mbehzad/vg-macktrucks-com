"use strict";
(self["webpackChunk_adobe_helix_project_boilerplate"] = self["webpackChunk_adobe_helix_project_boilerplate"] || []).push([["v2-image-banner"],{

/***/ "./blocks/v2-image-banner/v2-image-banner.js":
/*!***************************************************!*\
  !*** ./blocks/v2-image-banner/v2-image-banner.js ***!
  \***************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ decorate)
/* harmony export */ });
/* harmony import */ var _scripts_common_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../scripts/common.js */ "./scripts/common.js");
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([_scripts_common_js__WEBPACK_IMPORTED_MODULE_0__]);
_scripts_common_js__WEBPACK_IMPORTED_MODULE_0__ = (__webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__)[0];


const variantClasses = ['16-9', '4-3'];
const blockName = 'v2-image-banner';

/**
 * Finds the matching source element based on the media query.
 * @param {HTMLElement} picture - The picture element containing the sources.
 * @returns {HTMLElement|null} The matching source element or null if none found.
 */
const findMatchingSource = (picture) => {
  const sources = Array.from(picture.querySelectorAll('source'));
  return sources.find((source) => {
    const media = source.getAttribute('media');
    return !media || window.matchMedia(media).matches;
  });
};

/**
 * Retrieves the image source URL from a block element.
 * @param {HTMLElement} block - The block element containing the picture.
 * @returns {string} The image source URL.
 */
const getImgSrc = (block) => {
  const picture = block.querySelector('picture');
  if (!picture) return '';

  const matchingSource = findMatchingSource(picture);
  if (matchingSource) {
    return matchingSource.getAttribute('srcset');
  }

  const img = picture.querySelector('img');
  return img ? img.getAttribute('src') : '';
};

/**
 * Sets the background image of a block element.
 * @param {HTMLElement} block - The block element to set the background image for.
 * @param {string} imgSrc - The image source URL.
 */
const setImgSrc = (block, imgSrc) => {
  block.style.backgroundImage = `url(${imgSrc})`;
};

/**
 * Updates the image source if the media query has changed.
 * @param {HTMLElement} block - The block element to update.
 * @param {string} currentMediaQuery - The current media query.
 * @returns {string} The new media query.
 */
const updateImageSrc = (block, currentMediaQuery) => {
  const picture = block.querySelector('picture');
  if (!picture) return currentMediaQuery;

  const matchingSource = findMatchingSource(picture);
  const newMediaQuery = matchingSource ? matchingSource.getAttribute('media') : '';
  if (newMediaQuery !== currentMediaQuery) {
    const newImgSrc = matchingSource ? matchingSource.getAttribute('srcset') : picture.querySelector('img').getAttribute('src');
    setImgSrc(block, newImgSrc);
    return newMediaQuery;
  }

  return currentMediaQuery;
};

/**
 * Initializes a ResizeObserver to update the background image URL based on the block's size.
 * @param {HTMLElement} block - The block element to observe.
 */
const initResizeObserver = (block) => {
  let currentMediaQuery = '';

  const debouncedUpdateImageSrc = (0,_scripts_common_js__WEBPACK_IMPORTED_MODULE_0__.debounce)(() => {
    currentMediaQuery = updateImageSrc(block, currentMediaQuery);
  }, 100);

  const resizeObserver = new ResizeObserver(debouncedUpdateImageSrc);
  resizeObserver.observe(block);
};

/**
 * Decorates the block element with the appropriate classes and background image.
 * @param {HTMLElement} block - The block element to decorate.
 */
async function decorate(block) {
  (0,_scripts_common_js__WEBPACK_IMPORTED_MODULE_0__.variantsClassesToBEM)(block.classList, variantClasses, blockName);
  block.parentElement.classList.add('full-width');

  const imgSrc = getImgSrc(block);
  if (imgSrc) {
    setImgSrc(block, imgSrc);
  }

  initResizeObserver(block);
  (0,_scripts_common_js__WEBPACK_IMPORTED_MODULE_0__.unwrapDivs)(block);
}

__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ })

},
/******/ __webpack_require__ => { // webpackRuntimeModules
/******/ var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
/******/ var __webpack_exports__ = (__webpack_exec__("./blocks/v2-image-banner/v2-image-banner.js"));
/******/ }
]);