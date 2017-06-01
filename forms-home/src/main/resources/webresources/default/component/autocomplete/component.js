(function () {
    /**
     * @ngInject
     */
    function registerComponent(ComponentRegistry) {
        ComponentRegistry.registerControl({
            name: 'autocomplete',
            controller: 'AutoCompleteController as controller',
            condition: function (el) {
                var checks = [
                    el.styles.indexOf("autocomplete") >= 0
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
