"use strict";
(self["webpackChunk_adobe_helix_project_boilerplate"] = self["webpackChunk_adobe_helix_project_boilerplate"] || []).push([["v2-breadcrumb"],{

/***/ "./blocks/v2-breadcrumb/v2-breadcrumb.js":
/*!***********************************************!*\
  !*** ./blocks/v2-breadcrumb/v2-breadcrumb.js ***!
  \***********************************************/
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



const blockName = 'v2-breadcrumb';
const sectionStatus = 'data-section-status';
const breadcrumb = (0,_scripts_common_js__WEBPACK_IMPORTED_MODULE_1__.getTextLabel)('breadcrumb');
const homeText = {
  home: (0,_scripts_common_js__WEBPACK_IMPORTED_MODULE_1__.getTextLabel)('home'),
  ellipsis: '…', // unicode ellipsis
};

const formatText = (str) => str.replace(/-/g, ' ').toLowerCase();

const getPadding = (elCompCSS) => parseInt(elCompCSS.getPropertyValue('padding-left'), 10)
      + parseInt(elCompCSS.getPropertyValue('padding-right'), 10);

const getCrumbsWidth = (block) => {
  const crumbs = block.querySelectorAll(`.${blockName}__crumb-item`);
  return [...crumbs].reduce((acc, item) => {
    const itemCompCSS = window.getComputedStyle(item);
    return acc + parseInt(itemCompCSS.getPropertyValue('width'), 10);
  }, 0);
};

const getBlockWidth = (block) => {
  const computedCSS = window.getComputedStyle(block);
  const blockWidth = parseInt(computedCSS.getPropertyValue('width'), 10);
  const boxSizing = computedCSS.getPropertyValue('box-sizing');
  const padding = boxSizing === 'border-box' ? getPadding(computedCSS) : 0;
  return blockWidth - padding;
};

const fitting = (block) => getCrumbsWidth(block) < getBlockWidth(block);
function decorate(block) {
  const cfg = (0,_scripts_aem_js__WEBPACK_IMPORTED_MODULE_0__.readBlockConfig)(block);
  const hasPath = cfg && Object.hasOwn(cfg, 'path');
  const url = hasPath ? cfg.path : window.location.pathname;
  const path = url.split('/').filter(Boolean);
  const nav = (0,_scripts_common_js__WEBPACK_IMPORTED_MODULE_1__.createElement)('nav', { classes: [`${blockName}__crumb-nav`] });
  const ul = (0,_scripts_common_js__WEBPACK_IMPORTED_MODULE_1__.createElement)('ul', { classes: [`${blockName}__crumb-list`] });
  const crumbs = path.map((_, i) => {
    const liEl = (0,_scripts_common_js__WEBPACK_IMPORTED_MODULE_1__.createElement)('li', { classes: [`${blockName}__crumb-item`] });
    const content = formatText(path[i]);
    const crumbProps = { 'data-content': content };
    const crumbClasses = [`${blockName}__crumb`];
    if (i !== path.length - 1) {
      crumbProps.href = `/${path.slice(0, i + 1).join('/')}/`;
    } else {
      crumbClasses.push(`${blockName}__crumb--active`);
      crumbProps['aria-current'] = 'page';
    }
    const crumb = (0,_scripts_common_js__WEBPACK_IMPORTED_MODULE_1__.createElement)('a', { classes: crumbClasses, props: crumbProps });
    crumb.textContent = content;
    liEl.append(crumb);
    return liEl;
  });
  const homeItem = (0,_scripts_common_js__WEBPACK_IMPORTED_MODULE_1__.createElement)('li', { classes: [`${blockName}__crumb-item`] });
  const homeEl = (0,_scripts_common_js__WEBPACK_IMPORTED_MODULE_1__.createElement)('a', {
    classes: [`${blockName}__crumb`, `${blockName}__crumb--home`],
    props: { href: '/' },
  });

  homeEl.textContent = homeText.home;
  homeItem.append(homeEl);
  crumbs.unshift(homeItem);
  ul.append(...crumbs);
  nav.append(ul);
  block.textContent = '';
  block.append(nav);
  block.parentElement.classList.add('full-width');
  block.setAttribute('aria-label', breadcrumb);

  const checkCrumbsFits = () => {
    // 1st check if home fits, if not it become an ellipsis
    if (!fitting(block) && crumbs.length > 2) homeEl.textContent = homeText.ellipsis;
    // if still doesn't fit, remove active crumb
    if (!fitting(block)) {
      crumbs.at(-1).firstElementChild.textContent = '';
      crumbs.at(-1).classList.add(`${blockName}__crumb-item--hidden`);
    }
    // if it still doesn't fit again, remove the crumbs from the middle
    if (!fitting(block)) {
      let i = 1;
      while (i < crumbs.length - 2 && !fitting(block)) {
        crumbs[i].firstElementChild.textContent = '';
        crumbs[i].classList.add(`${blockName}__crumb-item--hidden`);
        i += 1;
      }
    }
  };

  const rObserver = new ResizeObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.contentBoxSize) return;
      // add again the content from each item and check if it fits again or not
      homeEl.textContent = homeText.home;
      crumbs.forEach((crumb, i) => {
        const link = crumb.firstElementChild;
        if (i > 0) {
          crumb.classList.remove(`${blockName}__crumb-item--hidden`);
          link.textContent = link.dataset.content;
        }
      });
      checkCrumbsFits();
    });
  });

  const mObserver = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
      // check if the attribute data-section-status has the value 'loaded'
      if (mutation.attributeName !== sectionStatus) return;
      const section = mutation.target;
      const status = section.getAttribute(sectionStatus);
      if (status !== 'loaded') return;
      rObserver.observe(block);
      mObserver.disconnect();
    });
  });
  mObserver.observe(block.closest('.section'), {
    childList: true, attributeFilter: [sectionStatus],
  });
}

__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ })

},
/******/ __webpack_require__ => { // webpackRuntimeModules
/******/ var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
/******/ var __webpack_exports__ = (__webpack_exec__("./blocks/v2-breadcrumb/v2-breadcrumb.js"));
/******/ }
]);