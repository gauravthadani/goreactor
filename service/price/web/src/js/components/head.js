var React = require('react');

var Head = React.createClass({
    displayName: 'Head',
    render: function () {
        var that = this;
        return (
            React.createElement("thead", null,
                React.createElement("tr", null,
                    that.props.data.columns.map(function (column, i) {
                        return React.createElement(HeadCell, {
                            key: i,
                            column: column,
                            direction: that.props.data.paginate.direction,
                            onSort: that.props.onSort
                        })
                    }))));
    }
});



var HeadCell = React.createClass({
    displayName: 'HeadCell',
    render: function () {
        return (
            React.createElement("th", null, React.createElement("a", {
                href: "#",
                'data-column': this.props.column.key,
                'data-direction': this.props.direction === "desc" ? "asc" : "desc",
                role: "button",
                tabIndex: "0",
            onClick: this.props.onSort
            }, this.props.column.label)));
    }
});

module.exports = Head;