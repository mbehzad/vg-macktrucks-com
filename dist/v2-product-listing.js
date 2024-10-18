"use strict";
(self["webpackChunk_adobe_helix_project_boilerplate"] = self["webpackChunk_adobe_helix_project_boilerplate"] || []).push([["v2-product-listing"],{

/***/ "./blocks/v2-product-listing/v2-product-listing.js":
/*!*********************************************************!*\
  !*** ./blocks/v2-product-listing/v2-product-listing.js ***!
  \*********************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ decorate)
/* harmony export */ });
/* harmony import */ var _scripts_common_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../scripts/common.js */ "./scripts/common.js");
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([_scripts_common_js__WEBPACK_IMPORTED_MODULE_0__]);
_scripts_common_js__WEBPACK_IMPORTED_MODULE_0__ = (__webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__)[0];


const blockName = 'v2-product-listing';
const variantClasses = ['with-filter', 'with-dots'];

function getActiveFilterButton() {
  const AllFilterButtons = document.querySelectorAll(`.${blockName}__button-list .${blockName}__segment-button`);
  AllFilterButtons.forEach((filterButton) => {
    filterButton.addEventListener('click', (e) => {
      AllFilterButtons.forEach((button) => {
        if (button !== e.target) {
          button.classList.remove('active');
        } else if (button === e.target && !button.classList.contains('active')) {
          e.target.classList.toggle('active');
        }
      });
    });
  });
}

function getPictures(imageWrapper) {
  const pictures = [...imageWrapper.querySelectorAll('picture')];
  const imageURLs = (0,_scripts_common_js__WEBPACK_IMPORTED_MODULE_0__.getImageURLs)(pictures);
  const imageData = imageURLs.map((src) => ({ src, breakpoints: [] }));

  if (imageData.length === 2) {
    imageData[0].breakpoints = [
      { media: '(min-width: 600px)', width: 600 },
      { media: '(min-width: 1200px)', width: 1200 },
      { media: '(min-width: 1440px)', width: 1440 },
      { width: 750 },
    ];
  }

  if (imageData.length > 2) {
    imageData[0].breakpoints = [
      { media: '(min-width: 600px)', width: 600 },
      { width: 750 },
    ];

    imageData[1].breakpoints = [
      { media: '(min-width: 1200px)', width: 1200 },
      { media: '(min-width: 1440px)', width: 1440 },
    ];
  }
  const newPicture = (0,_scripts_common_js__WEBPACK_IMPORTED_MODULE_0__.createResponsivePicture)(imageData, true, 'small image', `${blockName}__image`);

  return [newPicture, pictures[pictures.length - 1]];
}

function buildProductImageDom(prodEle) {
  const productImageWrapper = prodEle.querySelectorAll(`.${blockName}__product > div:first-child`);

  productImageWrapper.forEach((imageWrapper) => {
    imageWrapper.classList.add(`${blockName}__product-image`);
    const pictures = getPictures(imageWrapper);
    const link = imageWrapper.querySelector('a');
    link.text = '';
    link.classList.add(`${blockName}__product-image-link`);
    link.append(...pictures);
    imageWrapper.innerHTML = '';
    imageWrapper.append(link);
  });
}

function buildProductInfoDom(prodEle) {
  const productInfoWrapper = prodEle.querySelectorAll(`.${blockName}__product> div:last-child`);
  productInfoWrapper.forEach((info) => {
    const buttonContainer = (0,_scripts_common_js__WEBPACK_IMPORTED_MODULE_0__.createElement)('div', { classes: `${blockName}__button-container` });
    const buttons = info.querySelectorAll('.button-container a');
    const primaryButton = info.querySelector('.button--primary');

    info.classList.add(`${blockName}__product-info`);

    [...buttons].forEach((b) => {
      const parent = b.parentElement;
      b.classList.add('button--large');
      buttonContainer.appendChild(b);
      parent.remove(); // Remove the previous empty button container
    });
    info.appendChild(buttonContainer);

    primaryButton?.addEventListener('mouseover', () => {
      info.previousElementSibling.classList.add(`${blockName}__product-image--show-background`);
    });

    primaryButton?.addEventListener('mouseout', () => {
      info.previousElementSibling.classList.remove(`${blockName}__product-image--show-background`);
    });
  });
}

function buildSegments(segmentList, allSegmentNames) {
  segmentList.forEach((ul) => {
    ul.classList.add(`${blockName}__segment-list`);
    const segmentListItems = ul.querySelectorAll('li');
    const segmentNames = Array.from(segmentListItems)
      .map((item) => {
        const segmentName = item.textContent.trim().toLowerCase().replaceAll(' ', '-');
        if (!allSegmentNames.includes(segmentName)) {
          allSegmentNames.push(segmentName);
        }
        return segmentName;
      });
    const product = ul.closest(`.${blockName}__product`);
    segmentNames.forEach((segment) => {
      product.classList.add(segment);
    });
  });
}

