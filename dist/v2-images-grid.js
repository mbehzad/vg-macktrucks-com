"use strict";
(self["webpackChunk_adobe_helix_project_boilerplate"] = self["webpackChunk_adobe_helix_project_boilerplate"] || []).push([["v2-images-grid"],{

/***/ "./blocks/v2-images-grid/v2-images-grid.js":
/*!*************************************************!*\
  !*** ./blocks/v2-images-grid/v2-images-grid.js ***!
  \*************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ decorate)
/* harmony export */ });
/* harmony import */ var _scripts_aem_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../scripts/aem.js */ "./scripts/aem.js");
/* harmony import */ var _scripts_common_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../scripts/common.js */ "./scripts/common.js");
/* harmony import */ var _scripts_scripts_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../scripts/scripts.js */ "./scripts/scripts.js");
/* harmony import */ var _common_modal_modal_component_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../common/modal/modal-component.js */ "./common/modal/modal-component.js");
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([_scripts_common_js__WEBPACK_IMPORTED_MODULE_1__, _scripts_scripts_js__WEBPACK_IMPORTED_MODULE_2__, _common_modal_modal_component_js__WEBPACK_IMPORTED_MODULE_3__]);
([_scripts_common_js__WEBPACK_IMPORTED_MODULE_1__, _scripts_scripts_js__WEBPACK_IMPORTED_MODULE_2__, _common_modal_modal_component_js__WEBPACK_IMPORTED_MODULE_3__] = __webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__);





const blockName = 'v2-images-grid';
const variantClasses = ['with-captions'];

const scrollLeft = (el, leftPadding, behavior = 'smooth') => {
  el.scrollTo({
    left: leftPadding,
    behavior,
  });
};

const udpateArrowsState = (activeSlideIndex, itemsCount) => {
  const arrowButtons = [...document.querySelectorAll(`.${blockName}__modal-arrows-wrapper button`)];

  if (!arrowButtons.length) {
    return;
  }

  if (activeSlideIndex === 0) {
    arrowButtons[0].setAttribute('disabled', 'disabled');
  } else {
    arrowButtons[0].removeAttribute('disabled');
  }

  if (activeSlideIndex === itemsCount - 1) {
    arrowButtons[1].setAttribute('disabled', 'disabled');
  } else {
    arrowButtons[1].removeAttribute('disabled');
  }
};

// eslint-disable-next-line max-len
const setActiveSlide = (activeSlideIndex, carouselItemsList, carouselImagesList, modalContent, behavior) => {
  const itemWidth = carouselItemsList.getBoundingClientRect().width;

  udpateArrowsState(activeSlideIndex, carouselItemsList.children.length, modalContent);

  scrollLeft(carouselImagesList, activeSlideIndex * 90, behavior);
  scrollLeft(carouselItemsList, activeSlideIndex * itemWidth, behavior);
};

const createModalContent = (content) => {
  const carouselItemsList = content.querySelector(`.${blockName}__carousel-items-list`);
  const carouselImagesList = content.querySelector(`.${blockName}__carousel-preview-list`);

  let isScrolling = false;
  let stopScrolling;

  carouselItemsList.addEventListener('scroll', () => {
    isScrolling = true;

    clearTimeout(stopScrolling);
    stopScrolling = setTimeout(() => {
      isScrolling = false;
    }, 50);
  });

  const debouncedOnItemChange = (0,_scripts_common_js__WEBPACK_IMPORTED_MODULE_1__.debounce)((index) => {
    if (isScrolling) {
      return;
    }

    scrollLeft(carouselImagesList, index * 90);
  }, 100);

  [...content.querySelectorAll('.v2-images-grid__item')].forEach((el, index) => {
    const image = el.querySelector('img');


    const carousePreviewlItem = carouselImagesList.querySelector(`.${blockName}__carousel-preview-item`);
    const buttonWithImage = carouselImagesList.querySelector("button");

    buttonWithImage.addEventListener('click', () => {
      const itemWidth = carouselItemsList.getBoundingClientRect().width;

      scrollLeft(carouselItemsList, index * itemWidth);
    });


    // creating item content


    const options = {
      root: carouselItemsList,
      rootMargin: '0px',
      threshold: 1.0,
    };

    const observer = new IntersectionObserver((entries) => {
      if (!entries[0].isIntersecting) {
        return;
      }

      debouncedOnItemChange(index);

      udpateArrowsState(index, carouselItemsList.children.length, el.closest(`${blockName}__carousel-items-wrapper`));
    }, options);

    observer.observe(el.querySelector(`.${blockName}__carousel-item`));
  });

  [...itemsWrapper.querySelectorAll('button')].forEach((el, elIndex) => {
    const modifiers = [-1, 1];

    el.addEventListener('click', () => {
      const itemWidth = carouselItemsList.getBoundingClientRect().width;
      const index = Math.round(carouselItemsList.scrollLeft / itemWidth) + modifiers[elIndex];

      setActiveSlide(index, carouselItemsList, carouselImagesList, content);
    });
  });


  return wrapper;
};

