var AppDispatcher =require('../dispatcher/appdispatcher');
var AppConstants = require('../constants/appconstants');

var ServerActions = {

	receiveData : function(data){
		console.log('ServerAction : receiveData : sending to dispatcher');
		AppDispatcher.handleAction({
			actionType: AppConstants.RECEIVE_DATA_API,
			data: data			
		})
	},

	onError : function(xhr, status, err){
		console.log('ServerAction : onError : sending to dispatcher');
		AppDispatcher.handleAction({
			actionType: AppConstants.RECEIVE_ERROR_API,
			err: err
		});
	}

};

module.exports = ServerActions;
