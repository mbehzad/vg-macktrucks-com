(self["webpackChunk_adobe_helix_project_boilerplate"] = self["webpackChunk_adobe_helix_project_boilerplate"] || []).push([["v2-forms"],{

/***/ "./blocks/v2-forms/forms lazy recursive ^\\.\\/.*\\.js$":
/*!*******************************************************************!*\
  !*** ./blocks/v2-forms/forms/ lazy ^\.\/.*\.js$ namespace object ***!
  \*******************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var map = {
	"./subscribe.js": [
		"./blocks/v2-forms/forms/subscribe.js",
		"blocks_v2-forms_forms_subscribe_js"
	]
};
function webpackAsyncContext(req) {
	if(!__webpack_require__.o(map, req)) {
		return Promise.resolve().then(() => {
			var e = new Error("Cannot find module '" + req + "'");
			e.code = 'MODULE_NOT_FOUND';
			throw e;
		});
	}

	var ids = map[req], id = ids[0];
	return __webpack_require__.e(ids[1]).then(() => {
		return __webpack_require__(id);
	});
}
webpackAsyncContext.keys = () => (Object.keys(map));
webpackAsyncContext.id = "./blocks/v2-forms/forms lazy recursive ^\\.\\/.*\\.js$";
module.exports = webpackAsyncContext;

/***/ }),

/***/ "./blocks/v2-forms/v2-forms.js":
/*!*************************************!*\
  !*** ./blocks/v2-forms/v2-forms.js ***!
  \*************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ decorate)
/* harmony export */ });
/* harmony import */ var _scripts_aem_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../scripts/aem.js */ "./scripts/aem.js");
/* harmony import */ var _scripts_common_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../scripts/common.js */ "./scripts/common.js");
/* harmony import */ var _v2_newsletter_v2_newsletter_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../v2-newsletter/v2-newsletter.js */ "./blocks/v2-newsletter/v2-newsletter.js");
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([_scripts_common_js__WEBPACK_IMPORTED_MODULE_1__, _v2_newsletter_v2_newsletter_js__WEBPACK_IMPORTED_MODULE_2__]);
([_scripts_common_js__WEBPACK_IMPORTED_MODULE_1__, _v2_newsletter_v2_newsletter_js__WEBPACK_IMPORTED_MODULE_2__] = __webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__);




// cache contains the form element that should be reused
const formCache = new Map();
const blockName = 'v2-forms';

function serialize(obj) {
  const str = Object.keys(obj).map((key) => `${encodeURIComponent(key)}=${encodeURIComponent(obj[key])}`);
  return str.join('&');
}

function constructPayload(form) {
  const payload = {};
  [...form.elements].forEach((fe) => {
    if (!fe.name) return;
    if (fe.type === 'radio' && fe.checked) {
      payload[fe.name] = fe.value;
    } else if (fe.type === 'checkbox' && fe.checked) {
      payload[fe.name] = payload[fe.name] ? `${payload[fe.name]},${fe.value}` : fe.value;
    } else if (fe.type !== 'file') {
      payload[fe.name] = fe.value;
    }
  });
  payload.callback = 'logResult';
  return { payload };
}

async function prepareRequest(form) {
  const { payload } = constructPayload(form);
  const url = form.dataset.action;

  const serializedData = serialize(payload);

  return (0,_scripts_aem_js__WEBPACK_IMPORTED_MODULE_0__.loadScript)(`${url}?${serializedData}`, { type: 'text/javascript', charset: 'UTF-8' });
}

async function handleSubmit(form) {
  if (form.getAttribute('data-submitting') !== 'true') {
    form.setAttribute('data-submitting', 'true');
    try {
      await prepareRequest(form);
    } catch (error) {
      window.logResult({ result: _v2_newsletter_v2_newsletter_js__WEBPACK_IMPORTED_MODULE_2__.logResults.success, log: error });
    }
  }
}

const addForm = async (block) => {
  const displayValue = block.style.display;
  block.style.display = 'none';

  const formName = block.firstElementChild.innerText.trim();
  const formAction = block.firstElementChild.nextElementSibling.innerText.trim();

  const formContent = await __webpack_require__("./blocks/v2-forms/forms lazy recursive ^\\.\\/.*\\.js$")(`./${formName}.js`);

  const form = `
    <form
      method="post"
      name="form-${formName}"
      action="${formAction}"
    >${formContent.default}

      <div style="position:absolute; left:-9999px; top: -9999px;" aria-hidden="true">
        <label for="pardot_extra_field">Comments</label>
        <input type="text" id="pardot_extra_field" name="pardot_extra_field" />
      </div>
    </form>
  `;

  if (formCache.get(formName)) {
    const cachedForm = formCache.get(formName);
    block.replaceWith(cachedForm);
    block.style.display = displayValue;
    return;
  }

  const formWrapper = (0,_scripts_common_js__WEBPACK_IMPORTED_MODULE_1__.createElement)('div', { classes: `${blockName}__container` });
  formWrapper.innerHTML = form;
  block.replaceWith(formWrapper);
  formCache.set(formName, formWrapper);

  block.style.display = displayValue;

  const formObj = document.querySelector('form');

  formObj.addEventListener('submit', (e) => {
    if (formContent.onSubmit) {
      e.preventDefault();
      formObj.dataset.action = e.currentTarget.action;
      formContent.onSubmit(formObj, handleSubmit);
    }

    e.preventDefault();
    let isValid = true;
    if (formObj.hasAttribute('novalidate')) {
      isValid = formObj.checkValidity();
    }
    if (isValid) {
      e.submitter.setAttribute('disabled', '');
      formObj.dataset.action = e.currentTarget.action;

      handleSubmit(formObj);
    }
  });

  formContent.postLoad?.(formObj);
};

async function decorate(block) {
  const observer = new IntersectionObserver((entries) => {
    if (entries.some((e) => e.isIntersecting)) {
      observer.disconnect();
      addForm(block);
    }
  }, {
    rootMargin: '300px',
  });
  observer.observe(block);
}

__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ }),

/***/ "./blocks/v2-newsletter/v2-newsletter.js":
/*!***********************************************!*\
  !*** ./blocks/v2-newsletter/v2-newsletter.js ***!
  \***********************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
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
/******/ var __webpack_exports__ = (__webpack_exec__("./blocks/v2-forms/v2-forms.js"));
/******/ }
]);