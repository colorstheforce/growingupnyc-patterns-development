/**
 * Dependencies
 */

// ...

/**
 * Config
 */
const sass = {
  sourceMapEmbed: true,
  precision: 2,
  includePaths: [
    './node_modules/nyco-patterns/src/',
    './src',
    './node_modules',
    './node_modules/bourbon/core',
    './node_modules/bourbon-neat/core',
  ]
};

const modules = [
  {
    file: './src/scss/site-default.scss',
    outDir: './dist/styles/',
    outFile: 'site-default.css',
    sourceMapEmbed: sass.sourceMapEmbed,
    precision: sass.precision,
    includePaths: sass.includePaths,
    devModule: true
  },
  {
    file: './src/utilities/tailwind/_tailwind.scss',
    outDir: './dist/styles/',
    outFile: 'tailwind.css',
    precision: sass.precision,
    includePaths: sass.includePaths,
    // devModule: true
  },
  {
    file: './src/utilities/tailwind/_tailwind.scss',
    outDir: './dist/styles/',
    outFile: '_tailwind.scss',
    precision: sass.precision,
    includePaths: sass.includePaths,
    // devModule: true
  },
];

module.exports = modules;
