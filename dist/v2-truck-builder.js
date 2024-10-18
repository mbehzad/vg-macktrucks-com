"use strict";
(self["webpackChunk_adobe_helix_project_boilerplate"] = self["webpackChunk_adobe_helix_project_boilerplate"] || []).push([["v2-truck-builder"],{

/***/ "./blocks/v2-truck-builder/v2-truck-builder.js":
/*!*****************************************************!*\
  !*** ./blocks/v2-truck-builder/v2-truck-builder.js ***!
  \*****************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ decorate)
/* harmony export */ });
/* harmony import */ var _scripts_common_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../scripts/common.js */ "./scripts/common.js");
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([_scripts_common_js__WEBPACK_IMPORTED_MODULE_0__]);
_scripts_common_js__WEBPACK_IMPORTED_MODULE_0__ = (__webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__)[0];


const windowBreakpoint = 1200;
const getDevice = () => window.innerWidth >= windowBreakpoint;
const blockName = 'v2-truck-builder';
const variantClasses = ['hide-description', 'media-right'];

const addAccordionClass = (item) => {
  const hasPicture = item.querySelector('picture');
  if (hasPicture) {
    hasPicture.classList.add(`${blockName}__item-image`);
  } else {
    const header = item.querySelector(':is(h1, h2, h3, h4, h5, h6)');
    if (header) header.classList.add(`${blockName}__item-title`);
    item.querySelectorAll('p').forEach((p) => p.classList.add(`${blockName}__item-description`));
  }
};

const watchScroll = (container) => {
  const items = container.querySelectorAll(`.${blockName}__item`);
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      const intersecting = entry.isIntersecting;
      if (intersecting && !getDevice()) {
        entry.target.classList.add('active');
      } else if (!getDevice()) {
        entry.target.classList.remove('active');
      }
    });
  }, { threshold: 0.5 });
  items.forEach((item) => {
    if (!getDevice()) {
      observer.observe(item);
    } else {
      observer.disconnect();
    }
  });
};

const getIdxNumber = (item) => {
  const selectedItem = item.closest('button').parentElement;
  let num;
  const classes = [...selectedItem.classList];
  classes.forEach((el) => {
    if (el.substring(0, 7) === 'number-') {
      num = el.split('-').pop();
    }
  });
  return Number(num);
};

const handleResize = (container) => {
  if (getDevice()) {
    const allItems = container.querySelectorAll(`.${blockName}__item`);
    allItems.forEach((item) => {
      item.classList.remove('active');
    });
    allItems[0].classList.add('active');
  } else {
    watchScroll(container);
  }
};

function decorate(block) {
  (0,_scripts_common_js__WEBPACK_IMPORTED_MODULE_0__.variantsClassesToBEM)(block.classList, variantClasses, blockName);

  const header = block.querySelector(':scope > div:first-child > div > :first-child');
  const button = block.querySelector(':scope > div:nth-child(2) > div > :last-child');
  const buttonContainer = block.querySelector(':scope > div:nth-child(2) > div');
  const backgroundImage = block.querySelector(':scope > div:nth-child(3) > div > :last-child');

  backgroundImage.classList.add(`${blockName}__bg-image`);

  const accordionItems = [...block.querySelectorAll(':scope > div:nth-child(n+4)')];

  const accordionContainer = (0,_scripts_common_js__WEBPACK_IMPORTED_MODULE_0__.createElement)('div', { classes: `${blockName}__accordion-container` });
  const itemsContainer = (0,_scripts_common_js__WEBPACK_IMPORTED_MODULE_0__.createElement)('div', { classes: `${blockName}__items-container` });
  block.parentElement.classList.add('full-width');
  header.parentElement.classList.add(`${blockName}__header-wrapper`);
  header.parentElement.parentElement.classList.add(`${blockName}__header-container`);

  // style the header as an h2 with red marker over it
  header.classList.add(`${blockName}__header`, 'with-marker');

  // is responsibility of the author to add the proper amount of images and text
  accordionItems.forEach((item, i) => {
    const colBtnTitle = (0,_scripts_common_js__WEBPACK_IMPORTED_MODULE_0__.createElement)('button', {
      classes: `${blockName}__item-header-button`,
      props: { type: 'button' },
    });
    const colItems = [...item.querySelectorAll(':scope > div')];

    // add the proper classes to each accordion item
    item.classList.add(`${blockName}__item`, `number-item-${i + 1}`);
    if ((i === 0) && (getDevice())) item.classList.add('active');
    colItems.forEach((col) => addAccordionClass(col, i));
    colBtnTitle.prepend(item.querySelector(`.${blockName}__item-title`), item.querySelector(`.${blockName}__item-description`));
    colBtnTitle.onclick = (e) => {
      if (!getDevice()) {
        const clickedNum = getIdxNumber(e.target);
        const selectedItem = itemsContainer.querySelector(`.${blockName}__item.number-item-${clickedNum}`);
        const { x: itemWidth } = selectedItem.getBoundingClientRect();
        itemsContainer.scrollLeft += itemWidth;
      } else {
        const active = accordionContainer.querySelector('.active');
        if (active && active !== item) active.classList.remove('active');
        item.classList.add('active');
      }
    };

    item.prepend(colBtnTitle);
    itemsContainer.appendChild(item);
  });
  button.classList.add('button--large', `${blockName}__builder-button`);

  itemsContainer.append(buttonContainer);
  accordionContainer.append(backgroundImage, itemsContainer);
  block.appendChild(accordionContainer);

  window.addEventListener('resize', () => handleResize(itemsContainer));
  watchScroll(itemsContainer);

  (0,_scripts_common_js__WEBPACK_IMPORTED_MODULE_0__.unwrapDivs)(block, { ignoreDataAlign: true });
  (0,_scripts_common_js__WEBPACK_IMPORTED_MODULE_0__.removeEmptyTags)(block);
}

__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ })

},
/******/ __webpack_require__ => { // webpackRuntimeModules
/******/ var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
/******/ var __webpack_exports__ = (__webpack_exec__("./blocks/v2-truck-builder/v2-truck-builder.js"));
/******/ }
]);