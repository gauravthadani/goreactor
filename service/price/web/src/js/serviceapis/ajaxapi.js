var ServerActions = require('../actions/serveractions');
var $ = require('jquery');

function invoke(url, criteria, success, error) {
	$.ajax({
		url: url,
		dataType: "json",
		success: success,
		error: error
	});
}

module.exports = invoke;