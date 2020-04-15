'use strict';

import forEach from 'lodash/forEach';

class Offcanvas {
  /**
   * @param  {object} settings This could be some configuration options.
   *                           for the pattern module.
   * @param  {object} data     This could be a set of data that is needed
   *                           for the pattern module to render.
   * @constructor
   */
  constructor(settings) {
		const body = document.querySelector('body');
		const nav = document.querySelector('.js-offcanvas__side')
		const mainOff = document.querySelector('.js-offcanvas__main')
    console.log(mainOff);
    console.log(nav);


    // this._settings = {
    //   selector: (settings.selector) ? settings.selector : Offcanvas.selector,
    //   namespace: (settings.namespace) ? settings.namespace : Offcanvas.namespace,
    //   inactiveClass: (settings.inactiveClass) ? settings.inactiveClass : Offcanvas.inactiveClass,
    //   activeClass: (settings.activeClass) ? settings.activeClass : Offcanvas.activeClass,
    //   before: (settings.before) ? settings.before : false,
    //   after: (settings.after) ? settings.after : false
    // };

  let openClass = "";
    if (Offcanvas.side === 'left')
       openClass = 'is-open-left';
    else if (Offcanvas.side === 'right') {
       openClass = 'is-open-right';
    }
    console.log(openClass);

    const offCanvas = document.querySelectorAll('.js-offcanvas');
    if (offCanvas) {
      forEach(offCanvas, function (offCanvasElem) {
        const offCanvasSide = offCanvasElem.querySelector('.js-offcanvas__side');

        /**
        * Add event listener for 'changeOpenState'.
        * The value of event.detail indicates whether the open state is true
        * (i.e. the offcanvas content is visible).
        * @function
        * @param {object} event - The event object
        */
        offCanvasElem.addEventListener('changeOpenState', function (event) {
          if (event.detail) {
            if (!(/^(?:a|select|input|button|textarea)$/i.test(offCanvasSide.tagName))) {
              offCanvasSide.tabIndex = -1;
            }
            offCanvasSide.focus();
          }
        }, false);
      });
    }

    this._toggle(openClass, nav, mainOff);
  }

  _toggle(openClass, nav, mainOff) {


    const linkActiveClass = 'is-active';
    const toggleElems = document.querySelectorAll('[data-js]');

    if (!toggleElems) return;

    /**
    * For each toggle element, get its target from the data-toggle attribute.
    * Bind an event handler to toggle the openClass on/off on the target element
    * when the toggle element is clicked.
    */
    forEach(toggleElems, function (toggleElem) {
      const targetElemSelector = Offcanvas.dataset(toggleElem, 'js');

      if (!targetElemSelector) return;

      const targetElem = document.getElementById(targetElemSelector);

      if (!targetElem) return;

      toggleElem.addEventListener('click', function (event) {
        let toggleEvent;
        let toggleClass = (toggleElem.dataset.toggleClass) ?
          toggleElem.dataset.toggleClass : openClass;

        event.preventDefault();

        // Toggle the element's active class
				toggleElem.classList.toggle(linkActiveClass);
				if (openClass === 'is-open-left') {
					nav.classList.toggle("o-offcanvas__side-left")
					mainOff.classList.toggle("o-offcanvas__main-left")

				} else {
					nav.classList.toggle("o-offcanvas__side-right")
					mainOff.classList.toggle("o-offcanvas__main-right")
				}

        // Toggle custom class if it is set
        if (toggleClass !== openClass)
          targetElem.classList.toggle(toggleClass);
        // Toggle the default open class
        targetElem.classList.toggle(openClass);

        // Toggle the appropriate aria hidden attribute
        targetElem.setAttribute('aria-hidden',
          !(targetElem.classList.contains(toggleClass))
        );

        // Fire the custom open state event to trigger open functions
        if (typeof window.CustomEvent === 'function') {
          toggleEvent = new CustomEvent('changeOpenState', {
            detail: targetElem.classList.contains(openClass)
          });
        } else {
          toggleEvent = document.createEvent('CustomEvent');
          toggleEvent.initCustomEvent('changeOpenState', true, true, {
            detail: targetElem.classList.contains(openClass)
          });
        }

        targetElem.dispatchEvent(toggleEvent);
      });
    });
  };
}
Offcanvas.side = "right";

Offcanvas.dataset = function (elem, attr) {
  if (typeof elem.dataset === 'undefined') {
    return elem.getAttribute('data-' + attr);
  }
  return elem.dataset[attr];
}


export default Offcanvas;