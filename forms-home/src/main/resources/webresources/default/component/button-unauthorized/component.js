(function () {

    /**
     * @ngInject
     */
    function registerComponent(ComponentRegistry) {
        ComponentRegistry.registerElement({
            name: 'button-unauthorized',
            condition: function(el) {
                var checks = [
                    el.isButton,
                    el.name === 'Unauthorized'

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