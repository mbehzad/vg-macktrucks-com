"use strict";
(self["webpackChunk_adobe_helix_project_boilerplate"] = self["webpackChunk_adobe_helix_project_boilerplate"] || []).push([["scripts_validate-elements_js"],{

/***/ "./common/snackbar/snackbar.js":
/*!*************************************!*\
  !*** ./common/snackbar/snackbar.js ***!
  \*************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ showSnackbar),
/* harmony export */   removeSnackbar: () => (/* binding */ removeSnackbar)
/* harmony export */ });
/* harmony import */ var _scripts_common_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../scripts/common.js */ "./scripts/common.js");
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([_scripts_common_js__WEBPACK_IMPORTED_MODULE_0__]);
_scripts_common_js__WEBPACK_IMPORTED_MODULE_0__ = (__webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__)[0];
// eslint-disable-next-line import/no-cycle


const componentName = 'snackbar';

/**
 * Initializes the snackbar container with the specified position.
 *
 * @param {('left'|'center'|'right')} [positionX='center'] - The horizontal position of the snackbar
 * @param {('top'|'bottom')} [positionY='bottom'] - The vertical position of the snackbar
 * @returns {HTMLElement} The created snackbar container element
 */
const initSnackbarContainer = (positionX, positionY) => {
  const positionMapping = {
    left: 'start',
    center: 'center',
    right: 'end',
    top: 'start',
    bottom: 'end',
  };

  const x = positionMapping[positionX] || 'center';
  const y = positionMapping[positionY] || 'end';

  const container = (0,_scripts_common_js__WEBPACK_IMPORTED_MODULE_0__.createElement)('section', {
    classes: [`${componentName}-container`],
    props: { style: `--snackbar-position: ${x} ${y}; --snackbar-animation: slide-from-${y};` },
  });
  document.body.appendChild(container);
  return container;
};

const handleCloseButtonClick = (event) => {
  const snackbar = event.target.closest(`.${componentName}`);
  if (snackbar) {
    // eslint-disable-next-line no-use-before-define
    removeSnackbar(snackbar);
  }
};

const removeSnackbar = (snackbar) => {
  const container = snackbar.parentNode;
  const closeButton = snackbar.querySelector(`.${componentName}__close-button`);
  snackbar.classList.add(`${componentName}--hide`);

  const animationEndHandler = () => {
    container.removeChild(snackbar);
    snackbar.removeEventListener('animationend', animationEndHandler);
  };

  const style = window.getComputedStyle(snackbar);
  const animationDuration = parseFloat(style.animationDuration);

  if (animationDuration > 0) {
    snackbar.addEventListener('animationend', animationEndHandler);
  } else {
    container.removeChild(snackbar);
  }

  if (closeButton) {
    closeButton.removeEventListener('click', handleCloseButtonClick);
  }
};

const createSnackbar = (text, type, buttonsBelow, closeButton) => {
  const getIcon = () => {
    switch (type) {
      case 'error':
        return 'icon-remove';
      case 'success':
        return 'icon-checkmark-circle';
      default:
        return '';
    }
  };

  const icon = getIcon();

  const snackbar = document.createRange().createContextualFragment(`
    <output role="status" class="${componentName} ${type ? `${componentName}--${type}` : ''} ${buttonsBelow ? `${componentName}--buttons-below` : ''}">
      ${type && icon ? `<span class="icon ${icon}"></span>` : ''}
      <p>${text}</p>
      ${closeButton ? `<button
                          aria-label="${(0,_scripts_common_js__WEBPACK_IMPORTED_MODULE_0__.getTextLabel)('Dismiss message')}"
                          class="${componentName}__close-button"
                          aria-controls="${componentName}"
                        >
                          <span class="icon icon-close" />
                        </button>` : ''}
    </output>
  `);

  if (closeButton) {
    snackbar.querySelector(`.${componentName}__close-button`).addEventListener('click', handleCloseButtonClick);
  }
  (0,_scripts_common_js__WEBPACK_IMPORTED_MODULE_0__.decorateIcons)(snackbar);
  return snackbar;
};

const addSnackbar = (container, snackbar) => {
  if (container.children.length) {
    removeSnackbar(container.children[0]);
  }
  container.appendChild(snackbar);
};

/**
 * Displays a snackbar notification with the specified text, type, and configuration options.
 *
 * @param {string} text - The text to display in the snackbar
 * @param {(''|'error'|'success')} [type=''] - The type of the snackbar
 * @param {('left'|'center'|'right')} [positionX='center'] - The horizontal position of the snackbar
 * @param {('top'|'bottom')} [positionY='bottom'] - The vertical position of the snackbar
 * @param {boolean} [buttonsBelow=false] - Whether to display buttons below the snackbar
 * @param {boolean} [closeButton=false] - Whether to display a close button on the snackbar
 * @param {number} [duration=5000] - The duration in milliseconds for which the snackbar
 * @param {boolean} [persistent=false] - Whether the snackbar should be stay on screen until closed
 */
function showSnackbar(
  text,
  type,
  positionX = 'center',
  positionY = 'bottom',
  buttonsBelow = false,
  closeButton = false,
  duration = 5000,
  persistent = false,
) {
  const container = document.querySelector(`.${componentName}-container`) || initSnackbarContainer(positionX, positionY);
  const snackbar = createSnackbar(text, type, buttonsBelow, closeButton);
  addSnackbar(container, snackbar);

  if (!persistent) {
    setTimeout(() => {
      if (container.children.length) {
        removeSnackbar(container.children[0]);
      }
    }, duration);
  }
}

__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ }),

