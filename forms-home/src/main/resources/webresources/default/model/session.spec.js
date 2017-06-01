describe('Session', function() {
    beforeEach(module('forms-ui'));

    describe('#constructor(options)', function() {
        it('should save a copy of options object', inject(function (Session) {
            var options = {
                project: 'test-project',
                flow: 'flow',
                version: '0.0.1',
                lang: 'nl',
                runtimePath: '/runtime'
            };

            var session = new Session(options);

            expect(session.options).not.toBe(options);
            expect(session.options).toHaveProperties(options);
        }));
    });

    describe('#getSessionKey()', function() {
        it('should return a string with all the session options combined', inject(function (Session) {
            var o = {
                project: 'test-project',
                flow: 'flow',
                version: '0.0.1-dev',
                lang: 'en-GB',
                runtimePath: '/runtime'
            };

            var session = new Session(o);

            var sessionStorageKey = [
                'bbForms',
                o.project,
                o.flow,
                o.version,
                o.lang,
                o.runtimePath
            ];

            sessionStorageKey = sessionStorageKey.join('.');

            expect(session.getSessionKey()).toBe(sessionStorageKey);
        }));
    });
});