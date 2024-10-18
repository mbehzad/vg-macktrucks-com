"use strict";
(self["webpackChunk_adobe_helix_project_boilerplate"] = self["webpackChunk_adobe_helix_project_boilerplate"] || []).push([["v2-tabbed-carousel"],{

/***/ "./blocks/v2-tabbed-carousel/v2-tabbed-carousel.js":
/*!*********************************************************!*\
  !*** ./blocks/v2-tabbed-carousel/v2-tabbed-carousel.js ***!
  \*********************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _scripts_common_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../scripts/common.js */ "./scripts/common.js");
/* harmony import */ var _scripts_carousel_helper_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../scripts/carousel-helper.js */ "./scripts/carousel-helper.js");
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([_scripts_common_js__WEBPACK_IMPORTED_MODULE_0__, _scripts_carousel_helper_js__WEBPACK_IMPORTED_MODULE_1__]);
([_scripts_common_js__WEBPACK_IMPORTED_MODULE_0__, _scripts_carousel_helper_js__WEBPACK_IMPORTED_MODULE_1__] = __webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__);



const blockName = 'v2-tabbed-carousel';
const variantClasses = ['fade-in', 'small-tabs'];
// transform variantClasses to an object with keys and values are equal to the variant classes
const variants = variantClasses.reduce((acc, variant) => {
  // variant name to camelCase
  const variantName = variant.replace(/-([a-z])/g, (g) => g[1].toUpperCase());
  acc[variantName] = variant;
  return acc;
}, {});

const moveNavigationLine = (navigationLine, activeTab, tabNavigation) => {
  const { x: navigationX } = tabNavigation.getBoundingClientRect();
  const { x, width } = activeTab.getBoundingClientRect();
  Object.assign(navigationLine.style, {
    left: `${x + tabNavigation.scrollLeft - navigationX}px`,
    width: `${width}px`,
  });
};

const updateActiveItem = (elements, entry) => {
  elements.forEach((el, index) => {
    if (el === entry.target && entry.intersectionRatio >= 0.75) {
      const carouselItems = el.parentElement;
      const navigation = el.parentElement.nextElementSibling;
      const navigationLine = navigation.querySelector(`.${blockName}__navigation-line`);

      [carouselItems, navigation].forEach((c) => c.querySelectorAll('.active').forEach((i) => i.classList.remove('active')));
      carouselItems.children[index].classList.add('active');
      navigation.children[index].classList.add('active');

      const activeNavigationItem = navigation.children[index];
      moveNavigationLine(navigationLine, activeNavigationItem, navigation);

      // Center navigation item
      const navigationActiveItem = navigation.querySelector('.active');

      if (navigation && navigationActiveItem) {
        const { clientWidth: itemWidth, offsetLeft } = navigationActiveItem;
        // Calculate the scroll position to center the active item
        const scrollPosition = offsetLeft - (navigation.clientWidth - itemWidth) / 2;
        navigation.scrollTo({
          left: scrollPosition,
          behavior: 'smooth',
        });
      }
    }
  });
};

const jumpToCarouselItem = (carousel, index, navigation) => {
  const { width } = carousel.firstElementChild.getBoundingClientRect();
  const navigationLine = navigation.querySelector(`.${blockName}__navigation-line`);

  // remove active class from activeItem and activeNavigationItem
  carousel.querySelector('.active').classList.remove('active');
  navigation.querySelector('.active').classList.remove('active');

  // add active class to the item and navigation item at the index
  carousel.children[index].classList.add('active');
  navigation.children[index].classList.add('active');

  // move the navigation line to the active navigation item
  moveNavigationLine(navigationLine, navigation.children[index], navigation);

  // translate carousel to the active item and center it based in the width of the first item
  carousel.style.transform = `translateX(-${index * width}px)`;
};

function decorate(block) {
  const currentVariant = variantClasses.find((variant) => block.classList.contains(variant))
    || null;
  (0,_scripts_common_js__WEBPACK_IMPORTED_MODULE_0__.variantsClassesToBEM)(block.classList, variantClasses, blockName);
  const carouselItems = (block.querySelector(`.${blockName}__items`));

  let timeout;

  function buildTabNavigation(listItem, index) {
    const button = listItem.querySelector('button');
    const moveCarousel = !currentVariant || currentVariant !== variants.fadeIn
      ? () => (0,_scripts_carousel_helper_js__WEBPACK_IMPORTED_MODULE_1__.setCarouselPosition)(carouselItems, (index - 1))
      : () => jumpToCarouselItem(carouselItems, (index - 1), tabNavigation);
    button.addEventListener('click', moveCarousel);
    button.addEventListener('mouseover', (e) => {
      clearTimeout(timeout);
      moveNavigationLine(navigationLine, e.currentTarget, tabNavigation);
    });

    button.addEventListener('mouseout', () => {
      timeout = setTimeout(() => {
        const activeItem = block.querySelector(`.${blockName}__navigation-item.active`);
        moveNavigationLine(navigationLine, activeItem, tabNavigation);
      }, 600);
    });
    return listItem;
  }

  const tabItems = block.querySelectorAll(`.${blockName}__navigation-item`);
  tabItems.forEach((tabItem) => {
    const picture = tabItem.querySelector('picture');
    if (picture) {
      buildTabNavigation(tabItems);
    } else {

    }
  });


  // update the button indicator on scroll
  const elements = carouselItems.querySelectorAll(':scope > *');
  (0,_scripts_carousel_helper_js__WEBPACK_IMPORTED_MODULE_1__.listenScroll)(carouselItems, elements, updateActiveItem, 0.75);
  (0,_scripts_common_js__WEBPACK_IMPORTED_MODULE_0__.unwrapDivs)(block);
}

document.querySelectorAll(".v2-tabbed-carousel-container").forEach(decorate);

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
/******/ var __webpack_exports__ = (__webpack_exec__("./blocks/v2-tabbed-carousel/v2-tabbed-carousel.js"));
/******/ }
]);