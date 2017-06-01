(function() {
    'use strict';

    /**
     * Registry of all components
     * @service ComponentRegistry
     * @ngInject
     */
    function ComponentRegistry() {
        var components = [];

        /**
         * Register a component
         * @param {Object} config
         * @param {string}   config.name        Component name
         * @param {Function} config.condition   A function which determines if this component
         *                                      will be rendered. This function will receive
         *                                      an instance of `Element` and should return
         *                                      true if the conditions are met, false otherwise.
         */
        function registerControl(config) {
            console.log("registering Control",config.name);
            config.score = -1;
            config.isElement = false;
            components.push(config);
        }

        /**
         * Register a component to be render as an element. Is as same as `registerControl`,
         * but the elements are always rendered as wrappers to controls
         */
        function registerElement(config) {
            console.log("registering Element",config.name);
            config.score = 0;
            config.isElement = true;
            components.push(config);
        }

        /**
         * Find a component to render a given element
         * @private
         * @param {Element} element
         * @param {Boolean} onlyElements
         */
        function find(element, onlyElements) {
            console.log("-------------------------");
            console.log("component_dr: find::",element,"contentStyle?",element.contentStyle,"isPage?",element.isPage,"cntStyle?",element.contentStyle,"type?",element.type,"styles",element.styles.toString());
            var response;
            var lim = components.length;
            var bestScore =0;
            while(--lim>=0) {
                var c = components[lim];
                var result = c.condition(element);
                c.score = result.score;
                if(c.isElement === onlyElements && result.totalMatch) {
                    if (result.score > bestScore){
                        response = c;
                        bestScore = result.score;

                    }
                }
            }

            console.log("Response:",response);
            console.log("-------------------------");
            return response;
        }

        /**
         * Find a control component to render an element
         * @param {Element} element
         */
        function findControl(element) {
            return find(element, false);
        }

        /**
         * Find a element component to render an element
         * @param {Element} element
         */
        function findElement(element) {
            return find(element, true);
        }

        return {
            registerControl: registerControl,
            registerElement: registerElement,
            findElement: findElement,
            findControl: findControl,
            components: components
        };
    }

    angular.module('forms-ui').service('ComponentRegistry', ComponentRegistry);
})();
