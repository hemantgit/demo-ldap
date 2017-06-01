(function() {
    /**
     * The session of a given form
     * @class Session
     */
    function Session(options) {
        if (!options) {
            throw new Error('Invalid session options!');
        }

        this.options = angular.copy(options);
        this.sessionId = options.sessionId || '';
    }

    Session.prototype = {
        constructor: Session,
        getSessionKey: getSessionKey
    };

    /**
     * Returns a string combining all session options
     * @return {string}
     */
    function getSessionKey() {
        var o = this.options;
        return ['bbForms', o.shortcut, o.project, o.flow, o.version, o.lang, o.runtimePath].join('.');
    }

    angular.module('forms-ui').value('Session', Session);
})();
