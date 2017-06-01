(function () {
    angular.module('forms-ui').directive('inputCheckbox', function () {
        return {

            restrict: 'A',
            link: function ($scope, element, attrs, formsController) {
                var context = (element.context) ? element.context : element[0];
                var foundElement = !$scope.element;
                while (!foundElement) {
                    if ($scope.$parent) foundElement = $scope.$parent.element;
                    else foundElement = 1;
                }

                if (foundElement && foundElement != 1) {
                    $scope.$parent.element = foundElement;

                }

            }
        };
    });
})();
