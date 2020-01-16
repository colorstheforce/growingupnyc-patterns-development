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
  prettier: {
    parser: 'html',
    printWidth: 2000,
    singleQuote: true,
    jsxBracketSameLine: true,
    htmlWhitespaceSensitivity: 'ignore'
  },
  urls: {
    production: 'https://cityofnewyork.github.io/growingupnyc-patterns',
    cdn: '"https://cdn.jsdelivr.net/gh/CityOfNewYork/growingupnyc-patterns@v' + version + '/dist"'
  },
  forms: {
    url: '',
    borough: {
      id: 'mce-BOROUGH',
      values: [
        'Bronx',
        'Brooklyn',
        'Manhattan',
        'Queens',
        'Staten Island'
      ]
    },
    boroughs: [
      {
        id: 'mce-group[4857]-4857-0',
        name: 'group[4857][128]',
        value: '128',
        label: 'Bronx'
      },
      {
        id: 'mce-group[4857]-4857-1',
        name: 'group[4857][256]',
        value: '256',
        label: 'Brooklyn'
      },
      {
        id: 'mce-group[4857]-4857-2',
        name: 'group[4857][512]',
        value: '512',
        label: 'Manhattan'
      },
      {
        id: 'mce-group[4857]-4857-3',
        name: 'group[4857][1024]',
        value: '1024',
        label: 'Queens'
      },
      {
        id: 'mce-group[4857]-4857-4',
        name: 'group[4857][2048]',
        value: '2048',
        label: 'Staten Island'
      }
    ],
    ageGroups: [
      {
        id: 'mce-group[3429]-3429-0',
        name: 'group[3429][1]',
        value: '1',
        label: 'Baby'
      },
      {
        id: 'mce-group[3429]-3429-1',
        name: 'group[3429][1]',
        value: '2',
        label: 'Toddler'
      },
      {
        id: 'mce-group[3429]-3429-2',
        name: 'group[3429][1]',
        value: '4',
        label: 'Pre-Schooler'
      },
      {
        id: 'mce-group[3429]-3429-3',
        name: 'group[3429][1]',
        value: '8',
        label: 'Grade-Schooler'
      },
      {
        id: 'mce-group[3429]-3429-4',
        name: 'group[3429][1]',
        value: '16',
        label: 'Pre-Teen'
      },
      {
        id: 'mce-group[3429]-3429-5',
        name: 'group[3429][1]',
        value: '32',
        label: 'Teen'
      },
      {
        id: 'mce-group[3429]-3429-6',
        name: 'group[3429][1]',
        value: '64',
        label: 'Young Adult'
      },
    ],
    requestType: [
      {
        id: 'mce-group[3433]-3433-0',
        name: 'group[3433][1]',
        value: '1',
        label: 'Invite Growing Up NYC to an event'
      },
      {
        id: 'mce-group[3433]-3433-1',
        name: 'group[3433][2]',
        value: '2',
        label: 'Request materials to pick up'
      },
      {
        id: 'mce-group[3433]-3433-2',
        name: 'group[3433][4]',
        value: '4',
        label: 'Partner with Growing Up NYC'
      },
      {
        id: 'mce-group[3433]-3433-3',
        name: 'group[3433][8]',
        value: '8',
        label: 'General Inquiry'
      },
      {
        id: 'mce-group[3433]-3433-4',
        name: 'group[3433][16]',
        value: '16',
        label: 'Get updates about the Early Childhood Development project'
      },
    ]
  }
};

module.exports = site;
