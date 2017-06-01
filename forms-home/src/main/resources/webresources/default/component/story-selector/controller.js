(function () {
    /**
     *
     * Adds a mapper between options and values to local scope
     * @ngInject
     */
    angular.module('forms-ui').directive('storySelector', function () {
        return {
            restrict: 'A',
            link: function ($scope, element, attrs,$filter) {
                var context = (element.context)?element.context:element[0];
                $scope.$on("collapse-section",function () {
                    setTimeout(function () {
                        $scope.collapse = true;
                        $scope.$evalAsync();
                    }, 150);

                    $scope.$broadcast("collapse-scenario-selector");
                    $scope.$broadcast("collapse-amendments-list");
                });


                $scope.$on("open-section",function () {
                    setTimeout(function () {
                        $scope.collapse = false;
                        $scope.$evalAsync();
                    }, 150);

                    $scope.$broadcast("open-scenario-selector");
                    $scope.$broadcast("open-amendments-list");

                });

            }
        };
    });
})();
