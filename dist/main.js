/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./scripts/aem.js":
/*!************************!*\
  !*** ./scripts/aem.js ***!
  \************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   buildBlock: () => (/* binding */ buildBlock),
/* harmony export */   createOptimizedPicture: () => (/* binding */ createOptimizedPicture),
/* harmony export */   decorateBlock: () => (/* binding */ decorateBlock),
/* harmony export */   decorateBlocks: () => (/* binding */ decorateBlocks),
/* harmony export */   decorateButtons: () => (/* binding */ decorateButtons),
/* harmony export */   decorateIcons: () => (/* binding */ decorateIcons),
/* harmony export */   decorateSections: () => (/* binding */ decorateSections),
/* harmony export */   decorateTemplateAndTheme: () => (/* binding */ decorateTemplateAndTheme),
/* harmony export */   fetchPlaceholders: () => (/* binding */ fetchPlaceholders),
/* harmony export */   getMetadata: () => (/* binding */ getMetadata),
/* harmony export */   loadBlock: () => (/* binding */ loadBlock),
/* harmony export */   loadBlocks: () => (/* binding */ loadBlocks),
/* harmony export */   loadCSS: () => (/* binding */ loadCSS),
/* harmony export */   loadFooter: () => (/* binding */ loadFooter),
/* harmony export */   loadHeader: () => (/* binding */ loadHeader),
/* harmony export */   loadScript: () => (/* binding */ loadScript),
/* harmony export */   readBlockConfig: () => (/* binding */ readBlockConfig),
/* harmony export */   sampleRUM: () => (/* binding */ sampleRUM),
/* harmony export */   setup: () => (/* binding */ setup),
/* harmony export */   toCamelCase: () => (/* binding */ toCamelCase),
/* harmony export */   toClassName: () => (/* binding */ toClassName),
/* harmony export */   updateSectionsStatus: () => (/* binding */ updateSectionsStatus),
/* harmony export */   waitForLCP: () => (/* binding */ waitForLCP),
/* harmony export */   wrapTextNodes: () => (/* binding */ wrapTextNodes)
/* harmony export */ });
/*
 * Copyright 2024 Adobe. All rights reserved.
 * This file is licensed to you under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License. You may obtain a copy
 * of the License at http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software distributed under
 * the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
 * OF ANY KIND, either express or implied. See the License for the specific language
 * governing permissions and limitations under the License.
 */

/* eslint-env browser */

/**
 * log RUM if part of the sample.
 * @param {string} checkpoint identifies the checkpoint in funnel
 * @param {Object} data additional data for RUM sample
 * @param {string} data.source DOM node that is the source of a checkpoint event,
 * identified by #id or .classname
 * @param {string} data.target subject of the checkpoint event,
 * for instance the href of a link, or a search term
 */
function sampleRUM(checkpoint, data = {}) {
  const SESSION_STORAGE_KEY = 'aem-rum';
  sampleRUM.baseURL = sampleRUM.baseURL
    || new URL(window.RUM_BASE == null ? 'https://rum.hlx.page' : window.RUM_BASE, window.location);
  sampleRUM.defer = sampleRUM.defer || [];
  const defer = (fnname) => {
    sampleRUM[fnname] = sampleRUM[fnname] || ((...args) => sampleRUM.defer.push({ fnname, args }));
  };
  sampleRUM.drain = sampleRUM.drain
    || ((dfnname, fn) => {
      sampleRUM[dfnname] = fn;
      sampleRUM.defer
        .filter(({ fnname }) => dfnname === fnname)
        .forEach(({ fnname, args }) => sampleRUM[fnname](...args));
    });
  sampleRUM.always = sampleRUM.always || [];
  sampleRUM.always.on = (chkpnt, fn) => {
    sampleRUM.always[chkpnt] = fn;
  };
  sampleRUM.on = (chkpnt, fn) => {
    sampleRUM.cases[chkpnt] = fn;
  };
  defer('observe');
  defer('cwv');
  try {
    window.hlx = window.hlx || {};
    if (!window.hlx.rum) {
      const usp = new URLSearchParams(window.location.search);
      const weight = usp.get('rum') === 'on' ? 1 : 100; // with parameter, weight is 1. Defaults to 100.
      const id = Array.from({ length: 75 }, (_, i) => String.fromCharCode(48 + i))
        .filter((a) => /\d|[A-Z]/i.test(a))
        .filter(() => Math.random() * 75 > 70)
        .join('');
      const random = Math.random();
      const isSelected = random * weight < 1;
      const firstReadTime = window.performance ? window.performance.timeOrigin : Date.now();
      const urlSanitizers = {
        full: () => window.location.href,
        origin: () => window.location.origin,
        path: () => window.location.href.replace(/\?.*$/, ''),
      };
      // eslint-disable-next-line max-len
      const rumSessionStorage = sessionStorage.getItem(SESSION_STORAGE_KEY)
        ? JSON.parse(sessionStorage.getItem(SESSION_STORAGE_KEY))
        : {};
      // eslint-disable-next-line max-len
      rumSessionStorage.pages = (rumSessionStorage.pages ? rumSessionStorage.pages : 0)
        + 1
        /* noise */ + (Math.floor(Math.random() * 20) - 10);
      sessionStorage.setItem(SESSION_STORAGE_KEY, JSON.stringify(rumSessionStorage));
      // eslint-disable-next-line object-curly-newline, max-len
      window.hlx.rum = {
        weight,
        id,
        random,
        isSelected,
        firstReadTime,
        sampleRUM,
        sanitizeURL: urlSanitizers[window.hlx.RUM_MASK_URL || 'path'],
        rumSessionStorage,
      };
    }

    const { weight, id, firstReadTime } = window.hlx.rum;
    if (window.hlx && window.hlx.rum && window.hlx.rum.isSelected) {
      const knownProperties = [
        'weight',
        'id',
        'referer',
        'checkpoint',
        't',
        'source',
        'target',
        'cwv',
        'CLS',
        'FID',
        'LCP',
        'INP',
        'TTFB',
      ];
      const sendPing = (pdata = data) => {
        // eslint-disable-next-line max-len
        const t = Math.round(
          window.performance ? window.performance.now() : Date.now() - firstReadTime,
        );
        // eslint-disable-next-line object-curly-newline, max-len, no-use-before-define
        const body = JSON.stringify(
          {
            weight, id, referer: window.hlx.rum.sanitizeURL(), checkpoint, t, ...data,
          },
          knownProperties,
        );
        const url = new URL(`.rum/${weight}`, sampleRUM.baseURL).href;
        navigator.sendBeacon(url, body);
        // eslint-disable-next-line no-console
        console.debug(`ping:${checkpoint}`, pdata);
      };
      sampleRUM.cases = sampleRUM.cases || {
        load: () => sampleRUM('pagesviewed', { source: window.hlx.rum.rumSessionStorage.pages }) || true,
        cwv: () => sampleRUM.cwv(data) || true,
        lazy: () => {
          // use classic script to avoid CORS issues
          const script = document.createElement('script');
          script.src = new URL(
            '.rum/@adobe/helix-rum-enhancer@^1/src/index.js',
            sampleRUM.baseURL,
          ).href;
          document.head.appendChild(script);
          return true;
        },
      };
      sendPing(data);
      if (sampleRUM.cases[checkpoint]) {
        sampleRUM.cases[checkpoint]();
      }
    }
    if (sampleRUM.always[checkpoint]) {
      sampleRUM.always[checkpoint](data);
    }
  } catch (error) {
    // something went wrong
  }
}

/**
 * Setup block utils.
 */
function setup() {
  window.hlx = window.hlx || {};
  window.hlx.RUM_MASK_URL = 'full';
  window.hlx.codeBasePath = '';
  window.hlx.lighthouse = new URLSearchParams(window.location.search).get('lighthouse') === 'on';

  const scriptEl = document.querySelector('script[src$="/scripts/scripts.js"]');
  if (scriptEl) {
    try {
      [window.hlx.codeBasePath] = new URL(scriptEl.src).pathname.split('/scripts/scripts.js');
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log(error);
    }
  }
}

/**
 * Auto initializiation.
 */