const showImagesGridModal = async (modalContent) => {
  await (0,_common_modal_modal_component_js__WEBPACK_IMPORTED_MODULE_3__.showModal)(modalContent, { classes: ['modal-content--bottom'] });
};

function decorate(block) {
  const isCaptionsVariant = block.classList.contains(`${blockName}--with-captions`);

  // all items are inside a ul list with classname called 'v2-images-grid__items'
  const ul = block.querySelector(".v2-images-grid__items");

  const modalContent = !isCaptionsVariant && createModalContent(ul);

  // give format to the first 4 list items
  [...ul.children].forEach((li, idx) => {
    if (idx < 4) {
      const captionEle = (0,_scripts_scripts_js__WEBPACK_IMPORTED_MODULE_2__.getAllElWithChildren)(li.querySelectorAll('p'), 'picture', true)[0];
      let picture = li.querySelector('picture');

      if (picture) {
        const img = picture.lastElementChild;
        // no width provided because we are using object-fit, we need the biggest option
        const newPicture = (0,_scripts_aem_js__WEBPACK_IMPORTED_MODULE_0__.createOptimizedPicture)(img.src, captionEle?.textContent, false);
        picture.replaceWith(newPicture);
        picture = newPicture;
        picture.classList.add(`${blockName}__picture`);
        // use figcaption for text
        const figCaption = (0,_scripts_common_js__WEBPACK_IMPORTED_MODULE_1__.createElement)('figcaption', { classes: `${blockName}__figcaption` });
        figCaption.textContent = captionEle?.textContent;
        picture.append(figCaption);
      }

      li.innerHTML = '';
      li.append(picture);

      if (!isCaptionsVariant) {
        li.addEventListener('click', async () => {
          const carouselItemsList = modalContent.querySelector(`.${blockName}__carousel-items-list`);
          const carouselImagesList = modalContent.querySelector(`.${blockName}__carousel-preview-list`);

          await showImagesGridModal(modalContent);
          setActiveSlide(idx, carouselItemsList, carouselImagesList, modalContent, 'instant');
        });
      }
      return;
    }
    li.remove();
  });

  if (!isCaptionsVariant) {
    const button = block.querySelector(".button--primary");
    button.addEventListener('click', async () => {
      const carouselItemsList = modalContent.querySelector(`.${blockName}__carousel-items-list`);
      const carouselImagesList = modalContent.querySelector(`.${blockName}__carousel-preview-list`);

      await showImagesGridModal(modalContent);
      setActiveSlide(0, carouselItemsList, carouselImagesList, modalContent);
    });

    block.append(button);
  }

  // remove empty tags
  (0,_scripts_common_js__WEBPACK_IMPORTED_MODULE_1__.removeEmptyTags)(block);
}

__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ }),

/***/ "./common/modal/modal-component.js":
/*!*****************************************!*\
  !*** ./common/modal/modal-component.js ***!
  \*****************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   hideModal: () => (/* binding */ hideModal),
