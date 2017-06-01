(function () {
    /**
     * @ngInject
     */
    function registerElement(ComponentRegistry) {
        ComponentRegistry.registerElement({
            name: 'button-icon',
            condition: function (el) {
                var checks = [
                    el.isButton,
                    el.styles.indexOf('button_icon') > -1
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
