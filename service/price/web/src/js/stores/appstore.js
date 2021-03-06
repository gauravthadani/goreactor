var AppDispatcher = require('../dispatcher/appdispatcher');
var EventEmitter = require('events').EventEmitter;
var AppConstants = require('../constants/appconstants');
var assign = require('react/lib/Object.assign');

var CHANGE_EVENT = 'change';

var AppStore = assign({}, EventEmitter.prototype, {

  getDate: function() {
    return Date.now();
  },

  emitChange: function() {
    this.emit(CHANGE_EVENT);
  },

  addChangeListener: function(callback) {
    this.on(CHANGE_EVENT, callback);
  },

  removeChangeListener: function(callback) {
    this.removeListener(CHANGE_EVENT, callback);
  },

  dispatcherIndex: AppDispatcher.register(function(payload) {
    var action = payload.action;
    var text;

    switch(action.actionType) {
      case AppConstants.TODO_VIEW:
      text = action.text.trim();
      if (text !== '') {          
        AppStore.emitChange();
      }
      break;            
    }
    return true;
  })
});

module.exports = AppStore;