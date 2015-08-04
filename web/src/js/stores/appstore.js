var AppDispatcher = require('../dispatcher/appdispatcher');
var EventEmitter = require('events').EventEmitter;
var AppContants = require('../constants/appconstants');
var assign = require('react/lib/Object.assign');

var CHANGE_EVENT = 'change';

var AppStore = assign({}, EventEmitter.prototype, {

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
    var text;

    switch(action.actionType) {
      case AppContants.TODO_VIEW:
        text = action.text.trim();
        if (text !== '') {          
          AppStore.emitChange();
        }
        break;      

      // add more cases for other actionTypes, like TODO_UPDATE, etc.
    }

    return true; // No errors. Needed by promise in Dispatcher.
  })

});

module.exports = AppStore;