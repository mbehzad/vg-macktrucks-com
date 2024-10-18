"use strict";
(self["webpackChunk_adobe_helix_project_boilerplate"] = self["webpackChunk_adobe_helix_project_boilerplate"] || []).push([["search"],{

/***/ "./blocks/search/autosuggest.js":
/*!**************************************!*\
  !*** ./blocks/search/autosuggest.js ***!
  \**************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   fetchAutosuggest: () => (/* binding */ fetchAutosuggest),
/* harmony export */   handleArrowDown: () => (/* binding */ handleArrowDown),
/* harmony export */   handleArrowUp: () => (/* binding */ handleArrowUp)
/* harmony export */ });
/* harmony import */ var _scripts_common_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../scripts/common.js */ "./scripts/common.js");
/* harmony import */ var _search_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./search-api.js */ "./blocks/search/search-api.js");
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([_scripts_common_js__WEBPACK_IMPORTED_MODULE_0__, _search_api_js__WEBPACK_IMPORTED_MODULE_1__]);
([_scripts_common_js__WEBPACK_IMPORTED_MODULE_0__, _search_api_js__WEBPACK_IMPORTED_MODULE_1__] = __webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__);



const autoSuggestClass = 'autosuggest-results-item-highlighted';

function fetchAutosuggest(term, autosuggestEle, rowEle, func) {
  const fragmentRange = document.createRange();

  (0,_search_api_js__WEBPACK_IMPORTED_MODULE_1__.fetchData)({
    query: (0,_search_api_js__WEBPACK_IMPORTED_MODULE_1__.autosuggestQuery)(),
    variables: {
      term,
      locale: 'EN',
      sizeSuggestions: 5,
    },
  }).then(({ errors, data }) => {
    if (errors) {
      // eslint-disable-next-line no-console
      console.log('%cSomething went wrong', errors);
    } else {
      const {
        macktrucksuggest: {
          terms,
        } = {},
      } = data;
      autosuggestEle.textContent = '';
      autosuggestEle.classList.remove('show');

      if (terms.length) {
        terms.forEach((val) => {
          const row = (0,_scripts_common_js__WEBPACK_IMPORTED_MODULE_0__.createElement)(rowEle.tag, { classes: rowEle.class, props: rowEle.props });
          const suggestFragment = fragmentRange
            .createContextualFragment(`<b>
            ${val}
          </b>`);
          row.appendChild(suggestFragment);

          row.onclick = () => func(val);

          autosuggestEle.appendChild(row);
          autosuggestEle.classList.add('show');
        });
      }
    }
  });
}

function handleArrowUp(props) {
  let { liSelected, next, index } = props;
  const { list } = props;
  const listLen = list.length - 1;

  if (liSelected) {
    liSelected.classList.remove(autoSuggestClass);
    index -= 1;

    next = list[index];
    if (next && index >= 0) {
      liSelected = next;
    } else {
      index = list.length - 1;
      liSelected = list[index];
    }
  } else {
    index = 0;
    liSelected = list[listLen];
  }

  liSelected.classList.add(autoSuggestClass);
  return { liSelected, index, next };
}

function handleArrowDown(props) {
  let { index, liSelected, next } = props;
  const { list } = props;

  index += 1;

  if (liSelected) {
    liSelected.classList.remove(autoSuggestClass);

    next = list[index];
    if (next && index < list.length) {
      liSelected = next;
    } else {
      index = 0;
      [liSelected] = list;
    }
  } else {
    index = 0;
    [liSelected] = list;
  }

  liSelected.classList.add(autoSuggestClass);
  return { index, liSelected, next };
}

__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ }),

/***/ "./blocks/search/search-api.js":
/*!*************************************!*\
  !*** ./blocks/search/search-api.js ***!
  \*************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   autosuggestQuery: () => (/* binding */ autosuggestQuery),
