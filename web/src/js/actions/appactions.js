var AppDispatcher =require('../dispatcher/appdispatcher');
var ActionConstants = require('../constants/appconstants');

var Actions = {

	click : function(data){
		console.log('Sending Action');
		AppDispatcher.handleViewAction({
			actionType: ActionConstants.TODO_VIEW,
			text: data			
		})
	}
}
module.exports = Actions;