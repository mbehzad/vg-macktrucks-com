"use strict";
(self["webpackChunk_adobe_helix_project_boilerplate"] = self["webpackChunk_adobe_helix_project_boilerplate"] || []).push([["v2-specifications"],{

/***/ "./blocks/v2-specifications/v2-specifications.js":
/*!*******************************************************!*\
  !*** ./blocks/v2-specifications/v2-specifications.js ***!
  \*******************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _scripts_aem_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../scripts/aem.js */ "./scripts/aem.js");
/* harmony import */ var _scripts_common_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../scripts/common.js */ "./scripts/common.js");
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([_scripts_common_js__WEBPACK_IMPORTED_MODULE_1__]);
_scripts_common_js__WEBPACK_IMPORTED_MODULE_1__ = (__webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__)[0];



const blockName = 'v2-specifications';

async function decorate(block) {
  const accordionId = [...block.classList].find((className) => className.startsWith('id-'));

  const items = block.querySelectorAll(':scope > div');

  let accordion;
  let accordionContent;
  let accordionWrapper;

  const accordionBlock = (0,_scripts_common_js__WEBPACK_IMPORTED_MODULE_1__.createElement)('div', {
    classes: ['block', 'v2-accordion', accordionId],
    props: { 'data-block-name': 'v2-accordion' },
  });

  const accordionBlockWrapper = (0,_scripts_common_js__WEBPACK_IMPORTED_MODULE_1__.createElement)('div', {
    classes: ['v2-accordion-wrapper'],
  });
  accordionBlockWrapper.appendChild(accordionBlock);
  block.appendChild(accordionBlockWrapper);

  // Hx tag used for the titles of the accordion
  const titleMeta = block.closest('.section').dataset.header || 3;

  const headerTag = titleMeta.charAt(titleMeta.length - 1);
  const headings = ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'].slice(headerTag);

  [...items].forEach((item) => {
    const typeTitle = item.querySelector(`h${headerTag}`); // header of the accordion
    const typePicture = item.querySelector('picture'); // with image
    const typeDownloads = item.querySelector('.button-container a'); // with downloads

    // Add title styles to the headings that are not as the accordion button
    const headingString = headings.join(',');
    const headingsList = [...block.querySelectorAll(headingString)];
    headingsList.forEach((heading) => heading.classList.add(`${blockName}__subtitle`, 'h5'));
    const subtitleCounter = item.querySelectorAll(`.${blockName}__subtitle`).length;

    if (typeTitle) {
      if (accordion) {
        // close old Accordion content
        accordionBlock.appendChild(accordion);
        accordionWrapper.appendChild(accordionContent);
        block.appendChild(accordionWrapper);
      }

      // create slug based on title name
      const name = `id-${(0,_scripts_common_js__WEBPACK_IMPORTED_MODULE_1__.slugify)(item.textContent.trim())}`;

      // new Accordion content
      // (accordionWrapper + accordionContent + accordion are needed)
      accordionWrapper = (0,_scripts_common_js__WEBPACK_IMPORTED_MODULE_1__.createElement)('div', { classes: [`${blockName}__accordion-wrapper`] });
      accordionContent = (0,_scripts_common_js__WEBPACK_IMPORTED_MODULE_1__.createElement)('div', {
        classes: [`${blockName}__accordion-content`, name],
        props: { 'data-block-status': 'loaded' },
      });
      accordion = (0,_scripts_common_js__WEBPACK_IMPORTED_MODULE_1__.createElement)('div');

      // Title of the accordion
      const titleDiv = item.querySelector(':scope > div');
      titleDiv.classList.add(`${blockName}__title`);
      accordion.appendChild(titleDiv);

      // Id to be updated in the accordion content
      const divId = (0,_scripts_common_js__WEBPACK_IMPORTED_MODULE_1__.createElement)('div');
      divId.textContent = `#${name}`;
      accordion.appendChild(divId);
      item.remove();
    }

    const classes = [];
    if (subtitleCounter) classes.push(`${blockName}__list--subtitle`);

    // apply classes to the content based on items inside
    if (typePicture) {
      classes.push(`${blockName}__list--with-pictures`);
    }

    if (typeDownloads) {
      classes.push(`${blockName}__list--with-downloads`);

      const buttons = item.querySelectorAll('.button-container a');
      buttons.forEach((bt) => {
        bt.classList.add('standalone-link');
      });
    }

    if (!typePicture && !typeDownloads && !typeTitle) {
      classes.push(`${blockName}__list--with-text`);
    }

    item.classList.add(...classes);

    accordionContent.appendChild(item);
  });

  // close last accordion content
  if (accordion) {
    accordionBlock.appendChild(accordion);
    accordionWrapper.appendChild(accordionContent);
    block.appendChild(accordionWrapper);
  }

  (0,_scripts_common_js__WEBPACK_IMPORTED_MODULE_1__.removeEmptyTags)(block);

  await (0,_scripts_aem_js__WEBPACK_IMPORTED_MODULE_0__.loadBlock)(accordionBlock);
}

__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ })

},
/******/ __webpack_require__ => { // webpackRuntimeModules
/******/ var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
/******/ var __webpack_exports__ = (__webpack_exec__("./blocks/v2-specifications/v2-specifications.js"));
/******/ }
]);