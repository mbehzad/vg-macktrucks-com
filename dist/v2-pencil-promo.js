"use strict";
(self["webpackChunk_adobe_helix_project_boilerplate"] = self["webpackChunk_adobe_helix_project_boilerplate"] || []).push([["v2-pencil-promo"],{

/***/ "./blocks/v2-pencil-promo/v2-pencil-promo.js":
/*!***************************************************!*\
  !*** ./blocks/v2-pencil-promo/v2-pencil-promo.js ***!
  \***************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ decorate)
/* harmony export */ });
/* harmony import */ var _scripts_common_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../scripts/common.js */ "./scripts/common.js");
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([_scripts_common_js__WEBPACK_IMPORTED_MODULE_0__]);
_scripts_common_js__WEBPACK_IMPORTED_MODULE_0__ = (__webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__)[0];


async function decorate(block) {
  const blockName = 'v2-pencil-promo';
  // variant pencil banner black is default
  const variantClasses = ['pencil-banner-black', 'pencil-banner-copper', 'promo-banner-gold', 'promo-banner-copper'];
  const indexVariant = variantClasses.findIndex((variant) => block.classList.contains(variant));
  const currentVariant = (indexVariant >= 0 && variantClasses[indexVariant]) || variantClasses[0];
  const isPencil = currentVariant.includes('pencil');
  (0,_scripts_common_js__WEBPACK_IMPORTED_MODULE_0__.variantsClassesToBEM)(block.classList, variantClasses, blockName);

  block.classList.add(`${blockName}__${isPencil ? 'pencil' : 'promo'}-banner`);
  if (isPencil) block.parentElement.classList.add('full-width');
  else block.classList.add(`${blockName}__promo-banner--with-image`);

  const bannerImage = block.querySelector('picture');
  if (isPencil && bannerImage !== null) {
    bannerImage.remove();
  } else if (!isPencil) {
    const images = [...block.querySelectorAll('p > picture')];
    const imageURLs = (0,_scripts_common_js__WEBPACK_IMPORTED_MODULE_0__.getImageURLs)(images);
    const imageData = imageURLs.map((src) => ({ src, breakpoints: [] }));

    const breakpoints0 = [
      { media: '(min-width: 600px)', width: 800 },
      { width: 600 },
    ];

    const breakpoints1 = [
      { media: '(min-width: 744px)', width: 800 },
      { media: '(min-width: 1200px)', width: 1200 },
      { media: '(min-width: 1440px)', width: 1440 },
      { media: '(min-width: 1920px)', width: 1920 },
    ];

    if (images.length === 1) {
      imageData[0].breakpoints = [...breakpoints0, ...breakpoints1];
    } else if (images.length > 1) {
      imageData[0].breakpoints = [...breakpoints0];
      imageData[1].breakpoints = [...breakpoints1];
    }

    const altText = [...block.querySelectorAll('p > picture img.alt')];
    const newPicture = (0,_scripts_common_js__WEBPACK_IMPORTED_MODULE_0__.createResponsivePicture)(imageData, true, altText, `${blockName}__image`);
    images.forEach((image) => image.parentNode.remove());

    block.prepend(newPicture);
  }

  const contentWrapper = block.querySelector(':scope > div');
  contentWrapper.classList.add(`${blockName}__content-wrapper`);

  const content = block.querySelector(':scope > div > div');
  content.classList.add(`${blockName}__content`);
  if (content.querySelectorAll('p').length === 0) {
    const p = (0,_scripts_common_js__WEBPACK_IMPORTED_MODULE_0__.createElement)('p');
    while (content.firstChild) {
      p.appendChild(content.firstChild);
    }
    content.appendChild(p);
  }

  const ctaButtons = content.querySelectorAll('.button-container > a');
  [...ctaButtons].forEach((b) => {
    b.classList.remove('button', 'button--primary');
    b.parentElement.classList.remove('button-container');
    b.parentElement.removeAttribute('class');
  });

  const bannerLinks = block.querySelectorAll('a');

  bannerLinks.forEach((link) => {
    const closestParent = link.closest(`.${blockName}`);
    closestParent.addEventListener('click', () => {
      const linkHref = link.getAttribute('href');
      if (linkHref) {
        window.location.href = linkHref;
      }
    });
  });
}

__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ })

},
/******/ __webpack_require__ => { // webpackRuntimeModules
/******/ var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
/******/ var __webpack_exports__ = (__webpack_exec__("./blocks/v2-pencil-promo/v2-pencil-promo.js"));
/******/ }
]);