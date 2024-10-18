"use strict";
(self["webpackChunk_adobe_helix_project_boilerplate"] = self["webpackChunk_adobe_helix_project_boilerplate"] || []).push([["sub-nav"],{

/***/ "./blocks/sub-nav/sub-nav.js":
/*!***********************************!*\
  !*** ./blocks/sub-nav/sub-nav.js ***!
  \***********************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ decorate)
/* harmony export */ });
/* harmony import */ var _scripts_scripts_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../scripts/scripts.js */ "./scripts/scripts.js");
/* harmony import */ var _scripts_common_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../scripts/common.js */ "./scripts/common.js");
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([_scripts_scripts_js__WEBPACK_IMPORTED_MODULE_0__, _scripts_common_js__WEBPACK_IMPORTED_MODULE_1__]);
([_scripts_scripts_js__WEBPACK_IMPORTED_MODULE_0__, _scripts_common_js__WEBPACK_IMPORTED_MODULE_1__] = __webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__);



const MQ = window.matchMedia('(min-width: 1140px)');
const subscribeText = (0,_scripts_common_js__WEBPACK_IMPORTED_MODULE_1__.getTextLabel)('SUBSCRIBE TO BULLDOG');
const overviewText = (0,_scripts_common_js__WEBPACK_IMPORTED_MODULE_1__.getTextLabel)('Overview');
let fullHeight = 0;

function toggleHeightList(ul) {
  const isOpen = ul.classList.contains('open');
  if (ul.offsetHeight >= fullHeight) fullHeight = ul.offsetHeight;
  ul.style.maxHeight = `${isOpen ? fullHeight : 0}px`;
}

function setDefaultHeight(ul) {
  fullHeight = ul.offsetHeight;
  ul.style.maxHeight = 0;
}

function setOverviewUrl(ref, currentUrl) {
  const subNavPath = ref.replace('sub-nav', '');
  const subNavUrl = new URL(currentUrl);
  subNavUrl.pathname = subNavPath;
  return subNavPath.pathname === currentUrl.pathname ? currentUrl.href : subNavUrl.href;
}

async function createSubNav(block, ref) {
  const resp = await fetch(`${ref}.plain.html`);
  if (!resp.ok) return;
  const currentUrl = new URL(window.location);
  const { pathname } = currentUrl;
  const overviewUrl = setOverviewUrl(ref, currentUrl);
  const text = await resp.text();
  const fragment = document.createRange().createContextualFragment(text);
  const title = fragment.querySelector('p');
  const textUl = fragment.querySelector('ul');
  const subNavWrapper = (0,_scripts_common_js__WEBPACK_IMPORTED_MODULE_1__.createElement)('div', { classes: 'sub-nav-container' });
  const ul = textUl || (0,_scripts_common_js__WEBPACK_IMPORTED_MODULE_1__.createElement)('ul');
  const buttons = (0,_scripts_scripts_js__WEBPACK_IMPORTED_MODULE_0__.getAllElWithChildren)(fragment.querySelectorAll('p'), 'em, strong');
  const ctasWrapper = buttons.length > 0 && (0,_scripts_common_js__WEBPACK_IMPORTED_MODULE_1__.createElement)('li', { classes: 'sub-nav-cta-wrapper' });
  // add a caret arrow for mobile version
  const caretIcon = (0,_scripts_common_js__WEBPACK_IMPORTED_MODULE_1__.createElement)('div', { classes: ['fa', 'fa-caret-down', 'icon'] });

  if (textUl) {
    const overview = (0,_scripts_common_js__WEBPACK_IMPORTED_MODULE_1__.createElement)('li');
    const overviewLink = (0,_scripts_common_js__WEBPACK_IMPORTED_MODULE_1__.createElement)('a', { props: { href: overviewUrl } });
    // set the active link, if is not found then use overview as default
    const activeLink = [...ul.querySelectorAll('li a')].find((a) => new URL(a.href).pathname === pathname);
    const activeLi = activeLink ? activeLink.closest('li') : overview;
    activeLi.className = 'active';
    overviewLink.textContent = overviewText;
    overview.appendChild(overviewLink);
    ul.prepend(overview);
  }
  title.className = 'sub-nav-title';
  if (ctasWrapper) {
    buttons.forEach((btn) => {
      ctasWrapper.appendChild(btn);
    });
    ul.appendChild(ctasWrapper);
    (0,_scripts_scripts_js__WEBPACK_IMPORTED_MODULE_0__.decorateButtons)(ctasWrapper);
  }
  subNavWrapper.append(caretIcon, title, ul);
  block.appendChild(subNavWrapper);
  if (!MQ.matches) setDefaultHeight(ul);

  window.onresize = () => {
    const isDesktop = MQ.matches;
    if (isDesktop) {
      caretIcon.classList.remove('fa-caret-up');
      ul.classList.remove('open');
      ul.style.maxHeight = null;
    } else if (ul.style.maxHeight === '') {
      setDefaultHeight(ul);
    }
  };

  caretIcon.onclick = () => {
    caretIcon.classList.toggle('fa-caret-up');
    ul.classList.toggle('open');
    toggleHeightList(ul);
  };
}

