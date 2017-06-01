(function () {
    /**
     * @ngInject
     */
    function registerElement(ComponentRegistry) {
        ComponentRegistry.registerElement({
            name: 'radio-group',
            controller: 'RadioGroupController as controller',
            condition: function (el) {
                var checks = [
                    el.hasOptions,
                    !el.multiple,
                    el.styles.indexOf('radio') > -1
                ];

                var score = checks.filter(function (value) {
                    return value;
                });

                return {score: score.length, totalMatch: score.length === checks.length};
            }

        });
    }

    angular.module('forms-ui').run(registerElement);
})();
