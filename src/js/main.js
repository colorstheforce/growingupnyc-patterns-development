'use strict';
// Utilities

// Elements

// Components


// Objects
import Navigation from '../objects/navigation/Navigation';
import Accordion from '../objects/accordion/Accordion';
// import Overlay from '../objects/overlay/Overlay';
import Icons from '../../node_modules/@nycopportunity/patterns-framework/src/utilities/icons/icons';
// import Toggle from '../../node_modules/@nycopportunity/patterns-framework/src/utilities/toggle/toggle';
import Toggle from '../utilities/toggle/Toggle';
/** import components here as they are written. */

/**
 * The Main module
 * @class
 */
class main {
  navigation(settings = false) {
    return (settings) ? new Navigation(settings) : new Navigation();
  }

  // overlay() {
  //   return new Overlay();
  // }

  toggle() {
    return new Toggle();
  }

  icons(path) {
    return new Icons(path);
  }

  accordion() {
    return new Accordion();
  }
}

export default main;
