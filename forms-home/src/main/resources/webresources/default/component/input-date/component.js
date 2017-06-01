(function() {

    /**
     * @ngInject
     */
    function registerComponent(ComponentRegistry) {
        ComponentRegistry.registerControl({
            name: 'input-date',
            controller: 'BootstrapDatepickerController as controller',
            condition: function(el) {
                var checks = [
                    el.dataType === 'date'
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
