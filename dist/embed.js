"use strict";
(self["webpackChunk_adobe_helix_project_boilerplate"] = self["webpackChunk_adobe_helix_project_boilerplate"] || []).push([["embed"],{

/***/ "./blocks/embed/embed.js":
/*!*******************************!*\
  !*** ./blocks/embed/embed.js ***!
  \*******************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ decorate)
/* harmony export */ });
/* harmony import */ var _scripts_video_helper_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../scripts/video-helper.js */ "./scripts/video-helper.js");
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([_scripts_video_helper_js__WEBPACK_IMPORTED_MODULE_0__]);
_scripts_video_helper_js__WEBPACK_IMPORTED_MODULE_0__ = (__webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__)[0];


function decorate(block) {
  const { youtube, local, both } = _scripts_video_helper_js__WEBPACK_IMPORTED_MODULE_0__.videoTypes;
  const isAutoplay = block.classList.contains('autoplay');
  const isLoopedVideo = block.classList.contains('loop');
  const isFullWidth = block.classList.contains('full-width');
  const isYoutubeOnly = block.classList.contains('youtube-only');
  const isLocalOnly = block.classList.contains('local-only');
  const isBothOrDefault = block.classList.contains('both') || (!isYoutubeOnly && !isLocalOnly);
  const videoWrapper = document.createElement('div');
  // removing classes to avoid collision with other css
  block.classList.remove('loop', 'autoplay', 'full-width');
  videoWrapper.classList.add('embed-video');

  let videoType;
  if (isBothOrDefault) {
    videoType = both;
  } else if (isYoutubeOnly) {
    videoType = youtube;
  } else if (isLocalOnly) {
    videoType = local;
  }

  const links = block.querySelectorAll('a');
  const selectedLink = (0,_scripts_video_helper_js__WEBPACK_IMPORTED_MODULE_0__.selectVideoLink)(links, isFullWidth ? 'local' : 'auto', videoType);
  const video = document.createElement('video');
  const source = document.createElement('source');

  if (!selectedLink) {
    block.innerHTML = '';
    /* eslint-disable-next-line no-console */
    console.warn('Embed block: There is no video link. Please check if the fallback video link is provided.');
    return;
  }

  const isLowResolutionVideo = (0,_scripts_video_helper_js__WEBPACK_IMPORTED_MODULE_0__.isLowResolutionVideoUrl)(selectedLink.getAttribute('href'));
  const showControls = isLowResolutionVideo && !isFullWidth;

  video.appendChild(source);
  block.innerHTML = '';
  block.appendChild(videoWrapper);

  const loadEmbed = () => {
    if (video.classList.contains('embed-video-loaded') || !selectedLink) {
      return;
    }

    if (isAutoplay) {
      video.autoplay = true;
      // autoplay requires the video to be muted otherwise the autoplay
      // can be block by the browser
      // https://developer.mozilla.org/en-US/docs/Web/Media/Autoplay_guide
      video.muted = true;
    }

    if (isLoopedVideo) {
      video.loop = true;
    }

    video.playsInline = true;
    video.controls = showControls;
    video.classList.add('embed-video-element', 'embed-video-loaded');
    source.setAttribute('src', selectedLink.getAttribute('href'));
    source.setAttribute('type', 'video/mp4');
    videoWrapper.appendChild(video);

    if (isFullWidth) {
      const link = document.createElement('a');
      link.setAttribute('href', (0,_scripts_video_helper_js__WEBPACK_IMPORTED_MODULE_0__.selectVideoLink)(links).getAttribute('href'));
      block.classList.add('embed-full-width');
      (0,_scripts_video_helper_js__WEBPACK_IMPORTED_MODULE_0__.addPlayIcon)(block);

      video.addEventListener('click', () => {
        (0,_scripts_video_helper_js__WEBPACK_IMPORTED_MODULE_0__.showVideoModal)((0,_scripts_video_helper_js__WEBPACK_IMPORTED_MODULE_0__.selectVideoLink)(links).getAttribute('href'));
      });
    }

    if (!isFullWidth && !isLocalOnly) {
      const banner = (0,_scripts_video_helper_js__WEBPACK_IMPORTED_MODULE_0__.createLowResolutionBanner)();
      videoWrapper.prepend(banner);
    }
  };

  const observer = new IntersectionObserver((entries) => {
    if (entries.some((e) => e.isIntersecting)) {
      observer.disconnect();
      if (isLowResolutionVideo) {
        loadEmbed();
      } else {
        (0,_scripts_video_helper_js__WEBPACK_IMPORTED_MODULE_0__.createIframe)(selectedLink.getAttribute('href'), { parentEl: videoWrapper, classes: 'embed-video-element' });
      }
    }
  });
  observer.observe(block);
}

__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ })

},
/******/ __webpack_require__ => { // webpackRuntimeModules
/******/ var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
/******/ var __webpack_exports__ = (__webpack_exec__("./blocks/embed/embed.js"));
/******/ }
]);