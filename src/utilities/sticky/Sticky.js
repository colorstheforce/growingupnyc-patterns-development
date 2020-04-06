'use strict';

/**
 * Static column module
 * Similar to the general sticky module but used specifically when one column
 * of a two-column layout is meant to be sticky
 * @module modules/StickyVanilla
 * @see modules/stickyNav
 */

import forEach from 'lodash/forEach';
import throttle from 'lodash/throttle';
import debounce from 'lodash/debounce';

class StickyVanilla {
  constructor(mediaQuery) {
    let screen = mediaQuery || StickyVanilla.mediaQuery
    // const el = document.querySelector(AlertBanner.selector);
    // const control = document.querySelector(AlertBanner.controller);
    console.log("Sticky");

    const stickyContent = document.querySelectorAll('.js-sticky');
    const footer = document.querySelector('.c-footer__reached');
    const stickyContainer = document.querySelector('.o-article-sidebar');

    let stickyMode = false; // Flag to tell if sidebar is in "sticky mode"
    let isSticky = false; // Whether the sidebar is sticky at this exact moment in time
    let isAbsolute = false;// Whether the sidebar is sticky at this exact moment in time


    let desktop = window.matchMedia(screen);
    let isDesk = desktop.matches;
    if (isDesk) {
      StickyVanilla.updateDimensions(stickyContainer, stickyContent);
    }

    window.onresize = function () {
      isDesk = desktop.matches;
      if(isDesk) {
        StickyVanilla.updateDimensions(stickyContainer, stickyContent);
      } else {
        StickyVanilla.resetWidth(stickyContainer, stickyContent)
      }
    };


    // this._settings = {
      //   selector: StickyVanilla.selector,
      //   StickyClass: StickyVanilla.StickyClass,
      //   StuckClass: StickyVanilla.StuckClass
      // };
      /**
       * Calculates the window position and sets the appropriate class on the element
       * @param {object} stickyContentElem - DOM node that should be stickied
       */
      this.assignStickyFeature(stickyContent, footer, isSticky);
      this.snapToFooter(footer, stickyContent);
      // StickyVanilla.resize(stickyContainer, stickyContent)
}


assignStickyFeature(stickyContent, footer, isSticky) {

  if (stickyContent) {
    forEach(stickyContent, function(stickyContentElem) {
      StickyVanilla.calcWindowPos(stickyContentElem, isSticky);
      /**
      * Add event listener for 'scroll'.
      * @function
      * @param {object} event - The event object
      */
      window.addEventListener('scroll', function() {
        StickyVanilla.calcWindowPos(stickyContentElem, footer);
      }, false);

      /**
      * Add event listener for 'resize'.
      * @function
      * @param {object} event - The event object
      */
      window.addEventListener('resize', function() {
        StickyVanilla.calcWindowPos(stickyContentElem, footer);
      }, false);
    });
  }
}


snapToFooter(footer, stickyContent) {
  window.addEventListener('scroll', function() {
    // var element = document.querySelector('#main-container');
    var position = footer.getBoundingClientRect();
    // console.log(position.bottom, window.innerHeight);

    // checking whether fully visible
    if(position.top >= 0 && position.bottom <= window.innerHeight) {
      // console.log('Element is fully visible in screen ');
      forEach(stickyContent, function(stickyContentElem) {
        stickyContentElem.classList.add(StickyVanilla.StuckClass);
      });
    }

    forEach(stickyContent, function(stickyContentElem) {
      var positionSticky = stickyContentElem.getBoundingClientRect();
      if (positionSticky.top >= 0) {
        stickyContentElem.classList.remove(StickyVanilla.StuckClass);
      };
    })

    // checking for partial visibility
    // if(position.top < window.innerHeight && position.bottom >= 0) {
    // 	console.log('Element is partially visible in screen');
    // }
  });
}

}

StickyVanilla.updateDimensions = function(stickyContainer, stickyContent) {
  let stickyContainerWidth = stickyContainer.clientWidth;

  forEach(stickyContent, function(stickyContentElem) {
    stickyContentElem.style.width = `${stickyContainerWidth}px`;
   })
}

StickyVanilla.resetWidth = function(stickyContainer, stickyContent) {
  let stickyContainerWidth = stickyContainer.clientWidth;

  forEach(stickyContent, function(stickyContentElem) {
    stickyContentElem.style.width = "";
   })
}




 StickyVanilla.calcWindowPos = function(stickyContentElem, isSticky) {
  const articleContent = document.querySelector('.js-sticky-article');

  let elemTop = stickyContentElem.parentElement.getBoundingClientRect().top;
  // let isPastBottom = window.innerHeight - stickyContentElem.parentElement.clientHeight - stickyContentElem.parentElement.getBoundingClientRect().top < 50;
  // console.log(elemTop);

  // Sets element to position absolute if not scrolled to yet.
  // Absolutely positioning only when necessary and not by default prevents flickering
  // when removing the "is-bottom" class on Chrome
  if (elemTop > 0) {

    stickyContentElem.classList.remove(StickyVanilla.StickyClass);
    articleContent.classList.remove(StickyVanilla.AddLeftMargin);
  } else {
    isSticky = true;
    stickyContentElem.classList.add(StickyVanilla.StickyClass);
    articleContent.classList.add(StickyVanilla.AddLeftMargin);
  }
}


StickyVanilla.selector = 'js-sticky';
StickyVanilla.StickyClass = 'is-sticky';
StickyVanilla.StuckClass = 'is-stuck';
StickyVanilla.AddLeftMargin = 'o-article--shift';
StickyVanilla.mediaQuery = '(min-width: 1040px)';


export default StickyVanilla;