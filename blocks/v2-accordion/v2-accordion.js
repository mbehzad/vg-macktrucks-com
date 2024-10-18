import { createElement, decorateIcons } from '../../scripts/common.js';
import fragmentBlock from '../fragment/fragment.js';

const blockName = 'v2-accordion';

function isContentLinkedCheck(el, startsWithString) {
  if (
    (el.children.length === 1 &&
      el.children[0].tagName.toLowerCase() === 'p') ||
    (el.children.length === 0 && el.textContent === el.innerHTML)
  ) {
    return el.textContent.startsWith(startsWithString);
  }
  return false;
}

/* Function checks if the content of the provided element is just a link to other doc */
function isContentLink(el) {
  return isContentLinkedCheck(el, '/');
}

function isContentInsideAnotherElement(el) {
  return isContentLinkedCheck(el, '#id-');
}

function loaded(element, pointedContent, display) {
  element.innerHTML = '';
  element.append(pointedContent.parentElement);
  pointedContent.parentElement.style.display = display;
}

async function decorate(block) {
  block.querySelectorAll(`.${blockName}__item`).forEach((accordionEl) => {
    accordionEl
      .querySelector(`.${blockName}__button`)
      .addEventListener('click', () => {
        accordionEl.classList.toggle(`${blockName}__item-close`);
      });
  });
}


document.querySelectorAll('.v2-accordion').forEach(decorate);