function init() {
  setup();
  sampleRUM('top');

  window.addEventListener('load', () => sampleRUM('load'));

  ['error', 'unhandledrejection'].forEach((event) => {
    window.addEventListener(event, ({ reason, error }) => {
      const source = (reason || error).stack
        .split('\n')
        .filter((line) => line.match(/https?:\/\//))
        .shift()
        .replace(/at ([^ ]+) \((.+)\)/, '$1@$2');
      const target = (reason || error).toString();
      sampleRUM('error', { source, target });
    });
  });
}

/**
 * Sanitizes a string for use as class name.
 * @param {string} name The unsanitized string
 * @returns {string} The class name
 */
function toClassName(name) {
  return typeof name === 'string'
    ? name
      .toLowerCase()
      .replace(/[^0-9a-z]/gi, '-')
      .replace(/-+/g, '-')
      .replace(/^-|-$/g, '')
    : '';
}

/**
 * Sanitizes a string for use as a js property name.
 * @param {string} name The unsanitized string
 * @returns {string} The camelCased name
 */
function toCamelCase(name) {
  return toClassName(name).replace(/-([a-z])/g, (g) => g[1].toUpperCase());
}

/**
 * Extracts the config from a block.
 * @param {Element} block The block element
 * @returns {object} The block config
 */
// eslint-disable-next-line import/prefer-default-export
function readBlockConfig(block) {
  const config = {};
  block.querySelectorAll(':scope > div').forEach((row) => {
    if (row.children) {
      const cols = [...row.children];
      if (cols[1]) {
        const col = cols[1];
        const name = toClassName(cols[0].textContent);
        let value = '';
        if (col.querySelector('a')) {
          const as = [...col.querySelectorAll('a')];
          if (as.length === 1) {
            value = as[0].href;
          } else {
            value = as.map((a) => a.href);
          }
        } else if (col.querySelector('img')) {
          const imgs = [...col.querySelectorAll('img')];
          if (imgs.length === 1) {
            value = imgs[0].src;
          } else {
            value = imgs.map((img) => img.src);
          }
        } else if (col.querySelector('p')) {
          const ps = [...col.querySelectorAll('p')];
          if (ps.length === 1) {
            value = ps[0].textContent;
          } else {
            value = ps.map((p) => p.textContent);
          }
        } else value = row.children[1].textContent;
        config[name] = value;
      }
    }
  });
  return config;
}

/**
 * Loads a CSS file.
 * @param {string} href URL to the CSS file
 */
async function loadCSS(href) {
  return new Promise((resolve, reject) => {
    if (!document.querySelector(`head > link[href="${href}"]`)) {
      const link = document.createElement('link');
      link.rel = 'stylesheet';
      link.href = href;
      link.onload = resolve;
      link.onerror = reject;
      document.head.append(link);
    } else {
      resolve();
    }
  });
}

/**
 * Loads a non module JS file.
 * @param {string} src URL to the JS file
 * @param {Object} attrs additional optional attributes
 */
async function loadScript(src, attrs) {
  return new Promise((resolve, reject) => {
    if (!document.querySelector(`head > script[src="${src}"]`)) {
      const script = document.createElement('script');
      script.src = src;
      if (attrs) {
        // eslint-disable-next-line no-restricted-syntax, guard-for-in
        for (const attr in attrs) {
          script.setAttribute(attr, attrs[attr]);
        }
      }
      script.onload = resolve;
      script.onerror = reject;
      document.head.append(script);
    } else {
      resolve();
    }
  });
}

/**
 * Retrieves the content of metadata tags.
 * @param {string} name The metadata name (or property)
 * @param {Document} doc Document object to query for metadata. Defaults to the window's document
 * @returns {string} The metadata value(s)
 */
function getMetadata(name, doc = document) {
  const attr = name && name.includes(':') ? 'property' : 'name';
  const meta = [...doc.head.querySelectorAll(`meta[${attr}="${name}"]`)]
    .map((m) => m.content)
    .join(', ');
  return meta || '';
}

/**
 * Returns a picture element with webp and fallbacks
 * @param {string} src The image URL
 * @param {string} [alt] The image alternative text
 * @param {boolean} [eager] Set loading attribute to eager
 * @param {Array} [breakpoints] Breakpoints and corresponding params (eg. width)
 * @returns {Element} The picture element
 */
function createOptimizedPicture(
  src,
  alt = '',
  eager = false,
  breakpoints = [{ media: '(min-width: 600px)', width: '2000' }, { width: '750' }],
) {
  const url = new URL(src, window.location.href);
  const picture = document.createElement('picture');
  const { pathname } = url;
  const ext = pathname.substring(pathname.lastIndexOf('.') + 1);

  // webp
  breakpoints.forEach((br) => {
    const source = document.createElement('source');
    if (br.media) source.setAttribute('media', br.media);
    source.setAttribute('type', 'image/webp');
    source.setAttribute('srcset', `${pathname}?width=${br.width}&format=webply&optimize=medium`);
    picture.appendChild(source);
  });

  // fallback
  breakpoints.forEach((br, i) => {
    if (i < breakpoints.length - 1) {
      const source = document.createElement('source');
      if (br.media) source.setAttribute('media', br.media);
      source.setAttribute('srcset', `${pathname}?width=${br.width}&format=${ext}&optimize=medium`);
      picture.appendChild(source);
    } else {
      const img = document.createElement('img');
      img.setAttribute('loading', eager ? 'eager' : 'lazy');
      img.setAttribute('alt', alt);
      picture.appendChild(img);
      img.setAttribute('src', `${pathname}?width=${br.width}&format=${ext}&optimize=medium`);
    }
  });

  return picture;
}

/**
 * Set template (page structure) and theme (page styles).
 */
function decorateTemplateAndTheme() {
  const addClasses = (element, classes) => {
    classes.split(',').forEach((c) => {
      element.classList.add(toClassName(c.trim()));
    });
  };
  const template = getMetadata('template');
  if (template) addClasses(document.body, template);
  const theme = getMetadata('theme');
  if (theme) addClasses(document.body, theme);
}

/**
 * Wrap inline text content of block cells within a <p> tag.
 * @param {Element} block the block element
 */
function wrapTextNodes(block) {
  const validWrappers = [
    'P',
    'PRE',
    'UL',
    'OL',
    'PICTURE',
    'TABLE',
    'H1',
    'H2',
    'H3',
    'H4',
    'H5',
    'H6',
  ];

  const wrap = (el) => {
    const wrapper = document.createElement('p');
    wrapper.append(...el.childNodes);
    el.append(wrapper);
  };

  block.querySelectorAll(':scope > div > div').forEach((blockColumn) => {
    if (blockColumn.hasChildNodes()) {
      const hasWrapper = !!blockColumn.firstElementChild
        && validWrappers.some((tagName) => blockColumn.firstElementChild.tagName === tagName);
      if (!hasWrapper) {
        wrap(blockColumn);
      } else if (
        blockColumn.firstElementChild.tagName === 'PICTURE'
        && (blockColumn.children.length > 1 || !!blockColumn.textContent.trim())
      ) {
        wrap(blockColumn);
      }
    }
  });
}

/**
 * Decorates paragraphs containing a single link as buttons.
 * @param {Element} element container element
 */
function decorateButtons(element) {
  element.querySelectorAll('a').forEach((a) => {
    a.title = a.title || a.textContent;
    if (a.href !== a.textContent) {
      const up = a.parentElement;
      const twoup = a.parentElement.parentElement;
      if (!a.querySelector('img')) {
        if (up.childNodes.length === 1 && (up.tagName === 'P' || up.tagName === 'DIV')) {
          a.className = 'button'; // default
          up.classList.add('button-container');
        }
        if (
          up.childNodes.length === 1
          && up.tagName === 'STRONG'
          && twoup.childNodes.length === 1
          && twoup.tagName === 'P'
        ) {
          a.className = 'button primary';
          twoup.classList.add('button-container');
        }
        if (
          up.childNodes.length === 1
          && up.tagName === 'EM'
          && twoup.childNodes.length === 1
          && twoup.tagName === 'P'
        ) {
          a.className = 'button secondary';
          twoup.classList.add('button-container');
        }
      }
    }
  });
}

/**
 * Add <img> for icon, prefixed with codeBasePath and optional prefix.
 * @param {Element} [span] span element with icon classes
 * @param {string} [prefix] prefix to be added to icon src
 * @param {string} [alt] alt text to be added to icon
 */
function decorateIcon(span, prefix = '', alt = '') {
  const iconName = Array.from(span.classList)
    .find((c) => c.startsWith('icon-'))
    .substring(5);
  const img = document.createElement('img');
  img.dataset.iconName = iconName;
  img.src = `${window.hlx.codeBasePath}${prefix}/icons/${iconName}.svg`;
  img.alt = alt;
  img.loading = 'lazy';
  span.append(img);
}

/**
 * Add <img> for icons, prefixed with codeBasePath and optional prefix.
 * @param {Element} [element] Element containing icons
 * @param {string} [prefix] prefix to be added to icon the src
 */
function decorateIcons(element, prefix = '') {
  const icons = [...element.querySelectorAll('span.icon')];
  icons.forEach((span) => {
    decorateIcon(span, prefix);
  });
}

/**
 * Decorates all sections in a container element.
 * @param {Element} main The container element
 */
function decorateSections(main) {
  main.querySelectorAll(':scope > div').forEach((section) => {
    const wrappers = [];
    let defaultContent = false;
    [...section.children].forEach((e) => {
      if (e.tagName === 'DIV' || !defaultContent) {
        const wrapper = document.createElement('div');
        wrappers.push(wrapper);
        defaultContent = e.tagName !== 'DIV';
        if (defaultContent) wrapper.classList.add('default-content-wrapper');
      }
      wrappers[wrappers.length - 1].append(e);
    });
    wrappers.forEach((wrapper) => section.append(wrapper));
    section.classList.add('section');
    section.dataset.sectionStatus = 'initialized';
    section.style.display = 'none';

    // Process section metadata
    const sectionMeta = section.querySelector('div.section-metadata');
    if (sectionMeta) {
      const meta = readBlockConfig(sectionMeta);
      Object.keys(meta).forEach((key) => {
        if (key === 'style') {
          const styles = meta.style
            .split(',')
            .filter((style) => style)
            .map((style) => toClassName(style.trim()));
          styles.forEach((style) => section.classList.add(style));
        } else {
          section.dataset[toCamelCase(key)] = meta[key];
        }
      });
      sectionMeta.parentNode.remove();
    }
  });
}

/**
 * Gets placeholders object.
 * @param {string} [prefix] Location of placeholders
 * @returns {object} Window placeholders object
 */
// eslint-disable-next-line import/prefer-default-export
async function fetchPlaceholders(prefix = 'default') {
  window.placeholders = window.placeholders || {};
  if (!window.placeholders[prefix]) {
    window.placeholders[prefix] = new Promise((resolve) => {
      fetch(`${prefix === 'default' ? '' : prefix}/placeholders.json`)
        .then((resp) => {
          if (resp.ok) {
            return resp.json();
          }
          return {};
        })
        .then((json) => {
          const placeholders = {};
          json.data
            .filter((placeholder) => placeholder.Key)
            .forEach((placeholder) => {
              placeholders[toCamelCase(placeholder.Key)] = placeholder.Text;
            });
          window.placeholders[prefix] = placeholders;
          resolve(window.placeholders[prefix]);
        })
        .catch(() => {
          // error loading placeholders
          window.placeholders[prefix] = {};
          resolve(window.placeholders[prefix]);
        });
    });
  }
  return window.placeholders[`${prefix}`];
}

/**
 * Updates all section status in a container element.
 * @param {Element} main The container element
 */
function updateSectionsStatus(main) {
  const sections = [...main.querySelectorAll(':scope > div.section')];
  for (let i = 0; i < sections.length; i += 1) {
    const section = sections[i];
    const status = section.dataset.sectionStatus;
    if (status !== 'loaded') {
      const loadingBlock = section.querySelector(
        '.block[data-block-status="initialized"], .block[data-block-status="loading"]',
      );
      if (loadingBlock) {
        section.dataset.sectionStatus = 'loading';
        break;
      } else {
        section.dataset.sectionStatus = 'loaded';
        section.style.display = null;
      }
    }
  }
}

/**
 * Builds a block DOM Element from a two dimensional array, string, or object
 * @param {string} blockName name of the block
 * @param {*} content two dimensional array or string or object of content
 */
function buildBlock(blockName, content) {
  const table = Array.isArray(content) ? content : [[content]];
  const blockEl = document.createElement('div');
  // build image block nested div structure
  blockEl.classList.add(blockName);
  table.forEach((row) => {
    const rowEl = document.createElement('div');
    row.forEach((col) => {
      const colEl = document.createElement('div');
      const vals = col.elems ? col.elems : [col];
      vals.forEach((val) => {
        if (val) {
          if (typeof val === 'string') {
            colEl.innerHTML += val;
          } else {
            colEl.appendChild(val);
          }
        }
      });
      rowEl.appendChild(colEl);
    });
    blockEl.appendChild(rowEl);
  });
  return blockEl;
}

/**
 * Loads JS and CSS for a block.
 * @param {Element} block The block element
 */
async function loadBlock(block) {
  const status = block.dataset.blockStatus;
  if (status !== 'loading' && status !== 'loaded') {
    block.dataset.blockStatus = 'loading';
    const { blockName } = block.dataset;
    try {
      //const cssLoaded = loadCSS(`${window.hlx.codeBasePath}/blocks/${blockName}/${blockName}.css`);
      const cssLoaded = true;
      const decorationComplete = new Promise((resolve) => {
        (async () => {
          try {
            const mod = await import(/* webpackIgnore: true */ `${window.hlx.codeBasePath}/blocks/${blockName}/${blockName}.js`);
            if (mod.default) {
              await mod.default(block);
            }
          } catch (error) {
            // eslint-disable-next-line no-console
            console.log(`failed to load module for ${blockName}`, error);
          }
          resolve();
        })();
      });
      await Promise.all([cssLoaded, decorationComplete]);
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log(`failed to load block ${blockName}`, error);
    }
    block.dataset.blockStatus = 'loaded';
  }
  return block;
}

/**
 * Loads JS and CSS for all blocks in a container element.
 * @param {Element} main The container element
 */
async function loadBlocks(main) {
  updateSectionsStatus(main);
  const blocks = [...main.querySelectorAll('div.block')];
  for (let i = 0; i < blocks.length; i += 1) {
    // eslint-disable-next-line no-await-in-loop
    await loadBlock(blocks[i]);
    updateSectionsStatus(main);
  }
}

/**
 * Decorates a block.
 * @param {Element} block The block element
 */
function decorateBlock(block) {
  const shortBlockName = block.classList[0];
  if (shortBlockName) {
    block.classList.add('block');
    block.dataset.blockName = shortBlockName;
    block.dataset.blockStatus = 'initialized';
    wrapTextNodes(block);
    const blockWrapper = block.parentElement;
    blockWrapper.classList.add(`${shortBlockName}-wrapper`);
    const section = block.closest('.section');
    if (section) section.classList.add(`${shortBlockName}-container`);
  }
}

/**
 * Decorates all blocks in a container element.
 * @param {Element} main The container element
 */
function decorateBlocks(main) {
  main.querySelectorAll('div.section > div > div').forEach(decorateBlock);
}

/**
 * Loads a block named 'header' into header
 * @param {Element} header header element
 * @returns {Promise}
 */
async function loadHeader(header) {
  const headerBlock = buildBlock('header', '');
  header.append(headerBlock);
  decorateBlock(headerBlock);
  return loadBlock(headerBlock);
}

/**
 * Loads a block named 'footer' into footer
 * @param footer footer element
 * @returns {Promise}
 */
async function loadFooter(footer) {
  const footerBlock = buildBlock('footer', '');
  footer.append(footerBlock);
  decorateBlock(footerBlock);
  return loadBlock(footerBlock);
}

/**
 * Load LCP block and/or wait for LCP in default content.
 * @param {Array} lcpBlocks Array of blocks
 */
async function waitForLCP(lcpBlocks) {
  const block = document.querySelector('.block');
  const hasLCPBlock = block && lcpBlocks.includes(block.dataset.blockName);
  if (hasLCPBlock) await loadBlock(block);

  document.body.style.display = null;
  const lcpCandidate = document.querySelector('main img');

  await new Promise((resolve) => {
    if (lcpCandidate && !lcpCandidate.complete) {
      lcpCandidate.setAttribute('loading', 'eager');
      lcpCandidate.addEventListener('load', resolve);
      lcpCandidate.addEventListener('error', resolve);
    } else {
      resolve();
    }
  });
}

init();




/***/ }),

/***/ "./scripts/common.js":
/*!***************************!*\
  !*** ./scripts/common.js ***!
  \***************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   BODY_BUILDER_NEWS_CONFIGS: () => (/* binding */ BODY_BUILDER_NEWS_CONFIGS),
/* harmony export */   COOKIE_CONFIGS: () => (/* binding */ COOKIE_CONFIGS),
/* harmony export */   HEADER_CONFIGS: () => (/* binding */ HEADER_CONFIGS),
/* harmony export */   MAGAZINE_CONFIGS: () => (/* binding */ MAGAZINE_CONFIGS),
/* harmony export */   NEWS_FEED_CONFIGS: () => (/* binding */ NEWS_FEED_CONFIGS),
/* harmony export */   SEARCH_URLS: () => (/* binding */ SEARCH_URLS),
/* harmony export */   TOOLS_CONFIGS: () => (/* binding */ TOOLS_CONFIGS),
/* harmony export */   TRUCK_CONFIGURATOR_URLS: () => (/* binding */ TRUCK_CONFIGURATOR_URLS),
/* harmony export */   addFavIcon: () => (/* binding */ addFavIcon),
/* harmony export */   adjustPretitle: () => (/* binding */ adjustPretitle),
/* harmony export */   checkOneTrustGroup: () => (/* binding */ checkOneTrustGroup),
/* harmony export */   clearElementAttributes: () => (/* binding */ clearElementAttributes),
/* harmony export */   createElement: () => (/* binding */ createElement),
/* harmony export */   createResponsivePicture: () => (/* binding */ createResponsivePicture),
/* harmony export */   debounce: () => (/* binding */ debounce),
/* harmony export */   decorateIcons: () => (/* binding */ decorateIcons),
/* harmony export */   deepMerge: () => (/* binding */ deepMerge),
/* harmony export */   extractObjectFromArray: () => (/* binding */ extractObjectFromArray),
/* harmony export */   formatStringToArray: () => (/* binding */ formatStringToArray),
/* harmony export */   formatValues: () => (/* binding */ formatValues),
/* harmony export */   generateId: () => (/* binding */ generateId),
/* harmony export */   getArticleTags: () => (/* binding */ getArticleTags),
/* harmony export */   getHref: () => (/* binding */ getHref),
/* harmony export */   getImageURLs: () => (/* binding */ getImageURLs),
/* harmony export */   getJsonFromUrl: () => (/* binding */ getJsonFromUrl),
/* harmony export */   getLanguagePath: () => (/* binding */ getLanguagePath),
/* harmony export */   getOrigin: () => (/* binding */ getOrigin),
/* harmony export */   getPlaceholders: () => (/* binding */ getPlaceholders),
/* harmony export */   getTextLabel: () => (/* binding */ getTextLabel),
/* harmony export */   isFunctionalAllowed: () => (/* binding */ isFunctionalAllowed),
/* harmony export */   isPerformanceAllowed: () => (/* binding */ isPerformanceAllowed),
/* harmony export */   isSocialAllowed: () => (/* binding */ isSocialAllowed),
/* harmony export */   isTargetingAllowed: () => (/* binding */ isTargetingAllowed),
/* harmony export */   loadDelayed: () => (/* binding */ loadDelayed),
/* harmony export */   loadLazy: () => (/* binding */ loadLazy),
/* harmony export */   loadTemplate: () => (/* binding */ loadTemplate),
/* harmony export */   removeEmptyTags: () => (/* binding */ removeEmptyTags),
/* harmony export */   slugify: () => (/* binding */ slugify),
/* harmony export */   unwrapDivs: () => (/* binding */ unwrapDivs),
/* harmony export */   variantsClassesToBEM: () => (/* binding */ variantsClassesToBEM)
/* harmony export */ });
/* harmony import */ var _aem_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./aem.js */ "./scripts/aem.js");


let placeholders = null;

const getLanguagePath = () => {
  const { pathname } = new URL(window.location.href);
  const langCodeMatch = pathname.match('^(/[a-z]{2}(-[a-z]{2})?/).*');
  return langCodeMatch ? langCodeMatch[1] : '/';
};

async function getPlaceholders() {
  const url = `${getLanguagePath()}placeholder.json`;
  placeholders = await fetch(url).then((resp) => resp.json());
}

