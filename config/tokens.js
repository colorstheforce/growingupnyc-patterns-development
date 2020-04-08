/**
 * Config
 */

const package = require('../package.json');
const version = process.env.V || package.version;

const tokens = {
  /**
   * Possiple opts (and their defaults) to pass to json-to-scss
   * @param  {Source}  url  https://github.com/rlapoele/json-to-scss
   */
  opts: {
    output: '"./src/config/_tokens.scss"',
    // prefix: '$tokens:',
    // suffix: ';',
    // format: '.scss',
    // indentationText: '  ',
    // indentationSize: 1,
    // emptyString: '""',
    // noUnderscore: true,
    // mergeSourceFiles: false,
    // mergeSassObjects: false,
    // keys: 'auto',
    // values: 'auto'
    // stringKeys: 'family,font-family,fontfamily,font-stack,fontstack,font-face,fontface'
  },
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
    ],
    'icons': [
      '"FontAwesome"',
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
    'font-size-xx-small': '11px',
    'font-size-x-small': '13px',
    'font-size-small': '16px',
    'font-size-regular': '18px',
    'font-size-large': '21px',
    'font-size-x-large': '24px',
    'font-size-xx-large': '30px',
    'font-size-xxx-large-mobile': '40px',
    'font-size-xxx-large': '66px',
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
    'color-green': '#21ad0e',
    'color-green-dark': '#1d5d11',
    'color-green-light': '#7fe62d',
    'color-light-green': '#02A586',
    'color-light-green-dark': '#015948',
    'color-light-green-light': '#42D1B5',
    'color-orange-light': '#ffb900',
    'color-orange': '#ff6100',
    'color-orange-dark': '#bc3b09',
    'color-purple': '#7735b2',
    'color-purple-dark': '#3c036f',
    'color-shadow': 'rgba(0, 0, 0, .2)',
  },
  'colors-default': {
    'color-primary': 'color-blue-light',
    'color-secondary': 'color-blue',
    'color-background': 'color-white',
    'color-background-shade': 'color-gray-light',
    'color-text': 'color-dark-gray-dark',
    'color-text-invert': 'color-white',
    'color-text-weak': 'color-gray',
    'color-text-link': 'color-blue-light',
    'color-background-footer': 'color-blue-light',
    'color-error': 'color-pink',
  },
  'colors-baby': {
    'primary': 'color-pink',
    'secondary': 'color-pink-dark',
  },
  'colors-toddler': {
    'primary': 'color-orange',
    'secondary': 'color-orange-dark',
    'tertiary': 'color-orange-light',
  },
  'colors-pre-schooler': {
    'primary': 'color-green',
    'secondary': 'color-green-dark',
    'tertiary': 'color-green-light',
  },
  'colors-grade-schooler': {
    'primary': 'color-light-green',
    'secondary': 'color-light-green-dark',
    'tertiary': 'color-light-green-light',
  },
  'colors-pre-teen': {
    'primary': 'color-blue',
    'secondary': 'color-blue-dark',
  },
  'colors-teen': {
    'primary': 'color-purple',
    'secondary': 'color-purple-dark',
  },
  'colors-young-adult': {
    'primary': 'color-dark-gray',
    'secondary': 'color-dark-gray-mid',
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
  'animate': {
    'ease-in-quint': 'cubic-bezier(0.755, 0.05, 0.855, 0.06)',
    'ease-out-quint': 'cubic-bezier(0.23, 1, 0.32, 1)',
    'animate-scss-speed': '0.75s',
    'animate-timing-function': 'cubic-bezier(0.23, 1, 0.32, 1)'
  },
  'screens': {
    'small': '375px', //screen-small
    'medium': '700px', //screen-medium
    'large': '1024px', //screen-large
    'xlarge': '1200px'
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
  },
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
  },
  'animations': {
    'speed': '.75s',
    'timing': 'cubic-bezier(.23, 1, .32, 1)'
  },
  'icons': [
    'icon-afterschool-guides',
    'icon-arrow-right',
    'icon-baby',
    'icon-book',
    'icon-caret-down',
    'icon-caret-left',
    'icon-caret-right',
    'icon-cash-expenses',
    'icon-check',
    'icon-check-outlined',
    'icon-child-care',
    'icon-city-id-card',
    'icon-cleaning-up',
    'icon-clock-o',
    'icon-close',
    'icon-education',
    'icon-enrichment',
    'icon-envelope-o',
    'icon-family-services',
    'icon-food',
    'icon-grade-schooler',
    'icon-health-care',
    'icon-housing',
    'icon-lightbulb',
    'icon-map-marker',
    'icon-nyc-logo',
    'icon-people-with-disabilities',
    'icon-pre-schooler',
    'icon-pre-teen',
    'icon-search',
    'icon-summer-guides',
    'icon-teen',
    'icon-toddler',
    'icon-topic',
    'icon-work',
    'icon-young-adult',
    'icon-anytime-anywhere',
    'icon-at-an-appt',
    'icon-at-the-park',
    'icon-at-the-store',
    'icon-bathtime',
    'icon-bedtime',
    'icon-caret-line-down',
    'icon-caret-line-left',
    'icon-caret-line-right',
    'icon-caret-line-up',
    'icon-diaper-change',
    'icon-duck',
    'icon-family',
    'icon-getting-dressed',
    'icon-laundry',
    'icon-mealtime',
    'icon-on-the-go',
    'icon-playtime',
    'icon-growingupnyc-logo-white',
    'icon-growingupnyc-logo-black'
  ],
  version: `"${version}"`,
  cdn: `"https://cdn.jsdelivr.net/gh/CityOfNewYork/growingupnyc-patterns-development@master/dist/"`
};

module.exports = tokens;
