"use strict";
(self["webpackChunk_adobe_helix_project_boilerplate"] = self["webpackChunk_adobe_helix_project_boilerplate"] || []).push([["scripts_delayed_js"],{

/***/ "./scripts/delayed.js":
/*!****************************!*\
  !*** ./scripts/delayed.js ***!
  \****************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _aem_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./aem.js */ "./scripts/aem.js");
/* harmony import */ var _common_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./common.js */ "./scripts/common.js");
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([_common_js__WEBPACK_IMPORTED_MODULE_1__]);
_common_js__WEBPACK_IMPORTED_MODULE_1__ = (__webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__)[0];
// eslint-disable-next-line import/no-cycle

// eslint-disable-next-line import/no-cycle


const devHosts = ['localhost', 'hlx.page', 'hlx.live', 'aem.page', 'aem.live'];

// COOKIE ACCEPTANCE AND IDs default to false in case no ID is present
const {
  ACC_ENG_TRACKING = false,
  DATA_DOMAIN_SCRIPT = false,
  FACEBOOK_ID = false,
  GTM_ID = false,
  HOTJAR_ID = false,
  LINKEDIN_PARTNER_ID = false,
} = _common_js__WEBPACK_IMPORTED_MODULE_1__.COOKIE_CONFIGS;

const parsedData = JSON.parse(ACC_ENG_TRACKING);
const splitData = (0,_common_js__WEBPACK_IMPORTED_MODULE_1__.extractObjectFromArray)(parsedData);

const { piAId, piCId, piHostname } = splitData;

// Core Web Vitals RUM collection
(0,_aem_js__WEBPACK_IMPORTED_MODULE_0__.sampleRUM)('cwv');

// COOKIE ACCEPTANCE CHECKING
if ((0,_common_js__WEBPACK_IMPORTED_MODULE_1__.isPerformanceAllowed)()) {
  if (GTM_ID) loadGoogleTagManager();
  if (HOTJAR_ID) loadHotjar();
}

if ((0,_common_js__WEBPACK_IMPORTED_MODULE_1__.isSocialAllowed)()) {
  if (FACEBOOK_ID) loadFacebookPixel();
  if (LINKEDIN_PARTNER_ID) loadLinkedInInsightTag();
}

if ((0,_common_js__WEBPACK_IMPORTED_MODULE_1__.isTargetingAllowed)()) {
  if (ACC_ENG_TRACKING) loadAccountEngagementTracking();
}

// add more delayed functionality here

// Prevent the cookie banner from loading when running in library
if (!window.location.pathname.includes('srcdoc')
  && !devHosts.some((url) => window.location.host.includes(url))) {
  (0,_aem_js__WEBPACK_IMPORTED_MODULE_0__.loadScript)('https://cdn.cookielaw.org/scripttemplates/otSDKStub.js', {
    type: 'text/javascript',
    charset: 'UTF-8',
    'data-domain-script': DATA_DOMAIN_SCRIPT,
  });

  window.OptanonWrapper = () => {
    const currentOnetrustActiveGroups = window.OnetrustActiveGroups;

    function isSameGroups(groups1, groups2) {
      const s1 = JSON.stringify(groups1.split(','));
      const s2 = JSON.stringify(groups2.split(','));

      return s1 === s2;
    }

    window.OneTrust.OnConsentChanged(() => {
      // reloading the page only when the active group has changed
      if (!isSameGroups(currentOnetrustActiveGroups, window.OnetrustActiveGroups) && window.isSingleVideo !== 'true') {
        window.location.reload();
      }
    });
  };
}

if (devHosts.some((url) => window.location.host.includes(url))) {
  __webpack_require__.e(/*! import() */ "scripts_validate-elements_js").then(__webpack_require__.bind(__webpack_require__, /*! ./validate-elements.js */ "./scripts/validate-elements.js"));
}

// Google Analytics
async function loadGoogleTagManager() {
  // google tag manager
  // eslint-disable-next-line func-names
  (function (w, d, s, l, i) {
    w[l] = w[l] || []; w[l].push({ 'gtm.start': new Date().getTime(), event: 'gtm.js' }); const f = d.getElementsByTagName(s)[0]; const j = d.createElement(s); const
      dl = l !== 'dataLayer' ? `&l=${l}` : ''; j.async = true; j.src = `https://www.googletagmanager.com/gtm.js?id=${i}${dl}`; f.parentNode.insertBefore(j, f);
  }(window, document, 'script', 'dataLayer', GTM_ID));
}

// Hotjar
async function loadHotjar() {
  /* eslint-disable */
  (function(h,o,t,j,a,r){
    h.hj=h.hj||function(){(h.hj.q=h.hj.q||[]).push(arguments)};
    h._hjSettings={hjid:HOTJAR_ID,hjsv:6}; a=o.getElementsByTagName('head')[0];
    r=o.createElement('script');r.async=1; r.src=t+h._hjSettings.hjid+j+h._hjSettings.hjsv;
    a.appendChild(r);
  })(window,document,'https://static.hotjar.com/c/hotjar-','.js?sv=');
  /* eslint-enable */
}

// Account Engagement Tracking Code
async function loadAccountEngagementTracking() {
  const body = document.querySelector('body');
  const script = document.createElement('script');
  script.type = 'text/javascript';

  script.text = `piAId = '${piAId}'; piCId = '${piCId}'; piHostname = '${piHostname}'; (function() { function async_load(){ var s = document.createElement('script'); s.type = 'text/javascript'; s.src = ('https:' == document.location.protocol ? 'https://pi' : 'http://cdn') + '.pardot.com/pd.js'; var c = document.getElementsByTagName('script')[0]; c.parentNode.insertBefore(s, c); } if(window.attachEvent) { window.attachEvent('onload', async_load); } else { window.addEventListener('load', async_load, false); } })();`;

  body.append(script);
}

// FaceBook Pixel
async function loadFacebookPixel() {
  /* eslint-disable */
  (function (f, b, e, v, n, t, s) {
    if (f.fbq) return; n = f.fbq = function () {
      n.callMethod
        ? n.callMethod.apply(n, arguments) : n.queue.push(arguments);
    };
    if (!f._fbq)f._fbq = n; n.push = n; n.loaded = !0; n.version = '2.0';
    n.queue = []; t = b.createElement(e); t.async = !0;
    t.src = v; s = b.getElementsByTagName(e)[0];
    s.parentNode.insertBefore(t, s);
  }(
    window,
    document,
    'script',
    'https://connect.facebook.net/en_US/fbevents.js',
  ));
  fbq('init', FACEBOOK_ID);
  fbq('track', 'PageView');
  /* eslint-enable */
}

// LinkedIn Insight Tag
async function loadLinkedInInsightTag() {
  /* eslint-disable */
  var _linkedin_partner_id = LINKEDIN_PARTNER_ID;
  window._linkedin_data_partner_ids = window._linkedin_data_partner_ids || [];
  window._linkedin_data_partner_ids.push(_linkedin_partner_id);

  (function(l) {
    if (!l){window.lintrk = function(a,b){window.lintrk.q.push([a,b])};
    window.lintrk.q=[]}
    var s = document.getElementsByTagName("script")[0];
    var b = document.createElement("script");
    b.type = "text/javascript";b.async = true;
    b.src = "https://snap.licdn.com/li.lms-analytics/insight.min.js";
    s.parentNode.insertBefore(b, s);
  })(window.lintrk);
  /* eslint-enable */
}

__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ })

}]);