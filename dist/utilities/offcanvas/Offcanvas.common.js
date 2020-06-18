'use strict';

var commonjsGlobal = typeof globalThis !== 'undefined' ? globalThis : typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

function createCommonjsModule(fn, module) {
	return module = { exports: {} }, fn(module, module.exports), module.exports;
}

/** Detect free variable `global` from Node.js. */
var freeGlobal = typeof commonjsGlobal == 'object' && commonjsGlobal && commonjsGlobal.Object === Object && commonjsGlobal;

var _freeGlobal = freeGlobal;

/** Detect free variable `self`. */
var freeSelf = typeof self == 'object' && self && self.Object === Object && self;

/** Used as a reference to the global object. */
var root = _freeGlobal || freeSelf || Function('return this')();

var _root = root;

/** Built-in value references. */
var Symbol = _root.Symbol;

var _Symbol = Symbol;

/** Used for built-in method references. */
var objectProto = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/**
 * Used to resolve the
 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
 * of values.
 */
var nativeObjectToString = objectProto.toString;

/** Built-in value references. */
var symToStringTag = _Symbol ? _Symbol.toStringTag : undefined;

/**
 * A specialized version of `baseGetTag` which ignores `Symbol.toStringTag` values.
 *
 * @private
 * @param {*} value The value to query.
 * @returns {string} Returns the raw `toStringTag`.
 */
function getRawTag(value) {
  var isOwn = hasOwnProperty.call(value, symToStringTag),
      tag = value[symToStringTag];

  try {
    value[symToStringTag] = undefined;
    var unmasked = true;
  } catch (e) {}

  var result = nativeObjectToString.call(value);
  if (unmasked) {
    if (isOwn) {
      value[symToStringTag] = tag;
    } else {
      delete value[symToStringTag];
    }
  }
  return result;
}

var _getRawTag = getRawTag;

/** Used for built-in method references. */
var objectProto$1 = Object.prototype;

/**
 * Used to resolve the
 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
 * of values.
 */
var nativeObjectToString$1 = objectProto$1.toString;

/**
 * Converts `value` to a string using `Object.prototype.toString`.
 *
 * @private
 * @param {*} value The value to convert.
 * @returns {string} Returns the converted string.
 */
function objectToString(value) {
  return nativeObjectToString$1.call(value);
}

var _objectToString = objectToString;

/** `Object#toString` result references. */
var nullTag = '[object Null]',
    undefinedTag = '[object Undefined]';

/** Built-in value references. */
var symToStringTag$1 = _Symbol ? _Symbol.toStringTag : undefined;

/**
 * The base implementation of `getTag` without fallbacks for buggy environments.
 *
 * @private
 * @param {*} value The value to query.
 * @returns {string} Returns the `toStringTag`.
 */
function baseGetTag(value) {
  if (value == null) {
    return value === undefined ? undefinedTag : nullTag;
  }
  return (symToStringTag$1 && symToStringTag$1 in Object(value))
    ? _getRawTag(value)
    : _objectToString(value);
}

var _baseGetTag = baseGetTag;

/**
 * Checks if `value` is object-like. A value is object-like if it's not `null`
 * and has a `typeof` result of "object".
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is object-like, else `false`.
 * @example
 *
 * _.isObjectLike({});
 * // => true
 *
 * _.isObjectLike([1, 2, 3]);
 * // => true
 *
 * _.isObjectLike(_.noop);
 * // => false
 *
 * _.isObjectLike(null);
 * // => false
 */
function isObjectLike(value) {
  return value != null && typeof value == 'object';
}

var isObjectLike_1 = isObjectLike;

/** `Object#toString` result references. */
var argsTag = '[object Arguments]';

/**
 * The base implementation of `_.isArguments`.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an `arguments` object,
 */
function baseIsArguments(value) {
  return isObjectLike_1(value) && _baseGetTag(value) == argsTag;
}

var _baseIsArguments = baseIsArguments;

/** Used for built-in method references. */
var objectProto$2 = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty$1 = objectProto$2.hasOwnProperty;

/** Built-in value references. */
var propertyIsEnumerable = objectProto$2.propertyIsEnumerable;

/**
 * Checks if `value` is likely an `arguments` object.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an `arguments` object,
 *  else `false`.
 * @example
 *
 * _.isArguments(function() { return arguments; }());
 * // => true
 *
 * _.isArguments([1, 2, 3]);
 * // => false
 */
