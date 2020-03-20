var Search = (function () {
	'use strict';

	var commonjsGlobal = typeof globalThis !== 'undefined' ? globalThis : typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

	function unwrapExports (x) {
		return x && x.__esModule && Object.prototype.hasOwnProperty.call(x, 'default') ? x['default'] : x;
	}

	function createCommonjsModule(fn, module) {
		return module = { exports: {} }, fn(module, module.exports), module.exports;
	}

	var bundle = createCommonjsModule(function (module, exports) {
	(function webpackUniversalModuleDefinition(root, factory) {
		{ module.exports = factory(); }
	})(commonjsGlobal, function() {
	return /******/ (function(modules) { // webpackBootstrap
	/******/ 	// The module cache
	/******/ 	var installedModules = {};
	/******/
	/******/ 	// The require function
	/******/ 	function __webpack_require__(moduleId) {
	/******/
	/******/ 		// Check if module is in cache
	/******/ 		if(installedModules[moduleId])
	/******/ 			{ return installedModules[moduleId].exports; }
	/******/
	/******/ 		// Create a new module (and put it into the cache)
	/******/ 		var module = installedModules[moduleId] = {
	/******/ 			exports: {},
	/******/ 			id: moduleId,
	/******/ 			loaded: false
	/******/ 		};
	/******/
	/******/ 		// Execute the module function
	/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
	/******/
	/******/ 		// Flag the module as loaded
	/******/ 		module.loaded = true;
	/******/
	/******/ 		// Return the exports of the module
	/******/ 		return module.exports;
	/******/ 	}
	/******/
	/******/
	/******/ 	// expose the modules object (__webpack_modules__)
	/******/ 	__webpack_require__.m = modules;
	/******/
	/******/ 	// expose the module cache
	/******/ 	__webpack_require__.c = installedModules;
	/******/
	/******/ 	// __webpack_public_path__
	/******/ 	__webpack_require__.p = "";
	/******/
	/******/ 	// Load entry module and return exports
	/******/ 	return __webpack_require__(0);
	/******/ })
	/************************************************************************/
	/******/ ([
	/* 0 */
	/***/ (function(module, exports, __webpack_require__) {

		module.exports = __webpack_require__(1);


	/***/ }),
	/* 1 */
	/***/ (function(module, exports, __webpack_require__) {
		
		Object.defineProperty(exports, "__esModule", {
		  value: true
		});
		
		var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) { descriptor.writable = true; } Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) { defineProperties(Constructor.prototype, protoProps); } if (staticProps) { defineProperties(Constructor, staticProps); } return Constructor; }; }();
		
		var _jaroWinkler = __webpack_require__(2);
		
		var _jaroWinkler2 = _interopRequireDefault(_jaroWinkler);
		
		var _memoize = __webpack_require__(3);
		
		var _memoize2 = _interopRequireDefault(_memoize);
		
		function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
		
		function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
		
		var MissPlete = function () {
		  function MissPlete(_ref) {
		    var _this = this;
		
		    var input = _ref.input,
		        options = _ref.options,
		        className = _ref.className,
		        _ref$scoreFn = _ref.scoreFn,
		        scoreFn = _ref$scoreFn === undefined ? (0, _memoize2.default)(MissPlete.scoreFn) : _ref$scoreFn,
		        _ref$listItemFn = _ref.listItemFn,
		        listItemFn = _ref$listItemFn === undefined ? MissPlete.listItemFn : _ref$listItemFn;
		
		    _classCallCheck(this, MissPlete);
		
		    Object.assign(this, { input: input, options: options, className: className, scoreFn: scoreFn, listItemFn: listItemFn });
		
		    this.scoredOptions = null;
		    this.container = null;
		    this.ul = null;
		    this.highlightedIndex = -1;
		
		    this.input.addEventListener('input', function () {
		      if (_this.input.value.length > 0) {
		        _this.scoredOptions = _this.options.map(function (option) {
		          return scoreFn(_this.input.value, option);
		        }).sort(function (a, b) {
		          return b.score - a.score;
		        });
		      } else {
		        _this.scoredOptions = [];
		      }
		      _this.renderOptions();
		    });
		
		    this.input.addEventListener('keydown', function (event) {
		      if (_this.ul) {
		        // dropdown visible?
		        switch (event.keyCode) {
		          case 13:
		            _this.select();
		            break;
		          case 27:
		            // Esc
		            _this.removeDropdown();
		            break;
		          case 40:
		            // Down arrow
		            // Otherwise up arrow places the cursor at the beginning of the
		            // field, and down arrow at the end
		            event.preventDefault();
		            _this.changeHighlightedOption(_this.highlightedIndex < _this.ul.children.length - 1 ? _this.highlightedIndex + 1 : -1);
		            break;
		          case 38:
		            // Up arrow
		            event.preventDefault();
		            _this.changeHighlightedOption(_this.highlightedIndex > -1 ? _this.highlightedIndex - 1 : _this.ul.children.length - 1);
		            break;
		        }
		      }
		    });
		
		    this.input.addEventListener('blur', function (event) {
		      _this.removeDropdown();
		      _this.highlightedIndex = -1;
		    });
		  } // end constructor
		
		  _createClass(MissPlete, [{
		    key: 'getSiblingIndex',
		    value: function getSiblingIndex(node) {
		      var index = -1;
		      var n = node;
		      do {
		        index++;
		        n = n.previousElementSibling;
		      } while (n);
		      return index;
		    }
		  }, {
		    key: 'renderOptions',
		    value: function renderOptions() {
		      var _this2 = this;
		
		      var documentFragment = document.createDocumentFragment();
		
		      this.scoredOptions.every(function (scoredOption, i) {
		        var listItem = _this2.listItemFn(scoredOption, i);
		        listItem && documentFragment.appendChild(listItem);
		        return !!listItem;
		      });
		
		      this.removeDropdown();
		      this.highlightedIndex = -1;
		
		      if (documentFragment.hasChildNodes()) {
		        var newUl = document.createElement("ul");
		        newUl.addEventListener('mouseover', function (event) {
		          if (event.target.tagName === 'LI') {
		            _this2.changeHighlightedOption(_this2.getSiblingIndex(event.target));
		          }
		        });
		
		        newUl.addEventListener('mouseleave', function () {
		          _this2.changeHighlightedOption(-1);
		        });
		
		        newUl.addEventListener('mousedown', function (event) {
		          return event.preventDefault();
		        });
		
		        newUl.addEventListener('click', function (event) {
		          if (event.target.tagName === 'LI') {
		            _this2.select();
		          }
		        });
		
		        newUl.appendChild(documentFragment);
		
		        // See CSS to understand why the <ul> has to be wrapped in a <div>
		        var newContainer = document.createElement("div");
		        newContainer.className = this.className;
		        newContainer.appendChild(newUl);
		
		        // Inserts the dropdown just after the <input> element
		        this.input.parentNode.insertBefore(newContainer, this.input.nextSibling);
		        this.container = newContainer;
		        this.ul = newUl;
		      }
		    }
		  }, {
		    key: 'changeHighlightedOption',
		    value: function changeHighlightedOption(newHighlightedIndex) {
		      if (newHighlightedIndex >= -1 && newHighlightedIndex < this.ul.children.length) {
		        // If any option already selected, then unselect it
		        if (this.highlightedIndex !== -1) {
		          this.ul.children[this.highlightedIndex].classList.remove("highlight");
		        }
		
		        this.highlightedIndex = newHighlightedIndex;
		
		        if (this.highlightedIndex !== -1) {
		          this.ul.children[this.highlightedIndex].classList.add("highlight");
		        }
		      }
		    }
		  }, {
		    key: 'select',
		    value: function select() {
		      if (this.highlightedIndex !== -1) {
		        this.input.value = this.scoredOptions[this.highlightedIndex].displayValue;
		        this.removeDropdown();
		      }
		    }
		  }, {
		    key: 'removeDropdown',
		    value: function removeDropdown() {
		      this.container && this.container.remove();
		      this.container = null;
		      this.ul = null;
		    }
		  }], [{
		    key: 'scoreFn',
		    value: function scoreFn(inputValue, optionSynonyms) {
		      var closestSynonym = null;
		      var _iteratorNormalCompletion = true;
		      var _didIteratorError = false;
		      var _iteratorError = undefined;
		
		      try {
		        for (var _iterator = optionSynonyms[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
		          var synonym = _step.value;
		
		          var similarity = (0, _jaroWinkler2.default)(synonym.trim().toLowerCase(), inputValue.trim().toLowerCase());
		          if (closestSynonym === null || similarity > closestSynonym.similarity) {
		            closestSynonym = { similarity: similarity, value: synonym };
		            if (similarity === 1) {
		              break;
		            }
		          }
		        }
		      } catch (err) {
		        _didIteratorError = true;
		        _iteratorError = err;
		      } finally {
		        try {
		          if (!_iteratorNormalCompletion && _iterator.return) {
		            _iterator.return();
		          }
		        } finally {
		          if (_didIteratorError) {
		            throw _iteratorError;
		          }
		        }
		      }
		
		      return {
		        score: closestSynonym.similarity,
		        displayValue: optionSynonyms[0]
		      };
		    }
		  }, {
		    key: 'listItemFn',
		    value: function listItemFn(scoredOption, itemIndex) {
		      var li = itemIndex > MissPlete.MAX_ITEMS ? null : document.createElement("li");
		      li && li.appendChild(document.createTextNode(scoredOption.displayValue));
		      return li;
		    }
		  }, {
		    key: 'MAX_ITEMS',
		    get: function get() {
		      return 8;
		    }
		  }]);
		
		  return MissPlete;
		}();
		
		exports.default = MissPlete;

	/***/ }),
	/* 2 */
	/***/ (function(module, exports) {
		
		Object.defineProperty(exports, "__esModule", {
		  value: true
		});
		
		var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) { break; } } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) { _i["return"](); } } finally { if (_d) { throw _e; } } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();
		
		exports.default = function (s1, s2) {
		  var prefixScalingFactor = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0.2;
		
		  var jaroSimilarity = jaro(s1, s2);
		
		  var commonPrefixLength = 0;
		  for (var i = 0; i < s1.length; i++) {
		    if (s1[i] === s2[i]) {
		      commonPrefixLength++;
		    } else {
		      break;
		    }
		  }
		
		  return jaroSimilarity + Math.min(commonPrefixLength, 4) * prefixScalingFactor * (1 - jaroSimilarity);
		};
		
		// https://en.wikipedia.org/wiki/Jaro%E2%80%93Winkler_distance
		
		function jaro(s1, s2) {
		  var shorter = void 0,
		      longer = void 0;
		
		  var _ref = s1.length > s2.length ? [s1, s2] : [s2, s1];
		
		  var _ref2 = _slicedToArray(_ref, 2);
		
		  longer = _ref2[0];
		  shorter = _ref2[1];
		
		
		  var matchingWindow = Math.floor(longer.length / 2) - 1;
		  var shorterMatches = [];
		  var longerMatches = [];
		
		  for (var i = 0; i < shorter.length; i++) {
		    var ch = shorter[i];
		    var windowStart = Math.max(0, i - matchingWindow);
		    var windowEnd = Math.min(i + matchingWindow + 1, longer.length);
		    for (var j = windowStart; j < windowEnd; j++) {
		      if (longerMatches[j] === undefined && ch === longer[j]) {
		        shorterMatches[i] = longerMatches[j] = ch;
		        break;
		      }
		    }
		  }
		
		  var shorterMatchesString = shorterMatches.join("");
		  var longerMatchesString = longerMatches.join("");
		  var numMatches = shorterMatchesString.length;
		
		  var transpositions = 0;
		  for (var _i = 0; _i < shorterMatchesString.length; _i++) {
		    if (shorterMatchesString[_i] !== longerMatchesString[_i]) {
		      transpositions++;
		    }
		  }
		
		  return numMatches > 0 ? (numMatches / shorter.length + numMatches / longer.length + (numMatches - Math.floor(transpositions / 2)) / numMatches) / 3.0 : 0;
		}

	/***/ }),
	/* 3 */
	/***/ (function(module, exports) {
		
		Object.defineProperty(exports, "__esModule", {
		  value: true
		});
		
		exports.default = function (fn) {
		  var cache = {};
		
		  return function () {
		    var arguments$1 = arguments;

		    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
		      args[_key] = arguments$1[_key];
		    }
		
		    var key = JSON.stringify(args);
		    return cache[key] || (cache[key] = fn.apply(null, args));
		  };
		};

	/***/ })
	/******/ ])
	});

	});

	var MissPlete = unwrapExports(bundle);

	var Search = function Search() {};
	/**
	 * Initializes the module
	 */


	Search.prototype.init = function init() {
	  this._inputs = document.querySelectorAll(Search.selectors.MAIN);

	  if (!this._inputs) {
	    return;
	  }

	  for (var i = this._inputs.length - 1; i >= 0; i--) {
	    this._suggestions(this._inputs[i]);
	  }
	};
	/**
	 * Initializes the suggested search term dropdown.
	 * @param{object} input The search input.
	 */


	Search.prototype._suggestions = function _suggestions(input) {
	  var data = JSON.parse(input.dataset.jsSearchSuggestions);
	  input._MissPlete = new MissPlete({
	    input: input,
	    options: data,
	    className: input.dataset.jsSearchDropdownClass
	  });
	};

	Search.selectors = {
	  MAIN: '[data-js*="search"]'
	};

	return Search;

}());
