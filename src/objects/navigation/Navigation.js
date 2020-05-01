'use strict';

import Offcanvas from "../../utilities/offcanvas/Offcanvas";

class Navigation {
  /**
   * @param  {object} settings This could be some configuration options.
   *                           for the pattern module.
   * @param  {object} data     This could be a set of data that is needed
   *                           for the pattern module to render.
   * @constructor
   */
  constructor(settings) {
    this._offcanvas = new Offcanvas({
      selector: (settings.selector) ? settings.selector : Navigation.selector,
      sideSelector: (settings.sideSelector) ? settings.sideSelector : 'right',
      namespace: (settings.namespace) ? settings.namespace : Navigation.namespace,
      inactiveClass: (settings.inactiveClass) ? settings.inactiveClass : Navigation.inactiveClass,
    });
    return this;
  }
}

/**
 * The dom selector for the module
 * @type {String}
 */
// Navigation.selector = '.js-offcanvas';
Navigation.selector = '[data-js*="offcanvas"]';

/**
 * The namespace for the components JS options
 * @type {String}
 */
Navigation.namespace = 'offcanvas-navigation';

/**
 * The incactive class name
 * @type {String}
 */
Navigation.inactiveClass = 'inactive';

export default Navigation;