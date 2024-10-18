"use strict";
(self["webpackChunk_adobe_helix_project_boilerplate"] = self["webpackChunk_adobe_helix_project_boilerplate"] || []).push([["hero"],{

/***/ "./blocks/hero/hero.js":
/*!*****************************!*\
  !*** ./blocks/hero/hero.js ***!
  \*****************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ decorate)
/* harmony export */ });
/* harmony import */ var _scripts_common_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../scripts/common.js */ "./scripts/common.js");
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([_scripts_common_js__WEBPACK_IMPORTED_MODULE_0__]);
_scripts_common_js__WEBPACK_IMPORTED_MODULE_0__ = (__webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__)[0];


const decorateVideo = (link) => {
  const { parentElement } = link;
  const video = (0,_scripts_common_js__WEBPACK_IMPORTED_MODULE_0__.createElement)('video', {
    classes: ['hero-video', 'hide'],
    props: {
      loop: 'loop',
    },
  });
  const source = (0,_scripts_common_js__WEBPACK_IMPORTED_MODULE_0__.createElement)('source', { props: { src: link.href, type: 'video/mp4' } });
  video.appendChild(source);
  parentElement.appendChild(video);
  link.remove();
  setTimeout(() => {
    video.classList.remove('hide');
    video.muted = true;
    video.play();
  }, 3000);
};

function decorate(block) {
  const isAutoBlock = block.classList.contains('auto-block');
  if (isAutoBlock) return;
  const contentWrapper = block.querySelector(':scope > div > div');
  const parentContainer = contentWrapper.parentElement;
  // check if it has a video or an image
  const picture = block.querySelector('picture');
  const pictureWrapper = picture.closest('p');
  const video = block.querySelector('a[href*=".mp4"]');
  const videoWrapper = video && video.closest('p');
  const videoLink = videoWrapper?.firstElementChild;
  const contentContainer = (0,_scripts_common_js__WEBPACK_IMPORTED_MODULE_0__.createElement)('div', { classes: 'hero-content-container' });
  const mediaWrapper = (0,_scripts_common_js__WEBPACK_IMPORTED_MODULE_0__.createElement)('div', { classes: 'hero-content-media' });

  // transform link into a video tag
  if (videoLink) decorateVideo(videoLink);

  // move aside all media elements: image, video...
  parentContainer.prepend(mediaWrapper);
  mediaWrapper.appendChild(pictureWrapper);
  if (videoWrapper) mediaWrapper.appendChild(videoWrapper);

  contentContainer.appendChild(contentWrapper);
  parentContainer.appendChild(contentContainer);
  contentContainer.prepend(mediaWrapper);
  contentWrapper.className = 'hero-content-wrapper';
}

__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ })

},
/******/ __webpack_require__ => { // webpackRuntimeModules
/******/ var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
/******/ var __webpack_exports__ = (__webpack_exec__("./blocks/hero/hero.js"));
/******/ }
]);