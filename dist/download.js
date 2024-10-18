"use strict";
(self["webpackChunk_adobe_helix_project_boilerplate"] = self["webpackChunk_adobe_helix_project_boilerplate"] || []).push([["download"],{

/***/ "./blocks/download/download.js":
/*!*************************************!*\
  !*** ./blocks/download/download.js ***!
  \*************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ decorate)
/* harmony export */ });
/* harmony import */ var _scripts_common_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../scripts/common.js */ "./scripts/common.js");
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([_scripts_common_js__WEBPACK_IMPORTED_MODULE_0__]);
_scripts_common_js__WEBPACK_IMPORTED_MODULE_0__ = (__webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__)[0];


const buildRegularDownloadBlock = (block) => {
  const children = [...block.children];

  const downloadList = (0,_scripts_common_js__WEBPACK_IMPORTED_MODULE_0__.createElement)('ul', { classes: 'download-list' });

  children.forEach((e, idx) => {
    const downloadItem = (0,_scripts_common_js__WEBPACK_IMPORTED_MODULE_0__.createElement)('li', { classes: ['download-item', `download-item-${idx + 1}`] });

    const image = e.querySelector('picture').innerHTML;

    const allTexts = e.querySelectorAll('p');

    const titleElement = allTexts[0].querySelector('a');
    const title = titleElement.getAttribute('title');
    const titleUrl = titleElement.getAttribute('href');

    const textContent = allTexts[1].innerHTML;

    const linkElement = allTexts[2].querySelector('a');
    const linkText = linkElement.getAttribute('title');
    const linkUrl = linkElement.getAttribute('href');

    const fileExtension = linkUrl.split('.').pop();
    const fileRoute = fileExtension === 'xlsm' ? `${window.hlx.codeBasePath}/files/${linkUrl.slice(7)}` : linkUrl;

    downloadItem.innerHTML = `
    <div class='download-card'>
      <div class='download-image'>
        <picture>
          ${image}
        </picture>
      </div>
      <div class='download-texts'>
        <a href='${titleUrl}' class='download-texts-title'>
          ${title}
        </a>
        <p class='download-texts-text'>
          ${textContent}
        </p>
        <a href='${fileRoute}' class='download-texts-link' target='_blank' title='${linkText}'>
          ${linkText}
        </a>
      </div>
    </div>`;
    downloadList.append(downloadItem);
  });
  block.textContent = '';
  block.append(downloadList);
};

const buildNewDownloadBlock = (block) => {
  const children = [...block.children];
  const downloadNewList = (0,_scripts_common_js__WEBPACK_IMPORTED_MODULE_0__.createElement)('ul', { classes: 'download-new-list' });

  children.forEach((e, idx) => {
    const downloadItem = (0,_scripts_common_js__WEBPACK_IMPORTED_MODULE_0__.createElement)('li', { classes: ['download-new-item', `download-new-item-${idx + 1}`] });
    const allTexts = e.querySelectorAll('li');
    const linkUrl = e.querySelector('a').getAttribute('href');

    const fileExtension = linkUrl.split('.').pop();
    const fileRoute = fileExtension === 'xlsm' ? `${window.hlx.codeBasePath}/files/${linkUrl.slice(7)}` : linkUrl;

    const newCondition = e.children[1].innerText.toUpperCase();
    const number = allTexts[1].innerText;
    const title = allTexts[2].innerText;
    const subTitle = allTexts[3].innerText;

    downloadItem.innerHTML = `
    <a href="${fileRoute}" target="_blank" class='download-new-link' title='${title}'>
        <div class='download-new-texts'>
          <p>
            ${number}. ${title}
          </p>
          <small>
            ${subTitle}
          </small>
        </div>
    ${newCondition.length === 0 ? ''
    : `<div class='download-new-label'>
      ${newCondition}
    </div>`}
    </a>`;
    downloadNewList.append(downloadItem);
  });

  block.textContent = '';
  block.append(downloadNewList);
};

function decorate(block) {
  const typeDetector = [...block.classList];

  // This detects what block needs to be render and calls the corresponding function.
  if (!typeDetector.includes('new')) {
    buildRegularDownloadBlock(block);
  } else if (typeDetector.includes('new')) {
    buildNewDownloadBlock(block);
  }
}

__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ })

},
/******/ __webpack_require__ => { // webpackRuntimeModules
/******/ var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
/******/ var __webpack_exports__ = (__webpack_exec__("./blocks/download/download.js"));
/******/ }
]);