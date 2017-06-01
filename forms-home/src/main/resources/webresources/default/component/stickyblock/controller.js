(function () {
    angular.module('forms-ui').directive('stickyBlock', function () {
        return {
            restrict: 'A',
            link: function ($scope, element, attrs, formsController) {
                var context = (element.context) ? element.context : element[0];
                var box = context.getBoundingClientRect();
                function getScrollY() {
                    var response = 0;
                    if (typeof( window.pageYOffset ) == 'number') response = window.pageYOffset;
                    else if (document.body && document.body.scrollTop) response = document.body.scrollTop;
                    return response;
                }

                function handleScroll() {
                    var scrollY = getScrollY();
                    var diff = scrollY - box.top;
                    if (diff > -20) {
                        if ($scope.fixed)return;
                        $scope.fixed = true;
                        $scope.$evalAsync();

                    } else {
                        if (!$scope.fixed)return;
                        $scope.fixed = false;
                        $scope.$evalAsync();

                    }
                }

                window.addEventListener("scroll", handleScroll);
            }
        };
    });
})();
