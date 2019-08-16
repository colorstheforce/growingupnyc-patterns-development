'use strict';

class Color {
  /**
   * @param  {object} settings This could be some configuration options.
   *                           for the pattern module.
   * @param  {object} data     This could be a set of data that is needed
   *                           for the pattern module to render.
   * @constructor
   */
  constructor(settings, data) {
    this.data = data;
    this.settings = settings;
  }
}

export default Color;