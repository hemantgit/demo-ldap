describe('SessionService', function() {
    beforeEach(module('forms-ui'));

    describe('#createSession(options)', function() {
        var di;

        var options = {
            project: 'test-project',
            flow: 'flow',
            version: '0.0.1-dev',
            lang: 'en-GB',
            runtimePath: '/runtime'
        };

        var sessionId = '9f383aff-a49b-4bd5-b5a6-986e06f6b20f';

        beforeEach(inject(function($injector) {
            di = $injector;
        }));

        it('should start a session from an HTML document and the given options', function() {
            var SessionService = di.get('SessionService');
            var Session = di.get('Session');
            var $httpBackend = di.get('$httpBackend');
            var $sessionStorage = di.get('$sessionStorage');

            SessionService.createSession(options).then(sessionCreated);

            function sessionCreated(session) {
                expect(session instanceof Session).toBe(true);

                // options are fileed with the default theme and UI
                expect(session.options.theme).toBe(SessionService.DEFAULT_THEME);
                expect(session.options.ui).toBe(SessionService.DEFAULT_UI);

                // session id found in session HTML page from forms runtime
                expect(session.sessionId).toBe(sessionId);

                var sessionStorageKey = session.getSessionKey();
                expect($sessionStorage.getItem(sessionStorageKey)).toBe(sessionId);
            }

            // See mocks/ui-test/session.html for a complete HTML reference
            var sessionHtml = '... = {appUri:\'%runtimePath%/server/vaadin/sessionTools-' + sessionId + '\', standalone: true} ...';

            $httpBackend.expectGET(/server\/start/).respond(sessionHtml);
            $httpBackend.expectPOST(/server\/session\/(.+)\/api\/subscribe/).respond(200);

            $httpBackend.flush();
        });

        it('should start a session from a JSON document and the given options', function() {
            var SessionService = di.get('SessionService');
            var Session = di.get('Session');
            var $httpBackend = di.get('$httpBackend');
            var $sessionStorage = di.get('$sessionStorage');

            SessionService.createSession(options).then(sessionCreated);

            function sessionCreated(session) {
                expect(session instanceof Session).toBe(true);

                // options are fileed with the default theme and UI
                expect(session.options.theme).toBe(SessionService.DEFAULT_THEME);
                expect(session.options.ui).toBe(SessionService.DEFAULT_UI);

                // session id found in session HTML page from forms runtime
                expect(session.sessionId).toBe(sessionId);

                var sessionStorageKey = session.getSessionKey();
                expect($sessionStorage.getItem(sessionStorageKey)).toBe(sessionId);
            }

            var sessionJson = '{"sessionId":"' + sessionId + '","sessionTimeout":900,"baseUri":"/forms-runtime/server/session/"}';

            $httpBackend.expectGET(/server\/start/).respond(sessionJson);
            $httpBackend.expectPOST(/server\/session\/(.+)\/api\/subscribe/).respond(200);

            $httpBackend.flush();
        });
    });
});
