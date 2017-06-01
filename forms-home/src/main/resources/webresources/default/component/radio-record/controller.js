(function() {
    angular.module('forms-ui').directive('radioRecord',  /*@ngInject*/ function () {
        return {
            restrict: 'A',
            link: function ($scope, element, attrs,$filter,$timeout) {
                var context = (element.context)?element.context:element[0];
                $scope.itemSelected = function (pEvent,pData) {
                    $scope.$parent.element.value[0] = pData.value;
                     $scope.$emit('update');
                    setTimeout(function () {
                        $scope.selectedValue = $scope.$parent.element.value[0];
                        $scope.$evalAsync();
                    }, 100);

                };

                $scope.selectedValue = $scope.$parent.element.value[0];
            }
        };
    });

})();
