describe('StringUtils', function() {
    beforeEach(module('forms-ui'));

    describe('#toQueryString(object)', function() {
        it('should convert an object into a query string', inject(function (StringUtils) {
            var object = {
                foo: 1,
                bar: 'two three'
            };

            var queryString = StringUtils.toQueryString(object);
            expect(queryString).toEqual('foo=1&bar=two%20three');
        }));
    });

    describe('#replaceVariables(string, object)', function() {
        it('should replace values from object on a given string', inject(function (StringUtils) {
            var string = 'some %foo% text %bar% here';
            var values = {
                foo: 'random',
                bar: 'is'
            };

            expect(StringUtils.replaceVariables(string, values)).toBe('some random text is here');
        }));
    });
});