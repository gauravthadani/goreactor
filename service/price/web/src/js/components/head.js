var React = require('react');
var DataStore = require('../stores/datastore')
var ViewActions = require('../actions/viewactions')

var Head = React.createClass({
    displayName: 'Head',
    render: function() {
        var that = this;
        return (
            React.createElement("thead", null,
                React.createElement("tr", null,
                    that.props.data.columns.map(function(column, i) {
                        return React.createElement(HeadCell, {
                            key: i,
                            column: column,
                            direction: that.props.data.paginate.direction,
                        })
                    }))));
    }
});



var HeadCell = React.createClass({
    displayName: 'HeadCell',
    render: function() {
        return (
            React.createElement("th", null, React.createElement("a", {
                href: "#",
                'data-column': this.props.column.key,
                'data-direction': this.props.direction === "desc" ? "asc" : "desc",
                role: "button",
                tabIndex: "0",
                onClick: onSort
            }, this.props.column.label)));
    }
});


function onSort(e) {

    e.preventDefault();

    var el = e.target;
    var criteria = DataStore.getPaginateData();

    criteria.col_name = el.getAttribute("data-column");;
    criteria.direction = el.getAttribute("data-direction");

    ViewActions.load(criteria);
}

module.exports = Head;