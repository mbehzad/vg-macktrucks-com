"use strict";
(self["webpackChunk_adobe_helix_project_boilerplate"] = self["webpackChunk_adobe_helix_project_boilerplate"] || []).push([["templates_magazine_magazine_js"],{

/***/ "./templates/magazine/magazine.js":
/*!****************************************!*\
  !*** ./templates/magazine/magazine.js ***!
  \****************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ decorate)
/* harmony export */ });
/* harmony import */ var _scripts_aem_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../scripts/aem.js */ "./scripts/aem.js");
/* harmony import */ var _scripts_common_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../scripts/common.js */ "./scripts/common.js");
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([_scripts_common_js__WEBPACK_IMPORTED_MODULE_1__]);
_scripts_common_js__WEBPACK_IMPORTED_MODULE_1__ = (__webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__)[0];



async function buildArticleHero({ truckTags, categoryTag } = {}) {
  const title = (0,_scripts_aem_js__WEBPACK_IMPORTED_MODULE_0__.getMetadata)('og:title');
  const headPic = (0,_scripts_aem_js__WEBPACK_IMPORTED_MODULE_0__.getMetadata)('og:image');
  const headAlt = (0,_scripts_aem_js__WEBPACK_IMPORTED_MODULE_0__.getMetadata)('og:image:alt');

  const truckModel = truckTags || (0,_scripts_aem_js__WEBPACK_IMPORTED_MODULE_0__.getMetadata)('truck');
  const category = categoryTag || (0,_scripts_aem_js__WEBPACK_IMPORTED_MODULE_0__.getMetadata)('category');

  const section = (0,_scripts_common_js__WEBPACK_IMPORTED_MODULE_1__.createElement)('div', { classes: ['section', 'template', 'article-template', 'article-hero-container'] });

  const headImg = (0,_scripts_aem_js__WEBPACK_IMPORTED_MODULE_0__.createOptimizedPicture)(headPic, headAlt);
  const articleHeroImage = (0,_scripts_common_js__WEBPACK_IMPORTED_MODULE_1__.createElement)('div', { classes: 'article-hero-image' });
  const articleHeroContent = (0,_scripts_common_js__WEBPACK_IMPORTED_MODULE_1__.createElement)('div', { classes: 'article-hero-content' });

  const categoryUrl = category.toLowerCase().replaceAll(' ', '-');
  const categorySpan = (0,_scripts_common_js__WEBPACK_IMPORTED_MODULE_1__.createElement)('a', {
    classes: 'article-hero-category',
    props: { href: `/magazine/categories/${categoryUrl}` },
  });
  categorySpan.innerText = category;

  const titleH4 = (0,_scripts_common_js__WEBPACK_IMPORTED_MODULE_1__.createElement)('h4', { classes: 'article-hero-title' });
  titleH4.innerText = title;

  const truck = (0,_scripts_common_js__WEBPACK_IMPORTED_MODULE_1__.createElement)('div', { classes: 'article-hero-truck' });
  const truckText = (0,_scripts_common_js__WEBPACK_IMPORTED_MODULE_1__.createElement)('p', { classes: 'truck-text' });
  truckText.innerText = truckModel;
  const truckIcon = (0,_scripts_common_js__WEBPACK_IMPORTED_MODULE_1__.createElement)('img', {
    classes: 'truck-icon',
    props: { src: '/icons/Truck_Key_icon.svg', alt: 'truck icon' },
  });

  articleHeroImage.append(headImg);
  truck.append(truckIcon, truckText);

  articleHeroContent.append(categorySpan, titleH4);
  if (truckModel.length !== 0) articleHeroContent.append(truck);
  section.append(articleHeroImage, articleHeroContent);

  return section;
}

async function buildSection(container, sectionName = '') {
  const selectedContent = container.querySelector(`.${sectionName}-container .${sectionName}-wrapper`);
  const classes = sectionName === 'breadcrumbs' ? ['section', 'template', 'article-template', `${sectionName}-container`] : `${sectionName}-container`;
  const sectionContainer = (0,_scripts_common_js__WEBPACK_IMPORTED_MODULE_1__.createElement)('div', { classes });
  sectionContainer.append(selectedContent);

  return sectionContainer;
}

