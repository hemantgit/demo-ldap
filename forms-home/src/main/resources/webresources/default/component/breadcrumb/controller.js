(function() {
    'use strict';

     

    var app = angular.module('forms-ui');

    /**
     * Element directive (bbControl)
     * This directive is designed to render single controls. It expects and element object as an attribute
     */
    angular.module('forms-ui').directive('breadcrum',  /*@ngInject*/ function () {
        return {
            restrict: 'A',
            scope: {
                breadcrumbs: '='
            },
            link: function(scope, element, attrs, formsController, $filter) {

                var children = [],
                    parentClassNames = '', i, l,
                    child = {},
                    isPast = true;

                if(scope.breadcrumbs) {

                    if (scope.breadcrumbs.styles.length) {
                        parentClassNames = $filter('beautify')(scope.breadcrumbs.styles);
                    }

                    for (i = 0, l = scope.breadcrumbs.children.length; i < l; i++){
                        child = formsController.lookupElement(scope.breadcrumbs.children[i]);

                        if (child.properties && child.properties.isCurrent === true) {
                            isPast = false;
                        }

                        child.isCurrent = child.properties.isCurrent;
                        child.isPast = (!child.isCurrent && isPast) ? true : false;
                        child.isFuture = (!child.isPast && !child.isCurrent) ? true : false;

                        children.push(child);
                    }

                    scope.children = children;
                    scope.parentClassNames = parentClassNames;
                }
            }
        };
    });
})();