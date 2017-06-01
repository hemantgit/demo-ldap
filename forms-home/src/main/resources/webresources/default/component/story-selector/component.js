(function () {

    /**
     * @ngInject
     */
    function registerComponent(ComponentRegistry) {
        ComponentRegistry.registerElement({
            name: 'story-selector',
            condition: function(el) {
                var checks = [
                    el.isContainer,
                    el.styles.indexOf('story_selector') > -1
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