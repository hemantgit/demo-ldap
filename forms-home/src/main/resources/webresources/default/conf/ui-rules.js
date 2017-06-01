(function() {
    'use strict';

    var app = angular.module('forms-ui');

    /**
     * This list of rules contains the logic to choose an Angular template given a forms model element
     * Two sets of rules exist, 'elements' used by the bb-element directive, and 'controls' used by
     * the bb-control directive
     * These can be customized via decoration
     */
    app.value('uiRules', {
        elements : [

            //fall back
            {
                template: 'elements/other.html',
                test: function() {
                    return true;
                }
            },

            ///////////////////////////////////
            // Elements
            ///////////////////////////////////

            {
                template: 'elements/page.html',
                test: function(el) {
                    return el.type === 'page';
                }
            },
            {
                template: 'elements/container.html',
                test: function(el) {
                    return el.type === 'container';
                }
            },
            {
                template: 'elements/failedelement.html',
                test: function(el) {
                    return el.type === 'failedelement';
                }
            },
            {
                template: 'elements/field.html',
                test: function(el) {
                    return el.type === 'field';
                }
            },
            {
                template: 'elements/button.html',
                test: function(el) {
                    return el.type === 'button';
                }
            },

            ///////////////////////////////////
            // Content items
            ///////////////////////////////////

            {
                template: 'elements/asset.html',
                test: function(el) {
                    return el.type === 'asset';
                }
            },
            {
                template: 'elements/contentitem.html',
                test: function(el) {
                    return el.type === 'contentitem';
                }
            },
            {
                template: 'elements/textitem.html',
                test: function(el) {
                    return el.type === 'textitem';
                }
            },

            {
                template: 'contentitems/base.html',
                test: function() {
                    return false;
                }
            },
            {
                template: 'contentitems/table.html',
                test: function(el) {
                    return el.type === 'table';
                }
            }
        ],
        controls: [

            ///////////////////////////////////
            // Controls
            ///////////////////////////////////

            //single values
            {
                template: 'controls/input-text.html',
                test: function(el) {
                    return el.dataType === 'text' && !el.hasDomain;
                }
            },
            {
                template: 'controls/textarea.html',
                test: function(el) {
                    return el.dataType === 'text' && !el.hasDomain && el.styles.indexOf('memo') > -1;
                }
            },
            {
                template: 'controls/input-currency.html',
                test: function(el) {
                    return el.dataType === 'currency';
                }
            },
            {
                template: 'controls/input-date.html',
                test: function(el) {
                    return el.dataType === 'date';
                }
            },
            {
                template: 'controls/input-datetime.html',
                test: function(el) {
                    return el.dataType === 'datetime';
                }
            },
            {
                template: 'controls/input-integer.html',
                test: function(el) {
                    return el.dataType === 'integer' || el.dataType === 'number';
                }
            },
            {
                template: 'controls/input-percentage.html',
                test: function(el) {
                    return el.dataType === 'percentage';
                }
            },
            {
                template: 'controls/input-checkbox.html',
                test: function(el) {
                    return  el.dataType === 'boolean';
                }
            },

            //multi values
            {
                template: 'controls/checkboxgroup.html',
                test: function(el) {
                    return el.hasDomain && el.multiValued;
                }
            },
            {
                template: 'controls/dropdown-select.html',
                test: function(el) {
                    return el.hasDomain && !el.multiValued;
                }
            }
        ]
    });
})();