/* harmony export */   fetchData: () => (/* binding */ fetchData),
/* harmony export */   searchQuery: () => (/* binding */ searchQuery)
/* harmony export */ });
/* harmony import */ var _scripts_common_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../scripts/common.js */ "./scripts/common.js");
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([_scripts_common_js__WEBPACK_IMPORTED_MODULE_0__]);
_scripts_common_js__WEBPACK_IMPORTED_MODULE_0__ = (__webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__)[0];


const { SEARCH_URL_DEV, SEARCH_URL_PROD } = _scripts_common_js__WEBPACK_IMPORTED_MODULE_0__.SEARCH_URLS;
const isProd = !window.location.host.includes('hlx.page') && !window.location.host.includes('localhost');
const SEARCH_LINK = !isProd ? SEARCH_URL_DEV : SEARCH_URL_PROD;

async function fetchData(queryObj) {
  const response = await fetch(
    SEARCH_LINK,
    {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'Content-Length': queryObj.length,
      },
      body: JSON.stringify(queryObj),
    },
  );

  return response.json();
}

const searchQuery = (hasFilters) => `
query MacTrucksQuery($q: String, $offset: Int, $limit: Int, $language: MackLocaleEnum!,
$facets: [MackFacet], $sort: [MackSortOptionsEnum]${hasFilters ? ', $filters: [MackFilterItem]' : ''}) {
  macktrucksearch(q: $q, offset: $offset, limit: $limit, language: $language,
  facets: $facets, sort: $sort${hasFilters ? ', filters: $filters' : ''}) {
    count
    items {
      uuid
      score
      metadata {
        title
        description
        url
        lastModified
      }
    }
    facets {
      field
      items {
        value
        count
      }
    }
  }
}
`;

const autosuggestQuery = () => `query Macktrucksuggest($term: String!, $locale: MackLocaleEnum!, $sizeSuggestions: Int) {
  macktrucksuggest(term: $term, locale: $locale, sizeSuggestions: $sizeSuggestions) {
    terms
  }
}`;

__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ }),

/***/ "./blocks/search/search.js":
/*!*********************************!*\
  !*** ./blocks/search/search.js ***!
  \*********************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ decorate)
/* harmony export */ });
/* harmony import */ var _scripts_scripts_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../scripts/scripts.js */ "./scripts/scripts.js");
/* harmony import */ var _scripts_common_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../scripts/common.js */ "./scripts/common.js");
/* harmony import */ var _templates_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./templates.js */ "./blocks/search/templates.js");
/* harmony import */ var _search_api_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./search-api.js */ "./blocks/search/search-api.js");
/* harmony import */ var _autosuggest_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./autosuggest.js */ "./blocks/search/autosuggest.js");
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([_scripts_scripts_js__WEBPACK_IMPORTED_MODULE_0__, _scripts_common_js__WEBPACK_IMPORTED_MODULE_1__, _search_api_js__WEBPACK_IMPORTED_MODULE_3__, _autosuggest_js__WEBPACK_IMPORTED_MODULE_4__]);
([_scripts_scripts_js__WEBPACK_IMPORTED_MODULE_0__, _scripts_common_js__WEBPACK_IMPORTED_MODULE_1__, _search_api_js__WEBPACK_IMPORTED_MODULE_3__, _autosuggest_js__WEBPACK_IMPORTED_MODULE_4__] = __webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__);








