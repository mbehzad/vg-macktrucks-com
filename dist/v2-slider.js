(self["webpackChunk_adobe_helix_project_boilerplate"] = self["webpackChunk_adobe_helix_project_boilerplate"] || []).push([["v2-slider"],{

/***/ "./blocks/v2-slider/v2-slider.js":
/*!***************************************!*\
  !*** ./blocks/v2-slider/v2-slider.js ***!
  \***************************************/
/***/ (() => {

const blockName = 'v2-slider';

function handleSlider(block) {
  const clippingSlider = block.querySelector(`.${blockName}__input`);

  clippingSlider.addEventListener('input', (event) => {
    const newValue = `${event.target.value}%`;
    block.style.setProperty('--exposure', newValue);
  });
}

async function decorate(block) {
  const contentWrapper = block.querySelector(':scope > div');
  contentWrapper.classList.add(`${blockName}__content-wrapper`);

  const content = block.querySelector(':scope > div > div');
  content.classList.add(`${blockName}__content`);

  const images = [...content.querySelectorAll('p > picture')];
  const has2Images = images.length === 2;

  if (has2Images) {
    handleSlider(block);
  }
}

document.querySelectorAll(`.${blockName}`).forEach(decorate);


/***/ })

},
/******/ __webpack_require__ => { // webpackRuntimeModules
/******/ var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
/******/ var __webpack_exports__ = (__webpack_exec__("./blocks/v2-slider/v2-slider.js"));
/******/ }
]);