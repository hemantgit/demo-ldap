(function() {
	'use strict';

	var app = angular.module('forms-ui');

	/**
	 * Converts element styles from the model to HTML class names.
	 * Replaces _ with -
	 */
	app.filter('beautify', function() {
		return function(styles) {
            styles = styles || '';
            var str = (typeof styles === 'string') ? styles : styles.join(',');


			// replace '_' on '-'
			str = str.replace(/_/gi, '-');
			// split camel case with ' ';
			str = str.replace(/([a-z](?=[A-Z]))/g, '$1 ');
			// revert ' ' to '-';
			str = str.replace(/ /gi, '-');
			//revert ',' to ' '
			str = str.replace(/,/gi, ' ');
			// automatically add fa (FontAwesome class)
			str = str.replace(/fa-/gi, 'fa fa-');
			// to lower case
			str = str.toLowerCase();
			return str;
		};
	});

})();
