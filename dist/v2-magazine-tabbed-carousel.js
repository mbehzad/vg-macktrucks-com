"use strict";
(self["webpackChunk_adobe_helix_project_boilerplate"] = self["webpackChunk_adobe_helix_project_boilerplate"] || []).push([["v2-magazine-tabbed-carousel"],{

/***/ "./blocks/v2-magazine-tabbed-carousel/v2-magazine-tabbed-carousel.js":
/*!***************************************************************************!*\
  !*** ./blocks/v2-magazine-tabbed-carousel/v2-magazine-tabbed-carousel.js ***!
  \***************************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ decorate)
/* harmony export */ });
/* harmony import */ var _scripts_common_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../scripts/common.js */ "./scripts/common.js");
/* harmony import */ var _scripts_carousel_helper_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../scripts/carousel-helper.js */ "./scripts/carousel-helper.js");
/* harmony import */ var _scripts_video_helper_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../scripts/video-helper.js */ "./scripts/video-helper.js");
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([_scripts_common_js__WEBPACK_IMPORTED_MODULE_0__, _scripts_carousel_helper_js__WEBPACK_IMPORTED_MODULE_1__, _scripts_video_helper_js__WEBPACK_IMPORTED_MODULE_2__]);
([_scripts_common_js__WEBPACK_IMPORTED_MODULE_0__, _scripts_carousel_helper_js__WEBPACK_IMPORTED_MODULE_1__, _scripts_video_helper_js__WEBPACK_IMPORTED_MODULE_2__] = __webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__);




const blockName = 'v2-magazine-tabbed-carousel';
const activeTabClass = `${blockName}__navigation-item--active`;
const activeCarouselClass = `${blockName}__carousel-item--active`;

let autoScrollEnabled = true;
const maxAmountOfTabs = 4;

const url = '/magazine-articles.json';
const allArticles = await (0,_scripts_common_js__WEBPACK_IMPORTED_MODULE_0__.getJsonFromUrl)(url);
const articleArray = Object.values(allArticles.data);

let activeVideo = null;

const handleVideoAutoplay = (carouselItem, index) => {
  if (!carouselItem || !carouselItem.children[index]) return;

  const currentVideo = carouselItem.children[index].querySelector('video');

  if (currentVideo) {
    if (activeVideo && activeVideo !== currentVideo) {
      activeVideo.pause();
    }
    currentVideo.play();
    activeVideo = currentVideo;
  } else if (activeVideo) {
    activeVideo.pause();
    activeVideo = null;
  }
};

const updateActiveItem = (elements, entry) => {
  elements.forEach((el, index) => {
    if (el === entry.target && entry.intersectionRatio >= 0.75) {
      const carouselItems = el.parentElement;
      const navigation = el.parentElement.nextElementSibling;

      [carouselItems, navigation].forEach((c) => {
        c.querySelectorAll(`.${activeTabClass}, .${activeCarouselClass}`).forEach((i) => {
          i.classList.remove(`${activeTabClass}`, `${activeCarouselClass}`);
        });
      });
      carouselItems.children[index].classList.add(activeCarouselClass);
      navigation.children[index].classList.add(activeTabClass);

      // Center navigation item
      const navigationActiveItem = navigation.querySelector(`.${activeTabClass}`);

      if (navigation && navigationActiveItem) {
        const { clientWidth: itemWidth, offsetLeft } = navigationActiveItem;
        // Calculate the scroll position to center the active item
        const scrollPosition = offsetLeft - (navigation.clientWidth - itemWidth) / 2;
        navigation.scrollTo({
          left: scrollPosition,
          behavior: 'smooth',
        });
      }

      handleVideoAutoplay(carouselItems, index);
    }
  });
};

const buildTabNavigation = (carousel, title, category, index) => {
  const item = document.createRange().createContextualFragment(`
    <button tabindex="0" class="${blockName}__navigation-item item-${index + 1}">
      <p class="pretitle">${category}</p>
      <p class="title">${title}</p>
    </button>
  `);
  item.querySelector('button').addEventListener('click', () => (0,_scripts_carousel_helper_js__WEBPACK_IMPORTED_MODULE_1__.setCarouselPosition)(carousel, index));

  return item;
};

const appendMediaToFigure = (figure, picture, links) => {
  if (picture) {
    figure.append(picture);
  } else {
    const videoLink = Array.from(links).find((link) => link.classList.contains('text-link-with-video'));
    const isVideo = videoLink ? (0,_scripts_video_helper_js__WEBPACK_IMPORTED_MODULE_2__.isVideoLink)(videoLink) : false;
    if (isVideo) {
      (0,_scripts_video_helper_js__WEBPACK_IMPORTED_MODULE_2__.createVideo)(figure, videoLink.getAttribute('href'), `${blockName}__video`, {
        muted: true,
        autoplay: false,
        loop: true,
        playsinline: true,
      });
      videoLink.remove();
    }
  }
};

