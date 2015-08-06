jest.dontMock('../getdataapi.js')

describe('getData', function() {
	it('calls into $.ajax with the correct params', function() {
		var $ = require('jquery');
		var getData = require('../getdataapi');

		getData();
		expect($.ajax).toBeCalledWith({
			url: '/GetData',
			dataType: "json",
			success: jasmine.any(Function),
			error: jasmine.any(Function)
		});
	});
});