function getTextLabel(key) {
  return "abc"; // @TODO: convert to async func
  return placeholders.data.find((el) => el.Key === key)?.Text || key;
}

/**
 * Returns the true origin of the current page in the browser.
 * If the page is running in a iframe with srcdoc, the ancestor origin is returned.
 * @returns {String} The true origin
 */
function getOrigin() {
  return window.location.href === 'about:srcdoc' ? window.parent.location.origin : window.location.origin;
}

/**
 * Returns the true of the current page in the browser.mac
 * If the page is running in a iframe with srcdoc,
 * the ancestor origin + the path query param is returned.
 * @returns {String} The href of the current page or the href of the block running in the library
 */
function getHref() {
  if (window.location.href !== 'about:srcdoc') return window.location.href;

  const urlParams = new URLSearchParams(window.parent.location.search);
  return `${window.parent.location.origin}${urlParams.get('path')}`;
}

/**
 * Create an element with the given id and classes.
 * @param {string} tagName the tag
 * @param {Object} options the element options
 * @param {string[]|string} [options.classes=[]] the class or classes to add
 * @param {Object} [options.props={}] any other attributes to add to the element
 * @returns {HTMLElement} the element
 */
function createElement(tagName, options = {}) {
  const { classes = [], props = {} } = options;
  const elem = document.createElement(tagName);
  const isString = typeof classes === 'string';
  if (classes || (isString && classes !== '') || (!isString && classes.length > 0)) {
    const classesArr = isString ? [classes] : classes;
    elem.classList.add(...classesArr);
  }
  if (!isString && classes.length === 0) elem.removeAttribute('class');

  if (props) {
    Object.keys(props).forEach((propName) => {
      const isBooleanAttribute = propName === 'allowfullscreen' || propName === 'autoplay' || propName === 'muted' || propName === 'controls';

      // For boolean attributes, add the attribute without a value if it's truthy
      if (isBooleanAttribute) {
        if (props[propName]) {
          elem.setAttribute(propName, '');
        }
      } else {
        const value = props[propName];
        elem.setAttribute(propName, value);
      }
    });
  }

  return elem;
}

/**
 * Adds the favicon.
 * @param {string} href The favicon URL
 */
function addFavIcon(href) {
  const link = createElement('link', { props: { rel: 'icon', type: 'image/svg+xml', href } });
  const existingLink = document.querySelector('head link[rel="icon"]');
  if (existingLink) {
    existingLink.parentElement.replaceChild(link, existingLink);
  } else {
    document.getElementsByTagName('head')[0].appendChild(link);
  }
}

const ICONS_CACHE = {};
/**
 * Replace icons with inline SVG and prefix with codeBasePath.
 * @param {Element} [element] Element containing icons
 */
async function decorateIcons(element) {
  // Prepare the inline sprite
  let svgSprite = document.getElementById('franklin-svg-sprite');
  if (!svgSprite) {
    const div = document.createElement('div');
    div.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" id="franklin-svg-sprite" style="display: none"></svg>';
    svgSprite = div.firstElementChild;
    document.body.append(div.firstElementChild);
  }

  // Download all new icons
  const icons = [...element.querySelectorAll('span.icon')];

  await Promise.all(icons.map(async (span) => {
    const iconName = Array.from(span.classList).find((c) => c.startsWith('icon-')).substring(5);
    if (!ICONS_CACHE[iconName]) {
      ICONS_CACHE[iconName] = true;
      try {
        const response = await fetch(`${window.hlx.codeBasePath}/icons/${iconName}.svg`);
        if (!response.ok) {
          ICONS_CACHE[iconName] = false;
          return;
        }
        // Styled icons don't play nice with the sprite approach because of shadow dom isolation
        const svg = await response.text();
        if (svg.match(/(<style | class=)/)) {
          ICONS_CACHE[iconName] = { styled: true, html: svg };
        } else {
          ICONS_CACHE[iconName] = {
            html: svg
              .replace('<svg', `<symbol id="icons-sprite-${iconName}"`)
              .replace(/ width=".*?"/, '')
              .replace(/ height=".*?"/, '')
              .replace('</svg>', '</symbol>'),
          };
        }
      } catch (error) {
        ICONS_CACHE[iconName] = false;
        // eslint-disable-next-line no-console
        console.error(error);
      }
    }
  }));

  const symbols = Object
    .keys(ICONS_CACHE).filter((k) => !svgSprite.querySelector(`#icons-sprite-${k}`))
    .map((k) => ICONS_CACHE[k])
    .filter((v) => !v.styled)
    .map((v) => v.html)
    .join('\n');
  svgSprite.innerHTML += symbols;

  /*
  icons.forEach((span) => {
    const iconName = Array.from(span.classList).find((c) => c.startsWith('icon-')).substring(5);
    const parent = span.firstElementChild?.tagName === 'A' ? span.firstElementChild : span;
    // Styled icons need to be inlined as-is, while unstyled ones can leverage the sprite
    if (ICONS_CACHE[iconName].styled) {
      parent.innerHTML = ICONS_CACHE[iconName].html;
    } else {
      parent.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg"><use href="#icons-sprite-${iconName}"/></svg>`;
    }
  });
  */
}

async function loadTemplate(doc, templateName) {
  console.log('loadTemplate', templateName);

  try {
    await (0,_aem_js__WEBPACK_IMPORTED_MODULE_0__.loadCSS)(`${window.hlx.codeBasePath}/templates/${templateName}/${templateName}.css`);
    const decorationComplete = new Promise((resolve) => {
      (async () => {
        try {
          const mod = await __webpack_require__("./templates lazy recursive ^\\.\\/.*\\/.*\\.js$")(`./${templateName}/${templateName}.js`);
          if (mod.default) {
            await mod.default(doc);
          }
        } catch (error) {
          // eslint-disable-next-line no-console
          console.log(`failed to load module for ${templateName}`, error);
        }
        resolve();
      })();
    });
    await decorationComplete;
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log(`failed to load block ${templateName}`, error);
  }
}

/**
 * loads everything that doesn't need to be delayed.
 */
async function loadLazy(doc) {
  const main = doc.querySelector('main');
  //await loadBlocks(main);

  const { hash } = window.location;
  const element = hash ? doc.getElementById(hash.substring(1)) : false;
  if (hash && element) element.scrollIntoView();
  const header = doc.querySelector('header');

  (0,_aem_js__WEBPACK_IMPORTED_MODULE_0__.loadHeader)(header);
  (0,_aem_js__WEBPACK_IMPORTED_MODULE_0__.loadFooter)(doc.querySelector('footer'));

  const subnav = header?.querySelector('.block.sub-nav');
  if (subnav) {
    (0,_aem_js__WEBPACK_IMPORTED_MODULE_0__.loadBlock)(subnav);
  }

  (0,_aem_js__WEBPACK_IMPORTED_MODULE_0__.loadCSS)(`${window.hlx.codeBasePath}/styles/lazy-styles.css`);
  addFavIcon(`${window.hlx.codeBasePath}/styles/favicon.svg`);
  (0,_aem_js__WEBPACK_IMPORTED_MODULE_0__.sampleRUM)('lazy');
  _aem_js__WEBPACK_IMPORTED_MODULE_0__.sampleRUM.observe(main.querySelectorAll('div[data-block-name]'));
  _aem_js__WEBPACK_IMPORTED_MODULE_0__.sampleRUM.observe(main.querySelectorAll('picture > img'));
}

/**
 * loads everything that happens a lot later, without impacting
 * the user experience.
 */
function loadDelayed() {
  // eslint-disable-next-line import/no-cycle
  window.setTimeout(() => {
    console.log('delayed');

    // eslint-disable-next-line import/no-cycle
    __webpack_require__.e(/*! import() */ "scripts_delayed_js").then(__webpack_require__.bind(__webpack_require__, /*! ./delayed.js */ "./scripts/delayed.js"));
  }, 300);
  // load anything that can be postponed to the latest here
}

const removeEmptyTags = (block) => {
  block.querySelectorAll('*').forEach((x) => {
    const tagName = `</${x.tagName}>`;

    // checking that the tag is not autoclosed to make sure we don't remove <meta />
    // checking the innerHTML and trim it to make sure the content inside the tag is 0
    if (
      x.outerHTML.slice(tagName.length * -1).toUpperCase() === tagName
      // && x.childElementCount === 0
      && x.innerHTML.trim().length === 0) {
      x.remove();
    }
  });
};

/**
 * This function recursively traverses the child elements of a given element
 * and removes all <div> elements that have no attributes,
 * moving their children to the parent element.
 * @param {HTMLElement} element the parent element to remove its children
 * @param {Object} options the unwrap options
 * @param {boolean} [options.ignoreDataAlign=false] whether to ignore divs with data-align attribute
 * @returns {void}
 */
const unwrapDivs = (element, options = {}) => {
  const stack = [element];
  const { ignoreDataAlign = false } = options;

  while (stack.length > 0) {
    const currentElement = stack.pop();

    let i = 0;
    while (i < currentElement.children.length) {
      const node = currentElement.children[i];
      const attributesLength = [...node.attributes].filter((el) => {
        if (ignoreDataAlign) {
          return !(el.name.startsWith('data-align') || el.name.startsWith('data-valign'));
        }

        return el;
      }).length;

      if (node.tagName === 'DIV' && attributesLength === 0) {
        while (node.firstChild) {
          currentElement.insertBefore(node.firstChild, node);
        }
        node.remove();
      } else {
        stack.push(node);
        i += 1;
      }
    }
  }
};

const variantsClassesToBEM = (blockClasses, expectedVariantsNames, blockName) => {
  expectedVariantsNames.forEach((variant) => {
    if (blockClasses.contains(variant)) {
      blockClasses.remove(variant);
      blockClasses.add(`${blockName}--${variant}`);
    }
  });
};

const slugify = (text) => (
  text.toString().toLowerCase().trim()
    // separate accent from letter
    .normalize('NFD')
    // remove all separated accents
    .replace(/[\u0300-\u036f]/g, '')
    // replace spaces with -
    .replace(/\s+/g, '-')
    // replace & with 'and'
    .replace(/&/g, '-and-')
    // remove all non-word chars
    .replace(/[^\w-]+/g, '')
    // replace multiple '-' with single '-'
    .replace(/--+/g, '-')
);

/**
 * loads the constants file where configuration values are stored
 */
async function getConstantValues() {
  const url = `${getLanguagePath()}constants.json`;
  let constants;
  try {
    const response = await fetch(url).then((resp) => resp.json());
    if (!response.ok) {
      constants = response;
    }
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('Error with constants file', error);
  }
  return constants;
}

const extractObjectFromArray = (data) => {
  const obj = {};
  for (const item of data) {
    try {
      if (typeof item !== 'string' || !item.includes(':')) {
        throw new TypeError(`Invalid input: "${item}". Expected a string: "key: value".`);
      }
      const [key, value] = item.split(':', 2);
      obj[key.trim()] = value.trim();
    } catch (error) {
      // eslint-disable-next-line no-console
      console.warn(`Error with item: "${item}"`, error);
    }
  }
  return obj;
};

const formatValues = (values) => {
  const obj = {};
  /* eslint-disable-next-line */
  if (values) values.forEach(({ name, value }) => obj[name] = value);
  return obj;
};

const {
  searchUrls,
  cookieValues,
  magazineConfig,
  headerConfig,
  tools,
  truckConfiguratorUrls,
  newsFeedConfig,
  bodyBuilderNewsConfig,
} = await getConstantValues();

// This data comes from the sharepoint 'constants.xlsx' file
const SEARCH_URLS = formatValues(searchUrls?.data);
const COOKIE_CONFIGS = formatValues(cookieValues?.data);
const MAGAZINE_CONFIGS = formatValues(magazineConfig?.data);
const HEADER_CONFIGS = formatValues(headerConfig?.data);
const TOOLS_CONFIGS = formatValues(tools?.data);
const TRUCK_CONFIGURATOR_URLS = formatValues(truckConfiguratorUrls?.data);
const NEWS_FEED_CONFIGS = formatValues(newsFeedConfig?.data);
const BODY_BUILDER_NEWS_CONFIGS = formatValues(bodyBuilderNewsConfig?.data);

/**
 * Check if one trust group is checked.
 * @param {String} groupName the one trust group like: C0002
 */
function checkOneTrustGroup(groupName, cookieCheck = false) {
  const oneTrustCookie = decodeURIComponent(document.cookie.split(';').find((cookie) => cookie.trim().startsWith('OptanonConsent=')));
  return cookieCheck || oneTrustCookie.includes(`${groupName}:1`);
}

const {
  PERFORMANCE_COOKIE = false,
  FUNCTIONAL_COOKIE = false,
  TARGETING_COOKIE = false,
  SOCIAL_COOKIE = false,
} = COOKIE_CONFIGS;

function isPerformanceAllowed() {
  return checkOneTrustGroup(PERFORMANCE_COOKIE);
}

function isFunctionalAllowed() {
  return checkOneTrustGroup(FUNCTIONAL_COOKIE);
}

function isTargetingAllowed() {
  return checkOneTrustGroup(TARGETING_COOKIE);
}

function isSocialAllowed() {
  return checkOneTrustGroup(SOCIAL_COOKIE);
}

/**
 * Helper for delaying a function
 * @param {function} func callback function
 * @param {number} timeout time to debouce in ms, default 200
*/
function debounce(func, timeout = 200) {
  let timer;
  return (...args) => {
    clearTimeout(timer);

    timer = setTimeout(() => { func.apply(this, args); }, timeout);
  };
}

/**
 * Returns a list of properties listed in the block
 * @param {string} route get the Json data from the route
 * @returns {Object} the json data object
*/
const getJsonFromUrl = async (route) => {
  try {
    const response = await fetch(route);
    if (!response.ok) return null;
    const json = await response.json();
    return json;
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('getJsonFromUrl:', { error });
  }
  return null;
};

/**
 * See https://www.aem.live/developer/spreadsheets#arrays
 * Converts a string representation of an array, removing all brackets, backslashes, and quotes,
 * into an actual JavaScript array. Splits on commas, trims each string, and filters out empty
 * strings to ensure all elements contain valid data.
 *
 * @param {string} inputString - The string to be converted. It should mimic a serialized array,
 *                               often found in JSON-like structures where arrays are represented
 *                               as strings due to data transmission constraints.
 * @returns {string[]} An array of strings derived from the cleaned input string. Each element
 *                     is a trimmed, non-empty string that was separated by a comma in the
 *                     original input.
 */
