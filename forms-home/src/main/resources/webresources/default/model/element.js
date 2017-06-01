(function () {
    /**
     * Form Element
     * @class
     */
    function Element(model) {
        this.update(model);
    }



    addGetter('text', function() { return this._e.text; });
    addGetter('questionText', function() { return this._e.questionText; });
    addGetter('key', function() { return this._e.key; });
    addGetter('dataType', function() { return this._e.dataType || ''; });
    addGetter('type', function() { return this._e.type || ''; });
    addGetter('name', function() { return this._e.name || ''; });
    addGetter('maxLength', function() { return Number(this._e.displayLength) || 0; });
    addGetter('options', function() { return this._e.domain; });
    addGetter('properties', function() { return this._e.properties; });
    addGetter('hasOptions', function() { return !!this._e.hasDomain; });
    addGetter('hasDomain', function() { return !!this._e.hasDomain; });
    addGetter('label', function() { return this._e.questionText; });
    addGetter('description', function() { return this._e.explainText || ''; });
    addGetter('messages', function() { return this._e.messages || []; });
    addGetter('multiple', function() { return !!this._e.multiValued; });
    addGetter('disabled', function() { return !!this._e.disabled; });
    addGetter('readOnly', function() { return !!this._e.readonly; });
    addGetter('canBeUpdated', function() { return !!this._e.refresh; });
    addGetter('required', function() { return !!this._e.required; });
    addGetter('validations', function() { return this._e.validations || []; });
    addGetter('originalValue', function() { return this._e.values; });
    addGetter('value', function() { return this._e.values; }, function(v) { this._e.values = v; });
    addGetter('childKeys', function() { return this._e.children || []; });
    addGetter('styles', function() { return this._e.styles || []; });
    addGetter('contentStyle', function() { return this._e.contentStyle || []; });
    addGetter('classList', function() { return this.styles.length === 0 ? '' : this.styles.join(' ').replace(/_/g, '-'); });
    addGetter('isDirty', isDirty);
    addGetter('hasError', hasError);

    // rules for element types
    addGetter('isPage', function() { return this._e.type === 'page'; });
    addGetter('isButton', function() { return this._e.type === 'button'; });
    addGetter('isContainer', function() { return this._e.type === 'container'; });
    addGetter('isField', function() { return this._e.type === 'field'; });

    function isDirty() {
        var originalValue = this._values;
        var newValue = this._e.values;

        if (originalValue === newValue) {
            return false;
        }

        return !areArraysEqual(toArray(this._e.values), toArray(this._values));
    }

    function hasStyle(style) {
        return this.styles.length && this.styles.indexOf(style) > -1;
    }

    function hasError() {
        return this.messages.length && this.messages[0].type === 'ERROR';
    }

    function getProperty(name) {
        return this._e[name];
    }

    function updateElementModel(model) {
        if (!model) {
            throw new Error('Invalid model to apply on element');
        }

        if (model.values === undefined) {
            model.values = [];
        }

        if (!Array.isArray(model.values)) {
            model.values = [model.values];
        }

        this._e = model;
        this._values = model.values.length ? angular.copy(model.values) : [];
    }

    function addGetter(name, getterFn, setterFn) {
        Object.defineProperty(Element.prototype, name, { get: getterFn, set: setterFn || angular.noop });
    }

    function areArraysEqual(a, b) {
        if (a === b) {
            return true;
        }

        // both are arrays but not the same length
        if (a.length !== b.length) {
            return false;
        }

        // shortcut for arrays with one element
        if (a.length === 1) {
            return a[0] === b[0];
        }

        a.sort();
        b.sort();

        var index = a.length;

        while (index--) {
            if (a[index] !== b[index]) {
                return false;
            }
        }

        return true;
    }

    function toArray(value) {
        return Array.isArray(value) ? value : [value];
    }

    Element.prototype.get = getProperty;
    Element.prototype.update = updateElementModel;
    Element.prototype.hasStyle = hasStyle;

    angular.module('forms-ui').value('Element', Element);
})();