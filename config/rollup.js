/**
 * Dependencies
 */


import resolve from '@rollup/plugin-node-resolve'; // Locate modules using the Node resolution algorithm, for using third party modules in node_modules.
import commonjs from '@rollup/plugin-commonjs';    // Convert CommonJS modules to ES6, so they can be included in a Rollup bundle
import babel from 'rollup-plugin-babel';          // Transpile source code.
import buble from '@rollup/plugin-buble';          // Convert ES2015 with buble.
import replace from '@rollup/plugin-replace';      // Replace content while bundling.

/**
 * Config
 */

/**
 * General configuration for Rollup
 * @type {Object}
 */
let rollup = {
  sourcemap: 'inline',
  format: 'iife',
  strict: true
};

/**
 * Plugin configuration
 * @type {Object}
 */
const plugins = {
  babel: babel({
    exclude: 'node_modules/**'
  }),
  resolve: resolve({
    browser: true,
    customResolveOptions: {
      moduleDirectory: 'node_modules'
    }
  }),
  replace: replace({
    'process.env.NODE_ENV': "'production'"
  }),
  common: commonjs(),
  buble: buble({
    transforms: {
      forOf: false
    }
  })
};

/**
 * Distribution plugin settings. Order matters here.
 * @type {Array}
 */

/** These are plugins used for the global patterns script */
rollup.local = [
  plugins.alias,
  plugins.resolve,
  plugins.common,
  plugins.vue,
  plugins.buble,
  plugins.babel,
  plugins.replace
];

rollup.dist = [
  plugins.resolve,
  plugins.common,
  plugins.vue,
  plugins.buble,
  plugins.babel
];

/**
 * Our list of modules we are exporting
 * @type {Array}
 */
const modules = [
  {
    input: './src/js/main.js',
    output: {
      name: 'GUNYC',
      file: `./dist/scripts/growingup-nyc.js`,
      sourcemap: (process.env.NODE_ENV === 'production')
        ? false : rollup.sourcemap,
      format: rollup.format,
      strict: rollup.strict,
      globals: rollup.globals
    },
    plugins: rollup.local
  },
  {
    input: `${process.env.PWD}/node_modules/@nycopportunity/patterns-framework/src/utilities/forms/forms.js`,
    plugins: rollup.dist,
    output: [
      {
        name: 'Forms',
        file: `${process.env.PWD}/dist/utilities/forms/forms.iffe.js`,
        format: 'iife',
        strict: rollup.strict
      },
      {
        name: 'Forms',
        file: `${process.env.PWD}/dist/utilities/forms/forms.common.js`,
        format: 'cjs',
        strict: rollup.strict
      }
    ]
  },
  {
    input: `${process.env.PWD}/node_modules/@nycopportunity/patterns-framework/src/utilities/icons/icons.js`,
    // input: `./src/elements/icons/icons.js`,
    plugins: rollup.dist,
    output: [
      {
        name: 'Icons',
        file: `./dist/elements/icons/icons.iffe.js`,
        format: 'iife',
        strict: rollup.strict
      },
      {
        name: 'Icons',
        file: `./dist/elements/icons/icons.common.js`,
        format: 'cjs',
        strict: rollup.strict
      }
    ]
	},
	{
    input: `${process.env.PWD}/node_modules/smoothscroll-polyfill/dist/smoothscroll.min.js`,
    output: {
      name: 'Polyfills',
      file: `./dist/scripts/polyfills.js`,
      sourcemap: (process.env.NODE_ENV === 'production')
        ? false : rollup.sourcemap,
      format: rollup.format,
      strict: rollup.strict,
      globals: rollup.globals
    },
    plugins: rollup.local
  },
  {
    input: './src/objects/navigation/Navigation.js',
    plugins: rollup.dist,
    output: [
      {
        name: 'InputAutocomplete',
        file: `./dist/objects/navigation/Navigation.iffe.js`,
        format: 'iife',
        strict: rollup.strict
      },
      {
        name: 'InputAutocomplete',
        file: `./dist/objects/navigation/Navigation.common.js`,
        format: 'cjs',
        strict: rollup.strict
      }
    ]
  },
  {
    input: './src/objects/static-column/staticColumn.js',
    plugins: rollup.dist,
    output: [
      {
        name: 'StaticColumn',
        file: `./dist/objects/static-column/StaticColumn.iffe.js`,
        format: 'iife',
        strict: rollup.strict
      },
      {
        name: 'StaticColumn',
        file: `./dist/objects/static-column/StaticColumn.common.js`,
        format: 'cjs',
        strict: rollup.strict
      }
    ]
  },
  {
    input: './src/objects/navigation/Navigation.js',
    plugins: rollup.dist,
    output: [
      {
        name: 'Navigation',
        file: `./dist/objects/navigation/Navigation.iffe.js`,
        format: 'iife',
        strict: rollup.strict
      },
      {
        name: 'Navigation',
        file: `./dist/objects/navigation/Navigation.common.js`,
        format: 'cjs',
        strict: rollup.strict
      }
    ]
  },
];

export default modules;
