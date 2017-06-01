describe('ComponentRegistry', function() {
    beforeEach(module('forms-ui'));

    describe('#registerControl(config)', function() {
        it('should register a new control', inject(function(ComponentRegistry) {
            var config = {
                name: 'control',
                condition: function() {}
            };

            ComponentRegistry.registerControl(config);

            var component = ComponentRegistry.components.find(function(c) {
                return c.name === config.name;
            });

            expect(component.condition).toBe(config.condition);
            expect(component.name).toBe(config.name);
            expect(component.isElement).not.toBe(true);
        }));
    });

    describe('#registerElement(config)', function() {
        it('should register a new element', inject(function(ComponentRegistry) {
            var config = {
                name: 'element',
                condition: function() {}
            };

            ComponentRegistry.registerElement(config);

            var component = ComponentRegistry.components.find(function(c) {
                return c.name === config.name;
            });

            expect(component.condition).toBe(config.condition);
            expect(component.name).toBe(config.name);
            expect(component.isElement).toBe(true);
        }));
    });

    describe('#findElement(element)', function() {
        it('should return null if no component matches the given element', inject(function(ComponentRegistry, Element) {
            var element = new Element({
                style: 'cp-style'
            });

            var result = ComponentRegistry.findElement(element);

            expect(result).toBe(null);
        }));

        it('should find a component to render a given element', inject(function(ComponentRegistry, Element) {
            var element = new Element({
                styles: 'cp-style'
            });

            var config = {
                name: 'foo',
                condition: function(element) {
                    return element.styles === 'cp-style';
                }
            };

            spyOn(config, 'condition').and.callThrough();


            ComponentRegistry.registerElement(config);

            var component = ComponentRegistry.findElement(element);
            expect(component).not.toBe(null);
            expect(config.condition).toHaveBeenCalledWith(element);
        }));
    });

    describe('#findControl(element)', function() {
        it('should match only control components', inject(function(ComponentRegistry, Element) {
            var element = new Element({
                name: 'el'
            });

            var control = new Element({
                name: 'ctrl'
            });

            var elementConfig = {
                name: 'element-component',
                condition: function(element) {
                    return element.name === 'el';
                }
            };

            var controlConfig = {
                name: 'control-component',
                condition: function(element) {
                    return element.name === 'ctrl';
                }
            };

            ComponentRegistry.registerControl(controlConfig);
            ComponentRegistry.registerElement(elementConfig);

            var result;

            // match an element against controls, must return null
            result = ComponentRegistry.findControl(element);
            expect(result).toBe(null);

            // match a control element against registered controls
            result = ComponentRegistry.findControl(control);
            expect(result).not.toBe(null);
            expect(result.name).toBe('control-component');
        }));
    });
});