async function buildShareSection() {
  const shareSection = (0,_scripts_common_js__WEBPACK_IMPORTED_MODULE_1__.createElement)('div', { classes: 'share-wrapper' });
  const shareItems = [
    ['envelope', 'Share via email', 'mailto:?body=', 'Email', '#FD6D4B'],
    ['twitter', 'Share on Twitter', 'https://twitter.com/intent/tweet?url=', 'Tweet', '#1C9BEF'],
    ['facebook', 'Share on Facebook', 'https://www.facebook.com/sharer/sharer.php?u=', 'Like', '#1977F2'],
  ];
  const shareSidebar = (0,_scripts_common_js__WEBPACK_IMPORTED_MODULE_1__.createElement)('div', { classes: 'share' });
  const shareList = (0,_scripts_common_js__WEBPACK_IMPORTED_MODULE_1__.createElement)('div', { classes: 'share-icons' });
  shareItems.forEach((share) => {
    const icon = (0,_scripts_common_js__WEBPACK_IMPORTED_MODULE_1__.createElement)('span', { classes: ['icon', `fa-${share[0]}`] });
    const shareItem = (0,_scripts_common_js__WEBPACK_IMPORTED_MODULE_1__.createElement)('button', {
      classes: share[0],
      props: { title: share[1], type: 'button' },
    });
    shareItem.addEventListener('click', () => {
      window.open(`${share[2]}${window.location.href}`, '_blank');
    });
    const [, , , label, color] = share;
    shareItem.innerText = label;
    shareItem.style.backgroundColor = color;

    shareItem.append(icon);
    shareList.append(shareItem);
  });
  shareSidebar.append(shareList);
  shareSection.append(shareSidebar);

  return shareSection;
}

async function decorate(doc) {
  const categoryTag = await (0,_scripts_common_js__WEBPACK_IMPORTED_MODULE_1__.getArticleTags)('categories');
  const truckTags = await (0,_scripts_common_js__WEBPACK_IMPORTED_MODULE_1__.getArticleTags)('trucks');

  const container = doc.querySelector('main');

  const article = (0,_scripts_common_js__WEBPACK_IMPORTED_MODULE_1__.createElement)('div', { classes: 'article-content' });
  const articleTexts = (0,_scripts_common_js__WEBPACK_IMPORTED_MODULE_1__.createElement)('div', { classes: ['section', 'template', 'article-template', 'article-texts-container'] });
  const currentArticle = (0,_scripts_common_js__WEBPACK_IMPORTED_MODULE_1__.createElement)('div', { classes: 'current-article-container' });

  const [
    breadSection,
    heroSection,
    shareSection1,
    shareSection2,
    recentSection,
    recommendationsSection,
  ] = await Promise.all([
    buildSection(container, 'breadcrumb'),
    buildArticleHero({ truckTags, categoryTag }),
    buildShareSection(),
    buildShareSection(),
    buildSection(container, 'recent-articles'),
    buildSection(container, 'recommendations'),
  ]);

  const authorName = (0,_scripts_aem_js__WEBPACK_IMPORTED_MODULE_0__.getMetadata)('author');
  const author = (0,_scripts_common_js__WEBPACK_IMPORTED_MODULE_1__.createElement)('p', { classes: 'author-text' });
  author.innerText = authorName;

  const defaultContent = container.querySelector('.default-content-wrapper');
  const subscribeContent = container.querySelector('.magazine-subscribe-wrapper');

  const parentSection = defaultContent.parentNode;
  parentSection.classList.add('default-content-container');
  parentSection.classList.remove('breadcrumb-container', 'recent-articles-container');
  parentSection.style.display = 'unset';

  const altSubtitle = (0,_scripts_common_js__WEBPACK_IMPORTED_MODULE_1__.createElement)('h5', { classes: 'default-content-subtitle' });
  altSubtitle.innerText = (0,_scripts_aem_js__WEBPACK_IMPORTED_MODULE_0__.getMetadata)('og:title');

  const firstHeading = defaultContent.querySelector('h5') ?? altSubtitle;
  firstHeading?.classList.add('default-content-subtitle');

  parentSection.insertAdjacentElement('afterbegin', firstHeading);

  currentArticle.append(
    firstHeading,
    author,
    shareSection1,
    parentSection,
    shareSection2,
  );
  articleTexts.append(currentArticle, recommendationsSection, recentSection);
  article.append(
    breadSection,
    heroSection,
    articleTexts,
    ...(subscribeContent ? [subscribeContent] : []),
  );

  container.innerText = '';
  container.append(article);
}

__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ })

}]);