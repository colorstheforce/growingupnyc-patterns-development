/**
 * Dependencies
 */

// const defaultConfig = require('tailwindcss/defaultConfig');
const variables = require('./tokens.js');

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
		fontFamily: variables.fonts,
		screens: {
			'only-small': {'max': variables.screens.small}, //apply only to mobile
			'small': {'min': variables.screens.small}, //screen-small
			'medium': {'min': variables.screens.medium}, //screen-medium
			'large': {'min': variables.screens.large}, //screen-large
			'xlarge': {'min': variables.screens.xlarge} //screen-xtra large
		},
  }
};
