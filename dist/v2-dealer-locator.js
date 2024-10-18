"use strict";
(self["webpackChunk_adobe_helix_project_boilerplate"] = self["webpackChunk_adobe_helix_project_boilerplate"] || []).push([["v2-dealer-locator"],{

/***/ "./blocks/v2-dealer-locator/shared/template.js":
/*!*****************************************************!*\
  !*** ./blocks/v2-dealer-locator/shared/template.js ***!
  \*****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
const defaultFilterOptionTemplate = `
  <ul id="filter-options">
      <li>
          <label for=all>All Dealers
              <input name=type-filter type=checkbox id=all value="All Dealers" checked=checked/>
              <span class="checkmark"></span>
          </label>
      </li>
      <li>
          <label for=rental-leasing>Rental &amp; Leasing
              <input name=type-filter type=checkbox id=rental-leasing value=Leasing/>
              <span class="checkmark"></span>
          </label>
      </li>
  </ul>`;
const laFilterOptionTemplate = `
  <ul id="filter-options">
      <li>
          <label for=all>All Dealers
              <input name=type-filter type=checkbox id=all value="All Dealers" checked=checked/>
              <span class="checkmark"></span>
          </label>
      </li>
      <li>
          <label for=sales-service>Sales, service &amp; Parts
              <input name=type-filter type=checkbox id=sales-service value=Sales, Service & Parts />
              <span class="checkmark"></span>
          </label>
      </li>
      <li>
          <label for=services-parts>Service &amp; Parts
              <input name=type-filter type=checkbox id=services-parts value=Service and Parts />
              <span class="checkmark"></span>
          </label>
      </li>
      <li>
          <label for=customer-service>Customer Service Center
              <input name=type-filter type=checkbox id=customer-service value=Customer Service Centre />
              <span class="checkmark"></span>
          </label>
      </li>
      <li>
          <label for=head-office>Head office
              <input name=type-filter type=checkbox id=head-office value=/>
              <span class="checkmark"></span>
          </label>
      </li>
  </ul>`;

const template = ({
  zipCode,
  isMobile,
  isExportMarket,
}) => {
  const rangeFilterValue = isExportMarket ? 75 : 100;

  return `<input id="hoverText" value="Please unselect the selected option to click this option" hidden/>
  <!-- PartsASIST Datasource Selection -->
  <div class="datasource-option" style="display:none;">
      <div class="backdrop"></div>
      <div class="col-12">
          <div class="row">
              <h3 class="MediumTitleSentence">Select a Brand</h3>
              <p>To view participating dealers near you.</p>
              <div class="brand">
                  <button id="volvo" type="button">Volvo Trucks</button>
                  <button id="mack" type="button">Mack Trucks</button>
                  <button id="dual" type="button" style="min-width:80px;">Other</button>
              </div>
          </div>
      </div>
  </div>
  <!-- PartsASIST Registration Modal -->
  <div class="partsasist-form" style="display:none;">
      <div class="backdrop"></div>
      <div class="col-12">
          <div class="row regForm rtl-padding">

              <button type="button" class="btn" onclick="$.fn.resetRegistration(this);">Return to Dealer Locator</button>

              <h3 class="MediumTitleSentence"></h3>
          </div>
          <div class="row regForm">
              <div id="select-form">SELECT FORM HTML</div>
          </div>
      </div>
  </div>
  <div class="wrapper">
      <div class="mobile-main-header">
          <div class="panel-header">
              <input type="text" id="location2"
                ${zipCode && isMobile ? `value="${zipCode}"` : ''}
                placeholder="Enter City, State, or Zip Code"/>
              <div class="search-container">
                  <button type="button" id="search" onclick="$.fn.setAddress2();">
                      <img src="/blocks/v2-dealer-locator/images/search.svg"/>
                  </button>
              </div>
              <div class="filter-container">
                  <button type="button" onclick="$.fn.switchSidebarPane('sidebar-filter');">
                      <div style="width:44px;">
                          <div class="icon"><img src="/blocks/v2-dealer-locator/images/filter.svg"/></div>
                      </div>
                  </button>
              </div>
              <div class="geo-container">
                  <button type="button" id="search" onclick="$.fn.setLocation();"><img
                          src="/blocks/v2-dealer-locator/images/location.svg"/></button>
              </div>

          </div>
      </div>
      <div id="map"></div>
      <div class="map-geo-container">
          <button type="button" id="search" onclick="$.fn.setLocation();"><img
                  src="/blocks/v2-dealer-locator/images/location.svg"/></button>
      </div>
      <div class="sidebar" style="left:0px;">
          <div class="row main-header">
              <div class="panel-header">
                  <input type="text" id="location"
                    ${zipCode && !isMobile ? `value="${zipCode}"` : ''}
                    placeholder="Enter City, State, or Zip Code"/>
                  <div class="search-container">
                      <button type="button" id="search" onclick="$.fn.setAddress();">
                          <img src="/blocks/v2-dealer-locator/images/search.svg"/>
                      </button>
                  </div>
                  <div class="filter-container">
                      <button type="button" onclick="$.fn.switchSidebarPane('sidebar-filter');">
                          <div style="width:44px;">
                              <div class="icon"><img src="/blocks/v2-dealer-locator/images/filter.svg"/></div>
                          </div>
                      </button>
                  </div>
                  <div class="geo-container">
                      <button type="button" id="search" onclick="$.fn.setLocation();"><img
                              src="/blocks/v2-dealer-locator/images/location.svg"/></button>
                  </div>

              </div>
          </div>
          <div class="row legend-header">


              <div class="sidebar-legend">
                  <span id="dealer-tag">
                  <div class="dealer" id="filterDealer">
                      <div>
                      <img src="/blocks/v2-dealer-locator/images/dealer.svg" class="legend-icon"/>
                      <span>Dealer</span>
                        </div>
                  </div>
                      </span>
                  <span id="uptime-tag">
                  <div class="uptime-dealer" id="filterUptime">
                      <div>
                      <img src="/blocks/v2-dealer-locator/images/uptime.svg" class="legend-icon"/> <span>Certified Uptime Dealer</span>
                  </div>
                          </div>
                      </span>
                  <span id="electric-tag">
                  <div class="electric-dealer" id="filterElectricDealer">
                      <div>
                      <img src="/blocks/v2-dealer-locator/images/bolt.svg" class="legend-icon"/> <span>Certified Electric Dealer</span>
                  </div>
                      </div>
                        </span>
                  <div class="mobile-dealer" id="filterDealerMobile">
                      <div>
                          <img src="/blocks/v2-dealer-locator/images/dealer.svg" class="legend-icon"/>
                          <span>Dealer</span>
                      </div>
                  </div>
                  <div class="mobile-uptime-dealer" id="filterUptimeMobile">
                      <div>
                          <img src="/blocks/v2-dealer-locator/images/uptime.svg" class="legend-icon"/> <span>Certified Uptime</span>
                      </div>
                  </div>
                  <div class="mobile-electric-dealer" id="filterElectricDealerMobile">
                      <div>
                          <img src="/blocks/v2-dealer-locator/images/bolt.svg" class="legend-icon"/>
                          <span>Certified Electric</span>
                      </div>
                  </div>

              </div>
          </div>
          <div class="row main-directions" style="display: none;">
              <div class="go-back-direction" style="text-align: right;">
                  <button type="button" id="cancel2">Back</button>
              </div>
              <div class="panel-header from-directions">
                  <input type="text" id="location" placeholder="Enter City, State, or Zip Code"/>
              </div>
              <div class="panel-header to-directions" style="margin-top:5px;">
                  <input type="text" id="location" placeholder="Enter City, State, or Zip Code"/>
              </div>
              <div class="panel-header add-directions" onclick="$.fn.switchSidebarPane('add-directions-return', this);"
                  data-id="">
                  <i class="fa fa-refresh"></i> Recalculate Directions
              </div>
          </div>
          <div class="sidebar-content">
              <div class="go-back" style="display:none;">
                  <button type="button" class="tooltip" id="cancel">Back</button>
              </div>
              <div class="loading-overlay">
                  <div class="loading-msg">
                      <p>One moment while we gather nearby dealers</p>
                  </div>
              </div>
              <div class="waiting-overlay">
                  <p>Start finding nearby dealers by providing a location above.</p>
              </div>
          </div>
      </div>

      <a href="javascript:void(0);" class="slider-arrow hide"><i class="fa fa-angle-left"></i></a>


  </div>
  <div id="sidebar-pins" style="display: none;">
      <div class="row" style="height:100%;">

          <div class="scroller">
              <p class="no-dealer-text" style="display: none;">No Dealers Found</p>
              <div class="nearby-pins"></div>
          </div>
      </div>
      <div class="panel-footer">Loading...</div>
  </div>
  <div id="sidebar-pin" style="display: none;">
      <div class="pin-header">
          <div class="pin-details-header">
              <img id="head-marker" class="pin-header-img" src=""/>
              <div id="title"></div>


          </div>
          <div id="type"></div>
          <div class="button-group">
              <div id="my-dealer" style="display: none;"><i class="fa fa-star-o tooltip"><span
                      class="tooltiptext mydealer">Your Preferred Dealer</span></i></div>
          </div>

          <div class="dealer-deatils-header">
              <div class="detail-website">
                  <a target="_blank">
                      <img src="/blocks/v2-dealer-locator/images/globe.svg"/>
                      Website</a>
              </div>
              <div class="detail-direction">
                  <a id="directions" data-id="" onclick="$.fn.switchSidebarPane('sidebar-directions', this);">
                      <img src="/blocks/v2-dealer-locator/images/gps.svg"/>
                      Directions</a>
              </div>
              <div class="detail-call">

              </div>
              <div class="detail-share">
                  <button type="button" class="accordion">
                    <img src="/blocks/v2-dealer-locator/images/share.svg"/>
                    <span>SHARE</span>
                  </button>
                  <div class="accordion-panel">
                      <input type="text" id="share-link" value="" onclick="this.select();"/>
                  </div>
              </div>

          </div>
      </div>
      <div class="row pin-content">
          <div class="scroller">
              <div class="pin-container">


                  <ul class="pin-details">
                      <li>
                          <img src="/blocks/v2-dealer-locator/images/map-detail.svg"/>
                          <div id="title2"></div>
                          <br/>
                          <div id="address1">
                              <div></div>
                          </div>
                          <br/>
                          <div id="address2">
                              <div></div>
                          </div>
                          <br/>
                          <div id="city-state-zip">
                              <div></div>
                          </div>
                          <div class="controls">
                              <i class="tooltip fa fa-copy" id="clipboard-address" data-clipboard=""
                                onclick="$.fn.copyToClipboard(this);"><span class="tooltiptext copy">Copy address</span></i>
                          </div>
                      </li>
                      <li id="hours">
                          <img src="/blocks/v2-dealer-locator/images/clock.svg"/>
                          <div></div>
                      </li>
                      <li>
                          <img src="/blocks/v2-dealer-locator/images/globe-detail.svg"/>
                          <div id="website">No website available</div>
                          <div class="controls">
                              <i class="tooltip fa fa-external-link" id="open-website" onclick="">
                                <span class="tooltiptext link">Open website</span>
                              </i>
                          </div>
                      </li>
                      <li>
                          <img src="/blocks/v2-dealer-locator/images/mail.svg"/>
                          <div id="email" ></div>
                      </li>


                      <li id="details" class="accordion-panel"></li>
                  </ul>
                  <div class="header-title header-driver-title">Driver Amenitites</div>
                  <ul id="drivers">
                  </ul>
                  <div class="header-title header-services-title">Truck Services</div>
                  <ul id="services">
                  </ul>
              </div>
          </div>
      </div>
  </div>
  <div id="nearbyPinDetails" style="display: none;">
      <div class="panel-card">
          <div class="panel-container">
              <article class="teaser">
                  <div class="marker-main">
                      <img id="marker" src=""/>
                  </div>
                  <div class="dealerPanelContainer">
                      <div class="teaser-top" onclick="$.fn.switchSidebarPane('sidebar-pin', this);" data-id="">
                          <div class="heading">
                              <p></p>

                              <div class="distance"></div>
                          </div>
                          <div class="info">
                              <div class="hours"></div>
                          </div>
                          <div class="left">
                              <div class="address"></div>
                              <div class="city"></div>
                              <div class="phone"></div>
                          </div>
                      </div>
                      <div class="teaser-bottom">
                          <div class="right">
                              <div class="website">
                                  <a href="" target="_blank" rel="noopener"></a>
                              </div>
                          </div>
                          <div class="right">
                              <div class="direction">
                                  <a href="" id="direction"
                                    onclick="$.fn.switchSidebarPane('sidebar-direction-list', this);return false;"></a>
                              </div>
                          </div>
                          <div class="right">
                              <div class="call">

                              </div>
                          </div>
                          <div class="right">
                              <div class="more" onclick="$.fn.switchSidebarPane('sidebar-pin', this);">
                                  <a>More</a>
                              </div>
                          </div>
                      </div>
                      <div class="teaser-services">
                      </div>
                  </div>
              </article>
          </div>
      </div>
  </div>
  <div id="sidebar-filter" style="display: none;">
      <div class="row" style="padding-top: 25px;">
          <div class="panel-card result-item">
              <div class="panel-container panel-filter-distance">
                  <span class="header-title">Filter By Distance</span>
                  <ul>
                      <li>
                          <div>
                              <input name=range-filter class=range-filter type=range id=range value=${rangeFilterValue} list=steplist
                                    max=100 min=25 step=25 onchange="$.fn.radiusChange();"/>
                              <datalist id=steplist class=sliderticks>
                                  <option>25</option>
                                  <option>50</option>
                                  <option>75</option>
                                  <option>100</option>
                              </datalist>
                          </div>
                      </li>
                  </ul>
              </div>
          </div>
          <div class="panel-card result-item">
              <div class="panel-container">
                  <span class="header-title">Filter By Service</span>
                  ${isExportMarket ? laFilterOptionTemplate : defaultFilterOptionTemplate}
              </div>
          </div>
      </div>
  </div>
  <div id="sidebar-direction-list" style="display: none;">
      <div class="row">
          <div class="scroller">
              <div class="directions-panel">
                  <div class="pin-actions directions">
                      <button type="button" id="gmaps-link"><img
                              src="/blocks/v2-dealer-locator/images/google-maps.svg"/><span>Open in<br>Google Maps</span>
                      </button>
                      <button type="button" id="print"><img
                              src="/blocks/v2-dealer-locator/images/print.svg"/><span>Print</span></button>
                      <button type="button" id="add-directions" onclick="$.fn.switchSidebarPane('sidebar-select-pins');">
                          <img src="/blocks/v2-dealer-locator/images/add.svg"/></i><span>Modify Dealer<br>Waypoints</span>
                      </button>
                  </div>
                  <div id="directions-container"></div>
              </div>
          </div>
      </div>

  </div>
  <div id="sidebar-directions" style="display: none;">

      <div class="row">
          <div class="scroller">
              <div class="directions-panel">
                  <div class="pin-actions directions">
                      <button type="button" id="gmaps-link"><img
                              src="/blocks/v2-dealer-locator/images/google-maps.svg"/><span>Open in<br>Google Maps</span>
                      </button>
                      <button type="button" id="print"><img
                              src="/blocks/v2-dealer-locator/images/print.svg"/><span>Print</span></button>
                      <button type="button" id="add-directions" onclick="$.fn.switchSidebarPane('sidebar-select-pins');">
                          <img src="/blocks/v2-dealer-locator/images/add.svg"/></i><span>Modify Dealer<br>Waypoints</span>
                      </button>
                  </div>
                  <div id="directions-container"></div>
              </div>
          </div>
      </div>
  </div>
  <div id="sidebar-select-pins" style="display: none;">
      <div class="row">
          <span class="header-title">Advanced Routing</span>
          <p>Click any <i><span id="filter"></span> Dealer</i> on the map to add it to your route. When done, click
              <strong>Calculate Route</strong> below.</p>
          <p>
          <div class="go-back-pin">
              <button type="button">Calculate Route</button>
              <button type="button">Back to Directions</button>
          </div>
          </p>
          <div class="scroller">
              <div class="nearby-select"></div>
          </div>
      </div>
  </div>
  <div id="sidebar-select-pin" style="display: none;">
      <div class="panel-card">
          <div class="panel-container">
              <article class="teaser">

                  <div style="width: 15%;">
                      <i class="fa fa-close tooltip" onclick="$.fn.removeWaypoint(this)" data-id=""><span
                              class="tooltiptext removepin">Remove from route</span></i>
                  </div>
                  <div style="width: 80%;">
                      <div class="teaser-top">
                          <div class="heading">
                              <p></p>
                          </div>
                          <div class="info">
                              <div class="hours"></div>
                              <div class="distance"></div>
                          </div>
                      </div>
                      <div class="teaser-bottom">
                          <div class="left">
                              <div class="address"></div>
                              <div class="city"></div>
                              <div class="phone"></div>
                          </div>
                          <div class="right">
                              <div class="website">
                                  <a href="" target="_blank" rel="noopener"></a>
                              </div>
                          </div>
                      </div>
                      <div class="teaser-services">

                      </div>
                  </div>
              </article>
          </div>
      </div>
  </div>
  <div id="locator-snackbar"></div>

  <script id="eloquaForm" type="text/template">
      <div class="template">

      </div>
  </script>

  </div>`;
};

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (template);


/***/ }),

/***/ "./blocks/v2-dealer-locator/v2-dealer-locator.js":
/*!*******************************************************!*\
  !*** ./blocks/v2-dealer-locator/v2-dealer-locator.js ***!
  \*******************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ decorate)
/* harmony export */ });
/* harmony import */ var _scripts_aem_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../scripts/aem.js */ "./scripts/aem.js");
/* harmony import */ var _scripts_common_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../scripts/common.js */ "./scripts/common.js");
/* harmony import */ var _shared_template_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./shared/template.js */ "./blocks/v2-dealer-locator/shared/template.js");
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([_scripts_common_js__WEBPACK_IMPORTED_MODULE_1__]);
_scripts_common_js__WEBPACK_IMPORTED_MODULE_1__ = (__webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__)[0];




