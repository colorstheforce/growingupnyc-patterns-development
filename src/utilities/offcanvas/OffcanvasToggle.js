'use strict';

// import forEach from 'lodash/forEach';
// import Toggle from '@nycopportunity/patterns-framework/src/utilities/toggle/toggle;
import Toggle from '@nycopportunity/patterns-framework/src/utilities/toggle/toggle';

/**
 * The Accordion module
 * @class
 */
class OffcanvasToggle {
  /**
   * @constructor
   * @return {object} The class
   */
  constructor() {
    this._toggle = new Toggle();

		// console.log(this._toggle)
    return this;
	}

}

/**
 * The dom selector for the module
 * @type {String}
 */
// OffcanvasToggle.selector = 'kjkjkjk';

export default OffcanvasToggle;


