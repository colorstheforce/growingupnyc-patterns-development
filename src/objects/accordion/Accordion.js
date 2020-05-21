'use strict';

import $ from 'jquery';
import forEach from 'lodash/forEach';

class Accordion {
  /**
   * @constructor
   */
  constructor() {

    this._settings = {
      accordions: []
    };

    const $accordions = $('.js-accordion').not('.o-accordion');
    if ($accordions.length) {
      $accordions.each(function () {
        const multiSelectable = $(this).data('multiselectable') || false;
        Accordion.initialize($(this), multiSelectable);
        Accordion.reInitialize($(this));
      });
    }
  }
}

Accordion.convertHeaderToButton = function($headerElem) {
  if ($headerElem.get(0).nodeName.toLowerCase() === 'button') {
    return $headerElem;
  }
  const headerElem = $headerElem.get(0);
  const newHeaderElem = document.createElement('button');
  forEach(headerElem.attributes, function (attr) {
    newHeaderElem.setAttribute(attr.nodeName, attr.nodeValue);
  });
  newHeaderElem.setAttribute('type', 'button');
  const $newHeaderElem = $(newHeaderElem);
  $newHeaderElem.html($headerElem.html());
  $newHeaderElem.append('<svg class="o-accordion__caret icon" aria-hidden="true"><use xlink:href="#icon-caret-down"></use></svg>');
  return $newHeaderElem;
}

/**
 * Toggle visibility attributes for header
 * @param {object} $headerElem - The accordion header jQuery object
 * @param {boolean} makeVisible - Whether the header's content should be visible
 */
Accordion.toggleHeader = function($headerElem, makeVisible) {
  $headerElem.attr('aria-expanded', makeVisible);
}

/**
 * Add attributes, classes, and event binding to accordion header
 * @param {object} $headerElem - The accordion header jQuery object
 * @param {object} $relatedPanel - The panel the accordion header controls
 */
Accordion.initializeHeader = function($headerElem, $relatedPanel) {
  $headerElem.attr({
    'aria-selected': false,
    'aria-controls': $relatedPanel.get(0).id,
    'aria-expanded': false,
    // 'role': 'heading'
  }).addClass('o-accordion__header');

  $headerElem.on('click.accordion', function (event) {
    event.preventDefault();
    $headerElem.trigger('changeState');
  });

  $headerElem.on('mouseleave.accordion', function () {
    $headerElem.blur();
  });
}

/**
 * Toggle visibility attributes for panel
 * @param {object} $panelElem - The accordion panel jQuery object
 * @param {boolean} makeVisible - Whether the panel should be visible
 */
Accordion.togglePanel = function($panelElem, makeVisible) {
  $panelElem.attr('aria-hidden', !makeVisible);
  if (makeVisible) {
    $panelElem.css('height', $panelElem.data('height') + 'px');
    $panelElem.find('a, button, [tabindex], input[type=checkbox]').attr('tabindex', 0);
  } else {
    $panelElem.css('height', '');
    $panelElem.find('a, button, [tabindex], input[type=checkbox]').attr('tabindex', -1);
  }
}

/**
 * Add CSS classes to accordion panels
 * @param {object} $panelElem - The accordion panel jQuery object
 * @param {string} labelledby - ID of element (accordion header) that labels panel
 */
Accordion.initializePanel = function($panelElem, labelledby) {
  $panelElem.addClass('o-accordion__content');
  Accordion.calculatePanelHeight($panelElem);
  $panelElem.attr({
    'aria-hidden': true,
    'role': 'region',
    'aria-labelledby': labelledby
  });
}

/**
 * Set accordion panel height
 * @param {object} $panelElem - The accordion panel jQuery object
 */
Accordion.calculatePanelHeight = function($panelElem) {
  $panelElem.data('height', $panelElem.height());
}

/**
 * Toggle state for accordion children
 * @param {object} $item - The accordion item jQuery object
 * @param {boolean} makeVisible - Whether to make the accordion content visible
 */