/* harmony export */   showModal: () => (/* binding */ showModal)
/* harmony export */ });
/* harmony import */ var _scripts_aem_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../scripts/aem.js */ "./scripts/aem.js");
/* harmony import */ var _scripts_video_helper_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../scripts/video-helper.js */ "./scripts/video-helper.js");
/* harmony import */ var _scripts_common_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../scripts/common.js */ "./scripts/common.js");
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([_scripts_video_helper_js__WEBPACK_IMPORTED_MODULE_1__, _scripts_common_js__WEBPACK_IMPORTED_MODULE_2__]);
([_scripts_video_helper_js__WEBPACK_IMPORTED_MODULE_1__, _scripts_common_js__WEBPACK_IMPORTED_MODULE_2__] = __webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__);

// eslint-disable-next-line import/no-cycle



const { videoIdRegex } = _scripts_video_helper_js__WEBPACK_IMPORTED_MODULE_1__.AEM_ASSETS;
const videoEventManager = new _scripts_video_helper_js__WEBPACK_IMPORTED_MODULE_1__.VideoEventManager();

class VideoComponent {
  constructor(videoId) {
    this.videoId = videoId;
    this.blockName = 'modal';

    videoEventManager.register(
      this.videoId,
      this.blockName,
      (event) => (0,_scripts_video_helper_js__WEBPACK_IMPORTED_MODULE_1__.handleVideoMessage)(event, this.videoId, this.blockName),
    );
  }

  unregister() {
    videoEventManager.unregister(this.videoId, this.blockName);
  }
}

const HIDE_MODAL_CLASS = 'modal-hidden';