const PLACEHOLDERS = {
  searchFor: (0,_scripts_common_js__WEBPACK_IMPORTED_MODULE_1__.getTextLabel)('Search For'),
  noResults: (0,_scripts_common_js__WEBPACK_IMPORTED_MODULE_1__.getTextLabel)('no results'),
  refine: (0,_scripts_common_js__WEBPACK_IMPORTED_MODULE_1__.getTextLabel)('refine'),
  showingResults: (0,_scripts_common_js__WEBPACK_IMPORTED_MODULE_1__.getTextLabel)('Showing results for'), // searchResultSummarySection
  sortBy: (0,_scripts_common_js__WEBPACK_IMPORTED_MODULE_1__.getTextLabel)('Sort By'), // searchOptionsSection
  sortFilter: (0,_scripts_common_js__WEBPACK_IMPORTED_MODULE_1__.getTextLabel)('Sort Filter'),
  previous: (0,_scripts_common_js__WEBPACK_IMPORTED_MODULE_1__.getTextLabel)('Previous'),
  next: (0,_scripts_common_js__WEBPACK_IMPORTED_MODULE_1__.getTextLabel)('Next'),
};

const SEARCH_PARAMS = {
  _q: 'q',
  _start: 'start',
  _sort: 'sort',
  _tags: 'tags',
  _category: 'category',
};