const formatStringToArray = (inputString) => {
  // eslint-disable-next-line no-useless-escape
  const cleanedString = inputString.replace(/[\[\]\\'"]+/g, '');
  return cleanedString.split(',')
    .map((item) => item.trim())
    .filter((item) => item);
};

/*
  The generateId function should be used only
  for generating the id for UI elements
*/
let idValue = 0;

const generateId = (prefix = 'id') => {
  idValue += 1;
  return `${prefix}-${idValue}`;
};

const adjustPretitle = (element) => {
  const headingSelector = 'h1, h2, h3, h4, h5, h6';

  [...element.querySelectorAll(headingSelector)].forEach((heading) => {
    const isNextElHeading = heading.nextElementSibling?.matches(headingSelector);
    if (!isNextElHeading) {
      return;
    }

    const currentLevel = Number(heading.tagName[1]);
    const nextElLevel = Number(heading.nextElementSibling.tagName[1]);

    if (currentLevel > nextElLevel) {
      const pretitle = createElement('span', { classes: ['pretitle'] });
      pretitle.append(...heading.childNodes);

      heading.replaceWith(pretitle);
    }
  });
};

/**
 * Extracts the URL without query parameters of images from an array of picture elements
 * @param {HTMLElement} images - An array of picture elements
 * @returns {Array} Array of src strings
 */
function getImageURLs(pictures) {
  return pictures.map((picture) => {
    const imgElement = picture.querySelector('img');
    return imgElement.getAttribute('src').split('?')[0];
  });
}

/**
 * Creates a picture element based on provided image data and breakpoints
 * @param {Array} images - Array of objects defining image data and breakpoints
 * @param {boolean} eager - Whether to load images eagerly
 * @param {string} alt - Alt text for the image
 * @param {string[]|string} imageClass - Class for the image
 * @returns {HTMLElement} The created picture element
 */
function createResponsivePicture(images, eager, alt, imageClass) {
  const picture = document.createElement('picture');
  let fallbackWidth = '';
  let fallbackSrc = '';

  function constructSrcset(src, width, format) {
    const baseUrl = `${src}?format=${format}&optimize=medium`;
    return `${baseUrl}&width=${width} 1x, ${baseUrl}&width=${width * 2} 2x`;
  }

  images.forEach((image) => {
    const originalFormat = image.src.split('.').pop();

    image.breakpoints.forEach((bp) => {
      if (!bp.media) return;

      const srcsetWebp = constructSrcset(image.src, bp.width, 'webp');
      const srcsetOriginal = constructSrcset(image.src, bp.width, originalFormat);

      const webpSource = createElement('source', {
        props: {
          type: 'image/webp',
          srcset: srcsetWebp,
          media: bp.media,
        },
      });

      const originalSource = createElement('source', {
        props: {
          type: `image/${originalFormat}`,
          srcset: srcsetOriginal,
          media: bp.media,
        },
      });

      picture.insertBefore(originalSource, picture.firstChild);
      picture.insertBefore(webpSource, originalSource);
    });

    const fallbackBreakpoint = image.breakpoints.find((bp) => !bp.media);
    if (fallbackBreakpoint && !fallbackSrc) {
      fallbackWidth = fallbackBreakpoint.width;
      fallbackSrc = `${image.src}?width=${fallbackWidth}&format=${originalFormat}&optimize=medium`;
    }
  });

  const img = createElement('img', {
    classes: imageClass,
    props: {
      src: fallbackSrc,
      alt,
      loading: eager ? 'eager' : 'lazy',
      width: fallbackWidth,
    },
  });

  picture.appendChild(img);

  return picture;
}

const deepMerge = (originalTarget, source) => {
  let target = originalTarget;
  // Initialize target as an empty object if it's undefined or null
  if (typeof target !== 'object' || target === null) {
    target = {};
  }

  Object.keys(source).forEach((key) => {
    const sourceValue = source[key];
    const targetValue = target[key];
    const sourceIsPlainObject = Object.prototype.toString.call(sourceValue) === '[object Object]';
    const targetIsPlainObject = Object.prototype.toString.call(targetValue) === '[object Object]';

    if (sourceIsPlainObject && targetIsPlainObject) {
      target[key] = target[key] || {};
      deepMerge(target[key], sourceValue);
    } else {
      target[key] = sourceValue;
    }
  });
  return target;
};

/**
 * Clear/removes all of the attributes of an element by reference
 * @param {HTMLElement} element - Element to clear attributes from
 * @returns {HTMLElement} The created picture element
 *
 * USAGE:
 * Clean by reference:
 *
 * clearElementAttributes(element);
 * // Then do things on the clean element...
 *
 * OR, leverage the return of the element and do chaining operations:
 *
 * removeAllAttributes(element).classList.add('SOME-CLASS-NAME');
 *
 */
const clearElementAttributes = (element) => {
  // Get all attributes of the element
  const attributes = Array.from(element.attributes);

  // Loop through the attributes and remove them
  attributes.forEach((attr) => {
    element.removeAttribute(attr.name);
  });

  return element;
};

// Magazine common functions
/**
 * Extracts the values from an array of objects and returns an array of values
 * example: [{ key: 'value' }] => ['value']
 * @param {Array} array - An array of objects
 * @returns {Array} An array of values
 */
function getValuesFromObjectsArray(array = []) {
  if (!Array.isArray(array) || array.length === 0) return [];
  return array.map((item) => Object.values(item)[0]);
}

/**
 * Extracts the matching tags from an array of tags and an array of article tags
 * and returns a string of matching tags
 * @param {Array} tags - An array of tags from the JSON file
 * @param {Array} articleTags - An array of article:tags
 * @returns {string} A string of matching tags
 */
function getMetadataFromTags(tags, articleTags) {
  if (!tags || !articleTags) {
    return '';
  }

  const matchingTags = [...articleTags]
    .filter((tag) => tags.includes(tag.content))
    .map((tag) => tag.content);
  return matchingTags && matchingTags?.length > 0 ? matchingTags.join(', ') : '';
}

/**
 * Get the article tags from the JSON file and the article tags from the document
 * and return the matching tags
 * @param {string} tagType - The type of tag to get such as 'categories', 'topics' or 'trucks'
 * @returns {string} A string of matching tags
 */
async function getArticleTags(tagType) {
  const articleTags = document.head.querySelectorAll('meta[property="article:tag"]') || [];
  const tagItems = await getJsonFromUrl('/magazine/articles/tags.json');
  const tags = tagItems && tagItems[tagType]
    && getValuesFromObjectsArray(tagItems[tagType].data);
  return getMetadataFromTags(tags, articleTags);
}

__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } }, 1);

/***/ }),

/***/ "./scripts/scripts.js":
/*!****************************!*\
  !*** ./scripts/scripts.js ***!
  \****************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   a: () => (/* binding */ a),
/* harmony export */   button: () => (/* binding */ button),
/* harmony export */   debounce: () => (/* binding */ debounce),
/* harmony export */   decorateButtons: () => (/* binding */ decorateButtons),
/* harmony export */   decorateLinks: () => (/* binding */ decorateLinks),
/* harmony export */   decorateMain: () => (/* binding */ decorateMain),
/* harmony export */   decorateSections: () => (/* binding */ decorateSections),
/* harmony export */   div: () => (/* binding */ div),
/* harmony export */   domEl: () => (/* binding */ domEl),
/* harmony export */   findAndCreateImageLink: () => (/* binding */ findAndCreateImageLink),
/* harmony export */   form: () => (/* binding */ form),
/* harmony export */   getAllElWithChildren: () => (/* binding */ getAllElWithChildren),
/* harmony export */   h1: () => (/* binding */ h1),
/* harmony export */   h2: () => (/* binding */ h2),
/* harmony export */   h3: () => (/* binding */ h3),
/* harmony export */   h4: () => (/* binding */ h4),
/* harmony export */   h5: () => (/* binding */ h5),
/* harmony export */   h6: () => (/* binding */ h6),
/* harmony export */   i: () => (/* binding */ i),
/* harmony export */   img: () => (/* binding */ img),
/* harmony export */   input: () => (/* binding */ input),
/* harmony export */   li: () => (/* binding */ li),
/* harmony export */   loadAsBlock: () => (/* binding */ loadAsBlock),
/* harmony export */   loadScriptIfNotLoadedYet: () => (/* binding */ loadScriptIfNotLoadedYet),
/* harmony export */   p: () => (/* binding */ p),
/* harmony export */   span: () => (/* binding */ span),
/* harmony export */   ul: () => (/* binding */ ul)
/* harmony export */ });
/* harmony import */ var _aem_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./aem.js */ "./scripts/aem.js");
/* harmony import */ var _common_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./common.js */ "./scripts/common.js");
/* harmony import */ var _video_helper_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./video-helper.js */ "./scripts/video-helper.js");
/* harmony import */ var _validate_countries_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./validate-countries.js */ "./scripts/validate-countries.js");
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([_common_js__WEBPACK_IMPORTED_MODULE_1__, _video_helper_js__WEBPACK_IMPORTED_MODULE_2__, _validate_countries_js__WEBPACK_IMPORTED_MODULE_3__]);
([_common_js__WEBPACK_IMPORTED_MODULE_1__, _video_helper_js__WEBPACK_IMPORTED_MODULE_2__, _validate_countries_js__WEBPACK_IMPORTED_MODULE_3__] = __webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__);






const disableHeader = (0,_aem_js__WEBPACK_IMPORTED_MODULE_0__.getMetadata)('disable-header').toLowerCase() === 'true';
const disableFooter = (0,_aem_js__WEBPACK_IMPORTED_MODULE_0__.getMetadata)('disable-footer').toLowerCase() === 'true';

/**
 * Add the image as background
 * @param {Element} section the section container
 * @param {string} picture the picture's link
 */
function addBackgroundImage(section, picture) {
  section.classList.add('background');
  section.style.backgroundImage = `url('${picture}')`;
}

/**
 * Decorates all sections in a container element.
 * @param {Element} main The container element
 */
function decorateSections(main) {
  main.querySelectorAll(':scope > div').forEach((section) => {
    const wrappers = [];
    let defaultContent = false;
    [...section.children].forEach((e) => {
      if (e.tagName === 'DIV' || !defaultContent) {
        const wrapper = document.createElement('div');
        wrappers.push(wrapper);
        defaultContent = e.tagName !== 'DIV';
        if (defaultContent) wrapper.classList.add('default-content-wrapper');
      }
      wrappers[wrappers.length - 1].append(e);
    });
    wrappers.forEach((wrapper) => section.append(wrapper));
    section.classList.add('section');
    section.dataset.sectionStatus = 'initialized';
    section.style.display = 'none';

    /* process section metadata */
    const sectionMeta = section.querySelector('div.section-metadata');
    if (sectionMeta) {
      const meta = (0,_aem_js__WEBPACK_IMPORTED_MODULE_0__.readBlockConfig)(sectionMeta);
      Object.keys(meta).forEach((key) => {
        if (key === 'style') {
          const styles = meta.style.split(',').map((style) => (0,_aem_js__WEBPACK_IMPORTED_MODULE_0__.toClassName)(style.trim()));
          styles.forEach((style) => section.classList.add(style));
        } if (key === 'background') {
          const picture = sectionMeta.querySelector('picture');
          if (picture) addBackgroundImage(section, meta[key]);
        } else {
          section.dataset[(0,_aem_js__WEBPACK_IMPORTED_MODULE_0__.toCamelCase)(key)] = meta[key];
        }
      });
      sectionMeta.parentNode.remove();
    }
  });
}

/**
 * Reparents all child elements of a given element to its parent element.
 * @param {Element} element - The element whose children need to be reparented.
 */
const reparentChildren = (element) => {
  const parent = element.parentNode;
  while (element.firstChild) {
    parent.insertBefore(element.firstChild, element);
  }
  element.remove();
};

/**
 * Determines the appropriate button class based on the element hierarchy.
 * @param {Element} up - The parent element of the anchor tag.
 * @param {Element} twoUp - The grandparent element of the anchor tag.
 * @returns {string} - The button class to be applied.
 */
const getButtonClass = (up, twoUp) => {
  const isSingleChild = (element) => element.childNodes.length === 1;

  const upTag = up.tagName;
  const twoUpTag = twoUp.tagName;

  if (isSingleChild(twoUp)) {
    if (upTag === 'STRONG' && twoUpTag === 'P') return 'button button--primary';
    if (upTag === 'STRONG' && twoUpTag === 'LI') return 'button arrowed';
    if (upTag === 'EM' && twoUpTag === 'P') return 'button button--secondary';
  }

  if ((upTag === 'STRONG' || upTag === 'EM') && (twoUpTag === 'STRONG' || twoUpTag === 'EM')) {
    return 'button button--red';
  }

  return '';
};

/**
 * Adds the 'button-container' class to an element if it meets certain criteria.
 * @param {Element} element - The element to add the class to.
 */
const addClassToContainer = (element) => {
  if (element.childNodes.length === 1 && ['P', 'DIV', 'LI'].includes(element.tagName)) {
    element.classList.add('button-container');
  }
};

/**
 * Handles the decoration of a single link element.
 * @param {HTMLAnchorElement} link - The anchor tag to decorate.
 */
const handleLinkDecoration = (link) => {
  const up = link.parentElement;
  const twoUp = up.parentElement;
  const threeUp = twoUp.parentElement;

  if ((0,_aem_js__WEBPACK_IMPORTED_MODULE_0__.getMetadata)('style') === 'redesign-v2') {
    if (['STRONG', 'EM'].includes(up.tagName)) reparentChildren(up);
    if (['STRONG', 'EM'].includes(twoUp.tagName)) reparentChildren(twoUp);

    const buttonClass = getButtonClass(up, twoUp);
    if (buttonClass) link.className = `${buttonClass}`;

    addClassToContainer(up);
    addClassToContainer(twoUp);
    addClassToContainer(threeUp);
  } else {
    // TODO: remove v1 button decoration logic when v2 is fully used
    if (up.tagName === 'P' || up.tagName === 'DIV') {
      link.className = 'button button--primary'; // default
      up.className = 'button-container';
    }
    if (up.tagName === 'STRONG' && twoUp.childNodes.length === 1 && twoUp.tagName === 'P') {
      link.className = 'button button--primary';
      twoUp.className = 'button-container';
    }
    if (up.tagName === 'EM' && twoUp.childNodes.length === 1 && twoUp.tagName === 'P') {
      link.className = 'button button--secondary';
      twoUp.className = 'button-container';
    }
    if (up.tagName === 'STRONG' && twoUp.childNodes.length === 1 && twoUp.tagName === 'LI') {
      const arrow = (0,_common_js__WEBPACK_IMPORTED_MODULE_1__.createElement)('span', { classes: ['fa', 'fa-arrow-right'] });
      link.className = 'button arrowed';
      twoUp.parentElement.className = 'button-container';
      link.appendChild(arrow);
    }
    if (up.tagName === 'LI' && twoUp.children.length === 1
      && link.children.length > 0 && link.firstElementChild.tagName === 'STRONG') {
      const arrow = (0,_common_js__WEBPACK_IMPORTED_MODULE_1__.createElement)('span', { classes: ['fa', 'fa-arrow-right'] });
      link.className = 'button arrowed';
      twoUp.className = 'button-container';
      link.appendChild(arrow);
    }
  }
};

