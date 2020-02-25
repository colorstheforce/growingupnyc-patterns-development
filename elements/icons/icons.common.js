'use strict';

/**
 * The Utility class
 * @class
 */
var Utility = function Utility() {
  return this;
};

/**
 * The Icon module
 * @class
 */
var Icons = function Icons(path) {
  path = (path) ? path : Icons.path;

  fetch(path)
    .then(function (response) {
      if (response.ok)
        { return response.text(); }
      else
        // eslint-disable-next-line no-console
        if (Utility.debug()) { console.dir(response); }
    })
    .catch(function (error) {
      // eslint-disable-next-line no-console
      if (Utility.debug()) { console.dir(error); }
    })
    .then(function (data) {
      var sprite = document.createElement('div');
      sprite.innerHTML = data;
      sprite.setAttribute('aria-hidden', true);
      sprite.setAttribute('style', 'display: none;');
      document.body.appendChild(sprite);
    });

  return this;
};

/** @type {String} The path of the icon file */
Icons.path = 'icons.svg';

module.exports = Icons;
