(function() {
    'use strict';
    /* jshint validthis: true */

    var HTML_SESSIONID_MATCHER = /appUri:.*?server\/vaadin\/sessionTools-(.+)'/;
    var DEFAULT_THEME = 'forms';
    var DEFAULT_UI = 'mvc';

    /**
     * Create and populate form sessions
     * @service SessionService
     * @ngInject
     */
    function SessionService($http, $sessionStorage, $q, StringUtils, Session) {

        /**
         * Create a form session
         * @param {Object} options      Session options
         * @return {Promise<Session>}
         */
        function createSession(options) {
            console.log("FORMS_UI:: createSession",session);
            var session = new Session(options);

            var initialize = initializeSession.bind(null, session);
            var subscribe = subscribeToSession.bind(null, session);

            return $q.when(session)
                .then(initialize)
                .then(subscribe)
                .then(returnSession);

            function returnSession() {
                return session;
            }

        }

        function destroySession(session) {
            var storageKey = session.getSessionKey();
            $sessionStorage.setItem(storageKey, '');
            session.sessionId = '';
        }

        /**
         * Subscribe to model updates on a session
         * @param {Session} session
         * @return {Promise}
         * @private
         */
        function subscribeToSession(session) {
            console.log("FORMS_UI:: subscribeToSession",session);
            var subscribeUrl = session.options.runtimePath + '/server/session/' + session.sessionId + '/api/subscribe';
            return $http.post(subscribeUrl);
        }

        /**
         * Initialize a session object
         * Grab a session id from local storage or create a new session otherwise
         * @private
         */
        function initializeSession(session) {
            console.log("FORMS_UI:: initializeSession",session);
            var options = session.options;

            // default values for theme/ui, used on forms runtime
            options.ui = options.ui || DEFAULT_UI;
            options.theme = options.theme || DEFAULT_THEME;

            var storageKey = session.getSessionKey();
            var sessionId = options.sessionId || $sessionStorage.getItem(storageKey);

            if (sessionId) {
                session.sessionId = sessionId;
                return $q.when(session);
            }

            return createSessionId(session).then(function() {
                $sessionStorage.setItem(storageKey, session.sessionId);
            });
        }

        /**
         * Get a session id from forms runtime
         * @private
         */
        function createSessionId(session) {
            console.log("FORMS_UI:: createSessionId",session);
            var urlOptions = StringUtils.toQueryString(session.options);
            var sessionUrl = session.options.runtimePath + '/server/start?' + urlOptions;

            // TODO check invalid session ID and recover from it

            return $http.get(sessionUrl).then(function(response) {
                var sessionData = response.data;
                var sessionId;

                if (typeof sessionData === 'object') {
                    sessionId = sessionData.sessionId;
                } else {
                    sessionId = parseSessionFromHtml(sessionData);
                }

                session.sessionId = sessionId;

                return session;
            });
        }

        /**
         * Grabs a session ID from an HTML document returned on forms runtime call
         * @private
         */
        function parseSessionFromHtml(html) {
            var sessionId = html.match(HTML_SESSIONID_MATCHER);
            return sessionId && sessionId[1] || '';
        }

        return {
            createSession: createSession,
            destroySession: destroySession,

            DEFAULT_THEME: DEFAULT_THEME,
            DEFAULT_UI: DEFAULT_UI
        };
    }

    angular.module('forms-ui').service('SessionService', SessionService);
})();
