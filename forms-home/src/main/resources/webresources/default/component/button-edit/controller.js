(function() {
    angular.module('forms-ui').directive('buttonEdit',  /*@ngInject*/ function () {
        return {
            restrict: 'A',
            link: function ($scope, element, attrs,$filter) {
                var context = (element.context)?element.context:element[0];
                $scope.edit = function () {
                    $scope.$emit('open-section');
                    $scope.$emit('update');
                };
            }
        };
    });

})();