var isArguments = _baseIsArguments(function() { return arguments; }()) ? _baseIsArguments : function(value) {
  return isObjectLike_1(value) && hasOwnProperty$1.call(value, 'callee') &&
    !propertyIsEnumerable.call(value, 'callee');
};

/**
 * This method returns `false`.
 *
 * @static
 * @memberOf _
 * @since 4.13.0
 * @category Util
 * @returns {boolean} Returns `false`.
 * @example
 *
 * _.times(2, _.stubFalse);
 * // => [false, false]
 */
function stubFalse() {
  return false;
}

var stubFalse_1 = stubFalse;

var isBuffer_1 = createCommonjsModule(function (module, exports) {
/** Detect free variable `exports`. */
var freeExports =  exports && !exports.nodeType && exports;

/** Detect free variable `module`. */
var freeModule = freeExports && 'object' == 'object' && module && !module.nodeType && module;

/** Detect the popular CommonJS extension `module.exports`. */
var moduleExports = freeModule && freeModule.exports === freeExports;

/** Built-in value references. */
var Buffer = moduleExports ? _root.Buffer : undefined;

/* Built-in method references for those with the same name as other `lodash` methods. */
var nativeIsBuffer = Buffer ? Buffer.isBuffer : undefined;

/**
 * Checks if `value` is a buffer.
 *
 * @static
 * @memberOf _
 * @since 4.3.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a buffer, else `false`.
 * @example
 *
 * _.isBuffer(new Buffer(2));
 * // => true
 *
 * _.isBuffer(new Uint8Array(2));
 * // => false
 */
var isBuffer = nativeIsBuffer || stubFalse_1;

module.exports = isBuffer;
});

var _nodeUtil = createCommonjsModule(function (module, exports) {
/** Detect free variable `exports`. */
var freeExports =  exports && !exports.nodeType && exports;

/** Detect free variable `module`. */
var freeModule = freeExports && 'object' == 'object' && module && !module.nodeType && module;

/** Detect the popular CommonJS extension `module.exports`. */
var moduleExports = freeModule && freeModule.exports === freeExports;

/** Detect free variable `process` from Node.js. */
var freeProcess = moduleExports && _freeGlobal.process;

/** Used to access faster Node.js helpers. */
var nodeUtil = (function() {
  try {
    // Use `util.types` for Node.js 10+.
    var types = freeModule && freeModule.require && freeModule.require('util').types;

    if (types) {
      return types;
    }

    // Legacy `process.binding('util')` for Node.js < 10.
    return freeProcess && freeProcess.binding && freeProcess.binding('util');
  } catch (e) {}
}());

module.exports = nodeUtil;
});

/* Node.js helper references. */
var nodeIsTypedArray = _nodeUtil && _nodeUtil.isTypedArray;

