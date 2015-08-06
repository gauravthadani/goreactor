var ServerActions = require('../actions/serveractions');
var $ = require('jquery');

function getData(url) {
	$.ajax({
		url: "/GetData",
		dataType: "json",
		success: function(data) {
			console.log('received some data');			
		},
		error : function(xhr, status, err) {
			console.log('in error block');
		}
	});
}

module.exports = getData;