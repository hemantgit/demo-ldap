   /**
   * This directive is designed to render Google Recaptcha
   * We use sitekey and secretkey for domain backbasecloud.com
   * Keys lay in the backbase.properties file
   */


(function() {
    angular.module('forms-ui').directive('lightbox',  /*@ngInject*/ function ($http) {
        return {
            restrict: 'A',
            link: function ($scope, element, attrs,$filter) {
                var context = (element.context)?element.context:element[0];
                console.log("lightbox link!");
            }
        };
    });

})();