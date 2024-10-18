"use strict";
(self["webpackChunk_adobe_helix_project_boilerplate"] = self["webpackChunk_adobe_helix_project_boilerplate"] || []).push([["carousel"],{

/***/ "./blocks/carousel/carousel.js":
/*!*************************************!*\
  !*** ./blocks/carousel/carousel.js ***!
  \*************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ decorate)
/* harmony export */ });
/* harmony import */ var _scripts_video_helper_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../scripts/video-helper.js */ "./scripts/video-helper.js");
/* harmony import */ var _scripts_common_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../scripts/common.js */ "./scripts/common.js");
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([_scripts_video_helper_js__WEBPACK_IMPORTED_MODULE_0__, _scripts_common_js__WEBPACK_IMPORTED_MODULE_1__]);
([_scripts_video_helper_js__WEBPACK_IMPORTED_MODULE_0__, _scripts_common_js__WEBPACK_IMPORTED_MODULE_1__] = __webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__);



const debounceDelay = 30;

function isInViewport(el) {
  const rect = el.getBoundingClientRect();
  return (
    rect.top >= 0
      && rect.left >= 0
      && rect.bottom <= (window.innerHeight || document.documentElement.clientHeight)
      && rect.right <= (window.innerWidth || document.documentElement.clientWidth)

  );
}

function calcCarouselItemsOffset(slidesEl) {
  const first = slidesEl.firstElementChild;
  const second = first.nextElementSibling;
  const scrollOffset = second.getBoundingClientRect().x - first.getBoundingClientRect().x;

  return scrollOffset;
}

function initScroll(slidesList, onActiveItemChange) {
  let activeIndex = 0;

  slidesList.addEventListener('scroll', () => {
    const scrollOffset = calcCarouselItemsOffset(slidesList);
    let index = 0;
    // how many items have scrolled out?
    while (slidesList.scrollLeft - scrollOffset * (index + 1) > 0) index += 1;

    if (activeIndex !== index) {
      activeIndex = index;
      onActiveItemChange(activeIndex);
    }
  });
}

function adjustWidthAndControls(block, carousel, ...controls) {
  function toggle() {
    const gap = parseInt(window.getComputedStyle(carousel).gap, 10);
    const itemWidth = parseInt(window.getComputedStyle(carousel.firstElementChild).width, 10);
    const itemsWidth = itemWidth * carousel.children.length + gap * (carousel.children.length - 1);
    const containerWidth = parseInt(window.getComputedStyle(carousel.parentElement).width, 10);
    const showControls = itemsWidth > containerWidth;
    controls.forEach((ul) => (showControls ? ul.classList.remove('hidden') : ul.classList.add('hidden')));
  }

  let resizeTimeout;
  window.addEventListener('resize', () => {
    if (resizeTimeout) clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(toggle, debounceDelay);
  });

  // wait for the section to be loaded before we initially resize the carousel
  const section = block.closest('.section');
  new MutationObserver((_, observer) => {
    if (section.dataset.sectionStatus === 'loaded') {
      observer.disconnect();
      setTimeout(toggle);
    }
  }).observe(section, { attributes: true });
}

