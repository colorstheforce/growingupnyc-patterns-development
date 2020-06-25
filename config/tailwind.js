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
			'mobile-only': {'max': variables.screens['small']}, //apply only to mobile
			'mobile': {'min': variables.screens['small']}, //screen-small
			'tablet': {'min': variables.screens['medium']}, //screen-medium
			'desktop': {'min': variables.screens['large']}, //screen-large
			'desktop-lg': {'min': variables.screens['xlarge']} //screen-xtra large
		},
		extend: {
      width: {
        '1/7': '14.2857143%',
        '2/7': '28.5714286%',
        '3/7': '42.8571429%',
        '4/7': '57.1428571%',
        '5/7': '71.4285714%',
        '6/7': '85.7142857%',
        'sidebar': '31.25%',
        'article': '68.75%',
      }
    }
  }
};
