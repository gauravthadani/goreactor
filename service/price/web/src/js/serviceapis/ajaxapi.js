var ServerActions = require('../actions/serveractions');
var $ = require('jquery');

var ajaxapi = {
invoke : function (url, criteria, success, error) {
	$.ajax({
		url: url,
		dataType: "json",
		data : criteria,
		success: success,
		error: error
	});
}
}

module.exports = ajaxapi;