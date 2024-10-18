"use strict";
(self["webpackChunk_adobe_helix_project_boilerplate"] = self["webpackChunk_adobe_helix_project_boilerplate"] || []).push([["inventory"],{

/***/ "./blocks/inventory/inventory.js":
/*!***************************************!*\
  !*** ./blocks/inventory/inventory.js ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ decorate)
/* harmony export */ });
// eslint-disable no-console
const addInventory = async (block) => {
  // hiding till ready to display
  const displayValue = block.style.display;
  block.style.display = 'none';

  const truckName = block.firstElementChild.innerText.trim();
  const data = await fetch(`${window.hlx.codeBasePath}/blocks/inventory/html/${truckName}.html`);

  if (!data.ok) {
    // eslint-disable-next-line no-console
    console.error(`failed to load html: ${truckName}`);
    block.innerHTML = '';
    return;
  }

  const text = await data.text();
  block.innerHTML = text;

  const styles = block.querySelectorAll('style');

  styles.forEach((styleSheet) => {
    document.head.appendChild(styleSheet);
  });

  // loading scripts one by one to prevent inappropriate script execution order.
  // eslint-disable-next-line no-restricted-syntax
  for (const script of [...block.querySelectorAll('script')]) {
    let waitForLoad = Promise.resolve();
    // the script element added by innerHTML is NOT executed
    // the workaround is to create the new script tag, copy attibutes and content
    const newScript = document.createElement('script');

    newScript.setAttribute('type', 'text/javascript');
    // coping all script attribute to the new one
    script.getAttributeNames().forEach((attrName) => {
      const attrValue = script.getAttribute(attrName);
      newScript.setAttribute(attrName, attrValue);

      if (attrName === 'src') {
        waitForLoad = new Promise((resolve) => {
          newScript.addEventListener('load', resolve);
        });
      }
    });
    newScript.innerHTML = script.innerHTML;
    script.remove();
    document.body.append(newScript);

    // eslint-disable-next-line no-await-in-loop
    await waitForLoad;
  }
  // eslint-disable-next-line no-use-before-define
  removeContactButtons(block);
  block.style.display = displayValue;
};

const removeContactButtons = async (block) => {
  const buttons = block.getElementsByClassName('contact-buttons');
  if (buttons) {
    const buttonsArray = Array.from(buttons);
    buttonsArray.forEach((button) => {
      button.remove();
    });
  }

  const contactUsButtons = document.querySelectorAll('button.widget-details.listings-button.collapsible-contacts');
  if (contactUsButtons) {
    const contactUsButtonsArray = Array.from(contactUsButtons);
    contactUsButtonsArray.forEach((cuButton) => {
      cuButton.remove();
    });
  }
};

async function decorate(block) {
  const observer = new IntersectionObserver((entries) => {
    if (entries.some((e) => e.isIntersecting)) {
      observer.disconnect();
      addInventory(block);
    }
  }, {
    rootMargin: '300px',
  });
  observer.observe(block);
}


/***/ })

},
/******/ __webpack_require__ => { // webpackRuntimeModules
/******/ var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
/******/ var __webpack_exports__ = (__webpack_exec__("./blocks/inventory/inventory.js"));
/******/ }
]);