/**
 * Config
 */

const package = require('../package.json');
const version = process.env.V || package.version;

const variables = {
  'version': `"${version}"`,
  'cdn': `"https://cdn.jsdelivr.net/gh/CityOfNewYork/growingupnyc-patterns@v${version}/dist/"`,
  'fonts': {
    'system': [
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      'Oxygen-Sans',
      'Ubuntu',
      'Cantarell',
      '"Helvetica Neue"',
      'sans-serif'
    ],
    'default-sans': [
      '"open-sans"',
      '"museo-sans-rounded"',
      'sans-serif'
    ]
  },
  'colors': {
    'black': '#000',
    'white': '#fff',

    'gray': '#999',
    'gray-1': '#51596b',
    'gray-2': '#838a97',
    'light-gray-1': 'rgba(45, 51, 61, .5)',
    'light-gray-2': '#b5b9c1',
    'very-light-gray-1': '#e0e0e0',
    'very-light-gray': '#eee',
    'dark-gray': '#6a6a6a',
    'dark-gray-1': '#343e4c',
    'very-dark-gray': '#333',
    'very-dark-gray-transparent': 'rgba(51, 51, 51, .5)',
    'color-shadow': 'rgba(0, 0, 0, .2)',
    
    'bright-blue': '#2793e0',
    'strong-blue': '#0055b8',
    'very-dark-blue': '#00326d',
    'blue': '#184e9e',
    'light-blue': '#eef3f7',
    'blue-2': '#006ae8',
    
    'bright-red': '#fb0000',
    'dark-pink': '#7f1c4e',
    'strong-pink': '#d8006d',
    'dark-green': '#1d5d11',
    'strong-lime-green': '#35c621',
    'pure-orange': '#ff9d00',
    'vivid-orange': '#ff6100',
    'purple': '#7735b2',
    'dark-purple': '#3c036f',

    'color-primary': 'bright-blue',
    'color-secondary': 'strong-blue',
    'color-background': 'white',
    'color-background-shade': 'very-light-gray',
    'color-text': 'very-dark-gray',
    'color-text-invert': 'white',
    'color-text-weak': 'gray',
    'color-text-link': 'color-primary',
    'color-background-footer': 'color-primary',
    'color-error': 'strong-pink',
    // Age Group Specific
    'color-baby': 'strong-pink',
    'color-baby-secondary': 'dark-pink',
    'color-toddler': 'vivid-orange',
    'color-toddler-secondary': 'bright-red',
    'color-pre-schooler': 'pure-orange',
    'color-pre-schooler-secondary': 'vivid-orange',
    'color-grade-schooler': 'strong-lime-green',
    'color-grade-schooler-secondary': 'dark-green',
    'color-pre-teen': 'strong-blue',
    'color-pre-teen-secondary': 'very-dark-blue',
    'color-teen': 'purple',
    'color-teen-secondary': 'dark-purple',
    'color-young-adult': 'gray-1',
    'color-young-adult-secondary': 'dark-gray-1',
  },
};

module.exports = variables;