/**
 * Checks if an anchor tag should be decorated as a button.
 * @param {HTMLAnchorElement} link - The anchor tag to check.
 * @returns {boolean} - Returns true if the link should be decorated, otherwise false.
 */
const shouldDecorateLink = (link) => {
  link.title = link.title || link.textContent;
  return link.href !== link.textContent && !link.querySelector('img') && link.parentElement.childNodes.length === 1;
};

/**
 * Applies button styling to anchor tags within a specified element,
 * decorating them as button-like if they meet certain criteria.
 * @param {Element} element - The container element within which to search and style anchor tags.
 */
const decorateButtons = (element) => {
  element.querySelectorAll('a').forEach((link) => {
    if (shouldDecorateLink(link)) {
      handleLinkDecoration(link);
    }
  });
};

const LCP_BLOCKS = []; // add your LCP blocks to the list
window.hlx.RUM_GENERATION = 'project-1'; // add your RUM generation information here
window.mack = window.mack || {};
window.mack.newsData = window.mack.newsData || {
  news: [],
  offset: 0,
  allLoaded: false,
};

function findAndCreateImageLink(node) {
  const links = node.querySelectorAll('picture ~ a');

  [...links].forEach((link) => {
    let prevEl = link.previousElementSibling;

    if (prevEl.tagName.toLowerCase() === 'br') {
      prevEl = prevEl.previousElementSibling;
    }

    if (prevEl.tagName.toLowerCase() === 'picture') {
      link.innerHTML = '';
      link.appendChild(prevEl);
      link.setAttribute('target', '_blank');
      link.classList.add('image-link');
    }
  });
}

/**
 * Builds hero block and prepends to main in a new section.
 * @param {Element} main The container element
 */
function buildHeroBlock(main) {
  // switching off hero autoblock for redesign
  if ((0,_aem_js__WEBPACK_IMPORTED_MODULE_0__.getMetadata)('style') === 'redesign-v2') {
    return;
  }

  const header = main.querySelector('h1');
  const picture = main.querySelector('picture');
  const heroBlock = main.querySelector('.hero, .v2-hero');
  if (heroBlock) return;
  // eslint-disable-next-line no-bitwise
  if (header && picture
    // eslint-disable-next-line no-bitwise
    && (header.compareDocumentPosition(picture) & Node.DOCUMENT_POSITION_PRECEDING)) {
    const section = document.createElement('div');
    section.append((0,_aem_js__WEBPACK_IMPORTED_MODULE_0__.buildBlock)('hero', { elems: [picture, header] }));
    section.querySelector('.hero').classList.add('auto-block');
    main.prepend(section);
  }
}

function buildSubNavigation(main, head) {
  const subnav = head.querySelector('meta[name="sub-navigation"]');
  if (subnav && subnav.content.startsWith('/')) {
    const block = (0,_aem_js__WEBPACK_IMPORTED_MODULE_0__.buildBlock)('sub-nav', []);
    main.previousElementSibling.prepend(block);
    (0,_aem_js__WEBPACK_IMPORTED_MODULE_0__.decorateBlock)(block);
  }
}

/**
 * Builds and inserts a v2-sub-navigation block as the first child of the element preceding
 * the main element if the v2-sub-navigation meta tag is present and its content starts with a '/'.
 *
 * @param {HTMLElement} main - The main element, used to find the preceding sibling element where
 * the block will be inserted.
 * @param {HTMLElement} head - The head element where the meta tag is located.
 */
const buildV2SubNavigation = (main, head) => {
  const v2SubNavigation = head.querySelector('meta[name="v2-sub-navigation"]');
  if (v2SubNavigation && v2SubNavigation.content.startsWith('/')) {
    const block = (0,_aem_js__WEBPACK_IMPORTED_MODULE_0__.buildBlock)('v2-sub-navigation', []);
    const v2SubNavigationContainer = (0,_common_js__WEBPACK_IMPORTED_MODULE_1__.createElement)('div');
    v2SubNavigationContainer.append(block);
    (0,_aem_js__WEBPACK_IMPORTED_MODULE_0__.decorateBlock)(v2SubNavigationContainer);
    main.prepend(v2SubNavigationContainer);
  }
};

/**
 * Builds all synthetic blocks in a container element.
 * @param {Element} main The container element
 */
function buildAutoBlocks(main, head) {
  try {
    buildHeroBlock(main);
    if (head) {
      buildSubNavigation(main, head);
      buildV2SubNavigation(main, head);
    }
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('Auto Blocking failed', error);
  }
}

function decorateLinks(block) {
  [...block.querySelectorAll('a')]
    .filter(({ href }) => !!href)
    .forEach((link) => {
      /* eslint-disable no-use-before-define */
      if ((0,_video_helper_js__WEBPACK_IMPORTED_MODULE_2__.isVideoLink)(link)) {
        (0,_video_helper_js__WEBPACK_IMPORTED_MODULE_2__.addVideoShowHandler)(link);
        return;
      }

      // handling modal links
      if (link.getAttribute('href').startsWith('/#id-modal')) {
        link.addEventListener('click', (event) => {
          event.preventDefault();
          const modalId = link.getAttribute('href').split('#')[1];
          const modalEvent = new CustomEvent('open-modal', {
            detail: {
              modalId,
            },
          });

          document.dispatchEvent(modalEvent, { bubbles: true });
        });
        return;
      }

      const url = new URL(link.href);
      const external = !url.host.match('macktrucks') && !url.host.match('.hlx.(page|live)') && !url.host.match('localhost');
      if (url.host.match('build.macktrucks') || url.pathname.endsWith('.pdf') || external) {
        link.target = '_blank';
      }
    });
}

function decorateSectionBackgrounds(main) {
  const variantClasses = [
    'light-gray-background',
    'primary-gray-background',
    'gray-background',
    'graphite-background',
    'black-background',
    'background-with-dots',
    'no-gap',
    'no-vertical-padding',
  ];

  main.querySelectorAll(':scope > .section').forEach((section) => {
    // transform background color variants into BEM classnames
    (0,_common_js__WEBPACK_IMPORTED_MODULE_1__.variantsClassesToBEM)(section.classList, variantClasses, 'section');

    // If the section contains a background image
    const src = section.dataset.backgroundImage;

    if (src) {
      const picture = (0,_aem_js__WEBPACK_IMPORTED_MODULE_0__.createOptimizedPicture)(src, '', false);
      section.prepend(picture);
      section.classList.add('section--with-background');
    }
  });
}

const createInpageNavigation = (main) => {
  const navItems = [];
  const tabItemsObj = [];

  // Extract the inpage navigation info from sections
  [...main.querySelectorAll(':scope > div')].forEach((section) => {
    const title = section.dataset.inpage;
    if (title) {
      const countDuplicated = tabItemsObj.filter((item) => item.title === title)?.length || 0;
      const order = parseFloat(section.dataset.inpageOrder);
      const anchorID = (countDuplicated > 0) ? (0,_common_js__WEBPACK_IMPORTED_MODULE_1__.slugify)(`${section.dataset.inpage}-${countDuplicated}`) : (0,_common_js__WEBPACK_IMPORTED_MODULE_1__.slugify)(section.dataset.inpage);
      const obj = {
        title,
        id: anchorID,
      };

      if (order) {
        obj.order = order;
      }

      tabItemsObj.push(obj);

      // Set section with ID
      section.dataset.inpageid = anchorID;
    }
  });

  // Sort the object by order
  const sortedObject = tabItemsObj.slice().sort((obj1, obj2) => {
    const order1 = obj1.order ?? Infinity; // Fallback to a large number if 'order' is not present
    const order2 = obj2.order ?? Infinity;

    return order1 - order2;
  });

  // From the array of objects create the DOM
  sortedObject.forEach((item) => {
    const subnavItem = (0,_common_js__WEBPACK_IMPORTED_MODULE_1__.createElement)('div');
    const subnavLink = (0,_common_js__WEBPACK_IMPORTED_MODULE_1__.createElement)('button', {
      props: {
        'data-id': item.id,
        title: item.title,
      },
    });

    subnavLink.textContent = item.title;

    subnavItem.append(subnavLink);
    navItems.push(subnavLink);
  });

  return navItems;
};

function buildInpageNavigationBlock(main, classname) {
  const items = createInpageNavigation(main);

  if (items.length > 0) {
    const section = (0,_common_js__WEBPACK_IMPORTED_MODULE_1__.createElement)('div');
    Object.assign(section.style, {
      height: '48px',
      overflow: 'hidden',
    });

    section.append((0,_aem_js__WEBPACK_IMPORTED_MODULE_0__.buildBlock)(classname, { elems: items }));
    // insert in second position, assumption is that Hero should be first
    main.insertBefore(section, main.children[1]);

    (0,_aem_js__WEBPACK_IMPORTED_MODULE_0__.decorateBlock)(section.querySelector(`.${classname}`));
  }
}

/**
 * Decorates the main element.
 * @param {Element} main The main element
 */
// eslint-disable-next-line import/prefer-default-export
function decorateMain(main, head) {
  (0,_common_js__WEBPACK_IMPORTED_MODULE_1__.decorateIcons)(document.body);

}

/**
 * Loads everything needed to get to LCP.
 * @param {Element} doc The container element
 */
async function loadEager(doc) {
  (0,_aem_js__WEBPACK_IMPORTED_MODULE_0__.decorateTemplateAndTheme)();

  const main = doc.querySelector('main');
  const { head } = doc;
  if (main) {
    decorateMain(main, head);
    document.body.classList.add('appear');
    const language = (0,_aem_js__WEBPACK_IMPORTED_MODULE_0__.getMetadata)('locale') || 'en';
    document.documentElement.lang = language;
    const templateName = (0,_aem_js__WEBPACK_IMPORTED_MODULE_0__.getMetadata)('template');
    if (templateName) await (0,_common_js__WEBPACK_IMPORTED_MODULE_1__.loadTemplate)(doc, templateName);
    await (0,_aem_js__WEBPACK_IMPORTED_MODULE_0__.waitForLCP)(LCP_BLOCKS);
  } else {
    document.documentElement.lang = 'en';
  }

  await (0,_common_js__WEBPACK_IMPORTED_MODULE_1__.getPlaceholders)();
}

/**
 * Loads everything that doesn't need to be delayed.
 * @param {Element} doc The container element
 */
async function loadLazy(doc) {
  const main = doc.querySelector('main');
  //await loadBlocks(main);

  const { hash } = window.location;
  const element = hash ? doc.getElementById(hash.substring(1)) : false;
  if (hash && element) element.scrollIntoView();
  const header = doc.querySelector('header');
  const subnav = header.querySelector('.block.sub-nav');

  if (!disableHeader) {
    //loadHeader(header);
  }
  if (!disableFooter) {
    //loadFooter(doc.querySelector('footer'));
  }

  /*if (subnav) {
    loadBlock(subnav);
    header.appendChild(subnav);
  }*/

  // loadCSS(`${window.hlx.codeBasePath}/styles/lazy-styles.css`);
  //addFavIcon(`${window.hlx.codeBasePath}/styles/favicon.svg`);
  (0,_aem_js__WEBPACK_IMPORTED_MODULE_0__.sampleRUM)('lazy');
  _aem_js__WEBPACK_IMPORTED_MODULE_0__.sampleRUM.observe(main.querySelectorAll('div[data-block-name]'));
  _aem_js__WEBPACK_IMPORTED_MODULE_0__.sampleRUM.observe(main.querySelectorAll('picture > img'));
}

async function loadPage() {
  await loadEager(document);
  await loadLazy(document);
  (0,_common_js__WEBPACK_IMPORTED_MODULE_1__.loadDelayed)();
}

loadPage();

/* this function load script only when it wasn't loaded yet */
const scriptMap = new Map();

function loadScriptIfNotLoadedYet(url, attrs) {
  if (scriptMap.has(url)) {
    return scriptMap.get(url).promise;
  }

  const promise = (0,_aem_js__WEBPACK_IMPORTED_MODULE_0__.loadScript)(url, attrs);
  scriptMap.set(url, { url, attrs, promise });
  return promise;
}

/**
 *
 * @param {string} blockName - block name with '-' instead of spaces
 * @param {string} blockContent - the content that will be set as block inner HTML
 * @param {object} options - other options like variantsClasses
 * @returns
 */
function loadAsBlock(blockName, blockContent, options = {}) {
  const { variantsClasses = [] } = options;
  const blockEl = (0,_common_js__WEBPACK_IMPORTED_MODULE_1__.createElement)('div', {
    classes: ['block', blockName, ...variantsClasses],
    props: { 'data-block-name': blockName },
  });

  blockEl.innerHTML = blockContent;
  (0,_aem_js__WEBPACK_IMPORTED_MODULE_0__.loadBlock)(blockEl);

  return blockEl;
}

/**
 * Example Usage:
 *
 * domEl('main',
 *  div({ class: 'card' },
 *  a({ href: item.path },
 *    div({ class: 'card-thumb' },
 *     createOptimizedPicture(item.image, item.title, 'lazy', [{ width: '800' }]),
 *    ),
 *   div({ class: 'card-caption' },
 *      h3(item.title),
 *      p({ class: 'card-description' }, item.description),
 *      p({ class: 'button-container' },
 *       a({ href: item.path, 'aria-label': 'Read More', class: 'button primary' }, 'Read More'),
 *     ),
 *   ),
 *  ),
 * )
 */

/**
 * Helper for more concisely generating DOM Elements with attributes and children
 * @param {string} tag HTML tag of the desired element
 * @param  {[Object?, ...Element]} items: First item can optionally be an object of attributes,
 *  everything else is a child element
 * @returns {Element} The constructred DOM Element
 */
