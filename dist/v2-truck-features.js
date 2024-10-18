"use strict";
(self["webpackChunk_adobe_helix_project_boilerplate"] = self["webpackChunk_adobe_helix_project_boilerplate"] || []).push([["v2-truck-features"],{

/***/ "./blocks/v2-truck-features/v2-truck-features.js":
/*!*******************************************************!*\
  !*** ./blocks/v2-truck-features/v2-truck-features.js ***!
  \*******************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ decorate)
/* harmony export */ });
/* harmony import */ var _scripts_common_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../scripts/common.js */ "./scripts/common.js");
/* harmony import */ var _scripts_scripts_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../scripts/scripts.js */ "./scripts/scripts.js");
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([_scripts_common_js__WEBPACK_IMPORTED_MODULE_0__, _scripts_scripts_js__WEBPACK_IMPORTED_MODULE_1__]);
([_scripts_common_js__WEBPACK_IMPORTED_MODULE_0__, _scripts_scripts_js__WEBPACK_IMPORTED_MODULE_1__] = __webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__);



const blockName = 'v2-truck-features';
const desktopMQ = window.matchMedia('(min-width: 1200px)');
const DESKTOP_SCROLL_PADDING = 200;
const MOBILE_SCROLL_PADDING = 400;
let slideScrollPaddingInPx = desktopMQ.matches ? DESKTOP_SCROLL_PADDING : MOBILE_SCROLL_PADDING;

desktopMQ.addEventListener('change', (event) => {
  slideScrollPaddingInPx = event.matches ? DESKTOP_SCROLL_PADDING : MOBILE_SCROLL_PADDING;
});

const selectImagesList = (slide) => {
  const imagesLists = [...(0,_scripts_scripts_js__WEBPACK_IMPORTED_MODULE_1__.getAllElWithChildren)(slide.querySelectorAll('ul'), ':scope > li > picture')];

  if (imagesLists === 0) {
    return;
  }

  imagesLists.forEach((el) => {
    el.style.display = 'none';
  });

  const selectedImagesListIndex = desktopMQ.matches ? '-1' : '0';

  imagesLists.at(selectedImagesListIndex).style.display = 'block';
  imagesLists.at(selectedImagesListIndex).classList.add(`${blockName}__images-list`);
};

const setContentWrapperHeight = (wrapper, slidesCount) => {
  const navHeight = getComputedStyle(document.documentElement).getPropertyValue('--nav-height');
  const navHeightInPx = Number.parseInt(navHeight, 10); // assuming that the --nav-height is in px
  const inPageNav = getComputedStyle(document.documentElement).getPropertyValue('--inpage-navigation-height');
  // assuming that the --inpage-navigation-height is in px
  const inPageNavInPx = Number.parseInt(inPageNav, 10);
  const windowHeightInPx = window.innerHeight;
  const availableViewportInPx = windowHeightInPx - navHeightInPx - inPageNavInPx;
  // wrapper height is the viewport height without navigations
  // (to make sure that the slide will fit inside the block) + scroll padding for every slide
  const wrapperHeight = slideScrollPaddingInPx * slidesCount + availableViewportInPx;
  wrapper.style.height = `${wrapperHeight}px`;
};

async function decorate(block) {
  const activeSlideClass = `${blockName}__slide--active`;
  const activeSlideImageClass = `${blockName}__slide-image--active`;

  const list = block.querySelector(`.${blockName}__slides`)

  const slidesCount = list.querySelectorAll(`.${blockName}__images-list picture`).length;
  setContentWrapperHeight(block, slidesCount);

  // setting the first slide as active
  let activeSlide = list.children[0];
  activeSlide.classList.add(activeSlideClass);
  // setting the first image in the first slide active
  let activePicListItem = activeSlide.querySelector(`.${blockName}__images-list li`);
  activePicListItem.classList.add(activeSlideImageClass);

  const showNextSlide = () => {
    const nextImageInSlide = block.querySelector(`.${activeSlideImageClass} + li`);
    let hasNextSlide = true;

    // if there is a next image in the same slide just switch image
    if (nextImageInSlide) {
      activePicListItem.classList.remove(activeSlideImageClass);
      nextImageInSlide.classList.add(activeSlideImageClass);
      activePicListItem = nextImageInSlide;
    } else {
      // if no next image in slide switch to next slide
      const nextSlide = block.querySelector(`.${activeSlideClass} + li`);

      if (nextSlide) {
        activeSlide.classList.remove(activeSlideClass);
        nextSlide.classList.add(activeSlideClass);
        activeSlide = nextSlide;

        activePicListItem.classList.remove(activeSlideImageClass);
        activePicListItem = nextSlide.querySelector(`.${blockName}__images-list li`);
        activePicListItem.classList.add(activeSlideImageClass);
      } else {
        hasNextSlide = false;
      }
    }

    return hasNextSlide;
  };

  const showPrevSlide = () => {
    const prevImageInSlide = block.querySelector(`.${activeSlideImageClass}`).previousElementSibling;
    let hasPrevSlide = true;

    // if there is a prev image in the same slide just switch image
    if (prevImageInSlide) {
      activePicListItem.classList.remove(activeSlideImageClass);
      prevImageInSlide.classList.add(activeSlideImageClass);
      activePicListItem = prevImageInSlide;
    } else {
      // if no prev image in slide switch to prev slide
      const prevSlide = block.querySelector(`.${activeSlideClass}`).previousElementSibling;

      if (prevSlide) {
        activeSlide.classList.remove(activeSlideClass);
        prevSlide.classList.add(activeSlideClass);
        activeSlide = prevSlide;

        activePicListItem.classList.remove(activeSlideImageClass);
        activePicListItem = prevSlide.querySelector(`.${blockName}__images-list li:last-of-type`);
        activePicListItem.classList.add(activeSlideImageClass);
      } else {
        hasPrevSlide = false;
      }
    }

    return hasPrevSlide;
  };

  let slideIndex = 0;

  window.addEventListener('scroll', () => {
    const navHeight = getComputedStyle(document.documentElement).getPropertyValue('--nav-height');
    const navHeightInPx = Number.parseInt(navHeight, 10); // assuming that the --nav-height is in px
    const inPageNav = getComputedStyle(document.documentElement).getPropertyValue('--inpage-navigation-height');
    // assuming that the --inpage-navigation-height is in px
    const inPageNavInPx = Number.parseInt(inPageNav, 10);
    const { top: blockTopPosition, bottom: blockBottomPosition } = block.getBoundingClientRect();

    if (
      blockTopPosition < navHeightInPx + inPageNavInPx
      && blockBottomPosition > navHeightInPx + inPageNavInPx
    ) {
      const blockScrollInPx = Math.abs(blockTopPosition - navHeightInPx - inPageNavInPx);
      const newSlideIndex = Math.floor(blockScrollInPx / slideScrollPaddingInPx);

      if (newSlideIndex > slidesCount) {
        return;
      }

      if (newSlideIndex > slideIndex) {
        showNextSlide();
      }

      if (newSlideIndex < slideIndex) {
        showPrevSlide();
      }

      slideIndex = newSlideIndex;
    }
  });
}


document.querySelectorAll(".v2-truck-features-container").forEach(decorate);
__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ })

},
/******/ __webpack_require__ => { // webpackRuntimeModules
/******/ var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
/******/ var __webpack_exports__ = (__webpack_exec__("./blocks/v2-truck-features/v2-truck-features.js"));
/******/ }
]);