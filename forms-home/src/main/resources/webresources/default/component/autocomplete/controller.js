(function () {
    'use strict';
    var app = angular.module('forms-ui');

    function AutoCompleteController($scope) {

    }

    app.controller('AutoCompleteController', ['$scope', AutoCompleteController]);
    app.directive('autocomplete', /*@ngInject*/ function ($log, debugEnabled, $filter) {
        return {
            restrict: 'A',
            require: '^bbForm',
            controller: 'AutoCompleteController as controller',
            scope: {
                element: '='
            },
            link: function (scope, element, attrs, formsController) {
                var context = (element.context)?element.context:element[0];
                var target = $(context);
                ////----
                var initialValue = $filter('filter')(scope.element.options, function(pOption){
                    return pOption.value == scope.element.value[0];
                });
                ////----
                function findByQuery(query, syncResults) {
                    var result = $filter('filter')(scope.element.options, {displayValue: query});
                    syncResults(result);
                }
                ////----
                element.typeahead({
                        minLength: scope.element.displayLength,
                        highlight: true
                    },{
                        source: findByQuery,
                        limit: 10,
                        display: function (item) {
                            return item.displayValue;
                        },
                        templates: {
                            notFound: [
                                '<div class="tt-suggestion">',
                                'No results found',
                                '</div>'
                            ].join('\n')
                        }
                    });

                if (initialValue.length) {
                    element.typeahead('val', initialValue[0].displayValue);
                }


                var handleChange = function (ev, suggestion) {
                    scope.element.value[0] = suggestion.value;
                    scope.$emit("update");
                };

                element.bind('typeahead:select', handleChange)
                    .bind('typeahead:autocomplete', handleChange)
                    .bind('typeahead:close', function () {
                        var matching = $filter('filter')(scope.element.options, function (value) {
                            return value.displayValue.toLowerCase() === element.typeahead('val').toLowerCase();
                        });
                        //No domain element with matching display value
                        if (element.typeahead('val') === '' || !matching.length) {
                            var currDomainEl = $filter('filter')(scope.element.options, {value: scope.element.value[0]});
                            var currValue = currDomainEl.length ? currDomainEl[0].displayValue : '';
                            element.typeahead('val', currValue);
                        } else {
                            element.typeahead('val', matching[0].displayValue);
                            handleChange(null, matching[0]);
                        }
                    });

            }
        };
    });
})();