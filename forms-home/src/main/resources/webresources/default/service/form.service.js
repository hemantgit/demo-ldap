(function () {
    'use strict';
    /* jshint validthis: true */

    var MODEL_FETCH_URL = '%runtimePath%/server/session/%sessionId%/api/subscribe/%sessionId%';
    var MODEL_UPDATE_URL = '%runtimePath%/server/session/%sessionId%/api/subscription/%sessionId%/handleEvent';

    var knownErrors = {
        SESSION_EXPIRED: 'UNKNOWN_SESSION'
    };

    /**
     * Create and populate form sessions
     * @class
     * @ngInject
     */
    function FormService($http, $q, StringUtils, Form) {

        /**
         * @param {Session} session     Session attached to this form
         * @return {Form}
         */
        function createForm(session) {
            return new Form(session);
        }

        /**
         * Update the state of a form with the model state from server
         * @param {Form} form
         * @return {Promise}
         */
        function updateForm(form) {
            var fetchUrl = createUrlFromTemplate(form, MODEL_FETCH_URL);

            return $http.post(fetchUrl).then(function (response) {
                form.updateElements(response.data.elements);
                form.csrfToken = response.data.csrfToken;
                return form;
            })
                .catch(handleRequestErrors);
        }

        function handleRequestErrors(response) {
            var errorInfo = response.data;

            if (!errorInfo || !errorInfo.errorType) {
                return $q.reject(response);
            }

            var errorType = errorInfo.errorType;
            var error;

            if (errorType === knownErrors.SESSION_EXPIRED) {
                error = new Error('Session expired');
                error.session = true;

                return $q.reject(error);
            }

            return $q.reject(error);
        }


        function handleUpdates(response, pForm) {
            var result = response.data;
            var events = result.events;
            if (!(events && events.length)) {
                return;
            }
            if (events.length) {
                events.forEach(function (pEvent) {
                    applyChangesOnForm(pEvent, pForm);
                });
            }

        }

        /**
         * @param {Form} form
         * @param {Element} element
         */
        function applyChanges(form, element) {
            //Taken from Darlan
            var deltasToSend = form.getUpdates();
            var deltas = {
                //key is different in Darlans
                elementKey: element.key,
                fields: deltasToSend
            };
            var updateUrl = createUrlFromTemplate(form, MODEL_UPDATE_URL);
            var httpHeaders = {
                //Token should be changed to session
                'X-CSRF-Token': form.csrfToken
            };
            var httpConfig = {
                method: 'post',
                url: updateUrl,
                data: deltas,
                headers: httpHeaders
            };

            return $http(httpConfig).then(function (pResponse) {
                handleUpdates(pResponse, form);
            }).catch(handleRequestErrors);
        }

        /** @private */
        function applyChangesOnForm(pEvent, form) {
            //Taken from Darlan
            while ('changes' in pEvent) pEvent = pEvent.changes;
            if (pEvent) form.applyChanges(pEvent);

        }

        /** @private */
        function createUrlFromTemplate(form, template) {
            var session = form.session;
            var options = Object.create(session.options);
            options.sessionId = session.sessionId;

            return StringUtils.replaceVariables(template, options);
        }

        function getLocalizedMessages(locale, messages) {
            var availableLocales = Object.keys(messages);
            locale = locale || 'en';

            var bestMatchLocale = availableLocales.sort().reduce(function (prev, current) {
                return locale.indexOf(current) > -1 ? current : prev;
            }, null);

            return messages[bestMatchLocale];
        }

        function lookupMessage(form, messageKey) {
            var message = form.messages && form.messages[messageKey];
            return message || '';
        }

        return {
            createForm: createForm,
            updateForm: updateForm,
            applyChanges: applyChanges,
            getLocalizedMessages: getLocalizedMessages,
            lookupMessage: lookupMessage,
            handleUpdates: handleUpdates
        };
    }

    angular.module('forms-ui').service('FormService', FormService);
})();