Accordion.toggleAccordionItem = function($item, makeVisible) {
  if (makeVisible) {
    $item.addClass('is-expanded');
    $item.removeClass('is-collapsed');
  } else {
    $item.removeClass('is-expanded');
    $item.addClass('is-collapsed');
  }
}

/**
 * Add CSS classes to accordion children
 * @param {object} $item - The accordion child jQuery object
 */
Accordion.initializeAccordionItem = function($item) {
  const $accordionContent = $item.find('.js-accordion__content');
  const $accordionInitialHeader = $item.find('.js-accordion__header');
  // Clear any previously bound events
  $item.off('toggle.accordion');
  // Clear any existing state classes
  $item.removeClass('is-expanded is-collapsed');
  if ($accordionContent.length && $accordionInitialHeader.length) {
    $item.addClass('o-accordion__item');
    let $accordionHeader;
    if ($accordionInitialHeader.get(0).tagName.toLowerCase() === 'button') {
      $accordionHeader = $accordionInitialHeader;
      Accordion.calculatePanelHeight($accordionContent);
    } else {
      $accordionHeader = Accordion.convertHeaderToButton($accordionInitialHeader);
      $accordionInitialHeader.replaceWith($accordionHeader);
      Accordion.initializeHeader($accordionHeader, $accordionContent);
      Accordion.initializePanel($accordionContent, $accordionHeader.get(0).id);
    }

    /**
     * Custom event handler to toggle the accordion item open/closed
     * @function
     * @param {object} event - The event object
     * @param {boolean} makeVisible - Whether to make the accordion content visible
     */
    $item.on('toggle.accordion', function (event, makeVisible) {
      event.preventDefault();
      Accordion.toggleAccordionItem($item, makeVisible);
      Accordion.toggleHeader($accordionHeader, makeVisible);
      Accordion.togglePanel($accordionContent, makeVisible);
    });

    // Collapse panels initially
    $item.trigger('toggle.accordion', [false]);
  }
}

/**
 * Add the ARIA attributes and CSS classes to the root accordion elements.
 * @param {object} $accordionElem - The jQuery object containing the root element of the accordion
 * @param {boolean} multiSelectable - Whether multiple accordion drawers can be open at the same time
 */
Accordion.initialize = function($accordionElem, multiSelectable) {
  $accordionElem.attr({
    'role': 'presentation',
    'aria-multiselectable': multiSelectable
  }).addClass('o-accordion');
  $accordionElem.children().each(function () {
    Accordion.initializeAccordionItem($(this));
  });

  /**
   * Handle changeState events on accordion headers.
   * Close the open accordion item and open the new one.
   * @function
   * @param {object} event - The event object
   */
  $accordionElem.on('changeState.accordion', '.js-accordion__header', $.proxy(function (event) {
    const $newItem = $(event.target).closest('.o-accordion__item');
    if (multiSelectable) {
      $newItem.trigger('toggle.accordion', [!$newItem.hasClass('is-expanded')]);
    } else {
      const $openItem = $accordionElem.find('.is-expanded');
      $openItem.trigger('toggle.accordion', [false]);
      if ($openItem.get(0) !== $newItem.get(0)) {
        $newItem.trigger('toggle.accordion', [true]);
      }
    }
  }, this));

  /**
   * Handle events on accordion content.
   * Initialize accordion items after loaded.
   * @function
   * @param {object} event - The event object
   */
  $accordionElem.on('DOMNodeInserted', function (event) {
    reInitialize($(this));
  });
}

/**
 * Reinitialize an accordion after its contents were dynamically updated
 * @param {object} $accordionElem - The jQuery object containing the root element of the accordion
 */
Accordion.reInitialize = function($accordionElem) {
  if ($accordionElem.hasClass('o-accordion')) {
    $accordionElem.children().each(function () {
      Accordion.initializeAccordionItem($(this));
    });
  } else {
    const multiSelectable = $accordionElem.data('multiselectable') || false;
    Accordion.initialize($accordionElem, multiSelectable);
  }
}


export default Accordion;