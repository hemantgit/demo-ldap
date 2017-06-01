(function () {

    /**
     * Controller for stepped-slider components
     * Adds a mapper between options and values to local scope
     * @ngInject
     */
    function BootstrapDatepickerController($scope) {

    }

    angular.module('forms-ui').controller('BootstrapDatepickerController', ['$scope', BootstrapDatepickerController]);
    angular.module('forms-ui').directive('bootstrapDatepicker', function () {
        return {
            restrict: 'C',
            controller: 'BootstrapDatepickerController as controller',
            template: '<input type="text" class="form-control" ' +
            'name="{{element.name}}" ' +
            'id="{{element.key}}" ' +
            'ng-required="{{element.required}}" ' +
            'ng-disabled="{{element.disabled}}" ' +
            'ng-readonly="{{element.readOnly}}"' +
            'ng-value="{{element.value}}"' +
            "ng-class={'has-error':element.hasError}" +
            ' novalidate />' +
            '<span class="input-group-addon"> ' +
            '<span class="fa fa-calendar"></span></span>',
            link: function ($scope, element, attrs,$filter) {
                var context = (element.context)?element.context:element[0];
                var target = $(context);
                var input = target[0].querySelector("input");

                $scope.$watch("element.messages",function (pNew,pOld) {
                    //console.log("messages",pNew,pOld);
                });

                target.datepicker({format: 'yyyy-mm-dd', autoclose: true, container:target[0]});
                target.on('changeDate', function (e) {
                    $scope.element.value = [input.value];
                    $scope.$emit('update');
                    $scope.$evalAsync();
                });

            }
        };
    });
})();
