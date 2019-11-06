'use strict';

import forEach from 'lodash/forEach';

class Overlay {
  /**
   * @param  {object} settings This could be some configuration options.
   *                           for the pattern module.
   * @param  {object} data     This could be a set of data that is needed
   *                           for the pattern module to render.
   * @constructor
   */
  constructor() {
    // this.data = data;
    // this.settings = settings;
    console.log("HELLO")

    const overlay = document.querySelectorAll('.js-overlay');
    console.log(overlay)
    if (overlay) {
      forEach(overlay, function (overlayElem) {
        /**
        * Add event listener for 'changeOpenState'.
        * The value of event.detail indicates whether the open state is true
        * (i.e. the overlay is visible).
        * @function
        * @param {object} event - The event object
        */
        overlayElem.addEventListener('changeOpenState', function (event) {
          if (event.detail) {
            if (!(/^(?:a|select|input|button|textarea)$/i.test(overlay.tagName))) {
              overlay.tabIndex = -1;
            }

            if (document.querySelectorAll('.js-overlay input')) {
              document.querySelectorAll('.js-overlay input')[0].focus();
            } else {
              overlay.focus();
            }
          }
        }, false);
      });
    }
  }
}

export default Overlay;


