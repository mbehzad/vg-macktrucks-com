"use strict";
(self["webpackChunk_adobe_helix_project_boilerplate"] = self["webpackChunk_adobe_helix_project_boilerplate"] || []).push([["footer"],{

/***/ "./blocks/footer/footer.js":
/*!*********************************!*\
  !*** ./blocks/footer/footer.js ***!
  \*********************************/
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



const PLACEHOLDERS = {
  subscribe: (0,_scripts_common_js__WEBPACK_IMPORTED_MODULE_1__.getTextLabel)('SUBSCRIBE TO BULLDOG'),
  emailAddress: (0,_scripts_common_js__WEBPACK_IMPORTED_MODULE_1__.getTextLabel)('Email Address'),
};

const addClassToTitle = (block, className) => {
  const headings = block.querySelectorAll('h1, h2, h3, h4, h5, h6');
  [...headings].forEach((h) => h.classList.add(className));
};

const blockNames = {
  blockName: 'footer',
  prefooter: 'prefooter',
  truckList: 'footer-truck-list',
  menu: 'footer-menu',
  newsletter: 'footer-newsletter',
  legal: 'footer-legal',
};

const {
  blockName, prefooter, truckList, menu, newsletter, legal,
} = blockNames;

function addScrollToTopButton(mainEl) {
  const scrollToTopButton = document.createRange().createContextualFragment(`<div class="scroll-to-top-container">
    <a href="#" class="scroll-to-top" title="${(0,_scripts_common_js__WEBPACK_IMPORTED_MODULE_1__.getTextLabel)('go to top')}">
      <span class="icon icon-arrow-right" />
    </a>
  </div>`);

  mainEl.append(scrollToTopButton);
}

function findList(ele) {
  if (ele.classList.contains(truckList)) {
    return ele;
  }
  return findList(ele.parentElement);
}

function toggleExpand(targetH3) {
  const clickedColumn = findList(targetH3);
  const isExpanded = clickedColumn.classList.contains('expand');
  const wrapper = targetH3.closest(`.${truckList}`);
  const content = wrapper.querySelector(`.${truckList}__items`);
  if (wrapper === clickedColumn && !isExpanded) {
    wrapper.classList.add('expand');
    content.style.maxHeight = `${content.scrollHeight}px`;
  } else {
    wrapper.classList.remove('expand');
    content.style.maxHeight = null;
  }
}

async function decorate(block) {
  const cfg = (0,_scripts_aem_js__WEBPACK_IMPORTED_MODULE_0__.readBlockConfig)(block);
  block.textContent = '';

  let footerPath = cfg.footer || '/footer';
  const isCustomFooter = (0,_scripts_aem_js__WEBPACK_IMPORTED_MODULE_0__.getMetadata)('custom-footer');
  const cfgMetadata = (0,_scripts_aem_js__WEBPACK_IMPORTED_MODULE_0__.getMetadata)('cfg-footer');

  if (isCustomFooter) {
    footerPath = isCustomFooter;
    block.classList.add(`${blockName}__custom`);
  }

  if (cfgMetadata) footerPath = cfgMetadata;

  const resp = await fetch(`${footerPath}.plain.html`);
  const html = await resp.text();

  block.innerHTML = html;

  // Pardot form necessary variables
  let observer = null;
  let formFieldsFixed = false;

  addScrollToTopButton(block);


  const onFormLoaded = (mutationList) => {
    for (const mutation of mutationList) {
      if (formFieldsFixed) return;

      if (mutation.type !== 'childList') return;
      const submitButton = block.querySelector('button[type="submit"]');
      const emailInput = block.querySelector('input[name="email"]');
      const pdtForm = block.querySelector(':scope form');

      if (pdtForm) pdtForm.className = 'pardot-form';

      // change the submit button to arrow button
      // and display it sticked to the right side of email input
      if (submitButton && emailInput) {
        emailInput.placeholder = PLACEHOLDERS.emailAddress;
        submitButton.ariaLabel = `${PLACEHOLDERS.subscribe}`;
        formFieldsFixed = true;
        observer.disconnect();
      }
    }
  };

  const pardotForm = block.querySelector('.footer-newsletter');
  if (pardotForm) {
    observer = new MutationObserver(onFormLoaded);
    observer.observe(pardotForm, {
      childList: true,
      attributes: false,
      subtree: true,
    });
  }

  block.addEventListener('click', (e) => {
    if (e.target.classList.contains(`${truckList}__title`)) {
      toggleExpand(e.target);
    }
  });
}


decorate(document.querySelector("footer"));

__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ })

},
/******/ __webpack_require__ => { // webpackRuntimeModules
/******/ var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
/******/ var __webpack_exports__ = (__webpack_exec__("./blocks/footer/footer.js"));
/******/ }
]);