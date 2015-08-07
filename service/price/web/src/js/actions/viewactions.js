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

	sort: function(criteria) {
		AjaxApi.invoke('/GetData', this.props.data.paginate, ServerActions.receiveData, ServerActions.onError);
		AppDispatcher.handleAction({
			actionType: AppConstants.DATA_REQUESTED,
			criteria: criertia
		})
	}
};
module.exports = Actions;