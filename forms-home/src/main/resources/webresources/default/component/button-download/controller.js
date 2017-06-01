(function() {
    angular.module('forms-ui').directive('buttonDownload',  /*@ngInject*/ function () {
        return {
            restrict: 'A',
            link: function ($scope, element, attrs,$filter) {
                var context = (element.context)?element.context:element[0];
                $scope.download = function () {
                    $scope.$emit("file-download-request");
                    $scope.$emit('update');
                };
            }
        };
    });

})();
