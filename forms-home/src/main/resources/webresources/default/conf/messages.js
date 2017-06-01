(function() {
    'use strict';

    var app = angular.module('forms-ui');

    /**
     * This value provides a map of localized client side messages.
     * These can be customized via decoration
     */
    app.value('messages', {
        en : {
            requiredField: 'This field is required',
            selectOne: 'Choose an option',
            defaultCurrency: '£',
            optionalField: '*',
            formError: 'An error occurred rendering this form'
        },
        nl: {
            requiredField: 'Dit veld is verplicht',
            selectOne: 'Maak een keuze',
            defaultCurrency: '€',
            optionalField: '*',
            formError: 'Er is een fout opgetreden waardoor deze vorm'
        }
    });
})();