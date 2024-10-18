"use strict";
(self["webpackChunk_adobe_helix_project_boilerplate"] = self["webpackChunk_adobe_helix_project_boilerplate"] || []).push([["v2-truck-lineup"],{

/***/ "./blocks/v2-truck-lineup/v2-truck-lineup.js":
/*!***************************************************!*\
  !*** ./blocks/v2-truck-lineup/v2-truck-lineup.js ***!
  \***************************************************/
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



const blockName = 'v2-truck-lineup';
const tabContentClass = `.${blockName}__content`;

function stripEmptyTags(main, child) {
  if (child !== main && child.innerHTML.trim() === '') {
    const parent = child.parentNode;
    child.remove();
    stripEmptyTags(main, parent);
  }
}

const moveNavigationLine = (navigationLine, activeTab, tabNavigation) => {
  const { x: navigationX } = tabNavigation.getBoundingClientRect();
  const { x, width } = activeTab.getBoundingClientRect();
  Object.assign(navigationLine.style, {
    left: `${x + tabNavigation.scrollLeft - navigationX}px`,
    width: `${width}px`,
  });
};

const setNavigationLine = (tabNavigation) => {
  const navWidth = tabNavigation.offsetWidth;
  const viewportWidth = document.documentElement.clientWidth;
  const listItems = tabNavigation.querySelectorAll(`.${blockName}__navigation-item`);
  let totalWidth = 0;

  [...listItems].forEach((listItem) => {
    totalWidth += listItem.getBoundingClientRect().width;
  });

  if ((totalWidth + 32) <= navWidth) {
    if ((navWidth === 1040) && (viewportWidth >= 1200)) {
      tabNavigation.style.setProperty('--truck-lineup-border-scale', `${navWidth}`);
    } else {
      tabNavigation.style.setProperty('--truck-lineup-border-scale', `${navWidth - 32}`);
    }
  } else {
    tabNavigation.style.setProperty('--truck-lineup-border-scale', `${totalWidth}`);
  }
};

function buildTabNavigation(tabItems, clickHandler) {
  const tabNavigationContainer = (0,_scripts_common_js__WEBPACK_IMPORTED_MODULE_0__.createElement)('div', { classes: `${blockName}__navigation-container` });
  const tabNavigation = (0,_scripts_common_js__WEBPACK_IMPORTED_MODULE_0__.createElement)('ul', { classes: `${blockName}__navigation` });
  const navigationLine = (0,_scripts_common_js__WEBPACK_IMPORTED_MODULE_0__.createElement)('li', { classes: `${blockName}__navigation-line` });
  let timeout;

  [...tabItems].forEach((tabItem, i) => {
    const listItem = (0,_scripts_common_js__WEBPACK_IMPORTED_MODULE_0__.createElement)('li', { classes: `${blockName}__navigation-item` });
    const button = (0,_scripts_common_js__WEBPACK_IMPORTED_MODULE_0__.createElement)('button');
    button.addEventListener('click', () => clickHandler(i));
    button.addEventListener('mouseover', (e) => {
      clearTimeout(timeout);
      moveNavigationLine(navigationLine, e.currentTarget, tabNavigation);
    });

    button.addEventListener('mouseout', () => {
      timeout = setTimeout(() => {
        const activeItem = document.querySelector(`.${blockName}__navigation-item.active button`);
        moveNavigationLine(navigationLine, activeItem, tabNavigation);
      }, 600);
    });

    const tabContent = tabItem.querySelector(tabContentClass);
    const icon = tabContent && tabContent?.dataset.truckCarouselIcon;
    const svgIcon = icon ? `<span class="icon icon-${icon}"></span>` : '';
    button.innerHTML = `${tabContent.dataset.truckCarousel}${svgIcon}`;
    listItem.append(button);
    tabNavigation.append(listItem);
  });

  tabNavigation.append(navigationLine);
  tabNavigationContainer.append(tabNavigation);

  return tabNavigationContainer;
}

const updateActiveItem = (index) => {
  const images = document.querySelector(`.${blockName}__images-container`);
  const descriptions = document.querySelector(`.${blockName}__description-container`);
  const navigation = document.querySelector(`.${blockName}__navigation`);
  const navigationLine = document.querySelector(`.${blockName}__navigation-line`);
  const tabNavigation = document.querySelector(`.${blockName}__navigation`);

  [images, descriptions, navigation].forEach((c) => c.querySelectorAll('.active').forEach((i) => i.classList.remove('active')));
  images.children[index].classList.add('active');
  descriptions.children[index].classList.add('active');
  navigation.children[index].classList.add('active');

  const activeNavigationItem = navigation.children[index].querySelector('button');
  moveNavigationLine(navigationLine, activeNavigationItem, navigation);
  setNavigationLine(tabNavigation);

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

  // Update description position
  const descriptionWidth = descriptions.offsetWidth;

  descriptions.scrollTo({
    left: descriptionWidth * index,
    behavior: 'smooth',
  });
};

const scrollObserverFunction = (elements, entry) => {
  elements.forEach((el, index) => {
    if (el === entry.target && entry.intersectionRatio >= 0.9) {
      updateActiveItem(index);
    }
  });
};

const arrowFragment = document.createRange().createContextualFragment(`<li>
  <button aria-label="${(0,_scripts_common_js__WEBPACK_IMPORTED_MODULE_0__.getTextLabel)('Previous')}">
    <span class="icon icon-arrow-left" />
  </button>
</li>
<li>
  <button aria-label="${(0,_scripts_common_js__WEBPACK_IMPORTED_MODULE_0__.getTextLabel)('Next')}">
    <span class="icon icon-arrow-right" />
  </button>
</li>`);

async function decorate(block) {
  const descriptionContainer = block.querySelector(':scope > div');
  descriptionContainer.classList.add(`${blockName}__description-container`);

  const tabItems = block.querySelectorAll(':scope > div > div');

  const imagesWrapper = (0,_scripts_common_js__WEBPACK_IMPORTED_MODULE_0__.createElement)('div', { classes: `${blockName}__slider-wrapper` });
  const imagesContainer = (0,_scripts_common_js__WEBPACK_IMPORTED_MODULE_0__.createElement)('div', { classes: `${blockName}__images-container` });
  descriptionContainer.parentNode.prepend(imagesWrapper);
  imagesWrapper.appendChild(imagesContainer);

  const tabNavigation = buildTabNavigation(tabItems, (index) => {
    (0,_scripts_carousel_helper_js__WEBPACK_IMPORTED_MODULE_1__.setCarouselPosition)(imagesContainer, index);
  });

  // Arrows
  (0,_scripts_carousel_helper_js__WEBPACK_IMPORTED_MODULE_1__.createArrowControls)(imagesContainer, `.${blockName}__image-item.active`, [`${blockName}__arrow-controls`], arrowFragment);

  descriptionContainer.parentNode.append(tabNavigation);

  tabItems.forEach((tabItem) => {
    tabItem.classList.add(`${blockName}__desc-item`);
    const tabContent = tabItem.querySelector(tabContentClass);
    const headings = tabContent ? tabContent.querySelectorAll('h1, h2, h3, h4, h5, h6') : [];
    [...headings].forEach((heading) => heading.classList.add(`${blockName}__title`));

    // create div for image and append inside image div container
    const picture = tabItem.querySelector('picture');
    const imageItem = (0,_scripts_common_js__WEBPACK_IMPORTED_MODULE_0__.createElement)('div', { classes: `${blockName}__image-item` });
    imageItem.appendChild(picture);
    imagesContainer.appendChild(imageItem);

    // remove empty tags
    tabContent.querySelectorAll('p, div').forEach((item) => {
      stripEmptyTags(tabContent, item);
    });

    const descriptions = tabContent.querySelectorAll('p:not(.button-container)');
    [...descriptions].forEach((description) => description.classList.add(`${blockName}__description`));

    // Wrap text in container
    const textContainer = (0,_scripts_common_js__WEBPACK_IMPORTED_MODULE_0__.createElement)('div', { classes: `${blockName}__text` });
    const text = tabContent.querySelector('.default-content-wrapper')?.querySelectorAll(':scope > *:not(.button-container)');
    if (text) {
      const parentTextContainer = text[0].parentNode;
      textContainer.append(...text);
      parentTextContainer.appendChild(textContainer);
    }

    // Wrap links in container
    const buttonContainer = (0,_scripts_common_js__WEBPACK_IMPORTED_MODULE_0__.createElement)('div', { classes: `${blockName}__buttons-container` });
    const buttons = tabContent.querySelectorAll('.button-container');

    if (buttons.length) {
      const parentButtonContainer = buttons[0].parentNode;
      buttonContainer.append(...buttons);
      parentButtonContainer.appendChild(buttonContainer);
    }
  });

  // update the button indicator on scroll
  const elements = imagesContainer.querySelectorAll(':scope > *');
  (0,_scripts_carousel_helper_js__WEBPACK_IMPORTED_MODULE_1__.listenScroll)(imagesContainer, elements, scrollObserverFunction, 0.9);

  // Update text position + navigation line when page is resized
  window.addEventListener('resize', () => {
    const activeItem = imagesContainer.querySelector(`.${blockName}__image-item.active`);
    const index = [...activeItem.parentNode.children].indexOf(activeItem);
    updateActiveItem(index);
    setTimeout(() => {
      setNavigationLine(tabNavigation);
    }, 100);
  });

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
/******/ var __webpack_exports__ = (__webpack_exec__("./blocks/v2-truck-lineup/v2-truck-lineup.js"));
/******/ }
]);