'use strict';

// Utilities

// Elements

// Components


// Objects
import Navigation from '../objects/navigation/Navigation';
import Icons from '../../node_modules/@nycopportunity/patterns-framework/src/utilities/icons/icons';
/** import components here as they are written. */

/**
 * The Main module
 * @class
 */
class main {
  navigation(settings = false) {
    return (settings) ? new Navigation(settings) : new Navigation();
  }

  icons(path) {
    return new Icons(path);
  }
}

export default main;
