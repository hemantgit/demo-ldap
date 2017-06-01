(function() {
    angular.module('forms-ui').directive('statementAgree',  /*@ngInject*/ function () {
        return {
            restrict: 'A',
            link: function ($scope, element, attrs,$filter) {
                $scope.collapse = false;
                var context = (element.context)?element.context:element[0];
            }
        };
    });

})();