function toggleListMagazine(el) {
  el.classList.toggle('open');
}

async function buildMagazineSubNav(block, ref) {
  const resp = await fetch(`${ref}.plain.html`);
  if (!resp.ok) return;
  const subscribeSection = document.querySelector('[data-form-type="Subscribe-magazine"]');
  const isSubscribeEnabled = !!_scripts_common_js__WEBPACK_IMPORTED_MODULE_1__.MAGAZINE_CONFIGS.HREF && !!subscribeSection;
  const text = await resp.text();
  const fragment = document.createRange().createContextualFragment(text);
  const mainTitleImgWrapper = fragment.querySelector('div');
  // bar main section
  const mainTitleImg = mainTitleImgWrapper.querySelector('picture');
  const mainTitleLink = mainTitleImgWrapper.querySelector('a');
  const subNavContainer = (0,_scripts_common_js__WEBPACK_IMPORTED_MODULE_1__.createElement)('div', { classes: 'sub-nav-container' });
  const subNavTitle = (0,_scripts_common_js__WEBPACK_IMPORTED_MODULE_1__.createElement)('p', { classes: 'sub-nav-title' });
  const mainSubNav = (0,_scripts_common_js__WEBPACK_IMPORTED_MODULE_1__.createElement)('div', { classes: 'sub-nav-content' });
  // add (hamburger menu)/(down arrow) to open close the sub-nav-list
  const iconClass = MQ.matches ? 'fa-bars' : 'fa-caret-down';
  const listIcon = (0,_scripts_common_js__WEBPACK_IMPORTED_MODULE_1__.createElement)('div', { classes: ['fa', iconClass, 'icon'] });
  // hamburger dropdown: list section overlay
  const closeBtn = (0,_scripts_common_js__WEBPACK_IMPORTED_MODULE_1__.createElement)('div', { classes: ['fa', 'fa-close', 'icon'] });
  const listContainer = (0,_scripts_common_js__WEBPACK_IMPORTED_MODULE_1__.createElement)('div', { classes: 'sub-nav-list-container' });
  const listWrapper = (0,_scripts_scripts_js__WEBPACK_IMPORTED_MODULE_0__.getAllElWithChildren)(fragment.querySelectorAll('div'), 'ul')[0];
  const dogIconWrapper = (0,_scripts_scripts_js__WEBPACK_IMPORTED_MODULE_0__.getAllElWithChildren)(listWrapper.querySelectorAll('p'), 'picture')[0];
  const mainList = listWrapper.querySelector('ul');
  const innerList = mainList.querySelector('ul');
  const elementsToAppend = [listIcon, mainSubNav, listContainer];
  listWrapper.className = 'sub-nav-list-wrapper';
  dogIconWrapper.className = 'sub-nav-list-icon';
  mainList.className = 'sub-nav-list main';
  innerList.className = 'sub-nav-list inner';
  listWrapper.appendChild(closeBtn);

  if (isSubscribeEnabled) {
    // add a cta button to open a form (subscribe to bulldog) in the dropdown list
    const listSubscribeBtnContainer = (0,_scripts_common_js__WEBPACK_IMPORTED_MODULE_1__.createElement)('div', { classes: 'list-button-container' });
    const listSubscribeBtn = (0,_scripts_common_js__WEBPACK_IMPORTED_MODULE_1__.createElement)('button', {
      classes: ['magazine-subscribe-button', 'list-subscribe-button'],
      props: { type: 'button' },
    });
    const supR = (0,_scripts_common_js__WEBPACK_IMPORTED_MODULE_1__.createElement)('sup');
    listSubscribeBtn.textContent = subscribeText;
    supR.textContent = '®';
    listSubscribeBtn.appendChild(supR);
    listSubscribeBtnContainer.appendChild(listSubscribeBtn);
    listContainer.append(listWrapper, listSubscribeBtnContainer);
  } else {
    listContainer.appendChild(listWrapper);
  }

  mainList.nextElementSibling.remove();

  // adding it to the block
  mainTitleLink.textContent = '';
  mainTitleLink.title = mainTitleImg.lastElementChild.alt;
  mainTitleLink.appendChild(mainTitleImg);
  subNavTitle.appendChild(mainTitleLink);
  mainSubNav.appendChild(subNavTitle);

  if (isSubscribeEnabled) {
    // add a cta button to open a form (subscribe to bulldog)
    const subscribeBtnContainer = (0,_scripts_common_js__WEBPACK_IMPORTED_MODULE_1__.createElement)('div', { classes: 'button-container' });
    const subscribeBtn = (0,_scripts_common_js__WEBPACK_IMPORTED_MODULE_1__.createElement)('button', {
      classes: ['magazine-subscribe-button', 'button-container'],
      props: { type: 'button' },
    });
    subscribeBtn.textContent = subscribeText;
    subscribeBtnContainer.appendChild(subscribeBtn);
    elementsToAppend.push(subscribeBtnContainer);
  }

  subNavContainer.append(...elementsToAppend);
  block.appendChild(subNavContainer);

  const allSubscribeButtons = document.querySelectorAll('.magazine-subscribe-button');
  allSubscribeButtons.forEach((btn) => {
    btn.addEventListener('click', () => {
      if (subscribeSection) {
        subscribeSection.scrollIntoView({ block: 'start', behavior: 'smooth' });
      } else if (_scripts_common_js__WEBPACK_IMPORTED_MODULE_1__.MAGAZINE_CONFIGS.HREF) {
        window.location.href = _scripts_common_js__WEBPACK_IMPORTED_MODULE_1__.MAGAZINE_CONFIGS.HREF;
      }
    });
  });

  window.onresize = () => {
    const isDesktop = MQ.matches;
    listIcon.classList.toggle('fa-bars', isDesktop);
    listIcon.classList.toggle('fa-caret-down', !isDesktop);
  };

  listIcon.onclick = () => {
    toggleListMagazine(listContainer);
  };

  closeBtn.onclick = () => {
    toggleListMagazine(listContainer);
  };
}

async function decorate(block) {
  const { content } = document.head.querySelector('meta[name="sub-navigation"]');
  if (content.includes('magazine')) {
    block.classList.add('magazine');
    buildMagazineSubNav(block, content);
    return;
  }
  createSubNav(block, content);
}

__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ })

},
/******/ __webpack_require__ => { // webpackRuntimeModules
/******/ var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
/******/ var __webpack_exports__ = (__webpack_exec__("./blocks/sub-nav/sub-nav.js"));
/******/ }
]);