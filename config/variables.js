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
    'text-sans': [
      '"Open Sans"',
      'sans-serif'
    ],
    'display-sans': [
      '"museo-sans-rounded"',
      'sans-serif'
    ]
  },
  'font-weights': {
    'medium': '500',
    'semibold': '600',
    'extrablack': '900'
  },
  'font-sizes': {
    'font-size-ratio': '.875',
    'font-size-xx-small': '11',
    'font-size-x-small': '13',
    'font-size-small': '16',
    'font-size-regular': '18',
    'font-size-large': '21',
    'font-size-x-large': '24',
    'font-size-xx-large': '30',
    'font-size-xxx-large-mobile': '40',
    'font-size-xxx-large': '66',
  },
  'colors': {
    'color-black': '#000',
    'color-white': '#fff',
    'color-gray-light': '#eee',
    'color-gray': '#999',
    'color-gray-mid': '#838a97',
    'color-gray-dark': '#6a6a6a',
    'color-dark-gray': '#51596b',
    'color-dark-gray-mid': '#343e4c',
    'color-dark-gray-dark': '#333',
    'color-blue-lightest': '#eef3f7',
    'color-blue-light': '#2793e0',
    'color-blue': '#0055b8',
    'color-blue-mid': '#184e9e',
    'color-blue-dark': '#00326d',
    'color-red': '#fb0000',
    'color-pink': '#d8006d',
    'color-pink-dark': '#7f1c4e',
    'color-green': '#35c621',
    'color-green-dark': '#1d5d11',
    'color-orange-light': '#ff9d00',
    'color-orange': '#ff6100',
    'color-purple': '#7735b2',
    'color-purple-dark': '#3c036f',
    'color-shadow': 'rgba(0, 0, 0, .2)',
  },
  'colors-default': {
    'color-primary': 'color-blue-light',
    'color-secondary': 'strong-blue',
    'color-background': 'white',
    'color-background-shade': 'color-gray-light',
    'color-text': 'color-dark-gray-dark',
    'color-text-invert': 'white',
    'color-text-weak': 'gray',
    'color-text-link': 'color-primary',
    'color-background-footer': 'color-primary',
    'color-error': 'strong-pink',
  },
  'colors-ages': {
    'color-baby': 'color-pink',
    'color-baby-secondary': 'color-pink-dark',
    'color-toddler': 'color-orange',
    'color-toddler-secondary': 'color-red',
    'color-pre-schooler': 'color-orange-light',
    'color-pre-schooler-secondary': 'color-orange',
    'color-grade-schooler': 'color-green',
    'color-grade-schooler-secondary': 'color-green-dark',
    'color-pre-teen': 'color-blue',
    'color-pre-teen-secondary': 'color-blue-dark',
    'color-teen': 'color-purple',
    'color-teen-secondary': 'color-purple-dark',
    'color-young-adult': 'color-dark-gray',
    'color-young-adult-secondary': 'color-dark-gray-mid',
  },
  'transitions': {
    'button-transition': 'all ease-in-out .15s',
    'link-transition': 'all ease-in-out .15s'
  },
  'z-index': {
    'z-index-offcanvas-side': '101',
    'z-index-offcanvas-overlay': '100',
    'z-index-offcanvas-main': '99',
    'z-index-alert': '4',
    'z-index-header': '3',
    'z-index-search-overlay': '2',
    'z-index-hero-title': '1',
  },
  'dimensions': {
    'column': '70px',
    'gutter': '40px',
    'grid-columns': '12',
    'max-width-med': '900px',
    'max-width': '80em',
    'outer-gutter': '15',
    'outer-gutter-small': '20',
    'outer-gutter-medium': '30',
    'outer-gutter-large': '40',
    'horizontal-gutter': '20px'
  },
  'screens': {
    'screen-mobile': '375', //screen-small
    'screen-tablet': '700', //screen-medium
    'screen-desktop': '1024', //screen-large
    'screen-desktop-large': '1200', //screen-xlarge
  },
  'padding': {
    'column': '70px',
    'gutter': '40px',
    'grid-columns': '12',
    'max-width-med': '900px',
    'max-width': '80em',
    'outer-gutter': '15',
    'outer-gutter-small': '20',
    'outer-gutter-medium': '30',
    'outer-gutter-large': '40',
    'horizontal-gutter': '20px'
  } ,
  'heights': {
    'height-banner': '50',
    'height-banner-large': '60',
    'height-banner-logo': '60',
  },
  'widths': {
    'width-banner-logo': '75px',
    'width-offcanvas-side': '300px',
    'width-offcanvas-side-large': '350px',
  },
  'stickers': {
    'sticker-size-mobile': '80',
    'sticker-size': '100',
  }
};

module.exports = variables;
