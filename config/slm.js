/**
 * Config
 */

const package = require(`${process.env.PWD}/package.json`);
const version = process.env.V || package.version;

/**
 * Config
 */

const site = {
  versions: {
    package: version
  },
  urls: {
    production: 'https://cityofnewyork.github.io/growingupnyc-patterns',
    cdn: '"https://cdn.jsdelivr.net/gh/CityOfNewYork/growingupnyc-patterns@v' + version + '/dist"'
  }
};

module.exports = site;
