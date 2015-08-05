var Table = require('./components/table');
var React = require('react');
var App = require('./components/app');

React.render( <div>
	<App/>
	<Table/>
	</div> , document.getElementById('grid'));
