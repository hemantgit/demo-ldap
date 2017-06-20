(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("vendor-bb-angular"));
	else if(typeof define === 'function' && define.amd)
		define("data-bb-cxp-authentication-http-ng", ["vendor-bb-angular"], factory);
	else if(typeof exports === 'object')
		exports["data-bb-cxp-authentication-http-ng"] = factory(require("vendor-bb-angular"));
	else
		root["data-bb-cxp-authentication-http-ng"] = factory(root["vendor-bb-angular"]);
})(this, function(__WEBPACK_EXTERNAL_MODULE_2__) {
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

	module.exports = __webpack_require__(1);

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.cXPAuthenticationDataKey = undefined;
	
	var _vendorBbAngular = __webpack_require__(2);
	
	var _vendorBbAngular2 = _interopRequireDefault(_vendorBbAngular);
	
	var _dataBbCxpAuthenticationHttp = __webpack_require__(3);
	
	var _dataBbCxpAuthenticationHttp2 = _interopRequireDefault(_dataBbCxpAuthenticationHttp);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	/**
	 * @module data-bb-cxp-authentication-http-ng
	 *
	 * @description A data module for accessing the CXP Authentication REST API
	 *
	 * @returns {String} `data-bb-cxp-authentication-http-ng`
	 * @example
	 * import cXPAuthenticationDataModuleKey, {
	 *   cXPAuthenticationDataKey,
	 * } from 'data-bb-cxp-authentication-http-ng';
	 */
	
	var cXPAuthenticationDataModuleKey = 'data-bb-cxp-authentication-http-ng';
	/**
	 * @name cXPAuthenticationDataKey
	 * @type {string}
	 * @description Angular dependency injection key for the CXP Authentication data service
	 */
	var cXPAuthenticationDataKey = exports.cXPAuthenticationDataKey = 'data-bb-cxp-authentication-http-ng:cXPAuthenticationData';
	/**
	 * @name default
	 * @type {string}
	 * @description Angular dependency injection module key
	 */
	exports.default = _vendorBbAngular2.default.module(cXPAuthenticationDataModuleKey, [])
	
	/**
	 * @name CXPAuthenticationData
	 * @type {object}
	 * @constructor
	 *
	 * @description Public api for service data-bb-cxp-authentication-http
	 *
	 */
	.provider(cXPAuthenticationDataKey, [function () {
	  var config = {
	    baseUri: '/'
	  };
	
	  /**
	   * @name CXPAuthenticationDataProvider
	   * @type {object}
	   * @description
	   * Data service that can be configured with custom base URI.
	   *
	   * @example
	   * angular.module(...)
	   *   .config(['data-bb-cxp-authentication-http-ng:cXPAuthenticationDataProvider',
	   *     (dataProvider) => {
	   *       dataProvider.setBaseUri('http://my-service.com/');
	   *       });
	   */
	  return {
	    /**
	     * @name CXPAuthenticationDataProvider#setBaseUri
	     * @type {function}
	     * @param {string} baseUri Base URI which will be the prefix for all HTTP requests
	     */
	    setBaseUri: function setBaseUri(baseUri) {
	      config.baseUri = baseUri;
	    },
	
	    /**
	     * @name CXPAuthenticationDataProvider#$get
	     * @type {function}
	     * @return {object} An instance of the service
	     */
	    $get: ['$http',
	    /* into */
	    (0, _dataBbCxpAuthenticationHttp2.default)(config)]
	  };
	}]).name;

/***/ }),
/* 2 */
/***/ (function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_2__;

/***/ }),
/* 3 */
/***/ (function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	/* global window */
	exports.default = function (conf) {
	  return function (httpClient) {
	    var portalServerRoot = window.b$.portal.config.serverRoot.replace(/\//g, '');
	    var config = {
	      endpoint: '' + conf.baseUri + portalServerRoot + '/bb-public-api/security'
	    };
	
	    /**
	     * @name CXPAuthenticationData#postLogin
	     * @type {function}
	     * @description Perform a POST request to the URI.
	     * @param {object} data - configuration object
	     * @param {object} headers - custom headers
	     * @returns {Promise.<object>} A promise resolving to object with headers and data keys
	     *
	     * @example
	     * cXPAuthenticationData
	     *  .postLogin(data, headers)
	     *  .then(function(result){
	     *    console.log(result)
	     *  });
	     */
	    function postLogin(data, headers) {
	      var url = config.endpoint + '/login';
	
	      return httpClient({
	        method: 'POST',
	        url: url,
	        data: data,
	        headers: headers
	      });
	    }
	
	    /**
	     * @name CXPAuthenticationData#postLogout
	     * @type {function}
	     * @description Perform a POST request to the URI.
	     * @param {object} headers - custom headers
	     * @returns {Promise.<object>} A promise resolving to object with headers and data keys
	     *
	     * @example
	     * cXPAuthenticationData
	     *  .postLogout(headers)
	     *  .then(function(result){
	     *    console.log(result)
	     *  });
	     */
	    function postLogout(headers) {
	      var url = config.endpoint + '/logout';
	
	      return httpClient({
	        method: 'POST',
	        url: url,
	        headers: headers
	      });
	    }
	
	    return {
	      postLogin: postLogin,
	      postLogout: postLogout
	    };
	  };
	};

/***/ })
/******/ ])
});
;
//# sourceMappingURL=data-bb-cxp-authentication-http-ng.js.map