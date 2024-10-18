"use strict";
(self["webpackChunk_adobe_helix_project_boilerplate"] = self["webpackChunk_adobe_helix_project_boilerplate"] || []).push([["magazine-subscribe"],{

/***/ "./blocks/magazine-subscribe/magazine-subscribe.js":
/*!*********************************************************!*\
  !*** ./blocks/magazine-subscribe/magazine-subscribe.js ***!
  \*********************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ decorate)
/* harmony export */ });
/* harmony import */ var _scripts_aem_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../scripts/aem.js */ "./scripts/aem.js");
/* harmony import */ var _scripts_common_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../scripts/common.js */ "./scripts/common.js");
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([_scripts_common_js__WEBPACK_IMPORTED_MODULE_1__]);
_scripts_common_js__WEBPACK_IMPORTED_MODULE_1__ = (__webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__)[0];



async function decorate(block) {
  const { HREF: href, IFRAME_SIZE } = _scripts_common_js__WEBPACK_IMPORTED_MODULE_1__.MAGAZINE_CONFIGS;
  const content = document.createRange().createContextualFragment(`
    <div class="default-content-wrapper">
      <h2 id="subscribe-to-bulldog-magazine">${(0,_scripts_common_js__WEBPACK_IMPORTED_MODULE_1__.getTextLabel)('form-subscribe-magazine:heading')}</h2>
      <p>${(0,_scripts_common_js__WEBPACK_IMPORTED_MODULE_1__.getTextLabel)('form-subscribe-magazine:text')}</p>
    </div>
  `);

  const iframeLink = (0,_scripts_common_js__WEBPACK_IMPORTED_MODULE_1__.createElement)('a', {
    classes: 'iframe-link',
    props: { href },
  });
  const iframeForm = (0,_scripts_aem_js__WEBPACK_IMPORTED_MODULE_0__.buildBlock)('iframe', { elems: [iframeLink] });

  block.textContent = '';
  block.append(content);
  block.parentElement.classList.add('section', 'center', 'padding-0');
  block.parentElement.setAttribute('data-form-type', 'Subscribe-magazine');
  block.insertAdjacentElement('afterend', iframeForm);
  if (IFRAME_SIZE) iframeForm.classList.add(IFRAME_SIZE);
  (0,_scripts_aem_js__WEBPACK_IMPORTED_MODULE_0__.decorateBlock)(iframeForm);
  (0,_scripts_aem_js__WEBPACK_IMPORTED_MODULE_0__.loadBlock)(iframeForm);
}

__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ })

},
/******/ __webpack_require__ => { // webpackRuntimeModules
/******/ var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
/******/ var __webpack_exports__ = (__webpack_exec__("./blocks/magazine-subscribe/magazine-subscribe.js"));
/******/ }
]);