"use strict";
(self["webpackChunk_adobe_helix_project_boilerplate"] = self["webpackChunk_adobe_helix_project_boilerplate"] || []).push([["v2-feature-carousel"],{

/***/ "./blocks/v2-feature-carousel/v2-feature-carousel.js":
/*!***********************************************************!*\
  !*** ./blocks/v2-feature-carousel/v2-feature-carousel.js ***!
  \***********************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ decorate)
/* harmony export */ });
/* harmony import */ var _scripts_common_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../scripts/common.js */ "./scripts/common.js");
/* harmony import */ var _scripts_carousel_helper_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../scripts/carousel-helper.js */ "./scripts/carousel-helper.js");
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([_scripts_common_js__WEBPACK_IMPORTED_MODULE_0__, _scripts_carousel_helper_js__WEBPACK_IMPORTED_MODULE_1__]);
([_scripts_common_js__WEBPACK_IMPORTED_MODULE_0__, _scripts_carousel_helper_js__WEBPACK_IMPORTED_MODULE_1__] = __webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__);



const blockName = 'v2-feature-carousel';

const updateActiveClass = (elements, entry) => {
  elements.forEach((el, index) => {
    if (el === entry.target) {
      el.classList.add('active');
      let arrowControl = el.parentElement.previousElementSibling.querySelector(`.${blockName}__button:disabled`);

      if (arrowControl) {
        arrowControl.disabled = false;
        arrowControl = null;
      }
      // disable arrow buttons
      if (index === 0) {
        arrowControl = el.parentElement.previousElementSibling.querySelector(`.${blockName}__button-prev`);
      } else if (index === el.parentNode.children.length - 1) {
        arrowControl = el.parentElement.previousElementSibling.querySelector(`.${blockName}__button-next`);
      }
      if (arrowControl) {
        arrowControl.disabled = true;
      }
    } else {
      el.classList.remove('active');
    }
  });
};

const arrowFragment = () => document.createRange().createContextualFragment(`<li>
  <button aria-label="${(0,_scripts_common_js__WEBPACK_IMPORTED_MODULE_0__.getTextLabel)('Previous')}" class="${blockName}__button ${blockName}__button-prev">
    <span class="icon icon-arrow-right" />
  </button>
</li>
<li>
  <button aria-label="${(0,_scripts_common_js__WEBPACK_IMPORTED_MODULE_0__.getTextLabel)('Next')}" class="${blockName}__button ${blockName}__button-next">
    <span class="icon icon-arrow-right" />
  </button>
</li>`);

async function decorate(block) {
  const imageRow = block.firstElementChild;
  imageRow.classList.add(`${blockName}__image-wrapper`);
  (0,_scripts_common_js__WEBPACK_IMPORTED_MODULE_0__.unwrapDivs)(imageRow);

  const carouselList = (0,_scripts_common_js__WEBPACK_IMPORTED_MODULE_0__.createElement)('ul', { classes: `${blockName}__list` });

  // select 2nd div of the block to attach the carousel list
  const carouselContainer = imageRow.nextElementSibling;
  carouselContainer.classList.add(`${blockName}__list-container`);

  // select all div except first , as it contains image
  const textElements = block.querySelectorAll('div:not(:first-child)');
  textElements.forEach((textCol) => {
    const buttons = [...textCol.querySelectorAll('.button-container a')];
    buttons.forEach((btn) => {
      btn.classList.add('button--large');
    });

    // creating li element for carousel
    const li = (0,_scripts_common_js__WEBPACK_IMPORTED_MODULE_0__.createElement)('li', { classes: `${blockName}__list-item` });
    li.innerHTML = textCol.innerHTML;

    const headings = li.querySelectorAll('h1, h2, h3, h4');
    [...headings].forEach((heading) => heading.classList.add(`${blockName}__title`));

    (0,_scripts_common_js__WEBPACK_IMPORTED_MODULE_0__.adjustPretitle)(li);
    carouselList.append(li);
    textCol.innerHTML = '';
  });

  carouselContainer.append(carouselList);

  const carouselRow = (0,_scripts_common_js__WEBPACK_IMPORTED_MODULE_0__.createElement)('div', { classes: `${blockName}__list-wrapper` });
  carouselRow.append(carouselContainer);

  block.append(carouselRow);

  if (textElements.length > 1) {
    (0,_scripts_carousel_helper_js__WEBPACK_IMPORTED_MODULE_1__.createArrowControls)(carouselList, `.${blockName}__list-item.active`, [`${blockName}__arrowcontrols`], arrowFragment());
    const elements = carouselList.querySelectorAll(`.${blockName}__list-item`);
    (0,_scripts_carousel_helper_js__WEBPACK_IMPORTED_MODULE_1__.listenScroll)(carouselList, elements, updateActiveClass, 0.75);
  } else {
    carouselContainer.classList.add(`${blockName}__list-container--single`);
  }

  (0,_scripts_common_js__WEBPACK_IMPORTED_MODULE_0__.unwrapDivs)(block, { ignoreDataAlign: true });
  (0,_scripts_common_js__WEBPACK_IMPORTED_MODULE_0__.decorateIcons)(block);
}

