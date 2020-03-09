'use strict';

/**
 * Static column module
 * Similar to the general sticky module but used specifically when one column
 * of a two-column layout is meant to be sticky
 * @module modules/staticColumn
 * @see modules/stickyNav
 */

import forEach from 'lodash/forEach'; 

class StaticColumn {
  constructor() {
    // const el = document.querySelector(AlertBanner.selector);
    // const control = document.querySelector(AlertBanner.controller);
	
		const stickyContent = document.querySelectorAll('.js-static');
		const notStickyClass = StaticColumn.notStickyClass;
		const bottomClass = StaticColumn.bottomClass;
    
    // this._settings = {
    //   selector: StaticColumn.selector,
    //   notStickyClass: StaticColumn.notStickyClass,
    //   bottomClass: StaticColumn.bottomClass
    // };
    
		  /**
  * Calculates the window position and sets the appropriate class on the element
  * @param {object} stickyContentElem - DOM node that should be stickied
  */
	this.assignStickyFeature(stickyContent);
}

assignStickyFeature(stickyContent) {
	if (stickyContent) {
    forEach(stickyContent, function(stickyContentElem) {
      StaticColumn.calcWindowPos(stickyContentElem);
      /**
      * Add event listener for 'scroll'.
      * @function
      * @param {object} event - The event object
      */
      window.addEventListener('scroll', function() {
        StaticColumn.calcWindowPos(stickyContentElem);
      }, false);

      /**
      * Add event listener for 'resize'.
      * @function
      * @param {object} event - The event object
      */
      window.addEventListener('resize', function() {
        StaticColumn.calcWindowPos(stickyContentElem);
      }, false);
    });
  }
}

}

 StaticColumn.calcWindowPos = function(stickyContentElem) {
	let elemTop = stickyContentElem.parentElement.getBoundingClientRect().top;
	let isPastBottom = window.innerHeight - stickyContentElem.parentElement.clientHeight - stickyContentElem.parentElement.getBoundingClientRect().top > 0;

	// Sets element to position absolute if not scrolled to yet.
	// Absolutely positioning only when necessary and not by default prevents flickering
	// when removing the "is-bottom" class on Chrome
	if (elemTop > 0) {
		
		stickyContentElem.classList.add(StaticColumn.notStickyClass);
	} else {
		stickyContentElem.classList.remove(StaticColumn.notStickyClass);
	}
	if (isPastBottom) {
		stickyContentElem.classList.add(StaticColumn.bottomClass);
	} else {
		stickyContentElem.classList.remove(StaticColumn.bottomClass);
	}
}


StaticColumn.selector = 'js-static';
StaticColumn.notStickyClass = 'is-not-sticky';
StaticColumn.bottomClass = 'is-bottom';



export default StaticColumn;