   /**
   * This directive is designed to render Google Recaptcha
   * We use sitekey and secretkey for domain backbasecloud.com
   * Keys lay in the backbase.properties file
   */


(function() {
    angular.module('forms-ui').directive('downloadContainer',  /*@ngInject*/ function ($http) {
        return {
            restrict: 'A',
            require: {
                form: '^^bbForm'
            },
            link: function ($scope, element, attrs,formsController) {
                var context = (element.context)?element.context:element[0];
                $scope.configurationId = $scope.$parent.element.properties.configurationid;
                $scope.$on("file-download-request",function (evt) {
                    var form =formsController.form;
                    var sessionConfig = form.config;

                    function makeUrl(runtimeUrl, sessionId, pFileDownloadId) {
                        return runtimeUrl + '/server/session/' + sessionId + '/filedownload/' + pFileDownloadId +'';
                    }

                    var url = makeUrl(sessionConfig.runtimePath, sessionConfig.sessionId, $scope.configurationId);
                    $http({method: 'GET',url: url+'/checkauthorization'}).then(function (response) {
                        window.open(url);
                    }, function errorCallback(response) {
                        console.log("failed on auth",response);
                    });


                });


            }
        };
    });

})();