(function () {
    /**
     * @ngInject
     */
    function registerElement(ComponentRegistry) {
        ComponentRegistry.registerElement({
            name: 'radio-record',
            condition: function (el) {
                var checks = [
                    el.isField,
                    el.hasOptions,
                    !el.multiple,
                    el.styles.indexOf('radio_record') > -1
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
