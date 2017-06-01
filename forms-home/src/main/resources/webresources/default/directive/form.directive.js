(function () {
    'use strict';
    /* jshint validthis: true */

    /**
     * @directive bbForm
     */
    function bbFormDirective() {
        return {
            restrict: 'E',
            controller: 'BBFormController as bbForm',
            templateUrl: 'directive/form.html',
            bindToController: {
                config: '<'
            }
        };
    }

    /**
     * @controller BBFormController
     * @ngInject
     */
    function BBFormController($scope, $log, SessionService, FormService, messages) {
        var form = this;

        $scope.$on('update', applyChanges);
        this.startSession = startSession;
        this.lookupMessage = lookupMessage;


        $scope.$on('configUpdated', function (pEvent, pParamB) {
            form.config = pParamB;
            createSession();
        });



        function createSession () {
            SessionService.createSession(form.config).then(function (session) {
                form.session = session;
                form.model = FormService.createForm(form.session);
                loadModel();
            });
        }

        function startSession() {
            console.log("FORMS UI:: StartSession::", form);
            form.session = null;
            form.model = null;

            //setup messages
            form.messages = FormService.getLocalizedMessages($scope.languageCode, messages);


            if (form.config) {
                var requiredPreferenceKeys = ['project', 'flow', 'branch', 'lang'];
                var errors = [];
                requiredPreferenceKeys.forEach(function (value) {
                    if (!form.config[value]) errors.push(value);
                });
                if (errors.length === 0) createSession();
                else {
                    console.log("Creating Session with no params", errors);
                    createSession();
                }
            }


        }

        function lookupMessage(messageKey) {
            return FormService.lookupMessage(form, messageKey);
        }

        function beforeRefresh() {
            form.isRefreshing = true;
        }

        function afterRefresh() {
            var model = form.model;

            if (model) {
                form.root = model.elementList.find(function (e) {
                    return e.isPage;
                });
                $scope.$applyAsync(function () {
                    form.isRefreshing = false;
                });
            }

        }

        function onFormError(error) {
            if (error.session) {
                SessionService.destroySession(form.session);
                startSession();
                return;
            }

            $log.error(error);
        }

        function loadModel() {
            beforeRefresh();
            FormService.updateForm(form.model).catch(onFormError).finally(afterRefresh);
        }

        function applyChanges($event) {
            console.log("FORM_UI::ApplyChanges", $event);
            var element = $event.targetScope.element;

            if (element.isButton || element.canBeUpdated ) {
                beforeRefresh();
                form.isLoading = element.isButton;

                FormService.applyChanges(form.model, element)
                    .catch(onFormError)
                    .finally(afterRefresh);
            }
        }

        this.handleUpdates =  function (pData) {
            FormService.handleUpdates(pData,this.model);
        };
    }

    function getElementByKey(key) {
        return this.model && this.model.getElementByKey(key);
    }

    BBFormController.prototype = {
        constructor: BBFormController,
        getElementByKey: getElementByKey,
        $onInit: function () {
            this.startSession();
        }
    };

    var app = angular.module('forms-ui');

    app.controller('BBFormController', BBFormController);
    app.directive('bbForm', bbFormDirective);
})();
