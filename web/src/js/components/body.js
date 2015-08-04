var React = require('react');
var Row = require('./controls/row');


var Body = React.createClass({
    displayName: 'Body',
    render: function () {
        var that = this;
        return (
        React.createElement("tbody", null,
        this.props.data.items.map(function (item, i) {
            return React.createElement(Row, {
                key: i,
                item: item,
                columns: that.props.data.columns
            })
        })));
    }
});