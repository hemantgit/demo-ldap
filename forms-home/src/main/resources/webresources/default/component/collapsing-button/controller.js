(function() {
    angular.module('forms-ui').directive('collapsingButton',  /*@ngInject*/ function () {
        return {
            restrict: 'A',
            link: function ($scope, element, attrs,$filter) {
                var context = (element.context)?element.context:element[0];
                $scope.collapse = function () {
                 $scope.$emit('collapse-section');
                    $scope.$emit('update');
                };
            }
        };
    });

})();
