(function() {

    /**
     * Controller for checkbox-group components
     * Adds a mapper between options and values to local scope
     * @ngInject
     */
    function CheckboxGroupController($scope) {
        var ctrl = this;
        var element = $scope.element;

        ctrl.valueMap = {};
        element.options.forEach(mapValues);

        ctrl.updateValues = function() {
            var options = element.options;
            var index = options.length;
            var values = [];

            while (index--) {
                if (ctrl.valueMap[index]) {
                    values.unshift(options[index].value);
                }
            }

            element.value = values;
        };

        function mapValues(option, index) {
            if (element.value.indexOf(option.value) > -1) {
                ctrl.valueMap[index] = true;
            }
        }
    }

    angular.module('forms-ui').controller('CheckboxGroupController', CheckboxGroupController);
})();
