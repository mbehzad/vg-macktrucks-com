"use strict";
(self["webpackChunk_adobe_helix_project_boilerplate"] = self["webpackChunk_adobe_helix_project_boilerplate"] || []).push([["v2-embed"],{

/***/ "./blocks/v2-embed/v2-embed.js":
/*!*************************************!*\
  !*** ./blocks/v2-embed/v2-embed.js ***!
  \*************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ decorate)
/* harmony export */ });
/* harmony import */ var _scripts_video_helper_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../scripts/video-helper.js */ "./scripts/video-helper.js");
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([_scripts_video_helper_js__WEBPACK_IMPORTED_MODULE_0__]);
_scripts_video_helper_js__WEBPACK_IMPORTED_MODULE_0__ = (__webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__)[0];


const blockName = 'v2-embed';
const videoEventManager = new _scripts_video_helper_js__WEBPACK_IMPORTED_MODULE_0__.VideoEventManager();

class VideoComponent {
  constructor(videoId) {
    this.videoId = videoId;

    videoEventManager.register(
      this.videoId,
      blockName,
      (event) => (0,_scripts_video_helper_js__WEBPACK_IMPORTED_MODULE_0__.handleVideoMessage)(event, this.videoId, blockName),
    );
  }

  unregister() {
    videoEventManager.unregister(this.videoId, blockName);
  }
}

const extractAspectRatio = (block) => {
  const aspectRatioRegex = /aspect-ratio-(\d+)-(\d+)/;
  const aspectRatioClass = Array.from(block.classList)
    .find((className) => aspectRatioRegex.test(className));

  if (!aspectRatioClass) {
    return null;
  }

  const match = aspectRatioClass.match(aspectRatioRegex);
  if (match) {
    return {
      width: parseInt(match[1], 10),
      height: parseInt(match[2], 10),
    };
  }

  return null;
};

const retrieveVideoConfig = (block, aspectRatio) => ({
  ...(aspectRatio ? { aspectRatio: `${aspectRatio.width}:${aspectRatio.height}` } : {}),
  ...(block.querySelector('img')?.getAttribute('src')
    ? { poster: new URL(block.querySelector('img').getAttribute('src'), window.location.href).href }
    : {}),
  autoplay: block.classList.contains('autoplay') ? 'any' : false,
  muted: block.classList.contains('autoplay'),
  loop: block.classList.contains('loop'),
  controls: !block.classList.contains('disable-controls'),
  disablePictureInPicture: block.classList.contains('disable-picture-in-picture'),
  language: document.documentElement.lang,
});

const configureVideo = (block, videoId) => {
  const config = retrieveVideoConfig(block);
  Object.entries(config).forEach(([key, value]) => {
    if (value !== undefined) {
      (0,_scripts_video_helper_js__WEBPACK_IMPORTED_MODULE_0__.addVideoConfig)(videoId, { [key]: value });
    }
  });
};

function decorate(block) {
  const linkElement = block.querySelector('a');
  const link = linkElement?.getAttribute('href');
  const title = linkElement?.textContent;
  const match = link?.match(_scripts_video_helper_js__WEBPACK_IMPORTED_MODULE_0__.AEM_ASSETS.videoIdRegex);

  if (!link) {
    // eslint-disable-next-line no-console
    console.warn(`[${blockName}]: There is no video link`);
    return;
  }

  if (!match) {
    // eslint-disable-next-line no-console
    console.warn(`[${blockName}]: Video link is incorrect: ${link}`);
    return;
  }

  const [videoId] = match;
  block.videoId = videoId;

  const aspectRatio = extractAspectRatio(block);
  if (aspectRatio) {
    block.style.setProperty('--video-aspect-ratio', `${aspectRatio.width}/${aspectRatio.height}`);
  }

  const videoConfig = retrieveVideoConfig(block, aspectRatio);
  const videoProps = {
    ...videoConfig,
    title,
  };

  configureVideo(block, videoId);

  // eslint-disable-next-line no-unused-vars
  const embedVideoComponent = new VideoComponent(block.videoId);
  const videoElement = (0,_scripts_video_helper_js__WEBPACK_IMPORTED_MODULE_0__.createVideo)(block, link, `${blockName}__frame`, videoProps, false, videoId);

  block.innerHTML = '';
  block.append(videoElement);
}

__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ })

},
/******/ __webpack_require__ => { // webpackRuntimeModules
/******/ var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
/******/ var __webpack_exports__ = (__webpack_exec__("./blocks/v2-embed/v2-embed.js"));
/******/ }
]);