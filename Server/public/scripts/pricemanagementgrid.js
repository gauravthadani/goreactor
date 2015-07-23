var GridContainer = React.createClass({
	render: function(){
		return (
			<div>
				<h1>Hi There</h1>
			</div>);
	}
})


React.render(
	<GridContainer/>,
	document.getElementById('content')
	);