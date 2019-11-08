'use strict';
/**
* Referred from Stackoverflow
* @see https://stackoverflow.com/questions/2771789/changing-text-periodically-in-a-span-from-an-array-with-jquery/2772278#2772278
*/

import forEach from 'lodash/forEach';

class Animations {
  /**
   * @param  {object} settings This could be some configuration options.
   *                           for the pattern module.
   * @param  {object} data     This could be a set of data that is needed
   *                           for the pattern module to render.
   * @constructor
   */
  constructor() {
    this._settings = {
      selector: Animations.selector,
      controller: Animations.controller,
    };

    const rotating = document.querySelectorAll(this._settings.selector);
    var terms = [];

    forEach(rotating, function (term) {
      if (term.innerText.trim() !== '') {
        terms.push(term.innerText);
      }
    })

    this.rotateTerm(terms)
  }

  rotateTerm(terms) {
    const controller = document.querySelector(this._settings.controller)
    
    controller.innerText = terms[0]
    var i = 0
    setInterval(function () {
      if (i == terms.length) {
        i = 0;
      }
      controller.innerText = terms[i];
      i++;
    }, 2000)
  }
}

Animations.selector = '[data-js*="rotate-text"]';

Animations.controller = '[data-js*="rotate-controller"]';

export default Animations;