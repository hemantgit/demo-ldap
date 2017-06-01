(function() {
	'use strict';

	var app = angular.module('forms-ui');

	/**
	 * Construct Error Message Filter
	 * Formats error message objects for display
	 */
	app.filter('constructErrorMessage', [ constructErrorMessage ]);

	function constructErrorMessage() {

		function parseMessage(message, elem) {

			if(message && message.indexOf('[Q]') > -1) {
				// tekst is like this: "Vul uw [Q] in"
				return message.replace('[Q]', '"' + elem.questionText + '"');
			} else {
				return message;
			}
		}

		return function(elem) {
			var messages = '';

			// concat all messages together
			angular.forEach(elem.messages, function(value) {
				messages = messages + parseMessage(value.text, elem);
			});

			return messages;
		};
	}

})();