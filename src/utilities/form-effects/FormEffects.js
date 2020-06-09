'use strict';

import forEach from 'lodash/forEach';
import dispatchEvent from './DispatchEvent.js';

class FormEffects {
  /**
   * @param  {object} settings This could be some configuration options.
   *                           for the pattern module.
   * @param  {object} data     This could be a set of data that is needed
   *                           for the pattern module to render.
   * @constructor
   */
  constructor(settings, data) {
    const inputs = document.querySelectorAll('.signup-form__field');
    const searchInput = document.querySelectorAll('.search-clear');
    const checkboxes = document.querySelectorAll('.checkbox__field');


    if (inputs.length) {
      forEach(inputs, function(inputElem) {
        inputElem.value = "";
        inputElem.addEventListener('focus', FormEffects.handleFocus);
        inputElem.addEventListener('blur', FormEffects.handleBlur);
        dispatchEvent(inputElem, 'blur');
      });
    }

    if (searchInput.length) {
      forEach(searchInput, function(inputElem) {
        inputElem.value = "";
        inputElem.addEventListener('click', FormEffects.handleClear);
      });
    }

    if (checkboxes.length) {
      forEach(checkboxes, function(checkbox) {
        checkbox.checked = false;
      })
    }

    debugger
    // this.data = data;
    // this.settings = settings;
  }
}

FormEffects.handleFocus = function(event) {
    const wrapperElem = event.target.parentNode;
    wrapperElem.classList.add('is-filled');
}

FormEffects.handleBlur = function(event) {
  if (event.target.value.trim() === '') {
    const wrapperElem = event.target.parentNode;
    wrapperElem.classList.remove('is-filled');
  }
}

FormEffects.handleClear = function(event) {
  event.preventDefault()
  const searchFields = document.querySelectorAll('input[type=search]');
  if (searchFields.length) {
    forEach(searchFields, function(search) {
      search.value = '';
    });
  }
}

export default FormEffects;