function decorate(block) {
  const section = block.closest('.section');
  // check if the closest default content wrapper is inside the same section element
  const siblingDefaultSection = section.querySelector('.default-content-wrapper');
  const popularSearchWrapper = siblingDefaultSection || section.nextElementSibling;
  const fragmentRange = document.createRange();
  popularSearchWrapper.classList.add('popular-search');

  // check if url has query params
  const {
    _q,
    _start,
    _sort,
    _tags,
    _category,
  } = SEARCH_PARAMS;
  const urlParams = new URLSearchParams(window.location.search);
  const searchTerm = urlParams.get(_q);
  let offset = urlParams.get(_start);
  offset = offset ? Number(offset) : 0;
  let resultCount = 0;
  const limit = 25;
  let nextOffset = offset + limit;
  let hasResults = true;
  let facetsFilters = [];

  const mainTemplate = (0,_templates_js__WEBPACK_IMPORTED_MODULE_2__.getMainTemplate)(PLACEHOLDERS);
  const mainFragment = fragmentRange.createContextualFragment(mainTemplate);
  block.textContent = '';
  block.appendChild(mainFragment);

  // after insert the main template, these elements are present then
  const searchBtn = block.querySelector('.sf-form > span');
  const input = document.getElementById('searchTerm');
  input.value = searchTerm;
  const facetsWrapper = document.getElementById('searchFacetSection');
  const resultsWrapper = document.getElementById('searchResultsSection');
  const summary = document.getElementById('searchResultSummarySection');
  const sortBy = document.getElementById('searchOptionsSection');
  const listEl = block.querySelector('.autosuggest__results-container ul');

  function sanitizeQueryTerm(query) {
    return query.replace(/[<>]/g, (tag) => {
      const replacements = {
        '<': '&lt;',
        '>': '&gt;',
      };
      return replacements[tag] || tag;
    });
  }

  function searchResults(hideAutoSuggest = true) {
    if (hideAutoSuggest) {
      listEl.textContent = '';
    }
    offset = 0;

    deleteUrlParam(_category);
    insertUrlParam(_q, input.value);
    insertUrlParam(_start, offset);

    fetchResults();
  }

  searchBtn.onclick = () => searchResults();

  const onclickHandler = (val) => {
    input.value = val;
    searchResults();
  };

  const delayFetchData = (0,_scripts_scripts_js__WEBPACK_IMPORTED_MODULE_0__.debounce)((term) => (0,_autosuggest_js__WEBPACK_IMPORTED_MODULE_4__.fetchAutosuggest)(term, listEl, {
    tag: 'li',
    class: 'autosuggest__results-item',
    props: {
      role: 'option',
      'data-section-name': 'default',
    },
  }, onclickHandler));

  let liSelected;
  let next;
  let index = -1;

  input.onkeyup = (e) => {
    const term = e.target.value;
    const list = listEl.getElementsByTagName('li');

    if (e.key === 'Enter') {
      searchResults();
    } else if (e.key === 'Escape') {
      listEl.textContent = '';
    } else if (['ArrowUp', 'ArrowDown'].includes(e.key)) {
      let returnObj;

      if (e.key === 'ArrowUp') {
        returnObj = (0,_autosuggest_js__WEBPACK_IMPORTED_MODULE_4__.handleArrowUp)({
          list,
          liSelected,
          index,
          next,
        });
      } else {
        returnObj = (0,_autosuggest_js__WEBPACK_IMPORTED_MODULE_4__.handleArrowDown)({
          list,
          liSelected,
          index,
          next,
        });
      }

      liSelected = returnObj.liSelected;
      index = returnObj.index;
      next = returnObj.next;
      input.value = liSelected.firstElementChild.textContent.replace(/[ ]{2,}/g, '');
      searchResults(false);
    } else {
      delayFetchData(term);
    }
  };

  // pagination events
  const paginationContainer = block.querySelector('.search-pagination-container');
  const countSpan = paginationContainer.querySelector('.count');
  const resRange = paginationContainer.querySelector('.page-range');

  const nextBtn = paginationContainer.querySelector('.next');
  nextBtn.onclick = () => pagination('next');

  const prevBtn = paginationContainer.querySelector('.prev');
  prevBtn.onclick = () => pagination('prev');

  const addMoreBtnToggleEvent = (e) => {
    const facetList = e.target.parentElement.previousElementSibling;
    const isMore = e.target.textContent.toLowerCase() === 'more';
    e.target.textContent = isMore ? 'Less' : 'More';
    [...facetList.children].forEach((li, i) => {
      if (i <= 2) return;
      li.classList.toggle('d-none', !isMore);
    });
  };

  const addFacetTitlesToggleEvent = (e) => {
    const titleList = e.target.closest('.sidebar-heading').nextElementSibling;
    const isShown = titleList.classList.contains('show');
    e.target.classList.toggle('active', !isShown);
    titleList.classList.toggle('show', !isShown);
  };

  const addToggleOverlayEvent = (sidebar, overlay, isOpen = false) => {
    const showClass = 'show-facet-overlay';
    sidebar.classList.toggle(showClass, isOpen);
    overlay.classList.toggle(showClass, isOpen);
  };

  // handle filters
  const addFilterEvent = (e, form) => {
    form.requestSubmit();
  };

  const updateFilterCheckbox = () => {
    // const facetsArr = facets.reduce((acc, curVal) => acc.concat(curVal.items), []);
    const form = block.querySelector('form');
    [...form].forEach((field) => {
      const isChecked = facetsFilters.find(({ value }) => value.includes(field.value));
      if (isChecked) {
        field.checked = true;
      }
    });
  };

  const addFilterSubmitEvent = (e) => {
    e.preventDefault();
    const form = e.target;
    const inputsChecked = [];
    [...form].forEach((field) => {
      inputsChecked.push(field.id);

      const facetIndex = facetsFilters.findIndex((item) => item.field === field.dataset.filter);

      if (facetIndex > -1) {
        facetsFilters[facetIndex].value = facetsFilters[facetIndex].value
          .filter((val) => val !== field.value);

        if (field.checked) {
          facetsFilters[facetIndex].value.push(field.value);
        }
        if (!facetsFilters[facetIndex].value.length) {
          facetsFilters = facetsFilters.filter((item) => item.field !== field.dataset.filter);
        }
      } else if (field.checked) {
        facetsFilters.push({
          field: field.dataset.filter,
          value: [field.value],
        });
      }
    });
    const filterParams = [_tags, _category];

    filterParams.forEach((item) => {
      const filter = facetsFilters.find(({ field }) => field.toLowerCase() === item);

      if (filter) {
        insertUrlParam(item, filter.value);
        return;
      }
      deleteUrlParam(item);
    });
    facetsFilters = [];
    offset = 0;
    insertUrlParam(_start, offset);
    fetchResults();
  };

  const addFacetsEvents = (facets) => {
    if (!facets) return;
    const facetSidebar = facets.querySelector('.sf-sidebar-container');
    const facetOverlay = facets.querySelector('.sidebar-background');
    const closeBtns = facets.querySelectorAll('.search-close-button, .close-button');
    const titles = facets.querySelectorAll('.sidebar-heading a');
    const filtersForm = facets.querySelector('#facetsFilters');
    if (titles.length > 0) {
      [...titles].forEach((title) => {
        title.onclick = addFacetTitlesToggleEvent;
      });
    }
    const moreBtns = facets.querySelectorAll('.more-less a');
    if (moreBtns.length > 0) {
      [...moreBtns].forEach((btn) => {
        btn.onclick = addMoreBtnToggleEvent;
      });
    }
    const filterByBtn = facets.querySelector('.pill');
    filterByBtn.onclick = () => {
      addToggleOverlayEvent(facetSidebar, facetOverlay, true);
    };

    [...closeBtns].forEach((btn) => {
      btn.onclick = () => addToggleOverlayEvent(facetSidebar, facetOverlay);
    });

    filtersForm.addEventListener('submit', addFilterSubmitEvent);
    filtersForm.onchange = (e) => addFilterEvent(e, filtersForm);

    if (facetsFilters.length) {
      updateFilterCheckbox();
    }
  };

  // handle sort
  const sortResults = block.querySelector('.custom-select-searchstudio-js');
  const sort = urlParams.get(_sort);
  if (sort) sortResults.value = sort;
  sortResults.onchange = (e) => {
    insertUrlParam(_sort, e.target.value);
    fetchResults();
  };

  function showResults(data) {
    const { items, count, facets } = data;
    const queryTerm = sanitizeQueryTerm(input.value);
    let resultsText = '';
    let facetsText = null;
    if (items.length > 0) { // items by query: 25, count has the total
      paginationContainer.classList.add('show');
      summary.parentElement.classList.remove('no-results');
      resultsText = (0,_templates_js__WEBPACK_IMPORTED_MODULE_2__.getResultsItemsTemplate)({ items, queryTerm });
      facetsText = (0,_templates_js__WEBPACK_IMPORTED_MODULE_2__.getFacetsTemplate)(facets);
      resultCount = count;
      hasResults = true;
    } else {
      const noResults = PLACEHOLDERS.noResults.replace('$0', `"${
        queryTerm.trim() === '' ? ' ' : queryTerm}"`);
      summary.parentElement.classList.add('no-results');
      resultsText = (0,_templates_js__WEBPACK_IMPORTED_MODULE_2__.getNoResultsTemplate)({ noResults, refine: PLACEHOLDERS.refine });
      hasResults = false;
    }
    const fragment = fragmentRange.createContextualFragment(resultsText);
    summary.textContent = '';
    resultsWrapper.textContent = '';
    facetsWrapper.textContent = '';
    if (hasResults) {
      const newOffset = nextOffset > count ? count : nextOffset;
      const showingResults = PLACEHOLDERS.showingResults.replace('$0', `${count > 0 ? offset + 1 : 0}`)
        .replace('$1', newOffset).replace('$2', count).replace('$3', queryTerm);
      const showingResultsText = (0,_templates_js__WEBPACK_IMPORTED_MODULE_2__.getShowingResultsTemplate)(showingResults);
      const summaryFragment = fragmentRange.createContextualFragment(showingResultsText);
      const facetsFragment = fragmentRange.createContextualFragment(facetsText);
      resultsWrapper.appendChild(fragment);
      summary.appendChild(summaryFragment);
      facetsWrapper.appendChild(facetsFragment);
      addFacetsEvents(facetsWrapper);
    } else {
      summary.appendChild(fragment);
      paginationContainer.classList.remove('show');
    }
    sortBy.classList.toggle('hide', !hasResults);
  }

  function deleteUrlParam(key) {
    if (window.history.pushState) {
      const searchUrl = new URL(window.location.href);
      searchUrl.searchParams.delete(key);
      window.history.pushState({}, '', searchUrl.toString());
    }
  }

  function insertUrlParam(key, value) {
    if (window.history.pushState) {
      const searchUrl = new URL(window.location.href);
      searchUrl.searchParams.set(key, value);
      window.history.pushState({}, '', searchUrl.toString());
    }
  }

  function updatePaginationDOM(data) {
    let isPrevDisabled = false;
    let isNextDisabled = false;
    const rangeText = `${offset + 1}-${nextOffset >= resultCount ? resultCount : nextOffset}`;

    // disable the prev , next buttons
    if (offset === 0) {
      isPrevDisabled = 'disabled';
    }
    if ((nextOffset) >= data.count) {
      isNextDisabled = 'disabled';
    }
    prevBtn.setAttribute('disabled', isPrevDisabled);
    nextBtn.setAttribute('disabled', isNextDisabled);
    resRange.innerText = rangeText;
  }

  async function fetchResults() {
    const searchParams = new URLSearchParams(window.location.search);
    const queryTerm = sanitizeQueryTerm(searchParams.get(_q));
    const offsetVal = Number(searchParams.get(_start));
    const sortVal = searchParams.get(_sort) || 'BEST_MATCH';

    const tags = searchParams.get(_tags);
    const category = searchParams.get(_category);

    if (tags) {
      facetsFilters.push({
        field: 'TAGS',
        value: tags.split(','),
      });
    }

    if (category) {
      facetsFilters.push({
        field: 'CATEGORY',
        value: category.split(','),
      });
    }

    const isFilters = facetsFilters.length;
    const variables = {
      q: queryTerm,
      language: 'EN',
      limit,
      offset: offsetVal,
      facets: [{
        field: 'TAGS',
      }, {
        field: 'CATEGORY',
      }],
      sort: sortVal,
    };

    if (isFilters) variables.filters = facetsFilters;

    (0,_search_api_js__WEBPACK_IMPORTED_MODULE_3__.fetchData)({
      query: (0,_search_api_js__WEBPACK_IMPORTED_MODULE_3__.searchQuery)(isFilters),
      variables,
    }).then(({ errors, data }) => {
      if (errors) {
        // eslint-disable-next-line no-console
        console.log('%cSomething went wrong', errors);
      } else {
        const { macktrucksearch } = data;
        nextOffset = offset + limit;
        countSpan.innerText = macktrucksearch.count;
        showResults(macktrucksearch);
        updatePaginationDOM(macktrucksearch);
      }
    });
  }

  function getNextOffset(isNext = false) {
    if (isNext) {
      return nextOffset <= resultCount ? nextOffset : offset;
    }
    const temp = offset - limit;
    return temp > 0 ? temp : 0;
  }

  function pagination(type) {
    offset = getNextOffset(type === 'next');
    insertUrlParam(_start, offset);
    fetchResults();
  }

  // hide autocomplete, click was outside container.
  const containingElement = document.querySelector('#searchInput');

  document.body.addEventListener('click', (event) => {
    if (!containingElement.contains(event.target)) {
      listEl.textContent = '';
    }
  });

  if (searchTerm) fetchResults();
}

