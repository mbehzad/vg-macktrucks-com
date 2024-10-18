"use strict";
(self["webpackChunk_adobe_helix_project_boilerplate"] = self["webpackChunk_adobe_helix_project_boilerplate"] || []).push([["v2-all-trucks"],{

/***/ "./blocks/v2-all-trucks/v2-all-trucks.js":
/*!***********************************************!*\
  !*** ./blocks/v2-all-trucks/v2-all-trucks.js ***!
  \***********************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ decorate)
/* harmony export */ });
/* harmony import */ var _scripts_common_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../scripts/common.js */ "./scripts/common.js");
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([_scripts_common_js__WEBPACK_IMPORTED_MODULE_0__]);
_scripts_common_js__WEBPACK_IMPORTED_MODULE_0__ = (__webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__)[0];


// Define break point/s
const blockName = 'v2-all-trucks';

function decorate(block) {
  const truckElement = block.querySelectorAll(`.${blockName} > div`);
  truckElement.forEach((div) => {
    div.classList.add(`${blockName}__truck`);

    const truckImageWrapper = block.querySelectorAll(`.${blockName}__truck > div:first-child`);
    truckImageWrapper.forEach((imageWrapper) => {
      imageWrapper.classList.add(`${blockName}__truck-image`);
      const pictures = imageWrapper.querySelectorAll('picture');
      const link = imageWrapper.querySelector('a');
      link.text = '';
      link.classList.remove('button', 'button--primary');
      link.append(...pictures);
      imageWrapper.innerHTML = '';
      imageWrapper.append(link);
    });

    const truckInfoWrapper = block.querySelectorAll(`.${blockName}__truck> div:last-child`);
    truckInfoWrapper.forEach((info) => {
      info.classList.add(`${blockName}__truck-info`);
    });
  });

  const trucksWrapper = document.querySelector(`.${blockName}-wrapper`);
  trucksWrapper.classList.add('full-width');

  const trucks = document.querySelectorAll(`.${blockName}__truck`);
  const segmentList = document.querySelectorAll(`.${blockName}__truck > div > ul`);

  // Add truck name to truck element class list
  getTruckName();

  // Create menu buttons from truck segments
  const allSegmentNames = [(0,_scripts_common_js__WEBPACK_IMPORTED_MODULE_0__.getTextLabel)('All Trucks')];
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
    const truck = ul.closest(`.${blockName}__truck`);
    segmentNames.forEach((segment) => {
      truck.classList.add(segment);
    });
  });

  const dropdownWrapper = (0,_scripts_common_js__WEBPACK_IMPORTED_MODULE_0__.createElement)('div', { classes: `${blockName}__dropdown` });
  const selectedItemWrapper = (0,_scripts_common_js__WEBPACK_IMPORTED_MODULE_0__.createElement)('div', { classes: `${blockName}__selected-item-wrapper` });
  const selectedItem = (0,_scripts_common_js__WEBPACK_IMPORTED_MODULE_0__.createElement)('div', { classes: `${blockName}__selected-item` });
  const segmentNamesList = (0,_scripts_common_js__WEBPACK_IMPORTED_MODULE_0__.createElement)('ul', { classes: `${blockName}__button-list` });

  // Create a dropdown icon fragment
  const dropdownArrowIcon = document.createRange().createContextualFragment(`<span class="${blockName}__svg-wrapper">
    <svg xmlns="http://www.w3.org/2000/svg"><use href="#icons-sprite-dropdown-caret"></use></svg>
  </span>`);
  selectedItemWrapper.append(selectedItem);
  selectedItemWrapper.appendChild(...dropdownArrowIcon.children);

  dropdownWrapper.append(selectedItemWrapper);
  dropdownWrapper.append(segmentNamesList);
  block.prepend(dropdownWrapper);
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

    filterButton.addEventListener('click', () => {
      const clickedSegment = filterButton.textContent.trim()
        .toLowerCase();
      selectedItem.textContent = clickedSegment;

      trucks.forEach((truck) => {
        const isAllTrucks = clickedSegment === (0,_scripts_common_js__WEBPACK_IMPORTED_MODULE_0__.getTextLabel)('All trucks').trim().toLowerCase();
        truck.style.display = truck.classList.contains(clickedSegment) || isAllTrucks ? 'flex' : 'none';
        const isSelected = truck.style.display === 'flex';
        truck.style.display = isSelected ? 'flex' : 'none';
        truck.classList.toggle('selected-truck', isSelected);
      });

      const allTrucksRows = document.querySelectorAll(`.${blockName}__truck`);

      allTrucksRows.forEach((truck) => {
        if (truck.classList.contains('selected-truck')) {
          truck.classList.remove('odd', 'even');

          const selectedTrucks = document.querySelectorAll('.selected-truck');

          selectedTrucks.forEach((selectedTruck, i) => {
            if (i % 2 === 0) {
              selectedTruck.classList.remove('even-row');
              selectedTruck.classList.add('odd-row');
            } else {
              selectedTruck.classList.remove('odd-row');
              selectedTruck.classList.add('even-row');
            }
          });
        } else if (!truck.classList.contains('selected-truck')) {
          truck.classList.remove('odd', 'even');
        }
      });
    });
  });

  // Listener to toggle the dropdown (open / close)
  document.addEventListener('click', (e) => {
    if (e.target.closest(`.${blockName}__selected-item-wrapper`)) {
      dropdownWrapper.classList.toggle(`${blockName}__dropdown--open`);
    } else {
      dropdownWrapper.classList.remove(`${blockName}__dropdown--open`);
    }
  });

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

  getActiveFilterButton();
}

function getTruckName() {
  const modelName = document.querySelectorAll(`.${blockName}__truck > div + div > h3`);
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
/******/ var __webpack_exports__ = (__webpack_exec__("./blocks/v2-all-trucks/v2-all-trucks.js"));
/******/ }
]);