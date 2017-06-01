(function() {

    /**
     * @service ElementService
     * @ngInject
     */
    function ElementService($templateCache, $compile, $controller, $log, ComponentRegistry) {
        var CHILDREN = $templateCache.get('directive/element.children.html');
        var CONTROL = $templateCache.get('directive/element.control.html');

        var compiledComponents = new Map();

        /**
         * Insert a component into an element and run its content (directives)
         * @param {Object} component    Component configuration object
         * @param {Scope} $scope        Scope to bind the component's template
         * @param {jqLite} $element     The element where the component will be placed
         */
        function runComponent(component, $scope, $element) {
            var linkToScope = compileComponentTemplate(component);
            var controller = component.controller;

            if ($scope.$$componentScope) {
                $scope.$$componentScope.$destroy();
            }

            var scope = $scope.$$componentScope = $scope.$new();
            linkToScope(scope, transclude);

            if (controller) {
                var locals = { $scope: scope };
                $controller(controller, locals);
            }

            function transclude(clone) {
                $element.append(clone);
            }
        }

        /**
         * @param {Element} element             Element model
         * @param {Boolean} excludeElements     If `true` Search only for controls
         * @return {null|Object} component configuration object
         */
        function findComponentForElement(element, excludeElements) {
            //console.log("findComponentForElement",element,"excludeElements?",excludeElements);
            var component;

            if (excludeElements) {
                component = ComponentRegistry.findControl(element);
            } else {
                component = ComponentRegistry.findElement(element);
            }

            if (!component) {
                var unsupportedError = new Error('Element not supported: ' + element.key);
                unsupportedError.reason = element;
                $log.error(unsupportedError);

                return null;
            }

            return component;
        }

        /**
         * @param {Object} component
         * @return {string} component template
         * @private
         */
        function getComponentTemplate(component) {
            var template = $templateCache.get('component/' + component.name + '/template.html');
            template = template.replace('<children></children>', CHILDREN);
            template = template.replace('<control></control>', CONTROL);

            return angular.element(template);
        }

        /**
         * @param {Object} component
         * @return {Function} compiled component's template
         * @private
         */
        function compileComponentTemplate(component) {
            var name = component.name;

            if (compiledComponents.has(name) === false) {
                var template = getComponentTemplate(component);
                var linkFn = $compile(template);

                compiledComponents.set(name, linkFn);
            }

            return compiledComponents.get(name);
        }

        return {
            findComponentForElement: findComponentForElement,
            runComponent: runComponent
        };
    }

    angular.module('forms-ui').service('ElementService', ElementService);
})();
