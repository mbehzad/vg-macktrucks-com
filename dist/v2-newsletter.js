"use strict";
(self["webpackChunk_adobe_helix_project_boilerplate"] = self["webpackChunk_adobe_helix_project_boilerplate"] || []).push([["v2-newsletter"],{

/***/ "./blocks/v2-newsletter/v2-newsletter.js":
/*!***********************************************!*\
  !*** ./blocks/v2-newsletter/v2-newsletter.js ***!
  \***********************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ decorate),
/* harmony export */   logResults: () => (/* binding */ logResults)
/* harmony export */ });
/* harmony import */ var _scripts_aem_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../scripts/aem.js */ "./scripts/aem.js");
/* harmony import */ var _scripts_common_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../scripts/common.js */ "./scripts/common.js");
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([_scripts_common_js__WEBPACK_IMPORTED_MODULE_1__]);
_scripts_common_js__WEBPACK_IMPORTED_MODULE_1__ = (__webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__)[0];



const blockName = 'v2-newsletter';
const logResults = {
  success: 'success',
  error: 'error',
};
let thanksMessageEl;
let errorMessageEl;

//* init response handling *
async function handleSubmissionResult(isSuccess) {
  const form = document.querySelector('form[data-submitting=true]');
  const message = isSuccess ? thanksMessageEl : errorMessageEl;
  message.className = `${blockName}__message`;

  if (isSuccess) {
    (0,_scripts_aem_js__WEBPACK_IMPORTED_MODULE_0__.sampleRUM)('form:submit');
  }

  form.setAttribute('data-submitting', 'false');
  form.replaceWith(message);
}
//* end response handling *

window.logResult = function logResult(json) {
  handleSubmissionResult(json.result === logResults.success);
};

async function decorate(block) {
  const formLink = block.firstElementChild.innerText.trim();
  const thanksEl = block.firstElementChild.nextElementSibling.firstElementChild;
  const errorEl = block.lastElementChild.firstElementChild;

  const container = (0,_scripts_common_js__WEBPACK_IMPORTED_MODULE_1__.createElement)('div', { classes: `${blockName}__container` });

  thanksMessageEl = thanksEl.cloneNode(true);
  errorMessageEl = errorEl.cloneNode(true);
  thanksEl.remove();
  errorEl.remove();

  const form = document.createRange().createContextualFragment(`
    <div class="v2-forms block" data-block-name="v2-forms" data-block-status="">
      <div>
        <div>subscribe</div>
      </div>
      <div>
        <div>${formLink}</div>
      </div>
    </div>`);

  container.append(...form.children);
  block.replaceWith(container);

  await (0,_scripts_aem_js__WEBPACK_IMPORTED_MODULE_0__.loadBlock)(container.querySelector('.v2-forms'));
}

__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ })

},
/******/ __webpack_require__ => { // webpackRuntimeModules
/******/ var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
/******/ var __webpack_exports__ = (__webpack_exec__("./blocks/v2-newsletter/v2-newsletter.js"));
/******/ }
]);