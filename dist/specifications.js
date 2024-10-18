"use strict";
(self["webpackChunk_adobe_helix_project_boilerplate"] = self["webpackChunk_adobe_helix_project_boilerplate"] || []).push([["specifications"],{

/***/ "./blocks/specifications/specifications.js":
/*!*************************************************!*\
  !*** ./blocks/specifications/specifications.js ***!
  \*************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ decorate)
/* harmony export */ });
/* harmony import */ var _scripts_common_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../scripts/common.js */ "./scripts/common.js");
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([_scripts_common_js__WEBPACK_IMPORTED_MODULE_0__]);
_scripts_common_js__WEBPACK_IMPORTED_MODULE_0__ = (__webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__)[0];


const buildLinkAndList = (block) => {
  const specsTitle = block.querySelector('h3');
  const subtitles = block.querySelectorAll('p');
  const uls = block.querySelectorAll('ul');
  const lis = block.querySelectorAll('li');

  lis.forEach((li) => {
    if (li.textContent.length === 0) li.remove();
  });
  uls.forEach((ul) => {
    ul.classList.add('link-and-list');
  });

  const specsSection = (0,_scripts_common_js__WEBPACK_IMPORTED_MODULE_0__.createElement)('div', { classes: 'specs-section' });
  const specsHeading = (0,_scripts_common_js__WEBPACK_IMPORTED_MODULE_0__.createElement)('div', { classes: 'specs-heading' });
  const specsList = (0,_scripts_common_js__WEBPACK_IMPORTED_MODULE_0__.createElement)('ul', { classes: 'specs-list' });

  for (let idx = 0; idx < subtitles.length; idx += 1) {
    const item = (0,_scripts_common_js__WEBPACK_IMPORTED_MODULE_0__.createElement)('li', { classes: ['specs-item', `specs-item-${idx + 1}`] });
    const link = subtitles[idx].querySelector('a');

    if (link) {
      link.classList.remove('button', 'primary');
      link.classList.add('specs-link');
      item.append(link);
    } else {
      item.append(subtitles[idx]);
    }
    item.append(uls[idx]);
    specsList.append(item);
  }
  specsHeading.append(specsTitle);
  specsSection.append(specsHeading, specsList);

  block.textContent = '';
  block.append(specsSection);
};

const buildDefaultSpecs = (block) => {
  const children = [...block.children];
  const ulElements = [...block.querySelectorAll('ul')];

  const specsTitle = children.shift().querySelector('h3');

  const specsSection = (0,_scripts_common_js__WEBPACK_IMPORTED_MODULE_0__.createElement)('div', { classes: 'specs-section' });
  const specsHeading = (0,_scripts_common_js__WEBPACK_IMPORTED_MODULE_0__.createElement)('div', { classes: 'specs-heading' });
  const specsList = (0,_scripts_common_js__WEBPACK_IMPORTED_MODULE_0__.createElement)('ul', { classes: 'specs-list' });

  if (ulElements.length === 1) {
    const liElements = [...ulElements[0].querySelectorAll('li')];

    liElements.forEach((e, idx) => {
      const item = (0,_scripts_common_js__WEBPACK_IMPORTED_MODULE_0__.createElement)('li', { classes: ['specs-item', `specs-item-${idx + 1}`] });
      const text = (0,_scripts_common_js__WEBPACK_IMPORTED_MODULE_0__.createElement)('p', { classes: 'p-element' });
      const isStrong = e.querySelector('strong');
      const link = e.querySelector('a');

      if (link) {
        link.classList.remove('button', 'primary');
        link.classList.add('specs-link');
        item.append(link);
      } else {
        text.append(isStrong ?? e.innerText);
        item.append(text);
      }
      const extraArrowSpan = item.querySelector('span');
      if (extraArrowSpan) extraArrowSpan.remove();
      specsList.append(item);
    });
  } else if (ulElements.length > 1) {
    specsList.classList.add('specs-list-multiple');

    ulElements.forEach((e, idx) => {
      const item = (0,_scripts_common_js__WEBPACK_IMPORTED_MODULE_0__.createElement)('li', { classes: ['specs-item', `specs-item-${idx + 1}`] });

      const subtitle = e.parentNode.querySelector('p');
      subtitle.classList.add('specs-item-subtitle');
      if (idx <= 2) item.append(subtitle);

      const liElements = [...e.querySelectorAll('li')];
      const features = (0,_scripts_common_js__WEBPACK_IMPORTED_MODULE_0__.createElement)('div', { classes: 'feature-list' });

      liElements.forEach((feature) => {
        const text = (0,_scripts_common_js__WEBPACK_IMPORTED_MODULE_0__.createElement)('p', { classes: 'p-element' });
        const isStrong = feature.querySelector('strong');

        text.append(isStrong ?? feature.innerText);
        features.append(text);
      });
      item.append(features);
      specsList.append(item);
    });
  } else {
    children.forEach((e, idx) => {
      const item = (0,_scripts_common_js__WEBPACK_IMPORTED_MODULE_0__.createElement)('li', { classes: ['specs-item', `specs-item-${idx + 1}`, 'specs-item-with-image'] });

      const pElements = [...e.querySelectorAll('p')];
      const picture = e.querySelector('picture');
      const [subtitle, content] = pElements;

      if (!subtitle || !content) {
        const singleText = e.innerText;
        const text = (0,_scripts_common_js__WEBPACK_IMPORTED_MODULE_0__.createElement)('p', { classes: 'single-text' });
        const strongTag = (0,_scripts_common_js__WEBPACK_IMPORTED_MODULE_0__.createElement)('strong', { classes: 'single-text' });
        strongTag.innerText = singleText;
        text.append(strongTag);
        item.append(text);
      } else {
        if (picture) item.append(picture);
        const link = e.querySelector('a');
        if (link) {
          link.classList.remove('button', 'primary');
          link.classList.add('specs-link');
          item.append(subtitle, link);
        } else {
          item.append(subtitle, content);
        }
      }
      specsList.append(item);
    });
  }
  specsHeading.append(specsTitle);
  specsSection.append(specsHeading, specsList);

  block.textContent = '';
  block.append(specsSection);
};

function decorate(block) {
  const typeDetector = [...block.classList];
  if (typeDetector.includes('link-and-list')) {
    buildLinkAndList(block);
  } else {
    buildDefaultSpecs(block);
  }
}

__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ })

},
/******/ __webpack_require__ => { // webpackRuntimeModules
/******/ var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
/******/ var __webpack_exports__ = (__webpack_exec__("./blocks/specifications/specifications.js"));
/******/ }
]);