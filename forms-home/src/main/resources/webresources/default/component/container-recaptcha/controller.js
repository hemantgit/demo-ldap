   /**
   * This directive is designed to render Google Recaptcha
   * We use sitekey and secretkey for domain backbasecloud.com
   * Keys lay in the backbase.properties file
   */


(function() {
    angular.module('forms-ui').directive('recaptcha',  /*@ngInject*/ function () {
        return {
            restrict: 'A',
            link: function ($scope, element, attrs,$filter) {
                var context = (element.context)?element.context:element[0];
                var sitekey = $scope.element.properties['data-sitekey'];
                console.log("sitekey",sitekey,'context',context,"recaptchaScope!",$scope,$scope.model);

                $scope.siteKey = sitekey;
                var firstChild = null;

                $scope.$watch ("element.children",function (pNuChildren,oldChild) {
                    if (pNuChildren && pNuChildren.length) firstChild = pNuChildren[0];
                });


                function checkForCaptcha () {
                    try  {
                        captchaReady();
                    }catch (err) {
                        console.log("captcha err",err);
                        setTimeout(checkForCaptcha,250);
                    }
                }

                function captchaReady () {
                      grecaptcha.render(
                        context.querySelector(".google_captcha_holder"), {
                            "sitekey": sitekey,
                            "callback": function(response){
                                console.log("gotCallBack");
                                if (firstChild) {
                                    firstChild.value[0]= response;
                                    $scope.$emit('update');
                                }
                            }
                        });
                }

               setTimeout (checkForCaptcha,250);


            }
        };
    });

})();