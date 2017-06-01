(function() {
    'use strict';
    /* jshint validthis: true */

    /**
     * Collection of string-related utilities
     */
    function StringUtils() {
        return {
            replaceVariables: replaceVariables,
            toQueryString: toQueryString
        };
    }

    function toQueryString(object) {
        return Object.keys(object)
            .map(function(key) {
                return key + '=' + encodeURIComponent(object[key]);
            })
            .join('&');
    }

    function replaceVariables(string, values) {
        return string.replace(/%([a-z]+[a-zA-Z0-9]+)%/g, function(_, variable) {
            return values[variable] || '';
        });
    }

    angular.module('forms-ui').service('StringUtils', StringUtils);
})();
