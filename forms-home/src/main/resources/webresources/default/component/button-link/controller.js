(function() {
    angular.module('forms-ui').directive('buttonLink',  /*@ngInject*/ function () {
        return {
            restrict: 'A',
            link: function ($scope, element, attrs,$filter) {
                var caption = $scope.$parent.element._e.caption.split('||');
                var context = (element.context)?element.context:element[0];
                $scope.caption = caption[0];
                $scope.link = caption[1];

            }
        };
    });

})();
