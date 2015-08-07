var AppDispatcher = require('../dispatcher/appdispatcher');
var EventEmitter = require('events').EventEmitter;
var AppContants = require('../constants/appconstants');
var assign = require('react/lib/Object.assign');

var CHANGE_EVENT = 'change';
var data = {};

function loadData(data) {
 this.setState({
   			paginate: data.paginate
   		});
   		this.setState({
   			data: data
   		});
}


var ServerStore = assign({}, EventEmitter.prototype, {

  /**
   * Get the entire collection of TODOs.
   * @return {object}
   */
   getDate: function() {
   	return Date.now();
   },

   emitChange: function() {
   	this.emit(CHANGE_EVENT);
   },

  /**
   * @param {function} callback
   */
   addChangeListener: function(callback) {
   	this.on(CHANGE_EVENT, callback);
   },

  /**
   * @param {function} callback
   */
   removeChangeListener: function(callback) {
   	this.removeListener(CHANGE_EVENT, callback);
   },

   dispatcherIndex: AppDispatcher.register(function(payload) {
   	var action = payload.action;
   	var data , err;

   	switch(action.actionType) {
   		case AppContants.RECEIVE_DATA:
   		loadData(action.data);
   		ServerStore.emitChange();
   		break;
   		case AppConstants.RECEIVE_API_ERROR:
   		err =  action.err;
   		console.log(err.toString());  
   		ServerStore.emitChange(); 
   		break   		

      // add more cases for other actionTypes, like TODO_UPDATE, etc.
  }

    return true; // No errors. Needed by promise in Dispatcher.
})

});

module.exports = ServerStore;