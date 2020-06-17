var Polyfills = (function (exports) {
	'use strict';

	function createCommonjsModule(fn, module) {
		return module = { exports: {} }, fn(module, module.exports), module.exports;
	}

	var smoothscroll = createCommonjsModule(function (module, exports) {
	/* smoothscroll v0.4.4 - 2019 - Dustan Kasten, Jeremias Menichelli - MIT License */
	(function () {
		console.log("Smooth-scroll Polyfil");
	  // polyfill
	  function polyfill() {
	    // aliases
	    var w = window;
	    var d = document;

	    // return if scroll behavior is supported and polyfill is not forced
	    if (
	      'scrollBehavior' in d.documentElement.style &&
	      w.__forceSmoothScrollPolyfill__ !== true
	    ) {
	      return;
	    }

	    // globals
	    var Element = w.HTMLElement || w.Element;
	    var SCROLL_TIME = 468;

	    // object gathering original scroll methods
	    var original = {
	      scroll: w.scroll || w.scrollTo,
	      scrollBy: w.scrollBy,
	      elementScroll: Element.prototype.scroll || scrollElement,
	      scrollIntoView: Element.prototype.scrollIntoView
	    };

	    // define timing method
	    var now =
	      w.performance && w.performance.now
	        ? w.performance.now.bind(w.performance)
	        : Date.now;

	    /**
	     * indicates if a the current browser is made by Microsoft
	     * @method isMicrosoftBrowser
	     * @param {String} userAgent
	     * @returns {Boolean}
	     */
	    function isMicrosoftBrowser(userAgent) {
	      var userAgentPatterns = ['MSIE ', 'Trident/', 'Edge/'];

	      return new RegExp(userAgentPatterns.join('|')).test(userAgent);
	    }

	    /*
	     * IE has rounding bug rounding down clientHeight and clientWidth and
	     * rounding up scrollHeight and scrollWidth causing false positives
	     * on hasScrollableSpace
	     */
	    var ROUNDING_TOLERANCE = isMicrosoftBrowser(w.navigator.userAgent) ? 1 : 0;

	    /**
	     * changes scroll position inside an element
	     * @method scrollElement
	     * @param {Number} x
	     * @param {Number} y
	     * @returns {undefined}
	     */
	    function scrollElement(x, y) {
	      this.scrollLeft = x;
	      this.scrollTop = y;
	    }

	    /**
	     * returns result of applying ease math function to a number
	     * @method ease
	     * @param {Number} k
	     * @returns {Number}
	     */
	    function ease(k) {
	      return 0.5 * (1 - Math.cos(Math.PI * k));
	    }

	    /**
	     * indicates if a smooth behavior should be applied
	     * @method shouldBailOut
	     * @param {Number|Object} firstArg
	     * @returns {Boolean}
	     */
	    function shouldBailOut(firstArg) {
	      if (
	        firstArg === null ||
	        typeof firstArg !== 'object' ||
	        firstArg.behavior === undefined ||
	        firstArg.behavior === 'auto' ||
	        firstArg.behavior === 'instant'
	      ) {
	        // first argument is not an object/null
	        // or behavior is auto, instant or undefined
	        return true;
	      }

	      if (typeof firstArg === 'object' && firstArg.behavior === 'smooth') {
	        // first argument is an object and behavior is smooth
	        return false;
	      }

	      // throw error when behavior is not supported
	      throw new TypeError(
	        'behavior member of ScrollOptions ' +
	          firstArg.behavior +
	          ' is not a valid value for enumeration ScrollBehavior.'
	      );
	    }

	    /**
	     * indicates if an element has scrollable space in the provided axis
	     * @method hasScrollableSpace
	     * @param {Node} el
	     * @param {String} axis
	     * @returns {Boolean}
	     */
	    function hasScrollableSpace(el, axis) {
	      if (axis === 'Y') {
	        return el.clientHeight + ROUNDING_TOLERANCE < el.scrollHeight;
	      }

	      if (axis === 'X') {
	        return el.clientWidth + ROUNDING_TOLERANCE < el.scrollWidth;
	      }
	    }

	    /**
	     * indicates if an element has a scrollable overflow property in the axis
	     * @method canOverflow
	     * @param {Node} el
	     * @param {String} axis
	     * @returns {Boolean}
	     */
	    function canOverflow(el, axis) {
	      var overflowValue = w.getComputedStyle(el, null)['overflow' + axis];

	      return overflowValue === 'auto' || overflowValue === 'scroll';
	    }

	    /**
	     * indicates if an element can be scrolled in either axis
	     * @method isScrollable
	     * @param {Node} el
	     * @param {String} axis
	     * @returns {Boolean}
	     */
	    function isScrollable(el) {
	      var isScrollableY = hasScrollableSpace(el, 'Y') && canOverflow(el, 'Y');
	      var isScrollableX = hasScrollableSpace(el, 'X') && canOverflow(el, 'X');

	      return isScrollableY || isScrollableX;
	    }

	    /**
	     * finds scrollable parent of an element
	     * @method findScrollableParent
	     * @param {Node} el
	     * @returns {Node} el
	     */
	    function findScrollableParent(el) {
	      while (el !== d.body && isScrollable(el) === false) {
	        el = el.parentNode || el.host;
	      }

	      return el;
	    }

	    /**
	     * self invoked function that, given a context, steps through scrolling
	     * @method step
	     * @param {Object} context
	     * @returns {undefined}
	     */
	    function step(context) {
	      var time = now();
	      var value;
	      var currentX;
	      var currentY;
	      var elapsed = (time - context.startTime) / SCROLL_TIME;

	      // avoid elapsed times higher than one
	      elapsed = elapsed > 1 ? 1 : elapsed;

	      // apply easing to elapsed time
	      value = ease(elapsed);

	      currentX = context.startX + (context.x - context.startX) * value;
	      currentY = context.startY + (context.y - context.startY) * value;

	      context.method.call(context.scrollable, currentX, currentY);

	      // scroll more if we have not reached our destination
	      if (currentX !== context.x || currentY !== context.y) {
	        w.requestAnimationFrame(step.bind(w, context));
	      }
	    }

	    /**
	     * scrolls window or element with a smooth behavior
	     * @method smoothScroll
	     * @param {Object|Node} el
	     * @param {Number} x
	     * @param {Number} y
	     * @returns {undefined}
	     */
	    function smoothScroll(el, x, y) {
	      var scrollable;
	      var startX;
	      var startY;
	      var method;
	      var startTime = now();

	      // define scroll context
	      if (el === d.body) {
	        scrollable = w;
	        startX = w.scrollX || w.pageXOffset;
	        startY = w.scrollY || w.pageYOffset;
	        method = original.scroll;
	      } else {
	        scrollable = el;
	        startX = el.scrollLeft;
	        startY = el.scrollTop;
	        method = scrollElement;
	      }

	      // scroll looping over a frame
	      step({
	        scrollable: scrollable,
	        method: method,
	        startTime: startTime,
	        startX: startX,
	        startY: startY,
	        x: x,
	        y: y
	      });
	    }

	    // ORIGINAL METHODS OVERRIDES
	    // w.scroll and w.scrollTo
	    w.scroll = w.scrollTo = function() {
	      // avoid action when no arguments are passed
	      if (arguments[0] === undefined) {
	        return;
	      }

	      // avoid smooth behavior if not required
	      if (shouldBailOut(arguments[0]) === true) {
	        original.scroll.call(
	          w,
	          arguments[0].left !== undefined
	            ? arguments[0].left
	            : typeof arguments[0] !== 'object'
	              ? arguments[0]
	              : w.scrollX || w.pageXOffset,
	          // use top prop, second argument if present or fallback to scrollY
	          arguments[0].top !== undefined
	            ? arguments[0].top
	            : arguments[1] !== undefined
	              ? arguments[1]
	              : w.scrollY || w.pageYOffset
	        );

	        return;
	      }

	      // LET THE SMOOTHNESS BEGIN!
	      smoothScroll.call(
	        w,
	        d.body,
	        arguments[0].left !== undefined
	          ? ~~arguments[0].left
	          : w.scrollX || w.pageXOffset,
	        arguments[0].top !== undefined
	          ? ~~arguments[0].top
	          : w.scrollY || w.pageYOffset
	      );
	    };

	    // w.scrollBy
	    w.scrollBy = function() {
	      // avoid action when no arguments are passed
	      if (arguments[0] === undefined) {
	        return;
	      }

	      // avoid smooth behavior if not required
	      if (shouldBailOut(arguments[0])) {
	        original.scrollBy.call(
	          w,
	          arguments[0].left !== undefined
	            ? arguments[0].left
	            : typeof arguments[0] !== 'object' ? arguments[0] : 0,
	          arguments[0].top !== undefined
	            ? arguments[0].top
	            : arguments[1] !== undefined ? arguments[1] : 0
	        );

	        return;
	      }

	      // LET THE SMOOTHNESS BEGIN!
	      smoothScroll.call(
	        w,
	        d.body,
	        ~~arguments[0].left + (w.scrollX || w.pageXOffset),
	        ~~arguments[0].top + (w.scrollY || w.pageYOffset)
	      );
	    };

	    // Element.prototype.scroll and Element.prototype.scrollTo
	    Element.prototype.scroll = Element.prototype.scrollTo = function() {
	      // avoid action when no arguments are passed
	      if (arguments[0] === undefined) {
	        return;
	      }

	      // avoid smooth behavior if not required
	      if (shouldBailOut(arguments[0]) === true) {
	        // if one number is passed, throw error to match Firefox implementation
	        if (typeof arguments[0] === 'number' && arguments[1] === undefined) {
	          throw new SyntaxError('Value could not be converted');
	        }

	        original.elementScroll.call(
	          this,
	          // use left prop, first number argument or fallback to scrollLeft
	          arguments[0].left !== undefined
	            ? ~~arguments[0].left
	            : typeof arguments[0] !== 'object' ? ~~arguments[0] : this.scrollLeft,
	          // use top prop, second argument or fallback to scrollTop
	          arguments[0].top !== undefined
	            ? ~~arguments[0].top
	            : arguments[1] !== undefined ? ~~arguments[1] : this.scrollTop
	        );

	        return;
	      }

	      var left = arguments[0].left;
	      var top = arguments[0].top;

	      // LET THE SMOOTHNESS BEGIN!
	      smoothScroll.call(
	        this,
	        this,
	        typeof left === 'undefined' ? this.scrollLeft : ~~left,
	        typeof top === 'undefined' ? this.scrollTop : ~~top
	      );
	    };

	    // Element.prototype.scrollBy
	    Element.prototype.scrollBy = function() {
	      // avoid action when no arguments are passed
	      if (arguments[0] === undefined) {
	        return;
	      }

	      // avoid smooth behavior if not required
	      if (shouldBailOut(arguments[0]) === true) {
	        original.elementScroll.call(
	          this,
	          arguments[0].left !== undefined
	            ? ~~arguments[0].left + this.scrollLeft
	            : ~~arguments[0] + this.scrollLeft,
	          arguments[0].top !== undefined
	            ? ~~arguments[0].top + this.scrollTop
	            : ~~arguments[1] + this.scrollTop
	        );

	        return;
	      }

	      this.scroll({
	        left: ~~arguments[0].left + this.scrollLeft,
	        top: ~~arguments[0].top + this.scrollTop,
	        behavior: arguments[0].behavior
	      });
	    };

	    // Element.prototype.scrollIntoView
	    Element.prototype.scrollIntoView = function() {
	      // avoid smooth behavior if not required
	      if (shouldBailOut(arguments[0]) === true) {
	        original.scrollIntoView.call(
	          this,
	          arguments[0] === undefined ? true : arguments[0]
	        );

	        return;
	      }

	      // LET THE SMOOTHNESS BEGIN!
	      var scrollableParent = findScrollableParent(this);
	      var parentRects = scrollableParent.getBoundingClientRect();
	      var clientRects = this.getBoundingClientRect();

	      if (scrollableParent !== d.body) {
	        // reveal element inside parent
	        smoothScroll.call(
	          this,
	          scrollableParent,
	          scrollableParent.scrollLeft + clientRects.left - parentRects.left,
	          scrollableParent.scrollTop + clientRects.top - parentRects.top
	        );

	        // reveal parent in viewport unless is fixed
	        if (w.getComputedStyle(scrollableParent).position !== 'fixed') {
	          w.scrollBy({
	            left: parentRects.left,
	            top: parentRects.top,
	            behavior: 'smooth'
	          });
	        }
	      } else {
	        // reveal element in viewport
	        w.scrollBy({
	          left: clientRects.left,
	          top: clientRects.top,
	          behavior: 'smooth'
	        });
	      }
	    };
	  }

	  {
	    // commonjs
	    module.exports = { polyfill: polyfill };
	  }

	}());
	});
	var smoothscroll_1 = smoothscroll.polyfill;

	exports.default = smoothscroll;
	exports.polyfill = smoothscroll_1;

	return exports;

}({}));
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicG9seWZpbGxzLmpzIiwic291cmNlcyI6WyIuLi8uLi9ub2RlX21vZHVsZXMvc21vb3Roc2Nyb2xsLXBvbHlmaWxsL2Rpc3Qvc21vb3Roc2Nyb2xsLmpzIl0sInNvdXJjZXNDb250ZW50IjpbIi8qIHNtb290aHNjcm9sbCB2MC40LjQgLSAyMDE5IC0gRHVzdGFuIEthc3RlbiwgSmVyZW1pYXMgTWVuaWNoZWxsaSAtIE1JVCBMaWNlbnNlICovXG4oZnVuY3Rpb24gKCkge1xuICAndXNlIHN0cmljdCc7XG5cdGNvbnNvbGUubG9nKFwiU21vb3RoLXNjcm9sbCBQb2x5ZmlsXCIpXG4gIC8vIHBvbHlmaWxsXG4gIGZ1bmN0aW9uIHBvbHlmaWxsKCkge1xuICAgIC8vIGFsaWFzZXNcbiAgICB2YXIgdyA9IHdpbmRvdztcbiAgICB2YXIgZCA9IGRvY3VtZW50O1xuXG4gICAgLy8gcmV0dXJuIGlmIHNjcm9sbCBiZWhhdmlvciBpcyBzdXBwb3J0ZWQgYW5kIHBvbHlmaWxsIGlzIG5vdCBmb3JjZWRcbiAgICBpZiAoXG4gICAgICAnc2Nyb2xsQmVoYXZpb3InIGluIGQuZG9jdW1lbnRFbGVtZW50LnN0eWxlICYmXG4gICAgICB3Ll9fZm9yY2VTbW9vdGhTY3JvbGxQb2x5ZmlsbF9fICE9PSB0cnVlXG4gICAgKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgLy8gZ2xvYmFsc1xuICAgIHZhciBFbGVtZW50ID0gdy5IVE1MRWxlbWVudCB8fCB3LkVsZW1lbnQ7XG4gICAgdmFyIFNDUk9MTF9USU1FID0gNDY4O1xuXG4gICAgLy8gb2JqZWN0IGdhdGhlcmluZyBvcmlnaW5hbCBzY3JvbGwgbWV0aG9kc1xuICAgIHZhciBvcmlnaW5hbCA9IHtcbiAgICAgIHNjcm9sbDogdy5zY3JvbGwgfHwgdy5zY3JvbGxUbyxcbiAgICAgIHNjcm9sbEJ5OiB3LnNjcm9sbEJ5LFxuICAgICAgZWxlbWVudFNjcm9sbDogRWxlbWVudC5wcm90b3R5cGUuc2Nyb2xsIHx8IHNjcm9sbEVsZW1lbnQsXG4gICAgICBzY3JvbGxJbnRvVmlldzogRWxlbWVudC5wcm90b3R5cGUuc2Nyb2xsSW50b1ZpZXdcbiAgICB9O1xuXG4gICAgLy8gZGVmaW5lIHRpbWluZyBtZXRob2RcbiAgICB2YXIgbm93ID1cbiAgICAgIHcucGVyZm9ybWFuY2UgJiYgdy5wZXJmb3JtYW5jZS5ub3dcbiAgICAgICAgPyB3LnBlcmZvcm1hbmNlLm5vdy5iaW5kKHcucGVyZm9ybWFuY2UpXG4gICAgICAgIDogRGF0ZS5ub3c7XG5cbiAgICAvKipcbiAgICAgKiBpbmRpY2F0ZXMgaWYgYSB0aGUgY3VycmVudCBicm93c2VyIGlzIG1hZGUgYnkgTWljcm9zb2Z0XG4gICAgICogQG1ldGhvZCBpc01pY3Jvc29mdEJyb3dzZXJcbiAgICAgKiBAcGFyYW0ge1N0cmluZ30gdXNlckFnZW50XG4gICAgICogQHJldHVybnMge0Jvb2xlYW59XG4gICAgICovXG4gICAgZnVuY3Rpb24gaXNNaWNyb3NvZnRCcm93c2VyKHVzZXJBZ2VudCkge1xuICAgICAgdmFyIHVzZXJBZ2VudFBhdHRlcm5zID0gWydNU0lFICcsICdUcmlkZW50LycsICdFZGdlLyddO1xuXG4gICAgICByZXR1cm4gbmV3IFJlZ0V4cCh1c2VyQWdlbnRQYXR0ZXJucy5qb2luKCd8JykpLnRlc3QodXNlckFnZW50KTtcbiAgICB9XG5cbiAgICAvKlxuICAgICAqIElFIGhhcyByb3VuZGluZyBidWcgcm91bmRpbmcgZG93biBjbGllbnRIZWlnaHQgYW5kIGNsaWVudFdpZHRoIGFuZFxuICAgICAqIHJvdW5kaW5nIHVwIHNjcm9sbEhlaWdodCBhbmQgc2Nyb2xsV2lkdGggY2F1c2luZyBmYWxzZSBwb3NpdGl2ZXNcbiAgICAgKiBvbiBoYXNTY3JvbGxhYmxlU3BhY2VcbiAgICAgKi9cbiAgICB2YXIgUk9VTkRJTkdfVE9MRVJBTkNFID0gaXNNaWNyb3NvZnRCcm93c2VyKHcubmF2aWdhdG9yLnVzZXJBZ2VudCkgPyAxIDogMDtcblxuICAgIC8qKlxuICAgICAqIGNoYW5nZXMgc2Nyb2xsIHBvc2l0aW9uIGluc2lkZSBhbiBlbGVtZW50XG4gICAgICogQG1ldGhvZCBzY3JvbGxFbGVtZW50XG4gICAgICogQHBhcmFtIHtOdW1iZXJ9IHhcbiAgICAgKiBAcGFyYW0ge051bWJlcn0geVxuICAgICAqIEByZXR1cm5zIHt1bmRlZmluZWR9XG4gICAgICovXG4gICAgZnVuY3Rpb24gc2Nyb2xsRWxlbWVudCh4LCB5KSB7XG4gICAgICB0aGlzLnNjcm9sbExlZnQgPSB4O1xuICAgICAgdGhpcy5zY3JvbGxUb3AgPSB5O1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIHJldHVybnMgcmVzdWx0IG9mIGFwcGx5aW5nIGVhc2UgbWF0aCBmdW5jdGlvbiB0byBhIG51bWJlclxuICAgICAqIEBtZXRob2QgZWFzZVxuICAgICAqIEBwYXJhbSB7TnVtYmVyfSBrXG4gICAgICogQHJldHVybnMge051bWJlcn1cbiAgICAgKi9cbiAgICBmdW5jdGlvbiBlYXNlKGspIHtcbiAgICAgIHJldHVybiAwLjUgKiAoMSAtIE1hdGguY29zKE1hdGguUEkgKiBrKSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogaW5kaWNhdGVzIGlmIGEgc21vb3RoIGJlaGF2aW9yIHNob3VsZCBiZSBhcHBsaWVkXG4gICAgICogQG1ldGhvZCBzaG91bGRCYWlsT3V0XG4gICAgICogQHBhcmFtIHtOdW1iZXJ8T2JqZWN0fSBmaXJzdEFyZ1xuICAgICAqIEByZXR1cm5zIHtCb29sZWFufVxuICAgICAqL1xuICAgIGZ1bmN0aW9uIHNob3VsZEJhaWxPdXQoZmlyc3RBcmcpIHtcbiAgICAgIGlmIChcbiAgICAgICAgZmlyc3RBcmcgPT09IG51bGwgfHxcbiAgICAgICAgdHlwZW9mIGZpcnN0QXJnICE9PSAnb2JqZWN0JyB8fFxuICAgICAgICBmaXJzdEFyZy5iZWhhdmlvciA9PT0gdW5kZWZpbmVkIHx8XG4gICAgICAgIGZpcnN0QXJnLmJlaGF2aW9yID09PSAnYXV0bycgfHxcbiAgICAgICAgZmlyc3RBcmcuYmVoYXZpb3IgPT09ICdpbnN0YW50J1xuICAgICAgKSB7XG4gICAgICAgIC8vIGZpcnN0IGFyZ3VtZW50IGlzIG5vdCBhbiBvYmplY3QvbnVsbFxuICAgICAgICAvLyBvciBiZWhhdmlvciBpcyBhdXRvLCBpbnN0YW50IG9yIHVuZGVmaW5lZFxuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgIH1cblxuICAgICAgaWYgKHR5cGVvZiBmaXJzdEFyZyA9PT0gJ29iamVjdCcgJiYgZmlyc3RBcmcuYmVoYXZpb3IgPT09ICdzbW9vdGgnKSB7XG4gICAgICAgIC8vIGZpcnN0IGFyZ3VtZW50IGlzIGFuIG9iamVjdCBhbmQgYmVoYXZpb3IgaXMgc21vb3RoXG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgIH1cblxuICAgICAgLy8gdGhyb3cgZXJyb3Igd2hlbiBiZWhhdmlvciBpcyBub3Qgc3VwcG9ydGVkXG4gICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKFxuICAgICAgICAnYmVoYXZpb3IgbWVtYmVyIG9mIFNjcm9sbE9wdGlvbnMgJyArXG4gICAgICAgICAgZmlyc3RBcmcuYmVoYXZpb3IgK1xuICAgICAgICAgICcgaXMgbm90IGEgdmFsaWQgdmFsdWUgZm9yIGVudW1lcmF0aW9uIFNjcm9sbEJlaGF2aW9yLidcbiAgICAgICk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogaW5kaWNhdGVzIGlmIGFuIGVsZW1lbnQgaGFzIHNjcm9sbGFibGUgc3BhY2UgaW4gdGhlIHByb3ZpZGVkIGF4aXNcbiAgICAgKiBAbWV0aG9kIGhhc1Njcm9sbGFibGVTcGFjZVxuICAgICAqIEBwYXJhbSB7Tm9kZX0gZWxcbiAgICAgKiBAcGFyYW0ge1N0cmluZ30gYXhpc1xuICAgICAqIEByZXR1cm5zIHtCb29sZWFufVxuICAgICAqL1xuICAgIGZ1bmN0aW9uIGhhc1Njcm9sbGFibGVTcGFjZShlbCwgYXhpcykge1xuICAgICAgaWYgKGF4aXMgPT09ICdZJykge1xuICAgICAgICByZXR1cm4gZWwuY2xpZW50SGVpZ2h0ICsgUk9VTkRJTkdfVE9MRVJBTkNFIDwgZWwuc2Nyb2xsSGVpZ2h0O1xuICAgICAgfVxuXG4gICAgICBpZiAoYXhpcyA9PT0gJ1gnKSB7XG4gICAgICAgIHJldHVybiBlbC5jbGllbnRXaWR0aCArIFJPVU5ESU5HX1RPTEVSQU5DRSA8IGVsLnNjcm9sbFdpZHRoO1xuICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIGluZGljYXRlcyBpZiBhbiBlbGVtZW50IGhhcyBhIHNjcm9sbGFibGUgb3ZlcmZsb3cgcHJvcGVydHkgaW4gdGhlIGF4aXNcbiAgICAgKiBAbWV0aG9kIGNhbk92ZXJmbG93XG4gICAgICogQHBhcmFtIHtOb2RlfSBlbFxuICAgICAqIEBwYXJhbSB7U3RyaW5nfSBheGlzXG4gICAgICogQHJldHVybnMge0Jvb2xlYW59XG4gICAgICovXG4gICAgZnVuY3Rpb24gY2FuT3ZlcmZsb3coZWwsIGF4aXMpIHtcbiAgICAgIHZhciBvdmVyZmxvd1ZhbHVlID0gdy5nZXRDb21wdXRlZFN0eWxlKGVsLCBudWxsKVsnb3ZlcmZsb3cnICsgYXhpc107XG5cbiAgICAgIHJldHVybiBvdmVyZmxvd1ZhbHVlID09PSAnYXV0bycgfHwgb3ZlcmZsb3dWYWx1ZSA9PT0gJ3Njcm9sbCc7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogaW5kaWNhdGVzIGlmIGFuIGVsZW1lbnQgY2FuIGJlIHNjcm9sbGVkIGluIGVpdGhlciBheGlzXG4gICAgICogQG1ldGhvZCBpc1Njcm9sbGFibGVcbiAgICAgKiBAcGFyYW0ge05vZGV9IGVsXG4gICAgICogQHBhcmFtIHtTdHJpbmd9IGF4aXNcbiAgICAgKiBAcmV0dXJucyB7Qm9vbGVhbn1cbiAgICAgKi9cbiAgICBmdW5jdGlvbiBpc1Njcm9sbGFibGUoZWwpIHtcbiAgICAgIHZhciBpc1Njcm9sbGFibGVZID0gaGFzU2Nyb2xsYWJsZVNwYWNlKGVsLCAnWScpICYmIGNhbk92ZXJmbG93KGVsLCAnWScpO1xuICAgICAgdmFyIGlzU2Nyb2xsYWJsZVggPSBoYXNTY3JvbGxhYmxlU3BhY2UoZWwsICdYJykgJiYgY2FuT3ZlcmZsb3coZWwsICdYJyk7XG5cbiAgICAgIHJldHVybiBpc1Njcm9sbGFibGVZIHx8IGlzU2Nyb2xsYWJsZVg7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogZmluZHMgc2Nyb2xsYWJsZSBwYXJlbnQgb2YgYW4gZWxlbWVudFxuICAgICAqIEBtZXRob2QgZmluZFNjcm9sbGFibGVQYXJlbnRcbiAgICAgKiBAcGFyYW0ge05vZGV9IGVsXG4gICAgICogQHJldHVybnMge05vZGV9IGVsXG4gICAgICovXG4gICAgZnVuY3Rpb24gZmluZFNjcm9sbGFibGVQYXJlbnQoZWwpIHtcbiAgICAgIHdoaWxlIChlbCAhPT0gZC5ib2R5ICYmIGlzU2Nyb2xsYWJsZShlbCkgPT09IGZhbHNlKSB7XG4gICAgICAgIGVsID0gZWwucGFyZW50Tm9kZSB8fCBlbC5ob3N0O1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gZWw7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogc2VsZiBpbnZva2VkIGZ1bmN0aW9uIHRoYXQsIGdpdmVuIGEgY29udGV4dCwgc3RlcHMgdGhyb3VnaCBzY3JvbGxpbmdcbiAgICAgKiBAbWV0aG9kIHN0ZXBcbiAgICAgKiBAcGFyYW0ge09iamVjdH0gY29udGV4dFxuICAgICAqIEByZXR1cm5zIHt1bmRlZmluZWR9XG4gICAgICovXG4gICAgZnVuY3Rpb24gc3RlcChjb250ZXh0KSB7XG4gICAgICB2YXIgdGltZSA9IG5vdygpO1xuICAgICAgdmFyIHZhbHVlO1xuICAgICAgdmFyIGN1cnJlbnRYO1xuICAgICAgdmFyIGN1cnJlbnRZO1xuICAgICAgdmFyIGVsYXBzZWQgPSAodGltZSAtIGNvbnRleHQuc3RhcnRUaW1lKSAvIFNDUk9MTF9USU1FO1xuXG4gICAgICAvLyBhdm9pZCBlbGFwc2VkIHRpbWVzIGhpZ2hlciB0aGFuIG9uZVxuICAgICAgZWxhcHNlZCA9IGVsYXBzZWQgPiAxID8gMSA6IGVsYXBzZWQ7XG5cbiAgICAgIC8vIGFwcGx5IGVhc2luZyB0byBlbGFwc2VkIHRpbWVcbiAgICAgIHZhbHVlID0gZWFzZShlbGFwc2VkKTtcblxuICAgICAgY3VycmVudFggPSBjb250ZXh0LnN0YXJ0WCArIChjb250ZXh0LnggLSBjb250ZXh0LnN0YXJ0WCkgKiB2YWx1ZTtcbiAgICAgIGN1cnJlbnRZID0gY29udGV4dC5zdGFydFkgKyAoY29udGV4dC55IC0gY29udGV4dC5zdGFydFkpICogdmFsdWU7XG5cbiAgICAgIGNvbnRleHQubWV0aG9kLmNhbGwoY29udGV4dC5zY3JvbGxhYmxlLCBjdXJyZW50WCwgY3VycmVudFkpO1xuXG4gICAgICAvLyBzY3JvbGwgbW9yZSBpZiB3ZSBoYXZlIG5vdCByZWFjaGVkIG91ciBkZXN0aW5hdGlvblxuICAgICAgaWYgKGN1cnJlbnRYICE9PSBjb250ZXh0LnggfHwgY3VycmVudFkgIT09IGNvbnRleHQueSkge1xuICAgICAgICB3LnJlcXVlc3RBbmltYXRpb25GcmFtZShzdGVwLmJpbmQodywgY29udGV4dCkpO1xuICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIHNjcm9sbHMgd2luZG93IG9yIGVsZW1lbnQgd2l0aCBhIHNtb290aCBiZWhhdmlvclxuICAgICAqIEBtZXRob2Qgc21vb3RoU2Nyb2xsXG4gICAgICogQHBhcmFtIHtPYmplY3R8Tm9kZX0gZWxcbiAgICAgKiBAcGFyYW0ge051bWJlcn0geFxuICAgICAqIEBwYXJhbSB7TnVtYmVyfSB5XG4gICAgICogQHJldHVybnMge3VuZGVmaW5lZH1cbiAgICAgKi9cbiAgICBmdW5jdGlvbiBzbW9vdGhTY3JvbGwoZWwsIHgsIHkpIHtcbiAgICAgIHZhciBzY3JvbGxhYmxlO1xuICAgICAgdmFyIHN0YXJ0WDtcbiAgICAgIHZhciBzdGFydFk7XG4gICAgICB2YXIgbWV0aG9kO1xuICAgICAgdmFyIHN0YXJ0VGltZSA9IG5vdygpO1xuXG4gICAgICAvLyBkZWZpbmUgc2Nyb2xsIGNvbnRleHRcbiAgICAgIGlmIChlbCA9PT0gZC5ib2R5KSB7XG4gICAgICAgIHNjcm9sbGFibGUgPSB3O1xuICAgICAgICBzdGFydFggPSB3LnNjcm9sbFggfHwgdy5wYWdlWE9mZnNldDtcbiAgICAgICAgc3RhcnRZID0gdy5zY3JvbGxZIHx8IHcucGFnZVlPZmZzZXQ7XG4gICAgICAgIG1ldGhvZCA9IG9yaWdpbmFsLnNjcm9sbDtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHNjcm9sbGFibGUgPSBlbDtcbiAgICAgICAgc3RhcnRYID0gZWwuc2Nyb2xsTGVmdDtcbiAgICAgICAgc3RhcnRZID0gZWwuc2Nyb2xsVG9wO1xuICAgICAgICBtZXRob2QgPSBzY3JvbGxFbGVtZW50O1xuICAgICAgfVxuXG4gICAgICAvLyBzY3JvbGwgbG9vcGluZyBvdmVyIGEgZnJhbWVcbiAgICAgIHN0ZXAoe1xuICAgICAgICBzY3JvbGxhYmxlOiBzY3JvbGxhYmxlLFxuICAgICAgICBtZXRob2Q6IG1ldGhvZCxcbiAgICAgICAgc3RhcnRUaW1lOiBzdGFydFRpbWUsXG4gICAgICAgIHN0YXJ0WDogc3RhcnRYLFxuICAgICAgICBzdGFydFk6IHN0YXJ0WSxcbiAgICAgICAgeDogeCxcbiAgICAgICAgeTogeVxuICAgICAgfSk7XG4gICAgfVxuXG4gICAgLy8gT1JJR0lOQUwgTUVUSE9EUyBPVkVSUklERVNcbiAgICAvLyB3LnNjcm9sbCBhbmQgdy5zY3JvbGxUb1xuICAgIHcuc2Nyb2xsID0gdy5zY3JvbGxUbyA9IGZ1bmN0aW9uKCkge1xuICAgICAgLy8gYXZvaWQgYWN0aW9uIHdoZW4gbm8gYXJndW1lbnRzIGFyZSBwYXNzZWRcbiAgICAgIGlmIChhcmd1bWVudHNbMF0gPT09IHVuZGVmaW5lZCkge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIC8vIGF2b2lkIHNtb290aCBiZWhhdmlvciBpZiBub3QgcmVxdWlyZWRcbiAgICAgIGlmIChzaG91bGRCYWlsT3V0KGFyZ3VtZW50c1swXSkgPT09IHRydWUpIHtcbiAgICAgICAgb3JpZ2luYWwuc2Nyb2xsLmNhbGwoXG4gICAgICAgICAgdyxcbiAgICAgICAgICBhcmd1bWVudHNbMF0ubGVmdCAhPT0gdW5kZWZpbmVkXG4gICAgICAgICAgICA/IGFyZ3VtZW50c1swXS5sZWZ0XG4gICAgICAgICAgICA6IHR5cGVvZiBhcmd1bWVudHNbMF0gIT09ICdvYmplY3QnXG4gICAgICAgICAgICAgID8gYXJndW1lbnRzWzBdXG4gICAgICAgICAgICAgIDogdy5zY3JvbGxYIHx8IHcucGFnZVhPZmZzZXQsXG4gICAgICAgICAgLy8gdXNlIHRvcCBwcm9wLCBzZWNvbmQgYXJndW1lbnQgaWYgcHJlc2VudCBvciBmYWxsYmFjayB0byBzY3JvbGxZXG4gICAgICAgICAgYXJndW1lbnRzWzBdLnRvcCAhPT0gdW5kZWZpbmVkXG4gICAgICAgICAgICA/IGFyZ3VtZW50c1swXS50b3BcbiAgICAgICAgICAgIDogYXJndW1lbnRzWzFdICE9PSB1bmRlZmluZWRcbiAgICAgICAgICAgICAgPyBhcmd1bWVudHNbMV1cbiAgICAgICAgICAgICAgOiB3LnNjcm9sbFkgfHwgdy5wYWdlWU9mZnNldFxuICAgICAgICApO1xuXG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgLy8gTEVUIFRIRSBTTU9PVEhORVNTIEJFR0lOIVxuICAgICAgc21vb3RoU2Nyb2xsLmNhbGwoXG4gICAgICAgIHcsXG4gICAgICAgIGQuYm9keSxcbiAgICAgICAgYXJndW1lbnRzWzBdLmxlZnQgIT09IHVuZGVmaW5lZFxuICAgICAgICAgID8gfn5hcmd1bWVudHNbMF0ubGVmdFxuICAgICAgICAgIDogdy5zY3JvbGxYIHx8IHcucGFnZVhPZmZzZXQsXG4gICAgICAgIGFyZ3VtZW50c1swXS50b3AgIT09IHVuZGVmaW5lZFxuICAgICAgICAgID8gfn5hcmd1bWVudHNbMF0udG9wXG4gICAgICAgICAgOiB3LnNjcm9sbFkgfHwgdy5wYWdlWU9mZnNldFxuICAgICAgKTtcbiAgICB9O1xuXG4gICAgLy8gdy5zY3JvbGxCeVxuICAgIHcuc2Nyb2xsQnkgPSBmdW5jdGlvbigpIHtcbiAgICAgIC8vIGF2b2lkIGFjdGlvbiB3aGVuIG5vIGFyZ3VtZW50cyBhcmUgcGFzc2VkXG4gICAgICBpZiAoYXJndW1lbnRzWzBdID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICAvLyBhdm9pZCBzbW9vdGggYmVoYXZpb3IgaWYgbm90IHJlcXVpcmVkXG4gICAgICBpZiAoc2hvdWxkQmFpbE91dChhcmd1bWVudHNbMF0pKSB7XG4gICAgICAgIG9yaWdpbmFsLnNjcm9sbEJ5LmNhbGwoXG4gICAgICAgICAgdyxcbiAgICAgICAgICBhcmd1bWVudHNbMF0ubGVmdCAhPT0gdW5kZWZpbmVkXG4gICAgICAgICAgICA/IGFyZ3VtZW50c1swXS5sZWZ0XG4gICAgICAgICAgICA6IHR5cGVvZiBhcmd1bWVudHNbMF0gIT09ICdvYmplY3QnID8gYXJndW1lbnRzWzBdIDogMCxcbiAgICAgICAgICBhcmd1bWVudHNbMF0udG9wICE9PSB1bmRlZmluZWRcbiAgICAgICAgICAgID8gYXJndW1lbnRzWzBdLnRvcFxuICAgICAgICAgICAgOiBhcmd1bWVudHNbMV0gIT09IHVuZGVmaW5lZCA/IGFyZ3VtZW50c1sxXSA6IDBcbiAgICAgICAgKTtcblxuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIC8vIExFVCBUSEUgU01PT1RITkVTUyBCRUdJTiFcbiAgICAgIHNtb290aFNjcm9sbC5jYWxsKFxuICAgICAgICB3LFxuICAgICAgICBkLmJvZHksXG4gICAgICAgIH5+YXJndW1lbnRzWzBdLmxlZnQgKyAody5zY3JvbGxYIHx8IHcucGFnZVhPZmZzZXQpLFxuICAgICAgICB+fmFyZ3VtZW50c1swXS50b3AgKyAody5zY3JvbGxZIHx8IHcucGFnZVlPZmZzZXQpXG4gICAgICApO1xuICAgIH07XG5cbiAgICAvLyBFbGVtZW50LnByb3RvdHlwZS5zY3JvbGwgYW5kIEVsZW1lbnQucHJvdG90eXBlLnNjcm9sbFRvXG4gICAgRWxlbWVudC5wcm90b3R5cGUuc2Nyb2xsID0gRWxlbWVudC5wcm90b3R5cGUuc2Nyb2xsVG8gPSBmdW5jdGlvbigpIHtcbiAgICAgIC8vIGF2b2lkIGFjdGlvbiB3aGVuIG5vIGFyZ3VtZW50cyBhcmUgcGFzc2VkXG4gICAgICBpZiAoYXJndW1lbnRzWzBdID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICAvLyBhdm9pZCBzbW9vdGggYmVoYXZpb3IgaWYgbm90IHJlcXVpcmVkXG4gICAgICBpZiAoc2hvdWxkQmFpbE91dChhcmd1bWVudHNbMF0pID09PSB0cnVlKSB7XG4gICAgICAgIC8vIGlmIG9uZSBudW1iZXIgaXMgcGFzc2VkLCB0aHJvdyBlcnJvciB0byBtYXRjaCBGaXJlZm94IGltcGxlbWVudGF0aW9uXG4gICAgICAgIGlmICh0eXBlb2YgYXJndW1lbnRzWzBdID09PSAnbnVtYmVyJyAmJiBhcmd1bWVudHNbMV0gPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgIHRocm93IG5ldyBTeW50YXhFcnJvcignVmFsdWUgY291bGQgbm90IGJlIGNvbnZlcnRlZCcpO1xuICAgICAgICB9XG5cbiAgICAgICAgb3JpZ2luYWwuZWxlbWVudFNjcm9sbC5jYWxsKFxuICAgICAgICAgIHRoaXMsXG4gICAgICAgICAgLy8gdXNlIGxlZnQgcHJvcCwgZmlyc3QgbnVtYmVyIGFyZ3VtZW50IG9yIGZhbGxiYWNrIHRvIHNjcm9sbExlZnRcbiAgICAgICAgICBhcmd1bWVudHNbMF0ubGVmdCAhPT0gdW5kZWZpbmVkXG4gICAgICAgICAgICA/IH5+YXJndW1lbnRzWzBdLmxlZnRcbiAgICAgICAgICAgIDogdHlwZW9mIGFyZ3VtZW50c1swXSAhPT0gJ29iamVjdCcgPyB+fmFyZ3VtZW50c1swXSA6IHRoaXMuc2Nyb2xsTGVmdCxcbiAgICAgICAgICAvLyB1c2UgdG9wIHByb3AsIHNlY29uZCBhcmd1bWVudCBvciBmYWxsYmFjayB0byBzY3JvbGxUb3BcbiAgICAgICAgICBhcmd1bWVudHNbMF0udG9wICE9PSB1bmRlZmluZWRcbiAgICAgICAgICAgID8gfn5hcmd1bWVudHNbMF0udG9wXG4gICAgICAgICAgICA6IGFyZ3VtZW50c1sxXSAhPT0gdW5kZWZpbmVkID8gfn5hcmd1bWVudHNbMV0gOiB0aGlzLnNjcm9sbFRvcFxuICAgICAgICApO1xuXG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgdmFyIGxlZnQgPSBhcmd1bWVudHNbMF0ubGVmdDtcbiAgICAgIHZhciB0b3AgPSBhcmd1bWVudHNbMF0udG9wO1xuXG4gICAgICAvLyBMRVQgVEhFIFNNT09USE5FU1MgQkVHSU4hXG4gICAgICBzbW9vdGhTY3JvbGwuY2FsbChcbiAgICAgICAgdGhpcyxcbiAgICAgICAgdGhpcyxcbiAgICAgICAgdHlwZW9mIGxlZnQgPT09ICd1bmRlZmluZWQnID8gdGhpcy5zY3JvbGxMZWZ0IDogfn5sZWZ0LFxuICAgICAgICB0eXBlb2YgdG9wID09PSAndW5kZWZpbmVkJyA/IHRoaXMuc2Nyb2xsVG9wIDogfn50b3BcbiAgICAgICk7XG4gICAgfTtcblxuICAgIC8vIEVsZW1lbnQucHJvdG90eXBlLnNjcm9sbEJ5XG4gICAgRWxlbWVudC5wcm90b3R5cGUuc2Nyb2xsQnkgPSBmdW5jdGlvbigpIHtcbiAgICAgIC8vIGF2b2lkIGFjdGlvbiB3aGVuIG5vIGFyZ3VtZW50cyBhcmUgcGFzc2VkXG4gICAgICBpZiAoYXJndW1lbnRzWzBdID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICAvLyBhdm9pZCBzbW9vdGggYmVoYXZpb3IgaWYgbm90IHJlcXVpcmVkXG4gICAgICBpZiAoc2hvdWxkQmFpbE91dChhcmd1bWVudHNbMF0pID09PSB0cnVlKSB7XG4gICAgICAgIG9yaWdpbmFsLmVsZW1lbnRTY3JvbGwuY2FsbChcbiAgICAgICAgICB0aGlzLFxuICAgICAgICAgIGFyZ3VtZW50c1swXS5sZWZ0ICE9PSB1bmRlZmluZWRcbiAgICAgICAgICAgID8gfn5hcmd1bWVudHNbMF0ubGVmdCArIHRoaXMuc2Nyb2xsTGVmdFxuICAgICAgICAgICAgOiB+fmFyZ3VtZW50c1swXSArIHRoaXMuc2Nyb2xsTGVmdCxcbiAgICAgICAgICBhcmd1bWVudHNbMF0udG9wICE9PSB1bmRlZmluZWRcbiAgICAgICAgICAgID8gfn5hcmd1bWVudHNbMF0udG9wICsgdGhpcy5zY3JvbGxUb3BcbiAgICAgICAgICAgIDogfn5hcmd1bWVudHNbMV0gKyB0aGlzLnNjcm9sbFRvcFxuICAgICAgICApO1xuXG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgdGhpcy5zY3JvbGwoe1xuICAgICAgICBsZWZ0OiB+fmFyZ3VtZW50c1swXS5sZWZ0ICsgdGhpcy5zY3JvbGxMZWZ0LFxuICAgICAgICB0b3A6IH5+YXJndW1lbnRzWzBdLnRvcCArIHRoaXMuc2Nyb2xsVG9wLFxuICAgICAgICBiZWhhdmlvcjogYXJndW1lbnRzWzBdLmJlaGF2aW9yXG4gICAgICB9KTtcbiAgICB9O1xuXG4gICAgLy8gRWxlbWVudC5wcm90b3R5cGUuc2Nyb2xsSW50b1ZpZXdcbiAgICBFbGVtZW50LnByb3RvdHlwZS5zY3JvbGxJbnRvVmlldyA9IGZ1bmN0aW9uKCkge1xuICAgICAgLy8gYXZvaWQgc21vb3RoIGJlaGF2aW9yIGlmIG5vdCByZXF1aXJlZFxuICAgICAgaWYgKHNob3VsZEJhaWxPdXQoYXJndW1lbnRzWzBdKSA9PT0gdHJ1ZSkge1xuICAgICAgICBvcmlnaW5hbC5zY3JvbGxJbnRvVmlldy5jYWxsKFxuICAgICAgICAgIHRoaXMsXG4gICAgICAgICAgYXJndW1lbnRzWzBdID09PSB1bmRlZmluZWQgPyB0cnVlIDogYXJndW1lbnRzWzBdXG4gICAgICAgICk7XG5cbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICAvLyBMRVQgVEhFIFNNT09USE5FU1MgQkVHSU4hXG4gICAgICB2YXIgc2Nyb2xsYWJsZVBhcmVudCA9IGZpbmRTY3JvbGxhYmxlUGFyZW50KHRoaXMpO1xuICAgICAgdmFyIHBhcmVudFJlY3RzID0gc2Nyb2xsYWJsZVBhcmVudC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcbiAgICAgIHZhciBjbGllbnRSZWN0cyA9IHRoaXMuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XG5cbiAgICAgIGlmIChzY3JvbGxhYmxlUGFyZW50ICE9PSBkLmJvZHkpIHtcbiAgICAgICAgLy8gcmV2ZWFsIGVsZW1lbnQgaW5zaWRlIHBhcmVudFxuICAgICAgICBzbW9vdGhTY3JvbGwuY2FsbChcbiAgICAgICAgICB0aGlzLFxuICAgICAgICAgIHNjcm9sbGFibGVQYXJlbnQsXG4gICAgICAgICAgc2Nyb2xsYWJsZVBhcmVudC5zY3JvbGxMZWZ0ICsgY2xpZW50UmVjdHMubGVmdCAtIHBhcmVudFJlY3RzLmxlZnQsXG4gICAgICAgICAgc2Nyb2xsYWJsZVBhcmVudC5zY3JvbGxUb3AgKyBjbGllbnRSZWN0cy50b3AgLSBwYXJlbnRSZWN0cy50b3BcbiAgICAgICAgKTtcblxuICAgICAgICAvLyByZXZlYWwgcGFyZW50IGluIHZpZXdwb3J0IHVubGVzcyBpcyBmaXhlZFxuICAgICAgICBpZiAody5nZXRDb21wdXRlZFN0eWxlKHNjcm9sbGFibGVQYXJlbnQpLnBvc2l0aW9uICE9PSAnZml4ZWQnKSB7XG4gICAgICAgICAgdy5zY3JvbGxCeSh7XG4gICAgICAgICAgICBsZWZ0OiBwYXJlbnRSZWN0cy5sZWZ0LFxuICAgICAgICAgICAgdG9wOiBwYXJlbnRSZWN0cy50b3AsXG4gICAgICAgICAgICBiZWhhdmlvcjogJ3Ntb290aCdcbiAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgLy8gcmV2ZWFsIGVsZW1lbnQgaW4gdmlld3BvcnRcbiAgICAgICAgdy5zY3JvbGxCeSh7XG4gICAgICAgICAgbGVmdDogY2xpZW50UmVjdHMubGVmdCxcbiAgICAgICAgICB0b3A6IGNsaWVudFJlY3RzLnRvcCxcbiAgICAgICAgICBiZWhhdmlvcjogJ3Ntb290aCdcbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgfTtcbiAgfVxuXG4gIGlmICh0eXBlb2YgZXhwb3J0cyA9PT0gJ29iamVjdCcgJiYgdHlwZW9mIG1vZHVsZSAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAvLyBjb21tb25qc1xuICAgIG1vZHVsZS5leHBvcnRzID0geyBwb2x5ZmlsbDogcG9seWZpbGwgfTtcbiAgfSBlbHNlIHtcbiAgICAvLyBnbG9iYWxcbiAgICBwb2x5ZmlsbCgpO1xuICB9XG5cbn0oKSk7XG4iXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Q0FBQTtDQUNBLENBQUMsWUFBWTtDQUViLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyx1QkFBdUIsRUFBQztDQUNyQztDQUNBLEVBQUUsU0FBUyxRQUFRLEdBQUc7Q0FDdEI7Q0FDQSxJQUFJLElBQUksQ0FBQyxHQUFHLE1BQU0sQ0FBQztDQUNuQixJQUFJLElBQUksQ0FBQyxHQUFHLFFBQVEsQ0FBQztBQUNyQjtDQUNBO0NBQ0EsSUFBSTtDQUNKLE1BQU0sZ0JBQWdCLElBQUksQ0FBQyxDQUFDLGVBQWUsQ0FBQyxLQUFLO0NBQ2pELE1BQU0sQ0FBQyxDQUFDLDZCQUE2QixLQUFLLElBQUk7Q0FDOUMsTUFBTTtDQUNOLE1BQU0sT0FBTztDQUNiLEtBQUs7QUFDTDtDQUNBO0NBQ0EsSUFBSSxJQUFJLE9BQU8sR0FBRyxDQUFDLENBQUMsV0FBVyxJQUFJLENBQUMsQ0FBQyxPQUFPLENBQUM7Q0FDN0MsSUFBSSxJQUFJLFdBQVcsR0FBRyxHQUFHLENBQUM7QUFDMUI7Q0FDQTtDQUNBLElBQUksSUFBSSxRQUFRLEdBQUc7Q0FDbkIsTUFBTSxNQUFNLEVBQUUsQ0FBQyxDQUFDLE1BQU0sSUFBSSxDQUFDLENBQUMsUUFBUTtDQUNwQyxNQUFNLFFBQVEsRUFBRSxDQUFDLENBQUMsUUFBUTtDQUMxQixNQUFNLGFBQWEsRUFBRSxPQUFPLENBQUMsU0FBUyxDQUFDLE1BQU0sSUFBSSxhQUFhO0NBQzlELE1BQU0sY0FBYyxF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
