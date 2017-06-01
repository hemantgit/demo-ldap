(function() {
    /**
     * @ngInject
     */
    function registerControl(ComponentRegistry) {
        ComponentRegistry.registerControl({
            name: 'stepped-slider',
            controller: 'SteppedSliderController as controller',

            condition: function (el) {
                var checks = [
                    el.styles.indexOf('stepped_slider') > -1,
                    el.hasOptions,
                    !el.multiple
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
