"use strict";
(self["webpackChunk_adobe_helix_project_boilerplate"] = self["webpackChunk_adobe_helix_project_boilerplate"] || []).push([["sds"],{

/***/ "./blocks/sds/sds.js":
/*!***************************!*\
  !*** ./blocks/sds/sds.js ***!
  \***************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ decorate)
/* harmony export */ });
/* harmony import */ var _scripts_common_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../scripts/common.js */ "./scripts/common.js");
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([_scripts_common_js__WEBPACK_IMPORTED_MODULE_0__]);
_scripts_common_js__WEBPACK_IMPORTED_MODULE_0__ = (__webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__)[0];


function newId() {
  return (Math.random() + 1).toString(36).substring(7);
}

function calcScrollHeight(rowgroup) {
  return [...rowgroup.children]
    .map((child) => child.clientHeight)
    .reduce((l, r) => l + r, 0);
}

function expand(event) {
  const button = event.target.closest('button');
  const rowgroup = button.nextElementSibling;
  const isExpanded = button.ariaExpanded === 'true';
  rowgroup.style.height = isExpanded ? 0 : `${rowgroup.scrollHeight}px`;
  rowgroup.ariaHidden = isExpanded;
  button.ariaExpanded = !isExpanded;
}

function normalizeCells(cells, rowheaderRole = 'rowheader', cellRole = 'cell') {
  [...cells].forEach((cell, j) => {
    cell.normalize();
    // remove any blank text nodes
    if (cell.firstChild && cell.firstChild.nodeType === 3 && cell.firstChild.nodeValue.trim() === '') cell.firstChild.remove();
    if (cell.lastChild && cell.lastChild.nodeType === 3 && cell.lastChild.nodeValue.trim() === '') cell.lastChild.remove();
    // remove leading or trailing breaks
    if (cell.firstChild && cell.firstChild.tagName === 'BR') cell.firstChild.remove();
    if (cell.lastChild && cell.lastChild.tagName === 'BR') cell.lastChild.remove();
    // wrap text-only cells with a <p>
    if (cell.children.length === 0 && !cell.querySelector('p') && cell.textContent !== '') {
      const text = cell.innerHTML;
      const fragment = document.createRange().createContextualFragment(text);
      const pWrapper = (0,_scripts_common_js__WEBPACK_IMPORTED_MODULE_0__.createElement)('p');
      cell.textContent = '';
      pWrapper.appendChild(fragment);
      cell.appendChild(pWrapper);
    }
    cell.role = j === 0 && cells.length > 1 ? rowheaderRole : cellRole;
    cell.className = 'cell';
  });
}

function activateMobileColumn(block, index) {
  block.querySelectorAll('.cell.expand')
    .forEach((cell) => cell.classList.remove('expand'));
  block.querySelectorAll(`.image-header .cell:nth-child(${index}),.row .cell:nth-child(${index + 1})`)
    .forEach((cell) => cell.classList.add('expand'));
  // adjust the height of all expanded rowgroups
  block.querySelectorAll('[role="rowgroup"][aria-hidden="false"]').forEach((rowgroup) => {
    rowgroup.style.height = `${calcScrollHeight(rowgroup)}px`;
  });
}

function changeMobileColumn(event) {
  activateMobileColumn(event.target.closest('.block'), parseInt(event.target.value, 10));
}

function decorate(block) {
  const colCount = block.firstElementChild.children.length;
  const header = block.firstElementChild;
  let firstRowIndex = 0;

  block.role = 'table';
  block.style.setProperty('--grid-col-count', colCount);

  if (header.children.length > 1) {
    header.className = 'column-header';
    normalizeCells(header.children, 'rowheader', 'columnheader');
    const mobileColumnHeader = (0,_scripts_common_js__WEBPACK_IMPORTED_MODULE_0__.createElement)('div', { classes: 'column-header-mobile' });
    const select = `<select>
      ${[...header.querySelectorAll('[role="columnheader"]')]
    .map((columnHeader, i) => `<option value="${i + 1}">${columnHeader.textContent}</option>`)
    .join('')}
      </select>`;
    const fragment = document.createRange().createContextualFragment(select);
    mobileColumnHeader.appendChild(fragment);
    mobileColumnHeader.firstElementChild.addEventListener('change', changeMobileColumn);
    header.insertAdjacentElement('afterend', mobileColumnHeader);
    firstRowIndex += 2;
  }

  const rows = [...block.children];
  let rowCount = 0;

  let singleColumn = true;
  for (let i = firstRowIndex; i < rows.length && singleColumn; i += 1) {
    singleColumn = rows[i].children.length === 1;
  }
  for (let i = firstRowIndex, rowgroup = null; i < rows.length; i += 1) {
    const row = rows[i];
    const cells = row.children;
    const firstChild = cells[0].firstElementChild;

    if (cells.length === 1
      && (!singleColumn
        || (cells[0].children.length === 1 && firstChild && firstChild.tagName === 'STRONG'))) {
      const button = (0,_scripts_common_js__WEBPACK_IMPORTED_MODULE_0__.createElement)('button', {
        classes: 'rowgroup-header',
        props: { type: 'button' },
      });
      button.appendChild(cells[0]);
      button.addEventListener('click', expand);
      button.ariaExpanded = false;
      row.insertAdjacentElement('beforebegin', button);

      rowgroup = row;
      rowgroup.role = 'rowgroup';
      rowgroup.id = newId();
      rowgroup.ariaHidden = true;
      button.setAttribute('aria-controls', rowgroup.id);
    } else {
      row.className = 'row';
      row.role = 'row';
      rowCount += 1;
      if (rowgroup) rowgroup.appendChild(row);
      normalizeCells(cells);
    }
  }

  block.ariaRowCount = rowCount;
  block.ariaColCount = colCount;

  activateMobileColumn(block, 1);
}

__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ })

},
/******/ __webpack_require__ => { // webpackRuntimeModules
/******/ var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
/******/ var __webpack_exports__ = (__webpack_exec__("./blocks/sds/sds.js"));
/******/ }
]);