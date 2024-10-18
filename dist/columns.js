"use strict";
(self["webpackChunk_adobe_helix_project_boilerplate"] = self["webpackChunk_adobe_helix_project_boilerplate"] || []).push([["columns"],{

/***/ "./blocks/columns/columns.js":
/*!***********************************!*\
  !*** ./blocks/columns/columns.js ***!
  \***********************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ decorate)
/* harmony export */ });
/* harmony import */ var _scripts_video_helper_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../scripts/video-helper.js */ "./scripts/video-helper.js");
/* harmony import */ var _scripts_common_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../scripts/common.js */ "./scripts/common.js");
/* harmony import */ var _scripts_scripts_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../scripts/scripts.js */ "./scripts/scripts.js");
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([_scripts_video_helper_js__WEBPACK_IMPORTED_MODULE_0__, _scripts_common_js__WEBPACK_IMPORTED_MODULE_1__, _scripts_scripts_js__WEBPACK_IMPORTED_MODULE_2__]);
([_scripts_video_helper_js__WEBPACK_IMPORTED_MODULE_0__, _scripts_common_js__WEBPACK_IMPORTED_MODULE_1__, _scripts_scripts_js__WEBPACK_IMPORTED_MODULE_2__] = __webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__);




const decorateUnderline = (col) => {
  const hr = (0,_scripts_common_js__WEBPACK_IMPORTED_MODULE_1__.createElement)('hr', { classes: 'column-underline' });
  const u = col.querySelector('u');
  if (!u) {
    const strong = col.firstElementChild.querySelector('strong');
    if (strong) strong.parentElement.appendChild(hr);
    return;
  }
  const uText = u.textContent;
  const p = u.closest('p');
  u.parentElement.textContent = uText;
  p.appendChild(hr);
};

const removeEmptyPs = (pictureWrapper) => {
  const Ps = pictureWrapper.querySelectorAll('p');
  [...Ps].forEach((p) => {
    if (p.children.length === 0) p.remove();
  });
};

const videoHandling = (blockEl) => {
  const pictureWrapper = (0,_scripts_scripts_js__WEBPACK_IMPORTED_MODULE_2__.getAllElWithChildren)(blockEl.querySelectorAll(':scope > div > div'), 'picture')[0];
  const picture = pictureWrapper && pictureWrapper.querySelector('picture');
  const links = pictureWrapper && pictureWrapper.querySelectorAll('a');

  if (!picture || !links.length) {
    return;
  }

  const videoLinks = [...links].filter((link) => (0,_scripts_video_helper_js__WEBPACK_IMPORTED_MODULE_0__.isVideoLink)(link));
  const selectedVideoLink = (0,_scripts_video_helper_js__WEBPACK_IMPORTED_MODULE_0__.selectVideoLink)(videoLinks);

  if (selectedVideoLink) {
    videoLinks
      .filter((videoLink) => videoLink.getAttribute('href') !== selectedVideoLink.getAttribute('href'))
      .forEach((link) => link.remove());
    (0,_scripts_video_helper_js__WEBPACK_IMPORTED_MODULE_0__.wrapImageWithVideoLink)(selectedVideoLink, picture);
    (0,_scripts_video_helper_js__WEBPACK_IMPORTED_MODULE_0__.addVideoShowHandler)(selectedVideoLink);
    selectedVideoLink.parentElement.replaceChildren(selectedVideoLink);
    removeEmptyPs(pictureWrapper);
  }
};

function decorate(block) {
  const cols = [...block.firstElementChild.children];
  block.classList.add(`columns-${cols.length}-cols`);
  const isInfo = block.classList.contains('info');
  const isPromo = block.classList.contains('promo');
  if (isInfo) {
    const hasAbsolute = block.classList.contains('absolute');
    if (hasAbsolute) block.closest('.columns-wrapper').classList.add('info', 'absolute');
    cols.forEach((col) => {
      col.className = 'columns-col-wrapper';
      decorateUnderline(col);
    });
  }
  if (isPromo) {
    const parent = block.querySelectorAll(':scope > div > div');
    const textParent = (0,_scripts_scripts_js__WEBPACK_IMPORTED_MODULE_2__.getAllElWithChildren)(parent, 'picture', true)[0];
    const pictureParent = (0,_scripts_scripts_js__WEBPACK_IMPORTED_MODULE_2__.getAllElWithChildren)(parent, 'picture')[0];
    const imgLeft = parent[0].querySelector('picture');
    textParent.className = 'columns-promo-text-wrapper';
    if (pictureParent) pictureParent.className = 'columns-promo-picture-wrapper';
    if (imgLeft) textParent.classList.add('columns-promo-img-left');
  }

  videoHandling(block);
}

__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ })

},
/******/ __webpack_require__ => { // webpackRuntimeModules
/******/ var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
/******/ var __webpack_exports__ = (__webpack_exec__("./blocks/columns/columns.js"));
/******/ }
]);