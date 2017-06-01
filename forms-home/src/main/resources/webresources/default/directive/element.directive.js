(function() {
    'use strict';
    /* jshint validthis: true */

    /**
     * @directive bbElement
     * @ngInject
     * @example
     *      <bb-element data-key="element.key"></bb-element>
     */
    function bbElementDirective() {
        return {
            restrict: 'E',
            bindToController: true,
            controller: 'BBElementController as $ctrl',
            scope: {},
            require: {
                form: '^^bbForm'
            }
        };
    }

    function BBElementController($scope, $element, $attrs, ElementService) {
        var ctrl = this;

        $attrs.$observe('key', updateElement);

        function updateElement() {
            var key = $attrs.key;
            var model = ctrl.form.getElementByKey(key);

            $scope.element = model;
            $element.html('');

            if (model) {
                updateComponent();
            }

            // TODO check for memory leaks related to transclusion
        }

        function updateComponent() {
            var excludeElements = 'bbControl' in $attrs;
            var model = $scope.element;
            var component = ElementService.findComponentForElement(model, excludeElements);

            if (component) {
                ElementService.runComponent(component, $scope, $element);
            }
        }
    }

    var app = angular.module('forms-ui');
    app.controller('BBElementController', BBElementController);
    app.directive('bbElement', bbElementDirective);
})();
