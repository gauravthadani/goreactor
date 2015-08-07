jest.dontMock('../ajaxapi.js');

describe('invoke', function() {
	it('calls into $.ajax with the correct params', function() {

		var $ = require('jquery');
		var ajaxapi = require('../ajaxapi');

		var success = jest.genMockFunction();
		var error = jest.genMockFunction();

		ajaxapi.invoke('/GetData', {
			'message': 'someRandomMessage'
		}, success, error);

		expect($.ajax).toBeCalledWith({
			url: '/GetData',
			dataType: 'json',
			data : {'message': 'someRandomMessage'},
			success: jasmine.any(Function),
			error: jasmine.any(Function)
		});
	})
});