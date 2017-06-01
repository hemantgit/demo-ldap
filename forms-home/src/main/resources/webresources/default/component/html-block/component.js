(function () {

    /**
     * @ngInject
     */
    function registerComponent(ComponentRegistry) {
        ComponentRegistry.registerElement({
            name: 'html-block',
            condition: function(el) {
                var checks = [
                    el.type === 'asset'
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