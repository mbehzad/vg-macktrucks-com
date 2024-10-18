"use strict";
(self["webpackChunk_adobe_helix_project_boilerplate"] = self["webpackChunk_adobe_helix_project_boilerplate"] || []).push([["common_modal_modal-component_js"],{

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

}]);