const createModal = () => {
  const modalBackground = (0,_scripts_common_js__WEBPACK_IMPORTED_MODULE_2__.createElement)('div', { classes: ['modal-background', HIDE_MODAL_CLASS] });

  modalBackground.addEventListener('click', () => {
    // eslint-disable-next-line no-use-before-define
    hideModal();
  });

  const keyDownAction = (event) => {
    if (event.key === 'Escape') {
      // eslint-disable-next-line no-use-before-define
      hideModal();
    }
  };

  const modalContent = (0,_scripts_common_js__WEBPACK_IMPORTED_MODULE_2__.createElement)('div', { classes: 'modal-content' });
  modalBackground.appendChild(modalContent);
  // preventing initial animation when added to DOM
  modalBackground.style = 'height: 0; opacity: 0;';
  document.body.appendChild(modalBackground);

  // adding close modal button
  const closeModalLabel = (0,_scripts_common_js__WEBPACK_IMPORTED_MODULE_2__.getTextLabel)('Close modal');
  const closeButton = (0,_scripts_common_js__WEBPACK_IMPORTED_MODULE_2__.createElement)('button', { classes: 'modal-close-button', props: { 'aria-label': `${closeModalLabel}` } });
  const closeIcon = (0,_scripts_common_js__WEBPACK_IMPORTED_MODULE_2__.createElement)('span', { classes: ['icon', 'icon-close'] });
  closeButton.append(closeIcon);
  modalBackground.appendChild(closeButton);
  // eslint-disable-next-line no-use-before-define
  closeButton.addEventListener('click', () => hideModal());

  (0,_scripts_common_js__WEBPACK_IMPORTED_MODULE_2__.decorateIcons)(closeButton);

  const clearModalContent = () => {
    modalContent.innerHTML = '';
    modalContent.className = 'modal-content';
  };

  async function showModal(newContent, { beforeBanner, beforeIframe, classes = [] } = {}) {
    await (0,_scripts_aem_js__WEBPACK_IMPORTED_MODULE_0__.loadCSS)(`${window.hlx.codeBasePath}/common/modal/modal-component.css`);
    modalBackground.style = '';
    window.addEventListener('keydown', keyDownAction);

    if (newContent && (typeof newContent !== 'string')) {
      // opening modal
      clearModalContent();
      modalContent.classList.add(...classes);
      modalContent.append(newContent);
      modalContent.appendChild(closeButton);
    } else if (newContent) {
      clearModalContent();
      let videoOrIframe = null;
      if ((0,_scripts_video_helper_js__WEBPACK_IMPORTED_MODULE_1__.isLowResolutionVideoUrl)(newContent)) {
        // Leverage the <video> HTML tag to improve video display
        // This implementation addresses video height inconsistencies in Safari when using an iframe
        videoOrIframe = (0,_scripts_common_js__WEBPACK_IMPORTED_MODULE_2__.createElement)('video', {
          classes: 'modal-video',
          props: {
            src: newContent,
            controls: '',
            autoplay: 'autoplay',
            playsinline: '',
          },
        });
        modalContent.append(videoOrIframe);
      } else if (_scripts_video_helper_js__WEBPACK_IMPORTED_MODULE_1__.isAEMVideoUrl) {
        let videoId;
        const match = newContent.match(videoIdRegex);
        if (match) {
          [videoId] = match;
        }

        // eslint-disable-next-line no-unused-vars
        const modalVideoComponent = new VideoComponent(videoId);
        videoOrIframe = (0,_scripts_video_helper_js__WEBPACK_IMPORTED_MODULE_1__.createVideo)(null, newContent, 'modal-video', {
          autoplay: 'any',
          disablePictureInPicture: true,
          loop: false,
          muted: false,
          playsinline: true,
          title: 'video',
          language: document.documentElement.lang,
        }, false, videoId);
        modalContent.append(videoOrIframe);
      } else {
        // otherwise load it as iframe
        videoOrIframe = (0,_scripts_video_helper_js__WEBPACK_IMPORTED_MODULE_1__.createIframe)(newContent, { parentEl: modalContent, classes: 'modal-video' });
      }

      if (beforeBanner) {
        const bannerWrapper = (0,_scripts_common_js__WEBPACK_IMPORTED_MODULE_2__.createElement)('div', { classes: 'modal-before-banner' });
        bannerWrapper.addEventListener('click', (event) => event.stopPropagation());
        bannerWrapper.appendChild(beforeBanner);

        videoOrIframe.parentElement.insertBefore(bannerWrapper, videoOrIframe);
      }

      if (beforeIframe) {
        const wrapper = (0,_scripts_common_js__WEBPACK_IMPORTED_MODULE_2__.createElement)('div', { classes: 'modal-before-iframe' });
        wrapper.appendChild(beforeIframe);
        videoOrIframe.parentElement.insertBefore(wrapper, videoOrIframe);
      }

      videoOrIframe.parentElement.insertBefore(closeButton, videoOrIframe);
    }

    modalBackground.classList.remove(HIDE_MODAL_CLASS);

    // disable page scrolling
    document.body.classList.add('disable-scroll');

    modalContent.addEventListener('click', (event) => {
      event.stopPropagation();
    });
  }

  function hideModal() {
    modalBackground.classList.add(HIDE_MODAL_CLASS);
    window.removeEventListener('keydown', keyDownAction);
    document.body.classList.remove('disable-scroll');

    // stop playing video if the modal contains one
    document.querySelector('.modal-content video')?.pause();
    document.querySelector('.modal-content iframe')?.setAttribute('src', '');

    let onHideTransitionCancel;
    const onHideTransitionEnd = (event) => {
      if (event.target === modalBackground) {
        clearModalContent();

        if (onHideTransitionCancel) {
          modalBackground.removeEventListener('transitioncancel', onHideTransitionCancel);
        }
      }
    };

    onHideTransitionCancel = (event) => {
      if (event.target === modalBackground) {
        modalBackground.removeEventListener('transitionend', onHideTransitionEnd);
      }
    };

    modalBackground.addEventListener('transitionend', onHideTransitionEnd, { once: true });
    modalBackground.addEventListener('transitioncancel', onHideTransitionCancel, { once: true });
  }

  return {
    showModal,
    hideModal,
  };
};

const { showModal, hideModal } = createModal();



__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ })

},
/******/ __webpack_require__ => { // webpackRuntimeModules
/******/ var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
/******/ var __webpack_exports__ = (__webpack_exec__("./blocks/v2-images-grid/v2-images-grid.js"));
/******/ }
]);