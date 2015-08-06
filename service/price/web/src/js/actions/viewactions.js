var AppDispatcher =require('../dispatcher/appdispatcher');
var AppConstants = require('../constants/appconstants');

var Actions = {

	click : function(data){
		console.log('Click Action');
		AppDispatcher.handleAction({
			actionType: AppConstants.TODO_VIEW,
			text: data			
		})
	},

	sort : function(col_name, direction){
		console.log('Sort Action');
		console.log(col_name);
		console.log(direction);
		AppDispatcher.handleAction({
			actionType: AppConstants.SORT_ON_COLUMN,
			col_name : col_name,
			direction : direction
		})	
	}
};
module.exports = Actions;