import { getMetadata } from '../../scripts/lib-franklin.js';
import { createElement } from '../../scripts/common.js';

const blockName = 'v2-inpage-navigation';

const scrollToSection = (id) => {
  let timeout;

  const container = document.querySelector(`main .section[data-inpageid='${id}']`);
  container?.scrollIntoView({ behavior: 'smooth' });

  // Checking if the height of the main element changes while scrolling (caused by layout shift)
  const main = document.querySelector('main');
  const resizeObserver = new ResizeObserver(() => {
    clearTimeout(timeout);
    container?.scrollIntoView({ behavior: 'smooth' });

    timeout = setTimeout(() => {
      resizeObserver.disconnect();
    }, 500);
  });
  resizeObserver.observe(main);
};

const inpageNavigationRedButton = () => {
  // if we have a button title & button link
  if (getMetadata('inpage-button') && getMetadata('inpage-link')) {
    const titleMobile = getMetadata('inpage-button');
    const url = getMetadata('inpage-link');
    const link = createElement('a', {
      classes: `${blockName}__cta`,
      props: {
        href: url,
        title: titleMobile,
      },
    });
    const mobileText = createElement('span', { classes: `${blockName}__cta--mobile` });
    mobileText.textContent = titleMobile;
    link.appendChild(mobileText);

    const titleDesktop = getMetadata('inpage-button-large');
    if (titleDesktop) {
      const desktopText = createElement('span', { classes: `${blockName}__cta--desktop` });
      desktopText.textContent = titleDesktop;
      link.setAttribute('title', titleDesktop);
      link.appendChild(desktopText);
    }

    return link;
  }

  return null;
};

const gotoSection = (event) => {
  const { target } = event;
  const button = target.closest('button');

  if (button) {
    const { id } = button.dataset;

    scrollToSection(id);
  }
};

const updateActive = (id) => {
  const selectedItem = document.querySelector(`.${blockName}__selected-item`);
  const activeItemInList = document.querySelector(`.${blockName}__item--active`);
  activeItemInList?.classList.remove(`${blockName}__item--active`);
  const itemsButton = document.querySelectorAll(`.${blockName}__items button`);
  const { pathname } = window.location;

  if (id) {
    const selectedButton = [...itemsButton].find((button) => button.dataset.id === id);
    if (!selectedButton) return;
    selectedItem.textContent = selectedButton.textContent;
    selectedButton.parentNode.classList.add(`${blockName}__item--active`);

    window.history.replaceState({}, '', `${pathname}#${id}`);
  } else {
    window.history.replaceState({}, '', `${pathname}`);
  }
};

const listenScroll = () => {
  let timeout;
  const elements = document.querySelectorAll('main .section');

  const io = new IntersectionObserver((entries) => {
    // Reduce entries to the one with higher intersectionRatio
    const intersectedEntry = entries.reduce((prev, current) => (
      prev.intersectionRatio > current.intersectionRatio ? prev : current
    ));

    if (intersectedEntry.isIntersecting && intersectedEntry.target.dataset?.inpageid) {
      clearTimeout(timeout);

      // wait to update the active item
      timeout = setTimeout(() => {
        updateActive(intersectedEntry.target.dataset.inpageid);
      }, 500);
    } else {
      updateActive();
    }
  }, {
    threshold: [0.2, 0.5, 0.7, 1],
  });

  elements.forEach((el) => {
    io.observe(el);
  });
};

export default async function decorate(block) {
  const redButton = inpageNavigationRedButton();

  const wrapper = block.querySelector(':scope > div');
  wrapper.classList.add(`${blockName}__wrapper`);
  const itemsWrapper = block.querySelector(':scope > div > div');

  const dropdownWrapper = createElement('div', { classes: `${blockName}__dropdown` });
  const selectedItemWrapper = createElement('div', { classes: `${blockName}__selected-item-wrapper` });
  const selectedItem = createElement('div', { classes: `${blockName}__selected-item` });

  const list = createElement('ul', { classes: `${blockName}__items` });

  [...itemsWrapper.children].forEach((item, index) => {
    const classes = [`${blockName}__item`];
    if (index === 0) { // Default selected item
      classes.push(`${blockName}__item--active`);
      selectedItem.textContent = item.textContent;
    }
    const listItem = createElement('li', { classes });

    listItem.innerHTML = item.innerHTML;
    list.appendChild(listItem);
  });

  const dropdownArrowIcon = document.createRange().createContextualFragment(`
    <svg xmlns="http://www.w3.org/2000/svg"><use href="#icons-sprite-dropdown-caret"></use></svg>`);
  selectedItemWrapper.append(selectedItem);
  selectedItemWrapper.appendChild(...dropdownArrowIcon.children);

  dropdownWrapper.append(selectedItemWrapper);
  dropdownWrapper.append(list);
  wrapper.append(dropdownWrapper);

  itemsWrapper.remove();

  if (redButton) {
    wrapper.appendChild(redButton);
  }

  list.addEventListener('click', gotoSection);

  // on load Go to section if defined
  const hash = window.location.hash.substring(1);
  if (hash) {
    updateActive(hash);

    setTimeout(() => {
      scrollToSection(hash);
    }, 1000);
  }

  // Listener to toggle the dropdown (open / close)
  document.addEventListener('click', (e) => {
    if (e.target.closest(`.${blockName}__selected-item-wrapper`)) {
      dropdownWrapper.classList.toggle(`${blockName}__dropdown--open`);
    } else {
      dropdownWrapper.classList.remove(`${blockName}__dropdown--open`);
    }
  });

  // listen scroll to change the url
  listenScroll();
}
