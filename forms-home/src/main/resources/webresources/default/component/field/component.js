(function () {

    /**
     * @ngInject
     */
    function registerComponent(ComponentRegistry) {
        ComponentRegistry.registerElement({
            name: 'field',
            condition: function(el) {
                var checks = [
                    el.isField
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