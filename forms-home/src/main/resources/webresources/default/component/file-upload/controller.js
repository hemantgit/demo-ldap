(function () {
    angular.module('forms-ui').directive('fileUploadContent', function (Upload) {
        return {
            require: {
                form: '^^bbForm'
            },
            restrict: 'A',
            link: function ($scope, element, attrs, formsController) {
                var context = (element.context) ? element.context : element[0];
                //var target = $(context);
                //var input = target[0].querySelector("input");

                console.log("fileUPload LINK", context, "formsController", formsController);
                var updateChild;

                function makeUrl(runtimeUrl, sessionId, subscription, fileuploadID) {
                    return runtimeUrl + '/server/session/' + sessionId + '/subscription/' + subscription + '/fileupload/' + fileuploadID + '/';
                }

                function createTypeFilePattern(str) {
                    var pattern, arr, i, l;
                    arr = str.split('|') || [];
                    for (i = 0, l = arr.length; i < l; i++) {
                        arr[i] = '.' + arr[i];
                    }

                    pattern = arr.join(',');
                    return pattern;
                }

                var url, allowedExtensions, maxFileSize;


                var uploadProperties = $scope.element.properties;

                allowedExtensions = createTypeFilePattern(uploadProperties.allowedextensions || '');

                maxFileSize = uploadProperties.maxfilesize || "";
                maxFileSize = maxFileSize.toString();

                //--
                var form = formsController.form;
                var sessionConfig = form.config;
                var matchingList = {};


                url = makeUrl(sessionConfig.runtimePath, sessionConfig.sessionId, sessionConfig.sessionId, uploadProperties.configurationid);

                $scope.maxFileSize = maxFileSize;
                $scope.allowedExtensions = allowedExtensions;
                $scope.uploaded = [];


                // upload on file select or drop
                $scope.upload = function (file) {
                    console.log("UploadSelection:: ", file);
                    if (!file)
                        return;

                    Upload.upload({
                        url: url,
                        headers: {
                            "X-CSRF-Token": form.model.csrfToken
                        },
                        file: file
                    }).progress(function (evt) {
                        $scope.progress = parseInt(100.0 * evt.loaded / evt.total);
                        $scope.progressStyle.width = $scope.progress + '%';
                    }).success(function (data) {
                        console.log("uploadSuccess:",data);
                        setTimeout(function () {
                            formsController.form.handleUpdates({data: data});
                        }, 1000);
                        $scope.$emit('update');
                    }).error(function (data) {
                        console.log("upload error", data);
                        $scope.$emit("update");
                    }).finally(function () {
                        $timeout(function () {
                            console.log("Finally ");
                            $scope.progress = 0;
                            $scope.progressStyle.width = 0;
                        }, 300);
                    });
                };

                $scope.uploadError = function () {
                    if ($scope.element.children.length) {
                        return $scope.element.children.filter(function (e) {
                                var el = formsController.lookupElement(e);
                                return el.name == 'errorMessages';
                            }).length > 0;
                    }

                    return false;
                };

                $scope.filterChildren = function () {
                    return $scope.element.children.filter(function (e) {
                        var el = formsController.lookupElement(e);
                        return el.name != 'FileUploaded';
                    });
                };

                $scope.progress = 0;

                $scope.progressStyle = {
                    width: 0
                };

            }
        };
    });
})();
