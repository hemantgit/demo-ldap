describe('FormService', function() {
    beforeEach(module('forms-ui'));

    describe('#createForm(session)', function() {
        it('should create and return a Form instance', inject(function(FormService, Form, Session) {
            var session = new Session({});
            var form = FormService.createForm(session);
            expect(form instanceof Form).toBe(true);
        }));
    });

    var sessionId = '9f383aff-a49b-4bd5-b5a6-986e06f6b20f';

    var sessionOptions = {
        project: 'test-project',
        flow: 'flow',
        version: '0.0.1-dev',
        lang: 'en-GB',
        runtimePath: '/runtime'
    };

    var modelMock = {
        elements: [{
            key: 'P242-C1',
            name: null,
            properties: {},
            children: ['P242-C1-B0'],
            displayName: null,
            contentStyle: 'container',
            type: 'container',
            styles: []
        }],
        language: {
            patterns: {
                date: 'yyyy-mm-dd',
                datetime: 'yyyy-mm-dd hh:mm:ss'
            },
            languageCode: 'en-GB'
        }
    };

    describe('#createForm', function() {
        it('should return a new Form instance for a given Session', inject(function(Session, Form, FormService) {
            var session = new Session(sessionOptions);
            var form = FormService.createForm(session);

            expect(form instanceof Form).toBe(true);
        }));
    });

    describe('#updateForm(form)', function() {
        it('should fetch the current model state from server and update form elements', inject(function(Session, Form, FormService, $httpBackend) {
            var session = new Session(sessionOptions);
            var form = FormService.createForm(session);

            session.sessionId = sessionId;

            spyOn(form, 'updateElements');

            var fetchUrl = sessionOptions.runtimePath +
                '/server/session/' + sessionId +
                '/api/subscribe/' + sessionId;

            $httpBackend.expectPOST(fetchUrl).respond(modelMock);

            FormService.updateForm(form);

            $httpBackend.flush();
            expect(form.updateElements).toHaveBeenCalledWith(modelMock.elements);
        }));
    });

    describe('#applyChanges(form, changes)', function() {
        it('should send the updates on form to server, then apply the diff on form', inject(function(Form, FormService, Session, $httpBackend) {
            var session = new Session(sessionOptions);
            var form = FormService.createForm(session);

            session.sessionId = sessionId;

            var elementData = {
                key: 'P1-F1',
                values: 1
            };

            form.updateElements([elementData]);

            var element = form.getElementByKey(elementData.key);
            element.value = 2;

            expect(element.isDirty).toBe(true);

            var formDifference = form.getUpdates();

            var changesToApply = {
                elementKey: element.key,
                fields: formDifference
            };

            var updateUrl = sessionOptions.runtimePath +
                '/server/session/' + sessionId +
                '/api/subscription/' + sessionId +
                '/handleEvent';

            var changes = [{
                type: form.actions.UPDATE,
                model: { key: 'P1-F1', values: 2 }
            }];

            // this is an update returned from forms runtime server
            var responseToChanges = {
                events: [{
                    changes: {
                        changes: changes
                    }
                }]
            };

            $httpBackend.expectPOST(updateUrl, changesToApply).respond(responseToChanges);

            FormService.applyChanges(form, element);
            $httpBackend.flush();

            // in the end of the process, the element model should be updated with the
            // changes returned from server
            expect(element.value).toBe(2);
        }));
    });
});