__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ }),

/***/ "./blocks/search/templates.js":
/*!************************************!*\
  !*** ./blocks/search/templates.js ***!
  \************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   getFacetsTemplate: () => (/* binding */ getFacetsTemplate),
/* harmony export */   getMainTemplate: () => (/* binding */ getMainTemplate),
/* harmony export */   getNoResultsTemplate: () => (/* binding */ getNoResultsTemplate),
/* harmony export */   getResultsItemsTemplate: () => (/* binding */ getResultsItemsTemplate),
/* harmony export */   getShowingResultsTemplate: () => (/* binding */ getShowingResultsTemplate)
/* harmony export */ });
const getMainTemplate = (PLACEHOLDERS) => {
  const [relevance, newest, oldest] = PLACEHOLDERS.sortFilter.split(',');
  return `
  <div class="search-input-wrapper">
    <div id="searchInput" class="input-container-custom">
      <div class="sf-header-searchstudio-js mb-5">
        <div class="sf-form">
          <div id="autosuggest" class="form-control-suggest">
            <div role="combobox" aria-expanded="false" aria-haspopup="listbox"
              aria-owns="autosuggest-autosuggest__results">
              <input type="text" autocomplete="off" aria-autocomplete="list" id="searchTerm"
                aria-controls="autosuggest-autosuggest__results"
                placeholder="${PLACEHOLDERS.searchFor}..." autofocus="autofocus">
            </div>
            <div id="autosuggest-autosuggest__results" class="autosuggest__results-container">
              <div aria-labelledby="autosuggest" class="autosuggest__results"> 
                <ul role="listbox"></ul>
              </div>
            </div>
          </div>
          <span>
            <button type="submit" class="btn text-primary search-close-button">
              <span class="fa fa-search search-icon"></span>
            </button>
          </span>
        </div>
      </div>
    </div>
  </div>

  <div class="search-results-summary-options-wrapper">
    <div id="searchResultSummarySection"></div>
    <div id="searchOptionsSection" class="hide">
      <div class="sf-filter-actions-wrapper">
        <div class="ml-auto sf-filter-actions-custom">
          <div class="form-inline justify-content-end">
            <label for="sort-by" class="ml-4 mr-2">${PLACEHOLDERS.sortBy}</label>
            <select id="order-by" class="custom-select-searchstudio-js">
              <option value="BEST_MATCH">${relevance}</option>
              <option value="LAST_MODIFIED_ASC">${newest}</option>
              <option value="LAST_MODIFIED_DESC">${oldest}</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  </div>

  <div class="search-results-wrapper">
    <div class="facet-container-wrapper">
      <div id="searchFacetSection" class="facet-wrapper facet-container-holder"></div>
    </div>
    <div class="result-container-wrapper">
      <div id="searchResultsSection"></div>
      <div id="paginationSection">
        <div class="search-pagination-container">
          <ul class="pagination">
            <li class="page-item">
              <a variant="outline-primary" class="page-link-searchstudio-js prev"> &lt; ${PLACEHOLDERS.previous} </a>
            </li>
            <li class="page-item">
              <span class="page-link-searchstudio-js page-number"><strong class="page-range">1 — 25 </strong> of <strong class="count">113</strong></span>
            </li>
            <li class="page-item">
              <a variant="outline-primary" class="page-link-searchstudio-js next">  ${PLACEHOLDERS.next}  &gt; </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
`;
};