function createDesktopControls(ul) {
  function scroll(direction) {
    const scrollOffset = calcCarouselItemsOffset(ul);

    // when no more items are on the left, scroll to the last item
    if (isInViewport(ul.firstChild) && direction === 'left') {
      ul.scrollTo(ul.scrollWidth, 0);
      return;
    }

    // when no more items are on the right, scroll to the firs item
    if (isInViewport(ul.lastChild) && direction === 'right') {
      ul.scrollTo(0, 0);
      return;
    }

    // otherwise scroll one item in selected direction
    const left = direction === 'left' ? -1 * scrollOffset : scrollOffset;
    ul.scrollBy({ top: 0, left, behavior: 'smooth' });
  }

  const desktopControls = (0,_scripts_common_js__WEBPACK_IMPORTED_MODULE_1__.createElement)('ul', { classes: 'desktop-controls' });
  const leftButtonContainer = (0,_scripts_common_js__WEBPACK_IMPORTED_MODULE_1__.createElement)('li');
  const leftButton = (0,_scripts_common_js__WEBPACK_IMPORTED_MODULE_1__.createElement)('button', { props: { type: 'button' } });
  leftButton.textContent = 'Left';
  const rightButtonContainer = (0,_scripts_common_js__WEBPACK_IMPORTED_MODULE_1__.createElement)('li');
  const rightButton = (0,_scripts_common_js__WEBPACK_IMPORTED_MODULE_1__.createElement)('button', { props: { type: 'button' } });
  rightButton.textContent = 'Right';
  leftButtonContainer.append(leftButton);
  rightButtonContainer.append(rightButton);
  desktopControls.append(leftButtonContainer, rightButtonContainer);
  ul.insertAdjacentElement('beforebegin', desktopControls);
  const [prevButton, nextButton] = desktopControls.querySelectorAll(':scope button');
  prevButton.addEventListener('click', () => scroll('left'));
  nextButton.addEventListener('click', () => scroll('right'));

  // Check if the carousel is inside a magazine article and if NOT hide the controls
  const isMagazineArticle = document.querySelector('.magazine');
  if (!isMagazineArticle) desktopControls.classList.add('hidden');

  return desktopControls;
}

function createDotControls(ul) {
  // create carousel controls for mobile
  const dotControls = (0,_scripts_common_js__WEBPACK_IMPORTED_MODULE_1__.createElement)('ul', { classes: 'mobile-controls' });
  [...ul.children].forEach((item, j) => {
    const control = (0,_scripts_common_js__WEBPACK_IMPORTED_MODULE_1__.createElement)('li');
    if (!j) control.className = 'active';
    const button = (0,_scripts_common_js__WEBPACK_IMPORTED_MODULE_1__.createElement)('button', { props: { type: 'button' } });
    button.textContent = j + 1;
    control.append(button);
    control.firstElementChild.addEventListener('click', () => {
      dotControls.querySelector('li.active').classList.remove('active');
      control.classList.add('active');

      const left = item.offsetLeft + item.offsetWidth / 2
        - (item.parentNode.offsetLeft + item.parentNode.offsetWidth / 2);
      ul.scrollTo({ top: 0, left, behavior: 'smooth' });
    });

    dotControls.append(control);
  });
  ul.insertAdjacentElement('beforebegin', dotControls);

  let scrollTimeout;
  ul.addEventListener('scroll', () => {
    if (scrollTimeout) clearTimeout(scrollTimeout);
    scrollTimeout = setTimeout(() => {
      const scrollOffset = calcCarouselItemsOffset(ul);
      let index = 0;
      // how many items have scrolled out?
      while (ul.scrollLeft - scrollOffset * (index + 1) > 0) index += 1;
      dotControls.querySelector('li.active').classList.remove('active');
      dotControls.children[index].classList.add('active');
    }, debounceDelay);
  });
  return dotControls;
}

function replaceBlockClasses(block) {
  const classes = block.classList;

  if (classes.contains('cards')) {
    classes.remove('cards');
    classes.add('cards-variant');
  }
}

