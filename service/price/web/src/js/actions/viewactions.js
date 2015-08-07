var AppDispatcher = require('../dispatcher/appdispatcher');
var AppConstants = require('../constants/appconstants');
var AjaxApi = require('../serviceapis/ajaxapi')
var ServerActions = require('./serveractions')

var Actions = {

	click: function(data) {
		console.log('Click Action');
		AppDispatcher.handleAction({
			actionType: AppConstants.TODO_VIEW,
			text: data
		})
	},

	load: function(criteria) {
		console.log('View Actions : load : ')
		AjaxApi.invoke('/GetData', criteria, ServerActions.receiveData, ServerActions.onError);
		AppDispatcher.handleAction({
			actionType: AppConstants.DATA_REQUESTED,
			criteria: criteria
		})
	}
};
module.exports = Actions;