const getNoResultsTemplate = ({ noResults, refine }) => `
  <div class="search-feedback-filters-wrapper">
    <div class="search-feedback-filters-custom">
      <div class="sf-filter-info-custom">
        <span class="no-result-msg">${noResults}</span>
        <br />
        <span class="no-result-msg2">${refine}</span>
      </div>
    </div>
  </div>
`;

const addEmTag = (text, value) => {
  const words = text.split(' ');
  const result = words.map((word) => (word.toLowerCase() === value.toLowerCase()
    ? `<em>${word}</em>`
    : word));
  return result.join(' ');
};

const getResultsItemsTemplate = ({ items, queryTerm }) => {
  let result = '';
  items.forEach((item) => {
    const { description, title, url } = item.metadata;
    const emDescription = addEmTag(description, queryTerm);
    const emTitle = addEmTag(title, queryTerm);
    result += `
      <div class="list-wrapper">
        <div class="card-searchstudio-js-custom">
          <div class="card-searchstudio-jsClass">
            <div class="card-searchstudio-js-body p-0">
              <div class="card-searchstudio-js-title">
                <a href="${url}" target="_blank" class="stretched-link">
                  <h4>${emTitle}</h4>
                </a>
              </div>
              <div class="card-searchstudio-js-body p-0">
                <div class="card-searchstudio-js-text article_promo_short_overview_t">
                  <p class="Find">${emDescription}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    `;
  });
  return `
    <div id="searchContainer">
      <div class="container">
        <div class="result-edit">
          <div class="sf-lists active layout-list">
            <div class="row reset-row">
              <div class="sf-list w-100 p-0 d-flex flex-wrap position-relative">
                ${result}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `;
};

