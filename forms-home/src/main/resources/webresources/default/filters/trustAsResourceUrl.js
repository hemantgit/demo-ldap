(function() {
	'use strict';

	var app = angular.module('forms-ui');

	/**
	 * adds urls to trusted url for use in iFrame
	 */

	app.filter('trustAsResourceUrl', ['$sce', function ($sce) {
		return function (val) {
			return $sce.trustAsResourceUrl(val);
		};
	}]);
})();