/***/ "./scripts/validate-elements.js":
/*!**************************************!*\
  !*** ./scripts/validate-elements.js ***!
  \**************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _common_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./common.js */ "./scripts/common.js");
/* harmony import */ var _aem_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./aem.js */ "./scripts/aem.js");
/* harmony import */ var _common_snackbar_snackbar_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../common/snackbar/snackbar.js */ "./common/snackbar/snackbar.js");
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([_common_js__WEBPACK_IMPORTED_MODULE_0__, _common_snackbar_snackbar_js__WEBPACK_IMPORTED_MODULE_2__]);
([_common_js__WEBPACK_IMPORTED_MODULE_0__, _common_snackbar_snackbar_js__WEBPACK_IMPORTED_MODULE_2__] = __webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__);
// eslint-disable-next-line import/no-cycle




(0,_aem_js__WEBPACK_IMPORTED_MODULE_1__.loadCSS)(`${window.hlx.codeBasePath}/common/snackbar/snackbar.css`);

const {
  v1SectionClasses,
  v2SectionClasses,
  v1AllowedBlocks,
  v2AllowedBlocks,
} = _common_js__WEBPACK_IMPORTED_MODULE_0__.TOOLS_CONFIGS;

const formattedV1SectionClasses = (0,_common_js__WEBPACK_IMPORTED_MODULE_0__.formatStringToArray)(v1SectionClasses);
const formattedV2SectionClasses = (0,_common_js__WEBPACK_IMPORTED_MODULE_0__.formatStringToArray)(v2SectionClasses);
const formattedV1AllowedBlocks = (0,_common_js__WEBPACK_IMPORTED_MODULE_0__.formatStringToArray)(v1AllowedBlocks);
const formattedV2AllowedBlocks = (0,_common_js__WEBPACK_IMPORTED_MODULE_0__.formatStringToArray)(v2AllowedBlocks);

const allowlist = [''];

const isV2 = document.documentElement.classList.contains('redesign-v2');
const pageText = isV2 ? 'redesign page' : 'legacy page';
const targetNode = document.body;
const config = { childList: true, subtree: false };

const countOccurrences = (elements, getName) => {
  const counts = {};
  elements.forEach((element) => {
    const name = getName(element);
    if (name) {
      if (counts[name]) {
        counts[name] += 1;
      } else {
        counts[name] = 1;
      }
    }
  });
  return counts;
};

const collectViolations = (counts, checkFn) => {
  const violations = [];
  Object.keys(counts).forEach((name) => {
    if (checkFn(name)) {
      violations.push(`<span style="white-space: nowrap">${name}${counts[name] > 1 ? ` (${counts[name]}\xD7)` : ''}</span>`);
    }
  });
  return violations;
};

const checkBlocks = () => {
  const blocks = document.querySelectorAll('[data-block-name]');
  const blockCounts = countOccurrences(blocks, (block) => block.getAttribute('data-block-name'));
  const checkFn = (blockName) => {
    if (isV2) {
      return !blockName.startsWith('v2-') && !formattedV2AllowedBlocks.includes(blockName);
    }
    return blockName.startsWith('v2-') && !formattedV1AllowedBlocks.includes(blockName);
  };
  return collectViolations(blockCounts, checkFn);
};

const checkSections = () => {
  const sections = targetNode.querySelectorAll(':scope > main > .section');
  const sectionCounts = {};

  sections.forEach((section) => {
    const sectionClasses = Array.from(section.classList);
    const checkList = isV2 ? formattedV1SectionClasses : formattedV2SectionClasses;

    sectionClasses.forEach((className) => {
      if (checkList.includes(className)) {
        const cleanedClassName = className.startsWith('section--') ? className.replace('section--', '') : className;
        if (sectionCounts[cleanedClassName]) {
          sectionCounts[cleanedClassName] += 1;
        } else {
          sectionCounts[cleanedClassName] = 1;
        }
      }
    });
  });

  const checkFn = (className) => !allowlist.includes(className);
  return collectViolations(sectionCounts, checkFn);
};

const logCombinedViolations = (blockViolations, sectionViolations) => {
  const allMessages = [];

  if (sectionViolations.length > 0) {
    const sectionMessage = `Found unsupported section classes on this ${pageText}: ${sectionViolations.join(', ')}`;
    allMessages.push(sectionMessage);
  }

  if (blockViolations.length > 0) {
    const blockMessage = `Found unsupported block${blockViolations.length > 1 ? 's' : ''} on this ${pageText}: ${blockViolations.join(', ')}`;
    allMessages.push(blockMessage);
  }

  if (allMessages.length > 0) {
    (0,_common_snackbar_snackbar_js__WEBPACK_IMPORTED_MODULE_2__["default"])(allMessages.join('. '), 'error', 'center', 'bottom', false, true, 15000, true);
  }
};

const performDomCheck = () => {
  const blockViolations = checkBlocks();
  const sectionViolations = checkSections();
  logCombinedViolations(blockViolations, sectionViolations);
};

const existingElement = document.querySelector('body > helix-sidekick');
if (existingElement) {
  performDomCheck();
} else {
  const callback = (mutationsList, observer) => {
    mutationsList.forEach((mutation) => {
      if (mutation.type === 'childList') {
        mutation.addedNodes.forEach((node) => {
          if (node.nodeType === 1 && node.tagName.toLowerCase() === 'helix-sidekick') {
            performDomCheck();
            observer.disconnect();
          }
        });
      }
    });
  };

  const observer = new MutationObserver(callback);
  observer.observe(targetNode, config);
}

__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ })

}]);