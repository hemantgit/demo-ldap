(function () {

    /**
     * @ngInject
     */
    function registerComponent(ComponentRegistry) {
        ComponentRegistry.registerElement({
            name: 'container-recaptcha',
            condition: function(el) {
                var checks = [
                    el.contentStyle === 'BB_Recaptcha',
                    el.isContainer
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