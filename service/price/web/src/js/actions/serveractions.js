var AppDispatcher =require('../dispatcher/appdispatcher');
var AppConstants = require('../constants/appconstants');

var ServerActions = {

	receiveData : function(data){
		console.log('ServerAction : receiveData : sending to dispatcher');
		AppDispatcher.handelAction({
			actionType: AppConstants.RECEIVE_DATA,
			data: data			
		})
	},

	onError : function(err){
		console.log('ServerAction : onError : sending to dispatcher');
		AppDispatcher.handleAction({
			actionType: AppConstants.RECEIVE_API_ERROR,
			err: err
		});
	}

};

module.exports = ServerActions;