import { createElement, unwrapDivs, variantsClassesToBEM } from '../../scripts/common.js';
import { setCarouselPosition, listenScroll } from '../../scripts/carousel-helper.js';

const blockName = 'v2-tabbed-carousel';
const variantClasses = ['fade-in', 'small-tabs'];
// transform variantClasses to an object with keys and values are equal to the variant classes
const variants = variantClasses.reduce((acc, variant) => {
  // variant name to camelCase
  const variantName = variant.replace(/-([a-z])/g, (g) => g[1].toUpperCase());
  acc[variantName] = variant;
  return acc;
}, {});

const moveNavigationLine = (navigationLine, activeTab, tabNavigation) => {
  const { x: navigationX } = tabNavigation.getBoundingClientRect();
  const { x, width } = activeTab.getBoundingClientRect();
  Object.assign(navigationLine.style, {
    left: `${x + tabNavigation.scrollLeft - navigationX}px`,
    width: `${width}px`,
  });
};

const updateActiveItem = (elements, entry) => {
  elements.forEach((el, index) => {
    if (el === entry.target && entry.intersectionRatio >= 0.75) {
      const carouselItems = el.parentElement;
      const navigation = el.parentElement.nextElementSibling;
      const navigationLine = navigation.querySelector(`.${blockName}__navigation-line`);

      [carouselItems, navigation].forEach((c) => c.querySelectorAll('.active').forEach((i) => i.classList.remove('active')));
      carouselItems.children[index].classList.add('active');
      navigation.children[index].classList.add('active');

      const activeNavigationItem = navigation.children[index];
      moveNavigationLine(navigationLine, activeNavigationItem, navigation);

      // Center navigation item
      const navigationActiveItem = navigation.querySelector('.active');

      if (navigation && navigationActiveItem) {
        const { clientWidth: itemWidth, offsetLeft } = navigationActiveItem;
        // Calculate the scroll position to center the active item
        const scrollPosition = offsetLeft - (navigation.clientWidth - itemWidth) / 2;
        navigation.scrollTo({
          left: scrollPosition,
          behavior: 'smooth',
        });
      }
    }
  });
};

const jumpToCarouselItem = (carousel, index, navigation) => {
  const { width } = carousel.firstElementChild.getBoundingClientRect();
  const navigationLine = navigation.querySelector(`.${blockName}__navigation-line`);

  // remove active class from activeItem and activeNavigationItem
  carousel.querySelector('.active').classList.remove('active');
  navigation.querySelector('.active').classList.remove('active');

  // add active class to the item and navigation item at the index
  carousel.children[index].classList.add('active');
  navigation.children[index].classList.add('active');

  // move the navigation line to the active navigation item
  moveNavigationLine(navigationLine, navigation.children[index], navigation);

  // translate carousel to the active item and center it based in the width of the first item
  carousel.style.transform = `translateX(-${index * width}px)`;
};

function decorate(block) {
  const currentVariant = variantClasses.find((variant) => block.classList.contains(variant))
    || null;
  variantsClassesToBEM(block.classList, variantClasses, blockName);
  const carouselItems = (block.querySelector(`.${blockName}__items`));

  let timeout;

  function buildTabNavigation(listItem, index) {
    const button = listItem.querySelector('button');
    const moveCarousel = !currentVariant || currentVariant !== variants.fadeIn
      ? () => setCarouselPosition(carouselItems, (index - 1))
      : () => jumpToCarouselItem(carouselItems, (index - 1), tabNavigation);
    button.addEventListener('click', moveCarousel);
    button.addEventListener('mouseover', (e) => {
      clearTimeout(timeout);
      moveNavigationLine(navigationLine, e.currentTarget, tabNavigation);
    });

    button.addEventListener('mouseout', () => {
      timeout = setTimeout(() => {
        const activeItem = block.querySelector(`.${blockName}__navigation-item.active`);
        moveNavigationLine(navigationLine, activeItem, tabNavigation);
      }, 600);
    });
    return listItem;
  }

  const tabItems = block.querySelectorAll(`.${blockName}__navigation-item`);
  tabItems.forEach((tabItem) => {
    const picture = tabItem.querySelector('picture');
    if (picture) {
      buildTabNavigation(tabItems);
    } else {

    }
  });


  // update the button indicator on scroll
  const elements = carouselItems.querySelectorAll(':scope > *');
  listenScroll(carouselItems, elements, updateActiveItem, 0.75);
  unwrapDivs(block);
}

document.querySelectorAll(".v2-tabbed-carousel-container").forEach(decorate);
