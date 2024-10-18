"use strict";
(self["webpackChunk_adobe_helix_project_boilerplate"] = self["webpackChunk_adobe_helix_project_boilerplate"] || []).push([["v2-testimonial"],{

/***/ "./blocks/v2-testimonial/v2-testimonial.js":
/*!*************************************************!*\
  !*** ./blocks/v2-testimonial/v2-testimonial.js ***!
  \*************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ decorate)
/* harmony export */ });
/* harmony import */ var _scripts_video_helper_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../scripts/video-helper.js */ "./scripts/video-helper.js");
/* harmony import */ var _scripts_common_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../scripts/common.js */ "./scripts/common.js");
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([_scripts_video_helper_js__WEBPACK_IMPORTED_MODULE_0__, _scripts_common_js__WEBPACK_IMPORTED_MODULE_1__]);
([_scripts_video_helper_js__WEBPACK_IMPORTED_MODULE_0__, _scripts_common_js__WEBPACK_IMPORTED_MODULE_1__] = __webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__);



const blockName = 'v2-testimonial';
const variantClasses = ['media-left', 'media-right', 'overlap'];

const handleVideoLinks = (videoLinks) => {
  const selectedVideo = (0,_scripts_video_helper_js__WEBPACK_IMPORTED_MODULE_0__.selectVideoLink)(videoLinks);

  videoLinks.forEach((link) => {
    if (link !== selectedVideo) {
      link.parentElement.remove();
    }
  });

  if (selectedVideo) {
    selectedVideo.classList.add(`${blockName}__video-link`);
    return;
  }

  // eslint-disable-next-line no-console
  console.warn(`[${blockName}]: No proper video link provided for current cookie settings!`);
};

const createVideoSection = (col) => {
  const videoLinks = [...col.querySelectorAll('a')].filter(_scripts_video_helper_js__WEBPACK_IMPORTED_MODULE_0__.isVideoLink);

  if (videoLinks.length === 0) {
    return;
  }

  handleVideoLinks(videoLinks);
  const videoSection = col.querySelector('p');
  videoSection.classList.add(`${blockName}__video-section`);
  videoSection.setAttribute('data-theme', 'gold');
  videoSection.append(col.querySelector(`.${blockName}__video-link`));
};

const handleBlockquotes = (block, firstHeading) => {
  let blockquotes = block.querySelectorAll('blockquote');
  if (blockquotes.length === 0) {
    // eslint-disable-next-line no-console
    console.warn(`[${blockName}]: No blockquote found in the column! Will try to create a blockquote from the text.`);

    const blockquoteCol = block.querySelector(`.${blockName}__blockquote-container`);
    const paragraphs = blockquoteCol.querySelectorAll('p:only-child, p:not(:last-child)');

    if (paragraphs.length === 0) {
      // eslint-disable-next-line no-console
      console.error(`[${blockName}]: No paragraphs found in the column!`);
      return;
    }

    const blockquote = document.createElement('blockquote');

    paragraphs.forEach((p) => {
      blockquote.append(p);
    });

    firstHeading.insertAdjacentElement('afterend', blockquote);
  }
  blockquotes = block.querySelectorAll('blockquote');
  blockquotes.forEach((bq) => {
    const em = bq.querySelector('em');

    if (em) {
      em.outerHTML = em.innerHTML;
    }

    bq.classList.add(`${blockName}__blockquote`);
  });
};

async function decorate(block) {
  (0,_scripts_common_js__WEBPACK_IMPORTED_MODULE_1__.variantsClassesToBEM)(block.classList, variantClasses, blockName);
  block.parentElement.classList.add('full-width');

  const columns = block.querySelectorAll(':scope > div > div');
  const headings = block.querySelectorAll('h1, h2, h3, h4, h5, h6');
  const firstHeading = headings[0];

  columns.forEach((col) => {
    if (col.contains(firstHeading)) {
      col.parentElement.classList.add(`${blockName}__column`, `${blockName}__column--text`);
      col.classList.add(`${blockName}__blockquote-container`);
      headings.forEach((h) => {
        h.classList.add(`${blockName}__heading`);
      });
      firstHeading.classList.add('with-marker');
    }

    const images = [...col.querySelectorAll('img')];
    images.forEach((img) => {
      img.classList.add(`${blockName}__image`);
      img.parentElement.classList.add(`${blockName}__column`, `${blockName}__column--media`);
    });

    createVideoSection(col);
  });

  handleBlockquotes(block, firstHeading);
  (0,_scripts_common_js__WEBPACK_IMPORTED_MODULE_1__.unwrapDivs)(block, { ignoreDataAlign: true });
  (0,_scripts_common_js__WEBPACK_IMPORTED_MODULE_1__.removeEmptyTags)(block);
}

__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ })

},
/******/ __webpack_require__ => { // webpackRuntimeModules
/******/ var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
/******/ var __webpack_exports__ = (__webpack_exec__("./blocks/v2-testimonial/v2-testimonial.js"));
/******/ }
]);