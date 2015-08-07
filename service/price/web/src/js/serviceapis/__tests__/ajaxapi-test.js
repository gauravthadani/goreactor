jest.dontMock('../ajaxapi.js');

describe('invoke', function() {
	it('calls into $.ajax with the correct params', function() {

		var $ = require('jquery');
		var invoke = require('../ajaxapi');

		var success = jest.genMockFunction();
		var error = jest.genMockFunction();

			invoke('/GetData', {
			'message': 'someRandomMessage'
		}, success, error);

		expect($.ajax).toBeCalledWith({
			url: '/GetData',
			dataType: 'json',
			success: jasmine.any(Function),
			error: jasmine.any(Function)
		});
	})
});