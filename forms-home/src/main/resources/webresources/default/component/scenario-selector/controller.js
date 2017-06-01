(function() {
    angular.module('forms-ui').directive('scenarioSelector',  /*@ngInject*/ function () {
        return {
            restrict: 'A',
            link: function ($scope, element, attrs,$filter) {
                $scope.collapse = false;
                var context = (element.context)?element.context:element[0];
                $scope.$on("collapse-scenario-selector",function () {
                    setTimeout(function () {
                        $scope.collapse = true;
                        $scope.$evalAsync();
                    }, 50);
                });

                $scope.$on("open-scenario-selector",function () {
                    setTimeout(function () {
                        $scope.collapse = false;
                        $scope.$evalAsync();
                    }, 50);
                });
            }
        };
    });

})();
