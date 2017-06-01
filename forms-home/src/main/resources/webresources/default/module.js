(function() {
	'use strict';

	/**
	 * The forms UI module
	 */
	var app = angular.module('forms-ui', ['ngSanitize','ngFileUpload']);
	app.value('$sessionStorage', window.sessionStorage);

	/**
	 * Useful constants
	 */
	app.constant('formConsts', {

		//keepalive ping interval
		PING_INTERVAL: 1000 * 60,

		//session expired related errors
		AQUIMA_SESSION_EXCEPTION: 'com.aquima.web.api.exception.UnknownSubscriptionException',
		SESSION_EXPIRED_ERR: 'SESSION_EXPIRED',
		UNKNOWN_ERR: 'UNKNOWN_ERR',
		UNABLE_TO_CREATE_SESSION_ERR: 'UNABLE_TO_CREATE_SESSION',

		//unknown/missing app related errors
		AQUIMA_UNKNOWN_APP_EXCEPTION: 'com.aquima.interactions.portal.exception.UnknownApplicationException',
		UNKNOWN_APP_ERR: 'UNKNOWN_APP',

		//unavailable language related errors
		AQUIMA_UNKNOWN_LANG_EXCEPTION: 'com.aquima.interactions.metamodel.exception.UnknownLanguageException',
		UNKNOWN_LANG_ERR: 'UNKNOWN_LANG'

	});

	/**
	 * Sets up:
	 * - Debug mode
	 * - The template base
	 */
	/*@ngInject*/
	app.config(function($provide, $logProvider, $httpProvider) {

		var debug = true;
		$logProvider.debugEnabled(debug);
		$provide.value('debugEnabled', debug);

		$httpProvider.defaults.useXDomain = true;
		$httpProvider.defaults.withCredentials = true;
		delete $httpProvider.defaults.headers.common['X-Requested-With'];
	});

	/**
	 * Custom exception handling
	 */
	/*@ngInject*/
	/*app.factory('$exceptionHandler', function($log, debugEnabled) {
		return function() {
			if(debugEnabled) {
				var args = [ 'Exception occurred: '].concat(Array.prototype.slice.call(arguments));
				$log.debug.apply($log, args);
			}
		};
	});*/
})();