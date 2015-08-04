var React = require('react');
var AppStore = require('../stores/appstore')
var AppActions = require('../actions/appactions')


function getTodoState() {
	return {
		IdValue : AppStore.getDate()
	};
}


var App = React.createClass({

	getInitialState: function() {
		return getTodoState();
	},

	componentDidMount: function() {
		AppStore.addChangeListener(this._onChange);
	},

	componentWillUnmount: function() {
		AppStore.removeChangeListener(this._onChange);
	},

	sendAction: function(){
		AppActions.click('update');
	},


	render: function() {
		
		return (
			<div>
				<h1>My App {this.state.IdValue}</h1>
				<button type="button" onClick={this.sendAction}>Update</button>
			</div>
		);
	},

	_onChange : function (){
		this.setState(getTodoState());
	}

});

module.exports = App;
