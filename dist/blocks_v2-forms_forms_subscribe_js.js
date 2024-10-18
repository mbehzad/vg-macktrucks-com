"use strict";
(self["webpackChunk_adobe_helix_project_boilerplate"] = self["webpackChunk_adobe_helix_project_boilerplate"] || []).push([["blocks_v2-forms_forms_subscribe_js"],{

/***/ "./blocks/v2-forms/forms/subscribe.js":
/*!********************************************!*\
  !*** ./blocks/v2-forms/forms/subscribe.js ***!
  \********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _scripts_aem_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../scripts/aem.js */ "./scripts/aem.js");


const formContent = `
<div class="v2-forms__fields-container">
  <span class="v2-forms__input-fields">
    <input
      class="email-input"
      name="email"
      placeholder=""
      type="email"
      inputmode="email"
      autocomplete="off"
      autocapitalize="off"
      autocorrect="off"
      spellcheck="false"
      maxlength="254"
      required
    />
    <input type="hidden" id="form-locale" name="form-locale" value="${(0,_scripts_aem_js__WEBPACK_IMPORTED_MODULE_0__.getMetadata)('locale')}" />
    <button class="submit-button" type="submit" aria-label=""></button>
  </span>
  <span class="v2-forms__validation-message">
      This field is required
  </span>
</div>
`;

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (formContent);


/***/ })

}]);