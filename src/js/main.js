'use strict';
// Utilities

// Elements

// Components


// Objects
import Navigation from '../objects/navigation/Navigation';
import Accordion from '../objects/accordion/Accordion';
import Overlay from '../objects/overlay/Overlay';
import Icons from '../../node_modules/@nycopportunity/patterns-framework/src/utilities/icons/icons';
import Toggle from '../../node_modules/@nycopportunity/patterns-framework/src/utilities/toggle/toggle';
// import Toggle from '../utilities/toggle/Toggle';
// import Sticky from '../utilities/sticky/Sticky';
import AlertBanner from '../objects/alert-banner/AlertBanner';
import Animations from '../utilities/animations/Animations';
import Form from '../components/form/Form';
import StaticColumn from '../objects/static-column/staticColumn'
import Scroll from '../components/side-navigation/Scroll'
import Sticky from '../utilities/sticky/Sticky'
import Offcanvas from '../utilities/offcanvas/Offcanvas'
// import OffcanvasToggle from '../utilities/offcanvas/OffcanvasToggle'
import FormEffect from '../utilities/form-effects/FormEffects'
import Reveal from '../utilities/reveal/Reveal'
// import AnotherJs from '../utilities/offcanvas/AnotherJs'
// import AccordionToggle from '../objects/accordion/AccordionToggle'
import Newsletter from '../objects/newsletter/Newsletter'
import Share from '../components/share/Share'
import 'scripts/polyfills'
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

	newsletter(settings = false) {
    return (settings) ? new Newsletter(settings) : new Newsletter();
  }

	formEffect(settings = false) {
    return (settings) ? new FormEffect(settings) : new FormEffect();
  }

  overlay() {
    return new Overlay();
  }

  accordion() {
    return new Accordion();
  }

  icons(path) {
    return new Icons(path);
  }

  accordion() {
    return new Accordion();
  }

	share() {
    return new Share();
  }

	reveal(elNumber) {
    return new Reveal(elNumber);
  }

	// offCanvas() {
  //   return new Offcanvas();
  // }

	// anotherJs() {
  //   return new AnotherJs();
  // }

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

	toggle() {
    return new Toggle();
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