const getShowingResultsTemplate = (text) => `
  <div class="search-feedback-filters-wrapper-container">
    <div class="search-feedback-filters-wrapper">
      <div class="search-feedback-filters-custom align-items-center333">
        <div class="sf-filter-info">
          <span>${text}</span>
        </div>
      </div>
    </div>
  </div>
`;

const sanitizeString = (string) => string.replaceAll(' ', '-');

const getItemsList = (items, filter) => items.map((item, i) => {
  const sanitizedValue = sanitizeString(item.value);
  return `
    <li ${i > 2 ? 'class="d-none"' : ''}>
      <input type="checkbox" id="${sanitizedValue}" data-filter="${filter}" value="${item.value}" />
      <label for="${sanitizedValue}" class="ml-1">
      <span class="facet-name" title="${sanitizedValue}"> ${item.value} </span> (${item.count}) </label>
    </li>
  `;
}).join('');

const getFacetsTemplate = (facets) => {
  const [category, tags] = facets;
  const categoryItemsText = getItemsList(category.items, 'CATEGORY');
  const tagsItemsText = getItemsList(tags.items, 'TAGS');

  return `
    <div class="facet-template-container-custom">
      <div class="pill-container">
        <div class="pill">Filter By <span class="pill-close filter-by"></span></div>
      </div>
      <div class="sidebar-background"></div>
      <div class="sf-sidebar-container">
        <div class="sf-mobile-header">
          <div class="sf-mobile-header-text">Filter By</div>
          <button type="button" class="btn btn-custom text-primary search-close-button fa fa-close">
          </button>
        </div>
        <div class="sf-sidebar">
          <ul id="search-facets" class="list-group accordion">
            <li class="list-group-item-searchstudio-js">
              <div id="collapse-topics" data-parent="#search-facets" class="collapse show">
                <ul class="list-unstyled">
                  <div id="ss-search-results">
                    <div class="filters">
                      <form id="facetsFilters">
                        ${category.items.length > 0 ? `
                        <div class="facet-list mb-4">
                          <h4 class="sidebar-heading">
                            <a href="#" class="text-uppercase active">Categories </a>
                          </h4>
                          <div class="collapse show">
                            <ul class="list-unstyled pl-3">
                              ${categoryItemsText}
                            </ul>
                            ${category.items.length > 3 ? `
                            <div class="more-less">
                              <a href="#">More</a>
                            </div>` : ''}
                          </div>
                        </div>` : ''}
                        ${tags.items.length > 0 ? `
                        <div class="facet-list mb-4">
                          <h4 class="sidebar-heading">
                            <a href="#" class="text-uppercase active">Tags </a>
                          </h4>
                          <div class="collapse show">
                            <ul class="list-unstyled pl-3">
                              ${tagsItemsText}
                            </ul>
                            ${tags.items.length > 3 ? `
                            <div class="more-less">
                              <a href="#">More</a>
                            </div>` : ''}
                          </div>
                        </div>` : ''}
                      </form>
                    </div>
                  </div>
                </ul>
              </div>
            </li>
          </ul>
          <button type="button" class="btn btn-custom close-button">Done</button>
        </div>
      </div>
    </div>
  `;
};


/***/ })

},
/******/ __webpack_require__ => { // webpackRuntimeModules
/******/ var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
/******/ var __webpack_exports__ = (__webpack_exec__("./blocks/search/search.js"));
/******/ }
]);