const buildTabItems = (carousel, navigation, items, articles) => {
  items.forEach((item, index) => {
    if (index <= (maxAmountOfTabs - 1)) {
      const picture = item.querySelector('picture');
      const links = item.querySelectorAll('a');
      const tabContent = Array.from(links).find((link) => !link.classList.contains('text-link-with-video'));
      const articlePath = tabContent.href;

      const liItem = (0,_scripts_common_js__WEBPACK_IMPORTED_MODULE_0__.createElement)('li', { classes: [`${blockName}__item`, `item-${index + 1}`] });
      const figure = (0,_scripts_common_js__WEBPACK_IMPORTED_MODULE_0__.createElement)('figure', { classes: `${blockName}__figure` });

      appendMediaToFigure(figure, picture, links);

      const figureCaption = (0,_scripts_common_js__WEBPACK_IMPORTED_MODULE_0__.createElement)('figcaption');
      figureCaption.append(tabContent);
      figure.append(figureCaption);

      liItem.append(figure);
      carousel.appendChild(liItem);

      const fullArticleObj = articles.find((path) => {
        const shortUrl = articlePath.split('/magazine/')[1];
        const shortPath = path.path.split('/magazine/')[1];
        return shortPath === shortUrl;
      });
      const { title, category } = fullArticleObj;

      const navItem = buildTabNavigation(carousel, title, category, index);
      navigation.append(navItem);
    }
    item.innerHTML = '';
  });
};

const autoScrollFunction = (container) => {
  const amountOfSlides = container.querySelectorAll(`.${blockName}__item`).length;
  const activeSlide = container.querySelector(`.${activeCarouselClass}`);
  const classlistArray = [...activeSlide.classList];
  const item = classlistArray.find((el) => el.slice(0, 5) === 'item-');
  const itemNum = Number(item.split('-')[1]);

  activeSlide.classList.remove(`${activeCarouselClass}`);

  const nextNum = itemNum === amountOfSlides ? 1 : itemNum + 1;
  const nextSlide = container.querySelector(`.item-${nextNum}`);

  nextSlide.classList.add(`${activeCarouselClass}`);
  if (nextSlide.classList.contains(`${blockName}__item`)) {
    const itemsContainer = nextSlide.parentElement;
    const { x: itemWidth } = nextSlide.getBoundingClientRect();
    itemsContainer.scrollLeft += itemWidth;
  }
};

const handleSwitch = (e, setAutoScroll) => {
  const slider = e.target.parentElement.querySelector('.switch-slider');
  const isOff = e.target.matches('[data-autoscroll="off"]');
  if (autoScrollEnabled === isOff) {
    autoScrollEnabled = !isOff;
  }
  slider.style.left = isOff ? '53px' : '0';
  setAutoScroll(autoScrollEnabled);
};

async function decorate(block) {
  let isFirstLoad = true;
  let scrollIntervalID;
  const carouselContainerSection = block.closest('.section.v2-magazine-tabbed-carousel-container');
  const intervalTime = parseInt(carouselContainerSection?.dataset.magazineTabbedCarouselIntervalTime || '6000', 10);

  const switchFullTexts = (0,_scripts_common_js__WEBPACK_IMPORTED_MODULE_0__.getTextLabel)('autoscroll_switch');

  const carouselContainer = (0,_scripts_common_js__WEBPACK_IMPORTED_MODULE_0__.createElement)('div', { classes: `${blockName}__container` });
  const carouselItems = (0,_scripts_common_js__WEBPACK_IMPORTED_MODULE_0__.createElement)('ul', { classes: `${blockName}__items` });
  carouselContainer.append(carouselItems);

  const tabNavigation = (0,_scripts_common_js__WEBPACK_IMPORTED_MODULE_0__.createElement)('nav', { classes: `${blockName}__navigation` });

  const tabItems = block.querySelectorAll(':scope > div');

  buildTabItems(carouselItems, tabNavigation, tabItems, articleArray);

  const handleAutoScroll = (isEnabled) => {
    if (isEnabled) {
      scrollIntervalID = setInterval(() => {
        autoScrollFunction(carouselContainer);
      }, intervalTime);
    } else {
      clearInterval(scrollIntervalID);
      scrollIntervalID = null;
    }
  };

  const switchSplittedTexts = switchFullTexts.split(',');
  const autoScrollSwitch = document.createRange().createContextualFragment(`
    <div class="switch">
      <p class="switch-label">${switchSplittedTexts[0]}</p>
      <div class="switch-buttons">
        <button>${switchSplittedTexts[1]}</button>
        <button data-autoscroll="off">${switchSplittedTexts[2]}</button>
        <div class="switch-slider"></div>
      </div>
    </div>
  `);

  autoScrollSwitch.querySelectorAll('button').forEach((btn) => btn.addEventListener('click', (e) => handleSwitch(e, handleAutoScroll)));

  carouselContainer.append(tabNavigation);

  block.parentElement.classList.add('full-width');
  block.append(carouselContainer);

  if (isFirstLoad && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    carouselContainer.append(autoScrollSwitch);
    handleAutoScroll(autoScrollEnabled);
    isFirstLoad = false;
  }

  // update the button indicator on scroll
  const elements = carouselItems.querySelectorAll(':scope > *');
  (0,_scripts_carousel_helper_js__WEBPACK_IMPORTED_MODULE_1__.listenScroll)(carouselItems, elements, updateActiveItem, 0.75);
  (0,_scripts_common_js__WEBPACK_IMPORTED_MODULE_0__.unwrapDivs)(block);
  (0,_scripts_common_js__WEBPACK_IMPORTED_MODULE_0__.decorateIcons)(block);
}

__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } }, 1);

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
/******/ var __webpack_exports__ = (__webpack_exec__("./blocks/v2-magazine-tabbed-carousel/v2-magazine-tabbed-carousel.js"));
/******/ }
]);