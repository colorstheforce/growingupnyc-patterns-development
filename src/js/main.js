'use strict';
// Utilities

// Elements

// Components


// Objects
import Navigation from '../objects/navigation/Navigation';
import Accordion from '../objects/accordion/Accordion';
import Overlay from '../objects/overlay/Overlay';
import Icons from '../../node_modules/@nycopportunity/patterns-framework/src/utilities/icons/icons';
// import Toggle from '../utilities/toggle/Toggle';
// import Sticky from '../utilities/sticky/Sticky';
import AlertBanner from '../objects/alert-banner/AlertBanner';
import Animations from '../utilities/animations/Animations';
import Form from '../components/form/Form';
import StaticColumn from '../objects/static-column/staticColumn'
import Scroll from '../components/side-navigation/Scroll'
import Sticky from '../utilities/sticky/Sticky'
import Offcanvas from '../utilities/offcanvas/Offcanvas'
import OffcanvasToggle from '../utilities/offcanvas/OffcanvasToggle'
import AnotherJs from '../utilities/offcanvas/AnotherJs'
import AccordionToggle from '../objects/accordion/AccordionToggle'
// import ShareForm from '../components/tip/ShareForm'

/** import components here as they are written. */

/**
 * The Main module
 * @class
 */
class main {
  navigation(settings = false) {
    return (settings) ? new Navigation(settings) : new Navigation();
  }
	
	offCanvas(settings = false) {
    return (settings) ? new Offcanvas(settings) : new Offcanvas();
  }

  overlay() {
    return new Overlay();
  }

  accordionToggle() {
    return new AccordionToggle();
  }

  icons(path) {
    return new Icons(path);
  }

  accordion() {
    return new Accordion();
  }

	// offCanvas() {
  //   return new Offcanvas();
  // }

	anotherJs() {
    return new AnotherJs();
  }

  alertBanner(expirationDays) {
    return new AlertBanner(expirationDays);
  }

	staticColumn() {
    return new StaticColumn();
  }

	sticky() {
    return new Sticky();
  }

	scroll() {
    return new Scroll();
  }

	// shareFrom() {
  //   return new ShareForm();
  // }

  animations() {
    return new Animations();
  }

  form() {
    return new Form();
  }

}

export default main;