__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ }),

/***/ "./scripts/carousel-helper.js":
/*!************************************!*\
  !*** ./scripts/carousel-helper.js ***!
  \************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   createArrowControls: () => (/* binding */ createArrowControls),
/* harmony export */   listenScroll: () => (/* binding */ listenScroll),
/* harmony export */   setCarouselPosition: () => (/* binding */ setCarouselPosition)
/* harmony export */ });
/* harmony import */ var _common_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./common.js */ "./scripts/common.js");
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([_common_js__WEBPACK_IMPORTED_MODULE_0__]);
_common_js__WEBPACK_IMPORTED_MODULE_0__ = (__webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__)[0];


const listenScroll = (carousel, elements, updateFn, threshold = 1) => {
  const io = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        updateFn(elements, entry);
      }
    });
  }, {
    root: carousel,
    threshold,
  });

  elements.forEach((el) => {
    io.observe(el);
  });
};

const setCarouselPosition = (carousel, index) => {
  const firstEl = carousel.firstElementChild;
  const scrollOffset = firstEl.getBoundingClientRect().width;
  const style = window.getComputedStyle(firstEl);
  const marginleft = parseFloat(style.marginLeft);

  carousel.scrollTo({
    left: index * scrollOffset + marginleft,
    behavior: 'smooth',
  });
};

const createArrowControls = (carousel, scrollSelector, controlClasses, arrowFragment) => {
  function navigate(direction) {
    const activeItem = carousel.querySelector(scrollSelector);
    let index = [...activeItem.parentNode.children].indexOf(activeItem);
    if (direction === 'left') {
      index -= 1;
      if (index === -1) { // Go to the last item if at the start
        index = carousel.childElementCount;
      }
    } else {
      index += 1;
      if (index > carousel.childElementCount - 1) {
        index = 0; // Go to the first item if at the end
      }
    }

    setCarouselPosition(carousel, index);
  }

  const arrowControls = (0,_common_js__WEBPACK_IMPORTED_MODULE_0__.createElement)('ul', { classes: controlClasses });
  arrowControls.append(...arrowFragment.children);
  carousel.insertAdjacentElement('beforebegin', arrowControls);
  const [prevButton, nextButton] = arrowControls.querySelectorAll(':scope button');
  prevButton.addEventListener('click', () => navigate('left'));
  nextButton.addEventListener('click', () => navigate('right'));
};

__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ })

},
/******/ __webpack_require__ => { // webpackRuntimeModules
/******/ var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
/******/ var __webpack_exports__ = (__webpack_exec__("./blocks/v2-feature-carousel/v2-feature-carousel.js"));
/******/ }
]);