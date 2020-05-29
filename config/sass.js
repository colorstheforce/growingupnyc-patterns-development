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
    './node_modules/@fortawesome/fontawesome-free/scss',
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
    file: './src/scss/site-ar.scss',
    outDir: './dist/styles/',
    outFile: 'site-ar.css',
    sourceMapEmbed: sass.sourceMapEmbed,
    precision: sass.precision,
    includePaths: sass.includePaths,
    devModule: true
  },
  {
    file: './src/scss/site-es.scss',
    outDir: './dist/styles/',
    outFile: 'site-es.css',
    sourceMapEmbed: sass.sourceMapEmbed,
    precision: sass.precision,
    includePaths: sass.includePaths,
    devModule: true
  },
  {
    file: './src/scss/site-ko.scss',
    outDir: './dist/styles/',
    outFile: 'site-ko.css',
    sourceMapEmbed: sass.sourceMapEmbed,
    precision: sass.precision,
    includePaths: sass.includePaths,
    devModule: true
  },
  {
    file: './src/scss/site-ur.scss',
    outDir: './dist/styles/',
    outFile: 'site-ur.css',
    sourceMapEmbed: sass.sourceMapEmbed,
    precision: sass.precision,
    includePaths: sass.includePaths,
    devModule: true
  },
  {
    file: './src/scss/site-zh-hant.scss',
    outDir: './dist/styles/',
    outFile: 'site-zh-hant.css',
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
