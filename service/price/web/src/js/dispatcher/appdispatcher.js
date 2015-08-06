var Dispatcher = require('flux').Dispatcher;
var assign = require('react/lib/Object.assign');

var AppDispatcher = assign(new Dispatcher(), {
	handleAction:function(action){
		console.log('Dispatching Action');
		this.dispatch({
			source:'VIEW_ACTION',
			action: action
		})
	}
});

module.exports = AppDispatcher;