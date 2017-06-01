(function() {

    /**
     * @ngInject
     */
    function registerComponent(ComponentRegistry) {
        ComponentRegistry.registerControl({
            name: 'checkbox-group',
            controller: 'CheckboxGroupController as cbg',
            condition: function(el) {
                var checks = [
                    el.hasOptions,
                    el.multiple
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
