(function() {

    /**
     * Controller for checkbox-group components
     * Adds a mapper between options and values to local scope
     * @ngInject
     */
    function RadioGroupController($scope) {
        this.dataElement = $scope.$parent.element._e;
    }

    angular.module('forms-ui').controller('RadioGroupController', ['$scope', RadioGroupController]);
})();
