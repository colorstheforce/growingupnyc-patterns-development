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
  constructor() {
    // const el = document.querySelector(AlertBanner.selector);
    // const control = document.querySelector(AlertBanner.controller);
		console.log("Sticky");

		const stickyContent = document.querySelectorAll('.js-sticky');
		const footer = document.querySelectorAll('.c-footer__reached');
		let isSticky = false; // Whether the sidebar is sticky at this exact moment in time

		console.log(isSticky);

		// const StickyClass = StickyVanilla.StickyClass;
		// const StuckClass = StickyVanilla.StuckClass;

    // this._settings = {
    //   selector: StickyVanilla.selector,
    //   StickyClass: StickyVanilla.StickyClass,
    //   StuckClass: StickyVanilla.StuckClass
    // };

		  /**
  * Calculates the window position and sets the appropriate class on the element
  * @param {object} stickyContentElem - DOM node that should be stickied
  */
	this.assignStickyFeature(stickyContent, isSticky);
	this.snapToFooter(footer)
}

assignStickyFeature(stickyContent, isSticky) {

	if (stickyContent) {
    forEach(stickyContent, function(stickyContentElem) {
      StickyVanilla.calcWindowPos(stickyContentElem, isSticky);
      /**
      * Add event listener for 'scroll'.
      * @function
      * @param {object} event - The event object
      */
      window.addEventListener('scroll', function() {
        StickyVanilla.calcWindowPos(stickyContentElem);
      }, false);

      /**
      * Add event listener for 'resize'.
      * @function
      * @param {object} event - The event object
      */
      window.addEventListener('resize', function() {
        StickyVanilla.calcWindowPos(stickyContentElem);
      }, false);
    });
  }
}

snapToFooter(footer) {

}

}

 StickyVanilla.calcWindowPos = function(stickyContentElem, isSticky) {
	const articleContent = document.querySelector('.js-sticky-article');
	console.log(isSticky);

	let elemTop = stickyContentElem.parentElement.getBoundingClientRect().top;
	let isPastBottom = window.innerHeight - stickyContentElem.parentElement.clientHeight - stickyContentElem.parentElement.getBoundingClientRect().top < 50;

	// Sets element to position absolute if not scrolled to yet.
	// Absolutely positioning only when necessary and not by default prevents flickering
	// when removing the "is-bottom" class on Chrome
	if (elemTop > 0) {
		// isSticky = true;
		stickyContentElem.classList.remove(StickyVanilla.StickyClass);
		articleContent.classList.remove(StickyVanilla.AddLeftMargin);
	} else {
		stickyContentElem.classList.add(StickyVanilla.StickyClass);
		articleContent.classList.add(StickyVanilla.AddLeftMargin);
	}
}


StickyVanilla.selector = 'js-sticky';
StickyVanilla.StickyClass = 'is-sticky';
StickyVanilla.StuckClass = 'is-stuck';
StickyVanilla.AddLeftMargin = 'o-article--shift';



export default StickyVanilla;