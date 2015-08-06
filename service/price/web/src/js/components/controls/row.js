var React = require('react');
var Cell = require('./cell');

var Row = React.createClass({
    displayName: 'Row',
    render: function () {
        var that = this;
        return (
        React.createElement("tr", null,
        this.props.columns.map(function (column, i) {
            return React.createElement(Cell, {
                key: i,
                column: column,
                value: that.props.item[column.key]
            })
        })));
    }
});


module.exports = Row;