function decorate(block) {
  replaceBlockClasses(block);
  const ul = (0,_scripts_common_js__WEBPACK_IMPORTED_MODULE_1__.createElement)('ul', { classes: ['items'] });

  // We support two formats:
  // 1. Each slide in a row (can be splitted into columns)
  // 2. All values in the first cell as a list.
  const isList = block.querySelectorAll(':scope > div > div > ul').length;
  const rows = [...block.querySelectorAll(isList ? ':scope > div > div > ul > li' : ':scope > div')];

  rows.forEach((row) => {
    const columns = row.querySelectorAll(':scope > div, :scope > picture');
    columns.forEach((column) => {
      column.classList.add('carousel-item-column');
    });

    const listItem = (0,_scripts_common_js__WEBPACK_IMPORTED_MODULE_1__.createElement)('li', { classes: ['carousel-item'] });
    listItem.append(...row.children);
    ul.append(listItem);
  });

  [...ul.children].forEach((li) => {
    // Add wrapper around the content
    const container = (0,_scripts_common_js__WEBPACK_IMPORTED_MODULE_1__.createElement)('div', { classes: ['carousel-content-wrapper'] });

    container.innerHTML = li.innerHTML;
    li.innerHTML = '';
    li.append(container);

    // for each column
    li.querySelectorAll('.carousel-item-column').forEach((column) => {
      const picture = column.querySelector('picture');
      const links = [...column.querySelectorAll('a')];
      const videoLinks = links.filter((link) => (0,_scripts_video_helper_js__WEBPACK_IMPORTED_MODULE_0__.isVideoLink)(link));

      // handling image with video link
      if (videoLinks.length && picture) {
        const selectedVideoLink = (0,_scripts_video_helper_js__WEBPACK_IMPORTED_MODULE_0__.selectVideoLink)(videoLinks);
        if (selectedVideoLink) {
          // removing unused video links
          videoLinks
            .filter((videoLink) => videoLink.getAttribute('href') !== selectedVideoLink.getAttribute('href'))
            .forEach((link) => link.remove());

          (0,_scripts_video_helper_js__WEBPACK_IMPORTED_MODULE_0__.wrapImageWithVideoLink)(selectedVideoLink, picture);
          (0,_scripts_video_helper_js__WEBPACK_IMPORTED_MODULE_0__.addVideoShowHandler)(selectedVideoLink);
          // remove the video wrapper paragraph
          selectedVideoLink.parentElement.replaceWith(selectedVideoLink);
        }
      } else if (links.length && picture) {
        // handling image with link
        const clone = links[0].cloneNode(false);
        picture.replaceWith(clone);
        clone.append(picture);
        column.prepend(clone);
      }

      // handling heading and subheading
      const [header, subheader] = [...column.querySelectorAll('h1, h2, h3, h4, h5, h6')].sort((h1, h2) => h1.tagName[1] - h2.tagName[1]);

      if (header) {
        const newHeader = (0,_scripts_common_js__WEBPACK_IMPORTED_MODULE_1__.createElement)('h2', { classes: 'carousel-item-header' });
        newHeader.innerHTML = header.innerHTML;
        header.replaceWith(newHeader);
      }
      if (subheader) {
        const newSubheader = (0,_scripts_common_js__WEBPACK_IMPORTED_MODULE_1__.createElement)('h3', { classes: 'carousel-item-subheader' });
        newSubheader.innerHTML = subheader.innerHTML;
        subheader.replaceWith(newSubheader);
      }

      // removing new lines from content
      container.querySelectorAll('br').forEach((el) => el.remove());
      // removing empty paragraphs
      container.querySelectorAll('p').forEach((p) => {
        const paragraphHTML = p.innerHTML;
        const isEmptyParagrph = !paragraphHTML.replaceAll('\n', '').trim();

        if (isEmptyParagrph) {
          p.remove();
        }
      });

      // warpping all paragraphs and headers
      const textElements = column.querySelectorAll('p, h2, h3');
      if (textElements.length) {
        const textWrapper = (0,_scripts_common_js__WEBPACK_IMPORTED_MODULE_1__.createElement)('div', { classes: 'carousel-item-text' });
        textWrapper.append(...textElements);
        column.append(textWrapper);
      }
    });

    const carouselLink = container.querySelector('a');
    if (carouselLink) {
      carouselLink.classList.add('button', 'carousel-link');
    }

    block.innerHTML = '';
    block.append(ul);
  });

  const desktopControls = createDesktopControls(ul);
  const dotControls = createDotControls(ul);

  const onActiveItemChange = (newActiveItemIndex) => {
    const newActiveEl = ul.querySelectorAll('li')[newActiveItemIndex];
    ul.querySelector('li.active')?.classList.remove('active');
    newActiveEl.classList.add('active');
  };

  initScroll(ul, onActiveItemChange);
  onActiveItemChange(0);

  adjustWidthAndControls(block, ul, dotControls, desktopControls);
}

__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ })

},
/******/ __webpack_require__ => { // webpackRuntimeModules
/******/ var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
/******/ var __webpack_exports__ = (__webpack_exec__("./blocks/carousel/carousel.js"));
/******/ }
]);