const { GOOGLE_API_KEY } = _scripts_common_js__WEBPACK_IMPORTED_MODULE_1__.TOOLS_CONFIGS;

/**
 * Escapes HTML characters from a string.
 *
 * @returns {string} The escaped string
 */
function escapeHTML(input) {
  return input.replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

/**
 * Wrapper around loadScript to avoid the duplication in this file around:
 * `{ type: 'text/javascript', charset: 'UTF-8' }`
 *
 * @returns {Promise} Promise that resolves when the script is loaded
 */
const loadComponentScript = (scriptlink) => (0,_scripts_aem_js__WEBPACK_IMPORTED_MODULE_0__.loadScript)(scriptlink, { type: 'text/javascript', charset: 'UTF-8' });

/**
 * Gets the zip code from the URL query string.
 *
 * @returns {string} Zip code from the URL query string
 */
const getZipCode = () => {
  const searchParams = new URLSearchParams(window.location.search);
  const hasZipLocation = searchParams.has('l');

  return hasZipLocation ? escapeHTML(searchParams.get('l')) : '';
};

/**
 * Checks if the current screen is mobile.
 *
 * @returns {boolean} true if it matched the media query
 */
const checkIfIsMobile = () => {
  const MQ = window.matchMedia('(max-width: 992px)');

  return MQ.matches;
};

/**
 * Converts a string with values separated by commas into an array of strings.
 *
 * @param {string} amenitiesString - Amenities string to parse. Example:
 *  "Appointments Accepted, Bilingual Service, Driver Lounge"
 * @returns {Array.<string>} Extracted config object
 */
const parseAmenities = (amenitiesString) => {
  const amenities = amenitiesString?.split(',').map((amenity) => amenity.trim()) || [];

  return amenities;
};

/**
 * Extracts the config object from the block element.
 *
 * @param {HTMLElement} block - The block element
 * @returns {Array.<string>} Extracted config object
 */
const getBlockConfigs = (block) => {
  const config = (0,_scripts_aem_js__WEBPACK_IMPORTED_MODULE_0__.readBlockConfig)(block);

  if (config?.amenities) {
    config.amenities = parseAmenities(config.amenities);
  }

  return config;
};

async function decorate(block) {
  const zipCode = getZipCode();
  const isMobile = checkIfIsMobile();
  const blockConfig = getBlockConfigs(block);
  const isExportMarket = blockConfig.version?.toLowerCase() === 'export-market';

  // blockConfig.datasource is a required field for the block to work:
  if (!blockConfig.datasource) {
    // eslint-disable-next-line no-console
    console.error('The block is missing the datasource field in the configuration.');
  } else {
    window.locatorConfig = {
      asist: false,
      showAsistDialog: true,
      consolidateFilters: true,
      selectedBrand: 'mack',
      dataSource: blockConfig.datasource,
      apiKey: GOOGLE_API_KEY,
      version: blockConfig.version, // 'default' or 'export-market'
      country: blockConfig.country,
      amenities: blockConfig.amenities,
      coords: blockConfig.coords,
    };

    const sharedTemplate = (0,_shared_template_js__WEBPACK_IMPORTED_MODULE_2__["default"])({ zipCode, isMobile, isExportMarket });

    if (isExportMarket) {
      (0,_scripts_aem_js__WEBPACK_IMPORTED_MODULE_0__.loadCSS)('/blocks/v2-dealer-locator/versions/export/dealer-locator.css');
    }

    block.innerHTML = sharedTemplate;

    loadComponentScript('/blocks/v2-dealer-locator/shared/vendor/jquery.min.js')
      .then(() => {
        // These scripts depend on jquery

        if (isExportMarket) {
          loadComponentScript('/blocks/v2-dealer-locator/versions/export/sidebar-maps.js');
        } else {
          loadComponentScript('/blocks/v2-dealer-locator/versions/default/sidebar-maps.js');
        }

        loadComponentScript('/blocks/v2-dealer-locator/shared/my-dealer.js');
      });

    loadComponentScript('/blocks/v2-dealer-locator/shared/vendor/moment.js')
      .then(() => {
        loadComponentScript('/blocks/v2-dealer-locator/shared/vendor/moment-timezone.min.js');
      });
  }
}

__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ })

},
/******/ __webpack_require__ => { // webpackRuntimeModules
/******/ var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
/******/ var __webpack_exports__ = (__webpack_exec__("./blocks/v2-dealer-locator/v2-dealer-locator.js"));
/******/ }
]);