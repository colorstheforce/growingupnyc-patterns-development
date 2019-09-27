/**
 * Dependencies
 */

// const defaultConfig = require('tailwindcss/defaultConfig');
const variables = require('./variables.js');

/**
 * Config
 */

module.exports = {
  important: true,
  theme: {
    colors: variables.colors,
    textColor: variables.colors,
    backgroundColor: variables.colors,
    borderColor: variables.colors,
    fonts: variables.fonts
  }
};