function domEl(tag, ...items) {
  const element = document.createElement(tag);

  if (!items || items.length === 0) return element;

  if (!(items[0] instanceof Element || items[0] instanceof HTMLElement) && typeof items[0] === 'object') {
    const [attributes, ...rest] = items;
    // eslint-disable-next-line no-param-reassign
    items = rest;

    Object.entries(attributes).forEach(([key, value]) => {
      if (!key.startsWith('on')) {
        element.setAttribute(key, Array.isArray(value) ? value.join(' ') : value);
      } else {
        element.addEventListener(key.substring(2).toLowerCase(), value);
      }
    });
  }

  items.forEach((item) => {
    // eslint-disable-next-line no-param-reassign
    item = item instanceof Element || item instanceof HTMLElement
      ? item
      : document.createTextNode(item);
    element.appendChild(item);
  });

  return element;
}

/*
    More shorthand functions can be added for very common DOM elements below.
    domEl function from above can be used for one-off DOM element occurrences.
  */
function div(...items) { return domEl('div', ...items); }
function p(...items) { return domEl('p', ...items); }
function a(...items) { return domEl('a', ...items); }
function h1(...items) { return domEl('h1', ...items); }
function h2(...items) { return domEl('h2', ...items); }
function h3(...items) { return domEl('h3', ...items); }
function h4(...items) { return domEl('h4', ...items); }
function h5(...items) { return domEl('h5', ...items); }
function h6(...items) { return domEl('h6', ...items); }
function ul(...items) { return domEl('ul', ...items); }
function li(...items) { return domEl('li', ...items); }
function i(...items) { return domEl('i', ...items); }
function img(...items) { return domEl('img', ...items); }
function span(...items) { return domEl('span', ...items); }
function input(...items) { return domEl('input', ...items); }
function form(...items) { return domEl('form', ...items); }
function button(...items) { return domEl('button', ...items); }

/* Helper for delaying something like
takes function as argument, default timout = 200
*/
function debounce(func, timeout = 200) {
  let timer;
  return (...args) => {
    clearTimeout(timer);

    timer = setTimeout(() => { func.apply(this, args); }, timeout);
  };
}

/**
 * @param {NodeList} elements list of tested elements
 * @param {String} childrenCheck check that will be run for every element list
 * @param {boolean} [isOpposite=false] Flag to contemplate an edge case that is the opposite case
 * @returns list of elements that pass the children check
 */
function getAllElWithChildren(elements, childrenCheck, isOpposite = false) {
  if (isOpposite) return [...elements].filter((el) => !el.querySelector(childrenCheck));
  return [...elements].filter((el) => el.querySelector(childrenCheck));
}

/* Adds attributes to all anchors and buttons that start with properties between [ brackets ] */
const allLinks = [...document.querySelectorAll('a'), ...document.querySelectorAll('button')];
allLinks.forEach((link) => {
  const linkText = link.innerText;
  if (linkText[0] !== '[') return;
  const brackets = linkText.match(/^\[(.*?)\]/);
  const rawProperties = brackets && brackets[1];
  const propertyArray = rawProperties?.split(',');
  propertyArray?.forEach((prop) => {
    prop.trimStart();
    /* Check if this link should open in new tab */
    if (prop === 'new-tab') {
      link.setAttribute('target', '_blank');
      link.setAttribute('rel', 'noopener noreferrer');
    }
  });
  const firstDashIndex = linkText.indexOf(']');
  const selectedText = linkText.slice(firstDashIndex + 1);
  link.title = selectedText;
  link.innerText = selectedText;
});

function createTruckLineupSection(tabItems, classname) {
  const tabSection = (0,_common_js__WEBPACK_IMPORTED_MODULE_1__.createElement)('div', { classes: 'section' });
  tabSection.dataset.sectionStatus = 'initialized';
  const wrapper = (0,_common_js__WEBPACK_IMPORTED_MODULE_1__.createElement)('div');
  tabSection.append(wrapper);
  const tabBlock = (0,_aem_js__WEBPACK_IMPORTED_MODULE_0__.buildBlock)(classname, [tabItems]);
  wrapper.append(tabBlock);
  return tabSection;
}

function buildTruckLineupBlock(main, classname) {
  const tabItems = [];
  let nextElement;

  const mainChildren = [...main.querySelectorAll(':scope > div')];
  mainChildren.forEach((section, i2) => {
    const isTruckCarousel = section.dataset.truckCarousel;
    if (!isTruckCarousel) return;

    // save carousel position
    nextElement = mainChildren[i2 + 1];
    const sectionMeta = section.dataset.truckCarousel;

    const tabContent = (0,_common_js__WEBPACK_IMPORTED_MODULE_1__.createElement)('div', { classes: `${classname}__content` });
    tabContent.dataset.truckCarousel = sectionMeta;
    if (section.dataset.truckCarouselIcon) {
      tabContent.dataset.truckCarouselIcon = section.dataset.truckCarouselIcon;
    }

    tabContent.innerHTML = section.innerHTML;
    const image = tabContent.querySelector('p > picture');
    tabContent.prepend(image);

    tabItems.push(tabContent);
    section.remove();
  });

  if (tabItems.length > 0) {
    const tabbedCarouselSection = createTruckLineupSection(tabItems, classname);
    if (nextElement) { // if we saved a position push the carousel in that position if not
      main.insertBefore(tabbedCarouselSection, nextElement);
    } else {
      main.append(tabbedCarouselSection);
    }
    (0,_common_js__WEBPACK_IMPORTED_MODULE_1__.decorateIcons)(tabbedCarouselSection);
    (0,_aem_js__WEBPACK_IMPORTED_MODULE_0__.decorateBlock)(tabbedCarouselSection.querySelector(`.${classname}`));
  }
}

const moveClassToHtmlEl = (className, elementSelector = 'main') => {
  if (document.querySelector(elementSelector).classList.contains(className)) {
    document.documentElement.classList.add(className);
    document.querySelector(elementSelector).classList.remove(className);
  }
};

moveClassToHtmlEl('redesign-v2');
moveClassToHtmlEl('truck-configurator');

if (document.documentElement.classList.contains('truck-configurator')) {
  const allowedCountries = (0,_aem_js__WEBPACK_IMPORTED_MODULE_0__.getMetadata)('allowed-countries');
  const errorPageUrl = (0,_aem_js__WEBPACK_IMPORTED_MODULE_0__.getMetadata)('redirect-url');
  if (allowedCountries && errorPageUrl) (0,_validate_countries_js__WEBPACK_IMPORTED_MODULE_3__.validateCountries)(allowedCountries, errorPageUrl);

  const container = (0,_common_js__WEBPACK_IMPORTED_MODULE_1__.createElement)('div', { props: { id: 'configurator' } });
  const main = document.querySelector('main');
  main.innerHTML = '';
  main.append(container);

  const jsUrls = (0,_common_js__WEBPACK_IMPORTED_MODULE_1__.formatStringToArray)(_common_js__WEBPACK_IMPORTED_MODULE_1__.TRUCK_CONFIGURATOR_URLS.JS);
  const cssUrls = (0,_common_js__WEBPACK_IMPORTED_MODULE_1__.formatStringToArray)(_common_js__WEBPACK_IMPORTED_MODULE_1__.TRUCK_CONFIGURATOR_URLS.CSS);

  jsUrls.forEach((url) => {
    (0,_aem_js__WEBPACK_IMPORTED_MODULE_0__.loadScript)(url, { type: 'text/javascript', charset: 'UTF-8', defer: 'defer' });
  });

  cssUrls.forEach((url) => {
    (0,_aem_js__WEBPACK_IMPORTED_MODULE_0__.loadCSS)(url);
  });

  window.addEventListener('reactRouterChange', (e) => {
    const newLocation = e.detail;

    // eslint-disable-next-line no-console
    console.info('[truck-configurator]: React Router location changed:', newLocation);

    if (newLocation.pathname && newLocation.pathname !== '/' && disableHeader) {
      document.documentElement.classList.add('truck-configurator--detail-page');
    }
    if (newLocation.pathname && (newLocation.pathname === '/' || newLocation.pathname === '')) {
      document.documentElement.classList.remove('truck-configurator--detail-page');
    }
  });
}

if ((0,_aem_js__WEBPACK_IMPORTED_MODULE_0__.getMetadata)('truck-configurator-page')) {
  const page = (0,_aem_js__WEBPACK_IMPORTED_MODULE_0__.getMetadata)('truck-configurator-page').toLowerCase();
  const currentHash = window.location.hash;

  if (disableHeader) {
    document.documentElement.classList.add('truck-configurator--detail-page');
  }
  if (!currentHash.startsWith(`#/${page}`)) {
    document.location.hash = `#/${page}`;
  }
}

/* Checks for all <em> tags that contain only 1 character and deletes the space after it */
const allItalics = [...document.querySelectorAll('em')];
allItalics.forEach((emTag) => {
  const tagLength = emTag.textContent.length;
  const { nextSibling } = emTag;
  if (tagLength === 1 && nextSibling.nodeType === Node.TEXT_NODE && nextSibling.nodeValue.startsWith(' ')) {
    nextSibling.nodeValue = nextSibling.nodeValue.slice(1);
  }
});

__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ }),

/***/ "./scripts/validate-countries.js":
/*!***************************************!*\
  !*** ./scripts/validate-countries.js ***!
  \***************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   getUserCountryName: () => (/* binding */ getUserCountryName),
/* harmony export */   splitString: () => (/* binding */ splitString),
/* harmony export */   validateCountries: () => (/* binding */ validateCountries)
/* harmony export */ });
/* harmony import */ var _common_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./common.js */ "./scripts/common.js");
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([_common_js__WEBPACK_IMPORTED_MODULE_0__]);
_common_js__WEBPACK_IMPORTED_MODULE_0__ = (__webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__)[0];


const { GOOGLE_API_KEY } = _common_js__WEBPACK_IMPORTED_MODULE_0__.TOOLS_CONFIGS;
const languageCode = 'en';

const splitString = (str) => str.split(',').map((item) => item.trim());

