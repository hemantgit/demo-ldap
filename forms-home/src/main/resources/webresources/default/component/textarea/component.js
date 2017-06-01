(function() {

    /**
     * @ngInject
     */
    function registerComponent(ComponentRegistry) {
        ComponentRegistry.registerControl({
            name: 'textarea',
            condition: function(el) {
                var checks = [
                    el.dataType === 'text',
                    !el.hasDomain,
                    el.styles.indexOf('memo') > -1

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
