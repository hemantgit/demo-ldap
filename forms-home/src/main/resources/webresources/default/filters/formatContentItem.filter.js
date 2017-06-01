(function () {
    'use strict';

    var app = angular.module('forms-ui');

    /**
     * Format Content Item Filter
     * Formats content item objects for display
     */
    app.filter('formatContentItem', function ($filter) {

        function postOrder(nodes) {
            var returnVal = '';

            angular.forEach(nodes, function (value) {
                if (value.nodeType === 'text') {
                    returnVal += value.text || '';
                    if (value.nodes) {
                        returnVal += postOrder(value.nodes);
                    }
                } else if (value.nodeType === 'value') {
                    returnVal += value.values.join('') || '';
                    if (value.nodes) {
                        returnVal += postOrder(value.nodes);
                    }
                } else if (value.nodeType === 'style') {
                    switch (value.presentationStyle) {
                        case 'NewLine': {
                            returnVal += '<br />';
                            break;
                        }
                        case 'Bold': {
                            returnVal += '<strong class="' + $filter('beautify')(value.presentationStyle.split(' ')) + '">';
                            returnVal += value.text || '';
                            if (value.nodes) {
                                returnVal += postOrder(value.nodes);
                            }
                            returnVal += '</strong>';
                            break;
                        }
                        default: {
                            returnVal += '<span class="' + $filter('beautify')(value.presentationStyle.split(' ')) + '">';
                            returnVal += value.text || '';
                            if (value.nodes) {
                                returnVal += postOrder(value.nodes);
                            }
                            returnVal += '</span>';
                        }
                    }
                }
            });

            return returnVal;

        }

        return function (contentItemNodes) {
            return postOrder(contentItemNodes);
        };
    });
})();