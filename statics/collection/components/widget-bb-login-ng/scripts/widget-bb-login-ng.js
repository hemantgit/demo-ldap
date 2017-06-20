(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("vendor-bb-angular"), require("lib-bb-widget-ng"), require("model-bb-login-ng"));
	else if(typeof define === 'function' && define.amd)
		define("widget-bb-login-ng", ["vendor-bb-angular", "lib-bb-widget-ng", "model-bb-login-ng"], factory);
	else if(typeof exports === 'object')
		exports["widget-bb-login-ng"] = factory(require("vendor-bb-angular"), require("lib-bb-widget-ng"), require("model-bb-login-ng"));
	else
		root["widget-bb-login-ng"] = factory(root["vendor-bb-angular"], root["lib-bb-widget-ng"], root["model-bb-login-ng"]);
})(this, function(__WEBPACK_EXTERNAL_MODULE_2__, __WEBPACK_EXTERNAL_MODULE_15__, __WEBPACK_EXTERNAL_MODULE_16__) {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
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

	module.exports = __webpack_require__(14);

/***/ }),
/* 1 */,
/* 2 */
/***/ (function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_2__;

/***/ }),
/* 3 */,
/* 4 */,
/* 5 */,
/* 6 */,
/* 7 */,
/* 8 */,
/* 9 */,
/* 10 */,
/* 11 */,
/* 12 */,
/* 13 */,
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _vendorBbAngular = __webpack_require__(2);
	
	var _vendorBbAngular2 = _interopRequireDefault(_vendorBbAngular);
	
	var _libBbWidgetNg = __webpack_require__(15);
	
	var _libBbWidgetNg2 = _interopRequireDefault(_libBbWidgetNg);
	
	var _modelBbLoginNg = __webpack_require__(16);
	
	var _modelBbLoginNg2 = _interopRequireDefault(_modelBbLoginNg);
	
	var _controller = __webpack_require__(17);
	
	var _controller2 = _interopRequireDefault(_controller);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	/**
	 * @module widget-bb-login-ng
	 *
	 * @description
	 * Login widget
	 */
	exports.default = _vendorBbAngular2.default.module('widget-bb-login-ng', [_modelBbLoginNg2.default, _libBbWidgetNg2.default]).controller('LoginController', [
	// dependencies to inject
	_modelBbLoginNg.modelLoginKey, _libBbWidgetNg.widgetKey,
	/* into */
	_controller2.default]).name;

/***/ }),
/* 15 */
/***/ (function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_15__;

/***/ }),
/* 16 */
/***/ (function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_16__;

/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = LoginController;
	
	var _cookies = __webpack_require__(18);
	
	var _cookies2 = _interopRequireDefault(_cookies);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	/**
	 * @name LoginController
	 * @type {object}
	 *
	 * @description
	 * Login widget
	 */
	function LoginController(model, widgetInstance) {
	  var $ctrl = this;
	
	  var portal = window.b$.portal;
	
	  var loginRedirectPage = widgetInstance.getStringPreference('loginRedirectPage');
	
	  var loginRedirectUrl = portal.config.serverRoot + '/' + portal.portalName + '/' + loginRedirectPage;
	
	  var cookies = _cookies2.default.getCookies();
	
	  var token = {
	    key: 'BBXSRF',
	    value: ''
	  };
	
	  var username = '';
	  var password = '';
	
	  var loginError = false;
	
	  var $onInit = function $onInit() {
	    token.value = cookies[token.key];
	  };
	
	  var login = function login() {
	    return model.login($ctrl.username, $ctrl.password, token.value).then(function (response) {
	      if (response.status === 200) {
	        window.location.assign(loginRedirectUrl);
	      }
	    }).catch(function () {
	      $ctrl.loginError = true;
	      $ctrl.password = '';
	    });
	  };
	
	  Object.assign($ctrl, {
	    /**
	     * @description
	     * AngularJS Lifecycle hook used to initialize the controller
	     * @type {function}
	     *
	     * @name LoginController#$onInit
	     * @returns {void}
	     */
	    $onInit: $onInit,
	    /**
	     * @description Login function
	     * @type {function}
	     *
	     * @name LoginController#login
	     * @returns {Promise}
	     */
	    login: login,
	    /**
	     * @name LoginController#username
	     * @type {string}
	     */
	    username: username,
	    /**
	     * @name LoginController#password
	     * @type {string}
	     */
	    password: password,
	    loginError: loginError
	  });
	} /* global window */

/***/ }),
/* 18 */
/***/ (function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();
	
	/* global document */
	/**
	 * @name Cookies
	 * @type {object}
	 * @description
	 * Cookie utils
	 */
	
	var getCookies = function getCookies() {
	  var cookies = {};
	  var _iteratorNormalCompletion = true;
	  var _didIteratorError = false;
	  var _iteratorError = undefined;
	
	  try {
	    for (var _iterator = document.cookie.split('; ')[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
	      var cookie = _step.value;
	
	      var _cookie$split = cookie.split('='),
	          _cookie$split2 = _slicedToArray(_cookie$split, 2),
	          name = _cookie$split2[0],
	          value = _cookie$split2[1];
	
	      cookies[name] = decodeURIComponent(value);
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
	
	  return cookies;
	};
	
	exports.default = {
	  getCookies: getCookies
	};

/***/ })
/******/ ])
});
;
//# sourceMappingURL=widget-bb-login-ng.js.map