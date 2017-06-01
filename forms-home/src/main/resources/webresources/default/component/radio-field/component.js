(function () {
    /**
     * @ngInject
     */
    function registerControl(ComponentRegistry) {
        ComponentRegistry.registerControl({
            name: 'radio-field',
            condition: function (el) {
                var checks = [
                    el.hasOptions,
                    !el.multiple,
                    el.styles.indexOf('radio') > -1 || el.styles.indexOf('Radio') > -1
                ];

                var score = checks.filter(function (value) {
                    return value;
                });

                return {score: score.length, totalMatch: score.length === checks.length};
            }

        });
    }

    angular.module('forms-ui').run(registerControl);
})();
