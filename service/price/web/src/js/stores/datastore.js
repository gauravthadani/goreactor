var AppDispatcher = require('../dispatcher/appdispatcher');
var EventEmitter = require('events').EventEmitter;
var AppConstants = require('../constants/appconstants');
var assign = require('react/lib/Object.assign');

var CHANGE_EVENT = 'change';
// var rows = [];
// var columns = [];
// var paginate = {};
var data = {};


function _getData() {
  return {
    data
  };
}



var DataStore = assign({}, EventEmitter.prototype, {

  emitChange: function() {
    this.emit(CHANGE_EVENT);
  },

  addChangeListener: function(callback) {
    this.on(CHANGE_EVENT, callback);
  },

  removeChangeListener: function(callback) {
    this.removeListener(CHANGE_EVENT, callback);
  },

  getData: function() {
    return _getData()
  },

  dispatcherIndex: AppDispatcher.register(function(payload) {
    var action = payload.action;
    var err;

    switch (action.actionType) {
      case AppConstants.RECEIVE_DATA_API:
        console.log('Server has sent the data');
        data = action.data;
        break;
      case AppConstants.RECEIVE_ERROR_API:
        console.log(err.toString());
        break;
    }
    DataStore.emitChange();

    return true;

  })
});

module.exports = DataStore;