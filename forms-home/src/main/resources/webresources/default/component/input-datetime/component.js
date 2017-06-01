(function() {

    /**
     * @ngInject
     */
    function registerComponent(ComponentRegistry) {
        ComponentRegistry.registerControl({
            name: 'input-datetime',
            controller: 'BootstrapDateTimePickerController as controller',
            condition: function(el) {
                var checks = [
                    el.dataType === 'datetime'
                ];

                var score = checks.filter(function (value) {
                    return value;
                });

                return {score: score.length, totalMatch: score.length === checks.length};
            }
        });
    }
    angular.module('forms-ui').run(registerComponent);
})();