var Offcanvas = function Offcanvas(settings) {
  // if(window.NodeList && !NodeList.prototype.forEach) {
  // NodeList.prototype.forEach = Array.prototype.forEach;
  // }
  // if(window.HTMLCollection && !HTMLCollection.prototype.forEach) {
  // HTMLCollection.prototype.forEach = Array.prototype.forEach;
  // }
  // console.log("ie 11 fix Snippet added")
  var body = document.querySelector('body');
  var nav = document.querySelector('.js-offcanvas__side');
  var mainOff = document.querySelector('.js-offcanvas__main');
  this._settings = {
    sideSelector: settings.sideSelector ? settings.sideSelector : Offcanvas.side // selector: (settings.selector) ? settings.selector : Offcanvas.selector,
    // namespace: (settings.namespace) ? settings.namespace : Offcanvas.namespace,
    // inactiveClass: (settings.inactiveClass) ? settings.inactiveClass : Offcanvas.inactiveClass,
    // activeClass: (settings.activeClass) ? settings.activeClass : Offcanvas.activeClass,
    // before: (settings.before) ? settings.before : false,
    // after: (settings.after) ? settings.after : false

  };
  var openClass = "";

  if (this._settings.sideSelector === 'left') {
    openClass = 'is-open-left';
    mainOff.classList.toggle("o-offcanvas__main-left");
  } else if (this._settings.sideSelector === 'right') {
    openClass = 'is-open-right';
    mainOff.classList.toggle("o-offcanvas__main-right");
  }

  var offCanvas = document.querySelectorAll('.js-offcanvas');

  if (offCanvas) {
    console.log("for loop");

    var loop = function (i) {
      var offCanvasSide = offCanvas[i].querySelector('.js-offcanvas__side'); // console.log(offCanvas[i])

      /**
      * Add event listener for 'changeOpenState'.
      * The value of event.detail indicates whether the open state is true
      * (i.e. the offcanvas content is visible).
      * @function
      * @param {object} event - The event object
      */

      offCanvas[i].addEventListener('changeOpenState', function (event) {
        if (event.detail) {
          if (!/^(?:a|select|input|button|textarea)$/i.test(offCanvasSide.tagName)) {
            offCanvasSide.tabIndex = -1;
          }

          offCanvasSide.focus();
        }
      }, false);
    };

    for (var i = 0; i < offCanvas.length; i++) loop(i);
  } // if (offCanvas) {
  // console.log(offCanvas)
  // // debugger
  // forEach(offCanvas, function (offCanvasElem) {
  //   const offCanvasSide = offCanvasElem.querySelector('.js-offcanvas__side');
  //   /**
  //   * Add event listener for 'changeOpenState'.
  //   * The value of event.detail indicates whether the open state is true
  //   * (i.e. the offcanvas content is visible).
  //   * @function
  //   * @param {object} event - The event object
  //   */
  //   offCanvasElem.addEventListener('changeOpenState', function (event) {
  //     if (event.detail) {
  //       if (!(/^(?:a|select|input|button|textarea)$/i.test(offCanvasSide.tagName))) {
  //         offCanvasSide.tabIndex = -1;
  //       }
  //       offCanvasSide.focus();
  //     }
  //   }, false);
  // });
  // }


  this._toggle(openClass, nav, mainOff);
};

Offcanvas.prototype._toggle = function _toggle(openClass, nav, mainOff) {
  var linkActiveClass = 'is-active';
  var toggleElems = document.querySelectorAll('[data-js]');

  if (!toggleElems) {
    return;
  }
  /**
  * For each toggle element, get its target from the data-toggle attribute.
  * Bind an event handler to toggle the openClass on/off on the target element
  * when the toggle element is clicked.
  */
  // forEach(toggleElems, function (toggleElem) {


  var loop = function (i) {
    var targetElemSelector = Offcanvas.dataset(toggleElems[i], 'js');

    if (!targetElemSelector) {
      return {};
    }

    var targetElem = document.getElementById(targetElemSelector);

    if (!targetElem) {
      return {};
    }

    toggleElems[i].addEventListener('click', function (event) {
      var toggleEvent;
      var toggleClass = toggleElems[i].dataset.toggleClass ? toggleElems[i].dataset.toggleClass : openClass;
      event.preventDefault(); // Toggle the element's active class

      toggleElems[i].classList.toggle(linkActiveClass);

      if (openClass === 'is-open-left') {
        nav.classList.toggle("o-offcanvas__side-left");
      } else {
        nav.classList.toggle("o-offcanvas__side-right");
      } // Toggle custom class if it is set


      if (toggleClass !== openClass) {
        targetElem.classList.toggle(toggleClass);
      } // Toggle the default open class


      targetElem.classList.toggle(openClass); // Toggle the appropriate aria hidden attribute

      targetElem.setAttribute('aria-hidden', !targetElem.classList.contains(toggleClass)); // Fire the custom open state event to trigger open functions

      if (typeof window.CustomEvent === 'function') {
        toggleEvent = new CustomEvent('changeOpenState', {
          detail: targetElem.classList.contains(openClass)
        });
      } else {
        toggleEvent = document.createEvent('CustomEvent');
        toggleEvent.initCustomEvent('changeOpenState', true, true, {
          detail: targetElem.classList.contains(openClass)
        });
      }

      targetElem.dispatchEvent(toggleEvent);
    });
  };

  for (var i = 0; i < toggleElems.length; i++) {
    var returned = loop(i);
    if (returned) return returned.v;
  } // });

};

Offcanvas.side = "right";

Offcanvas.dataset = function (elem, attr) {
  if (typeof elem.dataset === 'undefined') {
    return elem.getAttribute('data-' + attr);
  }

  return elem.dataset[attr];
};

module.exports = Offcanvas;
