(function() {
    /**
     * @ngInject
     */
    function registerControl(ComponentRegistry) {
        ComponentRegistry.registerElement({
            name: 'stickyblock',
            condition: function (el) {
                var checks = [
                    el.isContainer,
                    el.styles.indexOf("stickyblock") > -1
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
