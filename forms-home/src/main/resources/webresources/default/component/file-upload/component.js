(function() {

    /**
     * @ngInject
     */
    function registerElement(ComponentRegistry) {
        ComponentRegistry.registerElement({
            name: 'file-upload',
            condition: function(el) {
                var checks = [
                    el.contentStyle === 'fileupload',
                    el.isContainer
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
