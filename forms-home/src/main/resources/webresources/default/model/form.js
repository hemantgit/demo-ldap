(function () {

    function FormFactory(Element) {
        /**
         * @class Form
         * @param {Session} session
         */
        function Form(session) {
            this.session = session;
            this.updateElements([]);

            /**
             * Array of elements in this form
             * @property {Array<Element>} elementList
             */

            /**
             * Map of elements in this form, accessible through the element's key
             * @property {Map<Element>} elementMap
             */
        }

        /**
         * Possible kinds of model changes
         */
        var actions = {
            ADD: 'add',
            DELETE: 'delete',
            UPDATE: 'update'
        };

        Form.prototype = {
            constructor: Form,
            updateElements: updateElements,
            getElementByKey: getElementByKey,
            getUpdates: getUpdates,
            applyChanges: applyChanges,

            actions: actions
        };

        /**
         * @param {string} key      Element key
         */
        function getElementByKey(key) {
            return this.elementMap.get(key) || null;
        }

        /**
         * Replace all form elements
         * @param {Array<Object>} elements
         */
        function updateElements(elements) {
            this.elementList = wrapElementList(elements);
            this.elementMap = makeElementMap(this.elementList);

            updateElementTree(this.elementList, this.elementMap);
        }

        /** @private */
        function wrapElementList(elements) {
            return elements.map(wrapElement);
        }

        /** @private */
        function wrapElement(e) {
            if (e instanceof Element === true) {
                return e;
            }

            return new Element(e);
        }

        /** @private */
        function addElement(form, model) {
            var element = wrapElement(model);
            form.elementMap.set(element.key, element);
            form.elementList.push(element);
        }

        /** @private */
        function removeElement(form, key) {
            var element = form.elementMap.get(key);

            if (!element) {
                return false;
            }

            form.elementMap.delete(key);
            form.elementList = form.elementList.filter(function(e) { return e.key !== key; });
        }

        /** @private */
        function updateElement(form, key, model) {
            var element = form.elementMap.get(key);

            if (!element) {
                return false;
            }

            element.update(model);
        }

        /** @private */
        function makeElementMap(elementList) {
            var map = new Map();

            elementList.forEach(function(e) {
                map.set(e.key, e);
            }, this);

            return map;
        }

        /** @private */
        function updateElementTree(list, map) {
            list.forEach(function(element) {
                if (!element.childKeys.length) { return; }

                element.children = element.childKeys.map(getElement);
            });

            function getElement(key) {
                return map.get(key);
            }
        }

        /**
         * Get the model differences to persist on servers
         * @param {Form} form
         * @returns {Array<Object>}
         */
        function getUpdates() {
            return this.elementList.map(elementToObject).filter(Boolean);
        }

        /**
         * Returns an object suitable to be sent as a "diff" to forms backend
         * @return {Object}
         * @private
         */
        function elementToObject(element) {
            if (!element.isDirty) {
                return;
            }

            return {
                key: element.key,
                values: angular.isArray(element.value) ? element.value : [element.value]
            };
        }

        /**
         * @param {Array<Object>} changes
         * @param {string} change.type      One of 'add', 'delete' or 'update'
         * @param {string} change.key       The key of an element to apply this update
         * @param {Object?} changes.model   A model object (element)
         */
        function applyChanges(changes) {
            changes.forEach(applyModelChange, this);
            updateElementTree(this.elementList, this.elementMap);
        }

        /** @private */
        function applyModelChange(change) {
            var type = change.type;

            if (actions.ADD === type) {
                return addElement(this, change.model);
            }

            if (actions.DELETE === type) {
                return removeElement(this, change.key);
            }

            if (actions.UPDATE === type) {
                return updateElement(this, change.key, change.model);
            }
        }

        return Form;
    }

    angular.module('forms-ui').factory('Form', FormFactory);
})();