describe('Form', function() {
    describe('#applyChanges(changes)', function() {
        it('should add an element to a form', inject(function(Form, Session) {
            var session = new Session({});
            var form = new Form(session);

            var elementData = {
                key: 'F123',
                values: [1]
            };

            var changes = [{
                type: form.actions.ADD,
                model: elementData
            }];

            form.applyChanges(changes);
            var newElement = form.elementMap.get(elementData.key);

            expect(form.elementList.length).toBe(1);
            expect(newElement.value[0]).toBe(1);
        }));

        it('should remove an element from a form', inject(function(Form, Session) {
            var session = new Session({});
            var form = new Form(session);

            var elementData = {
                key: 'F123',
                values: [1]
            };

            form.updateElements([elementData]);
            expect(form.elementList.length).toBe(1);

            var changes = [{
                type: form.actions.DELETE,
                key: elementData.key
            }];

            form.applyChanges(changes);

            expect(form.elementList.length).toBe(0);
        }));

        it('should update an element on a form', inject(function(Form, Session) {
            var session = new Session({});
            var form = new Form(session);

            var elementData = {
                key: 'F123',
                values: [1]
            };

            var updatedData = {
                key: 'F123',
                values: [2]
            };

            form.updateElements([elementData]);
            expect(form.elementList.length).toBe(1);

            var changes = [{
                type: form.actions.UPDATE,
                key: elementData.key,
                model: updatedData
            }];

            form.applyChanges(changes);

            expect(form.elementList.length).toBe(1);

            var element = form.elementMap.get(elementData.key);
            expect(element.value[0]).toBe(2);
        }));
    });

    describe('#updateElements(elements)', function() {
        it('should update form elements and their hierarchy', inject(function(Form, Session) {
            var session = new Session({});
            var form = new Form(session);

            var pageModel = {
                key: 'P123',
                children: ['P123-C0']
            };

            var containerModel = {
                key: 'P123-C0',
                children: ['P123-C0-F1']
            };

            var fieldModel = {
                key: 'P123-C0-F1'
            };

            var elements = [pageModel, containerModel, fieldModel];

            form.updateElements(elements);

            expect(form.elementList.length).toBe(3);

            var page = form.getElementByKey(pageModel.key);
            var container = form.getElementByKey(containerModel.key);
            var field = form.getElementByKey(fieldModel.key);

            expect(page.children[0]).toBe(container);
            expect(container.children[0]).toBe(field);
        }));
    });

    describe('#getUpdates()', function() {
        it('should return the changes applied on form elements', inject(function(Session, Form) {
            var fieldA = {
                key: 'P123-C0-F1',
                values: [2]
            };

            var fieldB = {
                key: 'P123-C0-F2',
                values: [1, 2]
            };

            var session = new Session({});
            var form = new Form(session);

            form.updateElements([fieldA, fieldB]);
            var elementA = form.getElementByKey(fieldA.key);
            var elementB = form.getElementByKey(fieldB.key);

            var updates = form.getUpdates();
            expect(updates).toEqual([]);

            elementB.value = [1, 3];

            updates = form.getUpdates();
            expect(updates).toEqual([{
                key: fieldB.key,
                values: [1, 3]
            }]);

            elementA.value = [42];

            updates = form.getUpdates();
            expect(updates).toEqual([{
                key: fieldA.key,
                values: [42]
            }, {
                key: fieldB.key,
                values: [1, 3]
            }]);
        }));
    });

    describe('#getElementByKey(key)', function() {
        it('should return null if the element does not exists on form', inject(function (Form, Session) {
            var session = new Session({});
            var form = new Form(session);

            var element = form.getElementByKey('invalid-key');
            expect(element).toBe(null);
        }));

        it('should return an element stored on form model for the given key', inject(function (Form, Session) {
            var field = {
                key: 'P1-F0'
            };

            var session = new Session({});
            var form = new Form(session);

            form.updateElements([field]);

            var element = form.getElementByKey(field.key);
            expect(element.key).toBe(field.key);
        }));
    });
});
