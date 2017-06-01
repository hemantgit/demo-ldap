(function() {
    angular.module('forms-ui').directive('amendmentList',  /*@ngInject*/ function () {
        return {
            restrict: 'A',
            link: function ($scope, element, attrs,$filter) {
                $scope.collapse = false;
                var context = (element.context)?element.context:element[0];


                console.log("amendment ReadONly??",$scope);
                //console.log("amendment LIST",$scope.element.parent);

                $scope.$on("collapse-amendments-list",function () {
                    //context.style.height = context.getBoundingClientRect().height + "px";
                    setTimeout(function () {
                        $scope.collapse = true;
                        $scope.$evalAsync();
                    }, 50);
                });

                $scope.$on("open-amendments-list",function () {
                    //context.style.height = context.getBoundingClientRect().height + "px";
                    setTimeout(function () {
                        $scope.collapse = false;
                        $scope.$evalAsync();
                    }, 50);
                });



            }
        };
    });

})();
