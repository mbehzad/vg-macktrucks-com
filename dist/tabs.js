"use strict";
(self["webpackChunk_adobe_helix_project_boilerplate"] = self["webpackChunk_adobe_helix_project_boilerplate"] || []).push([["tabs"],{

/***/ "./blocks/tabs/tabs.js":
/*!*****************************!*\
  !*** ./blocks/tabs/tabs.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ decorate)
/* harmony export */ });
function decorate(block) {
  const tabsItems = block.querySelectorAll(':scope > div');
  // makes the 1st tab by default as the active one...
  tabsItems.forEach((el, i) => {
    el.className = i > 0 ? `tabs-tab-item${i === 1 ? ' active' : ''}` : 'tabs-tab-titles';
  });
  const tabTitles = block.querySelector('.tabs-tab-titles ul');
  const items = block.querySelectorAll('.tabs-tab-item');
  // ... also for the 1st tab-title
  const defaultActive = tabTitles.firstElementChild;
  defaultActive.className = 'active';
  // make tab-titles focusable
  [...tabTitles.children].forEach((li) => { li.tabIndex = 0; });
  // add picture & text wrappers a css class
  [...items].forEach((item) => {
    const picture = item.querySelector('picture');
    const p = item.querySelector('p');
    picture.parentElement.className = 'tab-picture-wrapper';
    p.parentElement.className = 'tab-text-wrapper';
  });

  const setActiveTab = (e) => {
    if (e.target.localName !== 'li') return;
    const { parentElement } = e.target;
    const idx = [...parentElement.children].indexOf(e.target);
    [...parentElement.children].forEach((li, i) => {
      li.className = '';
      items[i].classList.remove('active');
    });
    e.target.className = 'active';
    items[idx].classList.add('active');
  };

  tabTitles.onclick = (e) => setActiveTab(e);
  tabTitles.onkeydown = (e) => {
    if (e.key === 'Enter') setActiveTab(e);
  };
}


/***/ })

},
/******/ __webpack_require__ => { // webpackRuntimeModules
/******/ var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
/******/ var __webpack_exports__ = (__webpack_exec__("./blocks/tabs/tabs.js"));
/******/ }
]);