(function() {
    angular.module('forms-ui').directive('buttonIcon',  /*@ngInject*/ function () {
        return {
            restrict: 'A',
            link: function ($scope, element, attrs,$filter,$timeout) {
                var context = (element.context)?element.context:element[0];
                console.log("BUTTON_ICON:: ",$scope.element);
                $scope.clicked = function () {
                    $scope.element.selected = true;
                    $scope.$emit('update');
                };
            }
        };
    });

})();