const getUserCountryName = async (lat, lng) => {
  const apiUrl = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&language=${languageCode}&key=${GOOGLE_API_KEY}`;

  const response = await (0,_common_js__WEBPACK_IMPORTED_MODULE_0__.getJsonFromUrl)(apiUrl);
  const locationString = response?.plus_code.compound_code;

  return locationString;
};

const checkForRedirect = (list, country, url) => {
  // Check if country is included in the list that comes from the metadata
  if (!list.includes(country)) {
    // eslint-disable-next-line no-console
    console.error('Truck configurator not avaliable for:', country);
    const completeUrl = window.location.origin + url;
    window.location.replace(completeUrl);
  }
};

const validateCountries = async (countries, url) => {
  const allowedCountries = splitString(countries);

  const locationSuccess = async (position) => {
    const { latitude, longitude } = position.coords;
    const response = await getUserCountryName(latitude, longitude);
    if (!response) return;

    const country = (splitString(response).reverse())[0];
    if (country) checkForRedirect(allowedCountries, country, url);
  };
  const locationError = (error) => {
    // eslint-disable-next-line no-console
    console.error('Error:', error);
  };

  navigator.geolocation.getCurrentPosition(locationSuccess, locationError);
};

__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ }),

/***/ "./scripts/video-helper.js":
/*!*********************************!*\
  !*** ./scripts/video-helper.js ***!
  \*********************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   AEM_ASSETS: () => (/* binding */ AEM_ASSETS),
/* harmony export */   VideoEventManager: () => (/* binding */ VideoEventManager),
/* harmony export */   addPlayIcon: () => (/* binding */ addPlayIcon),
/* harmony export */   addSoundcloudShowHandler: () => (/* binding */ addSoundcloudShowHandler),
/* harmony export */   addVideoConfig: () => (/* binding */ addVideoConfig),
/* harmony export */   addVideoShowHandler: () => (/* binding */ addVideoShowHandler),
/* harmony export */   createIframe: () => (/* binding */ createIframe),
/* harmony export */   createLowResolutionBanner: () => (/* binding */ createLowResolutionBanner),
/* harmony export */   createVideo: () => (/* binding */ createVideo),
/* harmony export */   getVideoConfig: () => (/* binding */ getVideoConfig),
/* harmony export */   handleVideoMessage: () => (/* binding */ handleVideoMessage),
/* harmony export */   isAEMVideoUrl: () => (/* binding */ isAEMVideoUrl),
/* harmony export */   isLowResolutionVideoUrl: () => (/* binding */ isLowResolutionVideoUrl),
/* harmony export */   isSoundcloudLink: () => (/* binding */ isSoundcloudLink),
/* harmony export */   isVideoLink: () => (/* binding */ isVideoLink),
/* harmony export */   selectVideoLink: () => (/* binding */ selectVideoLink),
/* harmony export */   setPlaybackControls: () => (/* binding */ setPlaybackControls),
/* harmony export */   showVideoModal: () => (/* binding */ showVideoModal),
/* harmony export */   standardVideoConfig: () => (/* binding */ standardVideoConfig),
/* harmony export */   videoConfigs: () => (/* binding */ videoConfigs),
/* harmony export */   videoTypes: () => (/* binding */ videoTypes),
/* harmony export */   wrapImageWithVideoLink: () => (/* binding */ wrapImageWithVideoLink)
/* harmony export */ });
/* harmony import */ var _common_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./common.js */ "./scripts/common.js");
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([_common_js__WEBPACK_IMPORTED_MODULE_0__]);
_common_js__WEBPACK_IMPORTED_MODULE_0__ = (__webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__)[0];


// videoURLRegex: verify if a given string follows a specific pattern indicating it is a video URL
// videoIdRegex: extract the video ID from the URL
const AEM_ASSETS = {
  aemCloudDomain: '.adobeaemcloud.com',
  videoURLRegex: /\/assets\/urn:aaid:aem:[\w-]+\/play/,
  videoIdRegex: /urn:aaid:aem:[0-9a-fA-F-]+/,
};

const { aemCloudDomain, videoURLRegex } = AEM_ASSETS;

const videoTypes = {
  aem: 'aem',
  youtube: 'youtube',
  local: 'local',
  both: 'both',
};

const standardVideoConfig = {
  autoplay: false,
  muted: false,
  controls: true,
  disablePictureInPicture: false,
  currentTime: 0,
  playsinline: true,
};

const videoConfigs = {};

const addVideoConfig = (videoId, props = {}) => {
  if (!videoConfigs[videoId]) {
    videoConfigs[videoId] = (0,_common_js__WEBPACK_IMPORTED_MODULE_0__.deepMerge)({}, standardVideoConfig);
  }
  (0,_common_js__WEBPACK_IMPORTED_MODULE_0__.deepMerge)(videoConfigs[videoId], props);
};

const getVideoConfig = (videoId) => videoConfigs[videoId];

function isLowResolutionVideoUrl(url) {
  return url.split('?')[0].endsWith('.mp4');
}

function isAEMVideoUrl(url) {
  return videoURLRegex.test(url);
}

function isVideoLink(link) {
  const linkString = link.getAttribute('href');
  return (linkString.includes('youtube.com/embed/')
    || videoURLRegex.test(linkString)
    || isLowResolutionVideoUrl(linkString))
    && link.closest('.block.embed') === null;
}

function selectVideoLink(links, preferredType, videoType = videoTypes.both) {
  const linksArray = Array.isArray(links) ? links : [...links];
  const hasConsentForSocialVideos = (0,_common_js__WEBPACK_IMPORTED_MODULE_0__.isSocialAllowed)();
  const isTypeBoth = videoType === videoTypes.both;
  const prefersYouTube = (hasConsentForSocialVideos && preferredType !== 'local')
                      || (!isTypeBoth && videoType === videoTypes.youtube);

  const findLinkByCondition = (conditionFn) => linksArray.find((link) => conditionFn(link.getAttribute('href')));

  const aemVideoLink = findLinkByCondition((href) => videoURLRegex.test(href));
  const youTubeLink = findLinkByCondition((href) => href.includes('youtube.com/embed/'));
  const localMediaLink = findLinkByCondition((href) => href.split('?')[0].endsWith('.mp4'));

  if (aemVideoLink) return aemVideoLink;
  if (prefersYouTube && youTubeLink) return youTubeLink;
  return localMediaLink;
}

function createLowResolutionBanner() {
  const lowResolutionMessage = (0,_common_js__WEBPACK_IMPORTED_MODULE_0__.getTextLabel)('Low resolution video message');
  const changeCookieSettings = (0,_common_js__WEBPACK_IMPORTED_MODULE_0__.getTextLabel)('Change cookie settings');

  const banner = (0,_common_js__WEBPACK_IMPORTED_MODULE_0__.createElement)('div', { classes: 'low-resolution-banner' });
  banner.innerHTML = `${lowResolutionMessage} <button class="low-resolution-banner-cookie-settings">${changeCookieSettings}</button>`;
  banner.querySelector('button').addEventListener('click', () => {
    window.OneTrust.ToggleInfoDisplay();
  });

  return banner;
}

function showVideoModal(linkUrl) {
  // eslint-disable-next-line import/no-cycle
  __webpack_require__.e(/*! import() */ "common_modal_modal-component_js").then(__webpack_require__.bind(__webpack_require__, /*! ../common/modal/modal-component.js */ "./common/modal/modal-component.js")).then((modal) => {
    let beforeBanner = {};

    if (isLowResolutionVideoUrl(linkUrl)) {
      beforeBanner = createLowResolutionBanner();
    }

    modal.showModal(linkUrl, beforeBanner);
  });
}

function addVideoShowHandler(link) {
  link.classList.add('text-link-with-video');

  link.addEventListener('click', (event) => {
    event.preventDefault();

    showVideoModal(link.getAttribute('href'));
  });
}

function isSoundcloudLink(link) {
  return link.getAttribute('href').includes('soundcloud.com/player')
    && link.closest('.block.embed') === null;
}

function addSoundcloudShowHandler(link) {
  link.classList.add('text-link-with-soundcloud');

  link.addEventListener('click', (event) => {
    event.preventDefault();

    const thumbnail = link.closest('div')?.querySelector('picture');
    const title = link.closest('div')?.querySelector('h1, h2, h3');
    const text = link.closest('div')?.querySelector('p:not(.button-container, .image)');

    // eslint-disable-next-line import/no-cycle
    __webpack_require__.e(/*! import() */ "common_modal_modal-component_js").then(__webpack_require__.bind(__webpack_require__, /*! ../common/modal/modal-component.js */ "./common/modal/modal-component.js")).then((modal) => {
      const episodeInfo = document.createElement('div');
      episodeInfo.classList.add('modal-soundcloud');
      episodeInfo.innerHTML = `<div class="episode-image"><picture></div>
      <div class="episode-text">
          <h2></h2>
          <p></p>
      </div>`;
      episodeInfo.querySelector('picture').innerHTML = thumbnail?.innerHTML || '';
      episodeInfo.querySelector('h2').innerText = title?.innerText || '';
      episodeInfo.querySelector('p').innerText = text?.innerText || '';

      modal.showModal(link.getAttribute('href'), null, episodeInfo);
    });
  });
}

function addPlayIcon(parent) {
  const iconWrapper = (0,_common_js__WEBPACK_IMPORTED_MODULE_0__.createElement)('div', { classes: 'video-icon-wrapper' });
  const icon = (0,_common_js__WEBPACK_IMPORTED_MODULE_0__.createElement)('i', { classes: ['fa', 'fa-play', 'video-icon'] });
  iconWrapper.appendChild(icon);
  parent.appendChild(iconWrapper);
}

function wrapImageWithVideoLink(videoLink, image) {
  videoLink.innerText = '';
  videoLink.appendChild(image);
  videoLink.classList.add('link-with-video');
  videoLink.classList.remove('button', 'primary', 'text-link-with-video');

  addPlayIcon(videoLink);
}

function createIframe(url, { parentEl, classes = [] }) {
  // iframe must be recreated every time otherwise the new history record would be created
  const iframe = (0,_common_js__WEBPACK_IMPORTED_MODULE_0__.createElement)('iframe', {
    classes: Array.isArray(classes) ? classes : [classes],
    props: {
      frameborder: '0',
      allowfullscreen: true,
      src: url,
    },
  });

  if (parentEl) {
    parentEl.appendChild(iframe);
  }

  return iframe;
}

/**
 * Set playback controls for video elements.
 * This function selects all button elements that are direct children of video elements,
 * and re-assigns them to their grandparent elements (the parent of their parent).
 */
const setPlaybackControls = () => {
  const playbackControls = document.querySelectorAll('video > button');
  playbackControls.forEach((control) => {
    const { parentElement } = control.parentElement;
    parentElement.append(control);
  });
};

/**
 * Creates a video element with a source.
 *
 * @param {string} src - The source URL of the video.
 * @param {string} className - CSS class names to apply to the video element.
 * @param {Object} props - Properties and attributes for the video element.
 * @returns {HTMLElement} - The created video element with a source child.
 */
const createVideoElement = (src, className, props) => {
  const video = (0,_common_js__WEBPACK_IMPORTED_MODULE_0__.createElement)('video', { classes: className });
  const source = (0,_common_js__WEBPACK_IMPORTED_MODULE_0__.createElement)('source', { props: { src, type: 'video/mp4' } });
  video.appendChild(source);

  if (props.muted === true) {
    video.muted = props.muted;
  }

  if (props.autoplay === true) {
    video.autoplay = props.autoplay;
  } else {
    video.removeAttribute('autoplay');
  }

  if (props) {
    Object.keys(props).forEach((propName) => {
      video.setAttribute(propName, props[propName]);
    });
  }

  return video;
};

/**
 * Creates an iframe element with specified attributes.
 *
 * @param {string} src - The source URL of the iframe.
 * @param {string} className - CSS class names to apply to the iframe.
 * @param {Object} props - Properties and attributes for the iframe element.
 * @param {string} videoId - The video ID of the iframe.
 * @returns {HTMLElement} - The created iframe element.
 */
const createIframeElement = (src, className, props, videoId) => {
  addVideoConfig(videoId, props);

  return (0,_common_js__WEBPACK_IMPORTED_MODULE_0__.createElement)('iframe', {
    classes: className,
    props: {
      ...props,
      allow: 'autoplay; fullscreen',
      allowfullscreen: true,
      src,
    },
  });
};

/**
 * Creates a play/pause button with icons.
 *
 * @returns {HTMLElement} - The created play/pause button.
 */
const createPlayPauseButton = () => {
  const button = (0,_common_js__WEBPACK_IMPORTED_MODULE_0__.createElement)('button', {
    props: { type: 'button', class: 'v2-video__playback-button' },
  });
  const pauseIcon = (0,_common_js__WEBPACK_IMPORTED_MODULE_0__.createElement)('span', { classes: ['icon', 'icon-pause-video'] });
  const playIcon = (0,_common_js__WEBPACK_IMPORTED_MODULE_0__.createElement)('span', { classes: ['icon', 'icon-play-video'] });
  button.append(pauseIcon, playIcon);
  return button;
};

/**
 * Toggles the display of play and pause icons.
 *
 * @param {boolean} isPaused - Whether the video is paused.
 * @param {HTMLElement} playIcon - The play icon element.
 * @param {HTMLElement} pauseIcon - The pause icon element.
 * @param {HTMLElement} playPauseButton - The play/pause button element.
 */
const togglePlayPauseIcon = (isPaused, playIcon, pauseIcon, playPauseButton) => {
  playIcon.style.display = isPaused ? 'flex' : 'none';
  pauseIcon.style.display = isPaused ? 'none' : 'flex';
  playPauseButton.setAttribute('aria-label', (0,_common_js__WEBPACK_IMPORTED_MODULE_0__.getTextLabel)(isPaused ? 'Play video' : 'Pause video'));
};

/**
 * Sets up event listeners for the video element and play/pause button.
 *
 * @param {HTMLElement} video - The video element.
 * @param {HTMLElement} playPauseButton - The play/pause button element.
 * @param {Object} props - Properties and attributes for the video element.
 */
const setVideoEvents = (video, playPauseButton, props) => {
  const playIcon = playPauseButton.querySelector('.icon-play-video');
  const pauseIcon = playPauseButton.querySelector('.icon-pause-video');

  if (props.autoplay === false) {
    togglePlayPauseIcon(true, playIcon, pauseIcon, playPauseButton);
  }

  playPauseButton.addEventListener('click', () => {
    video[video.paused ? 'play' : 'pause']();
  });

  video.addEventListener('playing', () => togglePlayPauseIcon(false, playIcon, pauseIcon, playPauseButton));
  video.addEventListener('pause', () => togglePlayPauseIcon(true, playIcon, pauseIcon, playPauseButton));

  // Fallback to make sure the video is automatically played
  if (props.autoplay === true) {
    video.addEventListener('loadedmetadata', () => {
      setTimeout(() => {
        if (video.paused) {
          // eslint-disable-next-line no-console
          console.warn('Failed to autoplay video, fallback code executed');
          video.play();
        }
      }, 500);
    }, { once: true });
  } else {
    video.removeAttribute('autoplay');
  }
};

/**
 * Creates and configures a video element with play/pause controls.
 *
 * @param {string} src - The source URL of the video.
 * @param {string} className - CSS class names to apply to the video element.
 * @param {Object} props - Properties and attributes for the video element.
 * @param {HTMLElement} block - The block to which the video element will be appended.
 * @returns {HTMLElement} - The created and configured video element.
 */
const createAndConfigureVideo = (src, className, props, block) => {
  const video = createVideoElement(src, className, props);
  const playPauseButton = createPlayPauseButton();

  if (block) {
    block.prepend(video);
    block.insertBefore(playPauseButton, video.nextSibling);
  }

  setVideoEvents(video, playPauseButton, props);
  return video;
};

/**
 * Creates a video element or an iframe for a video, depending on whether the video is local
 * or not. Configures the element with specified classes, properties, and source.
 *
 * @param {HTMLElement} block - The block to which the video element or iframe will be appended.
 * @param {string} src - The source URL of the video.
 * @param {string} [className=''] - CSS class names to apply to the video element or iframe.
 * @param {Object} [props={}] - Properties and attributes for the video element or iframe,
 *                              including attributes like 'muted', 'autoplay', 'title'. All
 *                              properties are applied as attributes.
 * @param {boolean} [localVideo=true] - Indicates if the video is a local file. If true, creates
 *                                      a <video> element with a <source> child. If false,
 *                                      creates an iframe for an external video.
 * @param {string} [videoId=''] - Identifier for the video, used for external video sources.
 * @returns {HTMLElement} - The created video element (<video> or <iframe>) with specified configs.
 */
const createVideo = (block, src, className = '', props = {}, localVideo = true, videoId = '') => (
  localVideo
    ? createAndConfigureVideo(src, className, props, block)
    : createIframeElement(src, className, props, videoId)
);

const logVideoEvent = (eventName, videoId, timeStamp, blockName = 'video') => {
  // eslint-disable-next-line no-console
  console.info(`[${blockName}] ${eventName} for ${videoId} at ${timeStamp}`);
};

const formatDebugTime = (date) => {
  const timeOptions = {
    hour12: false,
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  };
  const formattedTime = date.toLocaleTimeString('en-US', timeOptions);
  const milliseconds = date.getMilliseconds().toString().padStart(3, '0');

  return `${formattedTime}.${milliseconds}`;
};

const handleVideoMessage = (event, videoId, blockName = 'video') => {
  if (!event.origin.endsWith(aemCloudDomain)) return;
  if (event.data.type === 'embedded-video-player-event') {
    const timeStamp = formatDebugTime(new Date());

    logVideoEvent(event.data.name, event.data.videoId, timeStamp, blockName);

    if (event.data.name === 'video-config' && event.data.videoId === videoId) {
      // eslint-disable-next-line no-console
      console.info('Sending video config:', getVideoConfig(videoId), timeStamp);
      event.source.postMessage(JSON.stringify(getVideoConfig(videoId)), '*');
    }

    // TODO: handle events when needed in a block
    // switch (event.data.name) {
    //   case 'video-playing':
    //   case 'video-play':
    //   case 'video-ended':
    //   case 'video-loadedmetadata':
    //     logVideoEvent(event.data.name, event.data.videoId, timeStamp, blockName);
    //     break;
    //   default:
    //     break;
    // }
  }
};

class VideoEventManager {
  constructor() {
    this.registrations = [];
    window.addEventListener('message', this.handleMessage.bind(this));
  }

  register(videoId, blockName, callback) {
    this.registrations.push({ videoId, blockName, callback });
  }

  unregister(videoId, blockName) {
    this.registrations = this.registrations.filter(
      (reg) => reg.videoId !== videoId || reg.blockName !== blockName,
    );
  }

  handleMessage(event) {
    this.registrations.forEach(({ videoId, blockName, callback }) => {
      if (event.data.type === 'embedded-video-player-event' && event.data.videoId === videoId) {
        callback(event, videoId, blockName);
      }
    });
  }
}



__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ }),

/***/ "./templates lazy recursive ^\\.\\/.*\\/.*\\.js$":
/*!***********************************************************!*\
  !*** ./templates/ lazy ^\.\/.*\/.*\.js$ namespace object ***!
  \***********************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var map = {
	"./body-builder-news/body-builder-news.js": [
		"./templates/body-builder-news/body-builder-news.js",
		"templates_body-builder-news_body-builder-news_js"
	],
	"./mack-news/mack-news.js": [
		"./templates/mack-news/mack-news.js",
		"templates_mack-news_mack-news_js"
	],
	"./magazine/magazine.js": [
		"./templates/magazine/magazine.js",
		"templates_magazine_magazine_js"
	]
};
function webpackAsyncContext(req) {
	if(!__webpack_require__.o(map, req)) {
		return Promise.resolve().then(() => {
			var e = new Error("Cannot find module '" + req + "'");
			e.code = 'MODULE_NOT_FOUND';
			throw e;
		});
	}

	var ids = map[req], id = ids[0];
	return __webpack_require__.e(ids[1]).then(() => {
		return __webpack_require__(id);
	});
}
webpackAsyncContext.keys = () => (Object.keys(map));
webpackAsyncContext.id = "./templates lazy recursive ^\\.\\/.*\\/.*\\.js$";
module.exports = webpackAsyncContext;

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = __webpack_modules__;
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/async module */
/******/ 	(() => {
/******/ 		var webpackQueues = typeof Symbol === "function" ? Symbol("webpack queues") : "__webpack_queues__";
/******/ 		var webpackExports = typeof Symbol === "function" ? Symbol("webpack exports") : "__webpack_exports__";
/******/ 		var webpackError = typeof Symbol === "function" ? Symbol("webpack error") : "__webpack_error__";
/******/ 		var resolveQueue = (queue) => {
/******/ 			if(queue && queue.d < 1) {
/******/ 				queue.d = 1;
/******/ 				queue.forEach((fn) => (fn.r--));
/******/ 				queue.forEach((fn) => (fn.r-- ? fn.r++ : fn()));
/******/ 			}
/******/ 		}
/******/ 		var wrapDeps = (deps) => (deps.map((dep) => {
/******/ 			if(dep !== null && typeof dep === "object") {
/******/ 				if(dep[webpackQueues]) return dep;
/******/ 				if(dep.then) {
/******/ 					var queue = [];
/******/ 					queue.d = 0;
/******/ 					dep.then((r) => {
/******/ 						obj[webpackExports] = r;
/******/ 						resolveQueue(queue);
/******/ 					}, (e) => {
/******/ 						obj[webpackError] = e;
/******/ 						resolveQueue(queue);
/******/ 					});
/******/ 					var obj = {};
/******/ 					obj[webpackQueues] = (fn) => (fn(queue));
/******/ 					return obj;
/******/ 				}
/******/ 			}
/******/ 			var ret = {};
/******/ 			ret[webpackQueues] = x => {};
/******/ 			ret[webpackExports] = dep;
/******/ 			return ret;
/******/ 		}));
/******/ 		__webpack_require__.a = (module, body, hasAwait) => {
/******/ 			var queue;
/******/ 			hasAwait && ((queue = []).d = -1);
/******/ 			var depQueues = new Set();
/******/ 			var exports = module.exports;
/******/ 			var currentDeps;
/******/ 			var outerResolve;
/******/ 			var reject;
/******/ 			var promise = new Promise((resolve, rej) => {
/******/ 				reject = rej;
/******/ 				outerResolve = resolve;
/******/ 			});
/******/ 			promise[webpackExports] = exports;
/******/ 			promise[webpackQueues] = (fn) => (queue && fn(queue), depQueues.forEach(fn), promise["catch"](x => {}));
/******/ 			module.exports = promise;
/******/ 			body((deps) => {
/******/ 				currentDeps = wrapDeps(deps);
/******/ 				var fn;
/******/ 				var getResult = () => (currentDeps.map((d) => {
/******/ 					if(d[webpackError]) throw d[webpackError];
/******/ 					return d[webpackExports];
/******/ 				}))
/******/ 				var promise = new Promise((resolve) => {
/******/ 					fn = () => (resolve(getResult));
/******/ 					fn.r = 0;
/******/ 					var fnQueue = (q) => (q !== queue && !depQueues.has(q) && (depQueues.add(q), q && !q.d && (fn.r++, q.push(fn))));
/******/ 					currentDeps.map((dep) => (dep[webpackQueues](fnQueue)));
/******/ 				});
/******/ 				return fn.r ? promise : getResult();
/******/ 			}, (err) => ((err ? reject(promise[webpackError] = err) : outerResolve(exports)), resolveQueue(queue)));
/******/ 			queue && queue.d < 0 && (queue.d = 0);
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/chunk loaded */
/******/ 	(() => {
/******/ 		var deferred = [];
/******/ 		__webpack_require__.O = (result, chunkIds, fn, priority) => {
/******/ 			if(chunkIds) {
/******/ 				priority = priority || 0;
/******/ 				for(var i = deferred.length; i > 0 && deferred[i - 1][2] > priority; i--) deferred[i] = deferred[i - 1];
/******/ 				deferred[i] = [chunkIds, fn, priority];
/******/ 				return;
/******/ 			}
/******/ 			var notFulfilled = Infinity;
/******/ 			for (var i = 0; i < deferred.length; i++) {
/******/ 				var [chunkIds, fn, priority] = deferred[i];
/******/ 				var fulfilled = true;
/******/ 				for (var j = 0; j < chunkIds.length; j++) {
/******/ 					if ((priority & 1 === 0 || notFulfilled >= priority) && Object.keys(__webpack_require__.O).every((key) => (__webpack_require__.O[key](chunkIds[j])))) {
/******/ 						chunkIds.splice(j--, 1);
/******/ 					} else {
/******/ 						fulfilled = false;
/******/ 						if(priority < notFulfilled) notFulfilled = priority;
/******/ 					}
/******/ 				}
/******/ 				if(fulfilled) {
/******/ 					deferred.splice(i--, 1)
/******/ 					var r = fn();
/******/ 					if (r !== undefined) result = r;
/******/ 				}
/******/ 			}
/******/ 			return result;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/ensure chunk */
/******/ 	(() => {
/******/ 		__webpack_require__.f = {};
/******/ 		// This file contains only the entry chunk.
/******/ 		// The chunk loading function for additional chunks
/******/ 		__webpack_require__.e = (chunkId) => {
/******/ 			return Promise.all(Object.keys(__webpack_require__.f).reduce((promises, key) => {
/******/ 				__webpack_require__.f[key](chunkId, promises);
/******/ 				return promises;
/******/ 			}, []));
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/get javascript chunk filename */
/******/ 	(() => {
/******/ 		// This function allow to reference async chunks
/******/ 		__webpack_require__.u = (chunkId) => {
/******/ 			// return url for filenames based on template
/******/ 			return "" + chunkId + ".js";
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/get mini-css chunk filename */
/******/ 	(() => {
/******/ 		// This function allow to reference async chunks
/******/ 		__webpack_require__.miniCssF = (chunkId) => {
/******/ 			// return url for filenames based on template
/******/ 			return undefined;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/load script */
/******/ 	(() => {
/******/ 		var inProgress = {};
/******/ 		var dataWebpackPrefix = "@adobe/helix-project-boilerplate:";
/******/ 		// loadScript function to load a script via script tag
/******/ 		__webpack_require__.l = (url, done, key, chunkId) => {
/******/ 			if(inProgress[url]) { inProgress[url].push(done); return; }
/******/ 			var script, needAttach;
/******/ 			if(key !== undefined) {
/******/ 				var scripts = document.getElementsByTagName("script");
/******/ 				for(var i = 0; i < scripts.length; i++) {
/******/ 					var s = scripts[i];
/******/ 					if(s.getAttribute("src") == url || s.getAttribute("data-webpack") == dataWebpackPrefix + key) { script = s; break; }
/******/ 				}
/******/ 			}
/******/ 			if(!script) {
/******/ 				needAttach = true;
/******/ 				script = document.createElement('script');
/******/ 		
/******/ 				script.charset = 'utf-8';
/******/ 				script.timeout = 120;
/******/ 				if (__webpack_require__.nc) {
/******/ 					script.setAttribute("nonce", __webpack_require__.nc);
/******/ 				}
/******/ 				script.setAttribute("data-webpack", dataWebpackPrefix + key);
/******/ 		
/******/ 				script.src = url;
/******/ 			}
/******/ 			inProgress[url] = [done];
/******/ 			var onScriptComplete = (prev, event) => {
/******/ 				// avoid mem leaks in IE.
/******/ 				script.onerror = script.onload = null;
/******/ 				clearTimeout(timeout);
/******/ 				var doneFns = inProgress[url];
/******/ 				delete inProgress[url];
/******/ 				script.parentNode && script.parentNode.removeChild(script);
/******/ 				doneFns && doneFns.forEach((fn) => (fn(event)));
/******/ 				if(prev) return prev(event);
/******/ 			}
/******/ 			var timeout = setTimeout(onScriptComplete.bind(null, undefined, { type: 'timeout', target: script }), 120000);
/******/ 			script.onerror = onScriptComplete.bind(null, script.onerror);
/******/ 			script.onload = onScriptComplete.bind(null, script.onload);
/******/ 			needAttach && document.head.appendChild(script);
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/publicPath */
/******/ 	(() => {
/******/ 		__webpack_require__.p = "/dist/";
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/jsonp chunk loading */
/******/ 	(() => {
/******/ 		// no baseURI
/******/ 		
/******/ 		// object to store loaded and loading chunks
/******/ 		// undefined = chunk not loaded, null = chunk preloaded/prefetched
/******/ 		// [resolve, reject, Promise] = chunk loading, 0 = chunk loaded
/******/ 		var installedChunks = {
/******/ 			"main": 0
/******/ 		};
/******/ 		
/******/ 		__webpack_require__.f.j = (chunkId, promises) => {
/******/ 				// JSONP chunk loading for javascript
/******/ 				var installedChunkData = __webpack_require__.o(installedChunks, chunkId) ? installedChunks[chunkId] : undefined;
/******/ 				if(installedChunkData !== 0) { // 0 means "already installed".
/******/ 		
/******/ 					// a Promise means "currently loading".
/******/ 					if(installedChunkData) {
/******/ 						promises.push(installedChunkData[2]);
/******/ 					} else {
/******/ 						if(true) { // all chunks have JS
/******/ 							// setup Promise in chunk cache
/******/ 							var promise = new Promise((resolve, reject) => (installedChunkData = installedChunks[chunkId] = [resolve, reject]));
/******/ 							promises.push(installedChunkData[2] = promise);
/******/ 		
/******/ 							// start chunk loading
/******/ 							var url = __webpack_require__.p + __webpack_require__.u(chunkId);
/******/ 							// create error before stack unwound to get useful stacktrace later
/******/ 							var error = new Error();
/******/ 							var loadingEnded = (event) => {
/******/ 								if(__webpack_require__.o(installedChunks, chunkId)) {
/******/ 									installedChunkData = installedChunks[chunkId];
/******/ 									if(installedChunkData !== 0) installedChunks[chunkId] = undefined;
/******/ 									if(installedChunkData) {
/******/ 										var errorType = event && (event.type === 'load' ? 'missing' : event.type);
/******/ 										var realSrc = event && event.target && event.target.src;
/******/ 										error.message = 'Loading chunk ' + chunkId + ' failed.\n(' + errorType + ': ' + realSrc + ')';
/******/ 										error.name = 'ChunkLoadError';
/******/ 										error.type = errorType;
/******/ 										error.request = realSrc;
/******/ 										installedChunkData[1](error);
/******/ 									}
/******/ 								}
/******/ 							};
/******/ 							__webpack_require__.l(url, loadingEnded, "chunk-" + chunkId, chunkId);
/******/ 						}
/******/ 					}
/******/ 				}
/******/ 		};
/******/ 		
/******/ 		// no prefetching
/******/ 		
/******/ 		// no preloaded
/******/ 		
/******/ 		// no HMR
/******/ 		
/******/ 		// no HMR manifest
/******/ 		
/******/ 		__webpack_require__.O.j = (chunkId) => (installedChunks[chunkId] === 0);
/******/ 		
/******/ 		// install a JSONP callback for chunk loading
/******/ 		var webpackJsonpCallback = (parentChunkLoadingFunction, data) => {
/******/ 			var [chunkIds, moreModules, runtime] = data;
/******/ 			// add "moreModules" to the modules object,
/******/ 			// then flag all "chunkIds" as loaded and fire callback
/******/ 			var moduleId, chunkId, i = 0;
/******/ 			if(chunkIds.some((id) => (installedChunks[id] !== 0))) {
/******/ 				for(moduleId in moreModules) {
/******/ 					if(__webpack_require__.o(moreModules, moduleId)) {
/******/ 						__webpack_require__.m[moduleId] = moreModules[moduleId];
/******/ 					}
/******/ 				}
/******/ 				if(runtime) var result = runtime(__webpack_require__);
/******/ 			}
/******/ 			if(parentChunkLoadingFunction) parentChunkLoadingFunction(data);
/******/ 			for(;i < chunkIds.length; i++) {
/******/ 				chunkId = chunkIds[i];
/******/ 				if(__webpack_require__.o(installedChunks, chunkId) && installedChunks[chunkId]) {
/******/ 					installedChunks[chunkId][0]();
/******/ 				}
/******/ 				installedChunks[chunkId] = 0;
/******/ 			}
/******/ 			return __webpack_require__.O(result);
/******/ 		}
/******/ 		
/******/ 		var chunkLoadingGlobal = self["webpackChunk_adobe_helix_project_boilerplate"] = self["webpackChunk_adobe_helix_project_boilerplate"] || [];
/******/ 		chunkLoadingGlobal.forEach(webpackJsonpCallback.bind(null, 0));
/******/ 		chunkLoadingGlobal.push = webpackJsonpCallback.bind(null, chunkLoadingGlobal.push.bind(chunkLoadingGlobal));
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module is referenced by other modules so it can't be inlined
/******/ 	var __webpack_exports__ = __webpack_require__("./scripts/scripts.js");
/******/ 	__webpack_exports__ = __webpack_require__.O(__webpack_exports__);
/******/ 	
/******/ })()
;