function handFilterClick(e) {
  const products = document.querySelectorAll(`.${blockName}__product`);
  const clickedSegment = e.target.textContent.trim().toLowerCase();
  const selectedItem = document.querySelector(`.${blockName}__selected-item`);
  selectedItem.textContent = clickedSegment;

  products.forEach((product) => {
    const isAllProducts = clickedSegment === (0,_scripts_common_js__WEBPACK_IMPORTED_MODULE_0__.getTextLabel)('All Products').trim().toLowerCase();
    product.style.display = product.classList.contains(clickedSegment) || isAllProducts ? 'flex' : 'none';
    const isSelected = product.style.display === 'flex';
    product.style.display = isSelected ? 'flex' : 'none';
    product.classList.toggle('selected-product', isSelected);
  });

  const allProductsRows = document.querySelectorAll(`.${blockName}__product`);

  allProductsRows.forEach((product) => {
    if (product.classList.contains('selected-product')) {
      product.classList.remove('odd', 'even');

      const selectedProducts = document.querySelectorAll('.selected-product');

      selectedProducts.forEach((selectedProduct, i) => {
        if (i % 2 === 0) {
          selectedProduct.classList.remove('even-row');
          selectedProduct.classList.add('odd-row');
        } else {
          selectedProduct.classList.remove('odd-row');
          selectedProduct.classList.add('even-row');
        }
      });
    } else if (!product.classList.contains('selected-product')) {
      product.classList.remove('odd', 'even');
    }
  });
}

function buildFilter(allSegmentNames) {
  const dropdownWrapper = (0,_scripts_common_js__WEBPACK_IMPORTED_MODULE_0__.createElement)('div', { classes: `${blockName}__dropdown` });
  const selectedItemWrapper = (0,_scripts_common_js__WEBPACK_IMPORTED_MODULE_0__.createElement)('div', { classes: `${blockName}__selected-item-wrapper` });
  const selectedItem = (0,_scripts_common_js__WEBPACK_IMPORTED_MODULE_0__.createElement)('div', { classes: `${blockName}__selected-item` });
  const segmentNamesList = (0,_scripts_common_js__WEBPACK_IMPORTED_MODULE_0__.createElement)('ul', { classes: `${blockName}__button-list` });

  const dropdownArrowIcon = (0,_scripts_common_js__WEBPACK_IMPORTED_MODULE_0__.createElement)('span', { classes: [`${blockName}__icon`, 'icon', 'icon-dropdown-caret'] });
  selectedItemWrapper.append(selectedItem);
  selectedItemWrapper.appendChild(dropdownArrowIcon);

  dropdownWrapper.append(selectedItemWrapper);
  dropdownWrapper.append(segmentNamesList);

  allSegmentNames.forEach((segment, index) => {
    const li = (0,_scripts_common_js__WEBPACK_IMPORTED_MODULE_0__.createElement)('li');
    const filterButton = (0,_scripts_common_js__WEBPACK_IMPORTED_MODULE_0__.createElement)('button', { classes: `${blockName}__segment-button` });
    filterButton.textContent = segment;

    if (index === 0) { // Default selected item
      filterButton.classList.add('active');
      selectedItem.textContent = segment;
    }

    segmentNamesList.appendChild(li);
    li.append(filterButton);

    filterButton.addEventListener('click', handFilterClick);
  });

  return dropdownWrapper;
}

function handleListeners(dropdownWrapper) {
  // Listener to toggle the dropdown (open / close)
  document.addEventListener('click', (e) => {
    if (e.target.closest(`.${blockName}__selected-item-wrapper`)) {
      dropdownWrapper.classList.toggle(`${blockName}__dropdown--open`);
    } else {
      dropdownWrapper.classList.remove(`${blockName}__dropdown--open`);
    }
  });
}

function decorate(block) {
  (0,_scripts_common_js__WEBPACK_IMPORTED_MODULE_0__.variantsClassesToBEM)(block.classList, variantClasses, blockName);

  const productElement = block.querySelectorAll(`.${blockName} > div`);
  productElement.forEach((prodEle) => {
    prodEle.classList.add(`${blockName}__product`);
    buildProductImageDom(prodEle);
    buildProductInfoDom(prodEle);
  });

  block.parentElement.classList.add('full-width');
  // Add product name to product element class list
  getProductName();

  if (block.classList.contains(`${blockName}--with-filter`)) {
    // Create menu buttons from product segments
    const segmentList = document.querySelectorAll(`.${blockName}__product > div > ul`);
    const allSegmentNames = [(0,_scripts_common_js__WEBPACK_IMPORTED_MODULE_0__.getTextLabel)('All Products')];
    buildSegments(segmentList, allSegmentNames);
    const dropdownWrapper = buildFilter(allSegmentNames);
    block.prepend(dropdownWrapper);

    handleListeners(dropdownWrapper);
    getActiveFilterButton();
  } else {
    const detailList = document.querySelectorAll(`.${blockName}__product > div > ul`);
    detailList.forEach((ul) => {
      ul.classList.add(`${blockName}__detail-list`);
    });
  }

  (0,_scripts_common_js__WEBPACK_IMPORTED_MODULE_0__.decorateIcons)(block);
}

function getProductName() {
  const modelName = document.querySelectorAll(`.${blockName}__product > div + div > h3`);
  modelName.forEach((model) => {
    const parentNodeElement = model.parentNode.parentNode;
    parentNodeElement.classList.add(model.id);
  });
}

__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ })

},
/******/ __webpack_require__ => { // webpackRuntimeModules
/******/ var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
/******/ var __webpack_exports__ = (__webpack_exec__("./blocks/v2-product-listing/v2-product-listing.js"));
/******/ }
]);