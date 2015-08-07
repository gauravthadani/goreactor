var React = require('react');
var Button = require('./controls/button');
var Option = require('./controls/option');
var DataStore = require('../stores/datastore')
var ViewActions = require('../actions/viewactions')

var Foot = React.createClass({
    displayName: 'Foot',
    render: function() {
        return (
            React.createElement("tfoot", null,
                React.createElement("tr", null,
                    React.createElement("td", {
                            colSpan: this.props.data.columns.length
                        },
                        React.createElement("div", {
                                className: "r-paginate"
                            },
                            React.createElement(Button, {
                                text: "<< First",
                                onClick: getFirst,
                                disabled: this.props.data.paginate.page === 1
                            }),
                            React.createElement(Button, {
                                text: "< Prev",
                                onClick: getPrev,
                                disabled: this.props.data.paginate.page === 1
                            }),
                            React.createElement(Button, {
                                text: "Next >",
                                onClick: getNext,
                                disabled: this.props.data.paginate.page === this.props.data.paginate.pages
                            }),
                            React.createElement(Button, {
                                text: "Last >>",
                                onClick: getLast,
                                disabled: this.props.data.paginate.page === this.props.data.paginate.pages
                            }),
                            React.createElement(Button, {
                                text: "Refresh",
                                onClick: refresh,
                                disabled: false
                            })),
                        React.createElement("div", {
                                className: "r-rowcount"
                            },
                            React.createElement("select", {
                                    onChange: this.props.onChange,
                                    name: "row_count"
                                },
                                React.createElement(Option, {
                                    value: "5"
                                }),
                                React.createElement(Option, {
                                    value: "10"
                                })), " rows per page"),
                        React.createElement("div", {
                                className: "r-stats"
                            },
                            React.createElement("span", {
                                className: ""
                            }, "Page ", this.props.data.paginate.page, " of ", this.props.data.paginate.pages))))));
    }
});


function getFirst() {
    var criteria = DataStore.getPaginateData();
    criteria.page = 1;
    ViewActions.load(criteria);
};

function getPrev() {
    var criteria = DataStore.getPaginateData();
    criteria.page--;
    ViewActions.load(criteria);
};

function getNext() {

    var criteria = DataStore.getPaginateData();
    criteria.page++;
    ViewActions.load(criteria);
};

function getLast() {

    var criteria = DataStore.getPaginateData();
    criteria.page = criteria.pages;
    ViewActions.load(criteria);

};

function changeRowCount(e) {
    var el = e.target;
    var criteria = DataStore.getPaginateData();
    criteria.row_count = el.options[el.selectedIndex].value;
    ViewActions.load(criteria);
};

function refresh() {
    ViewActions.load(DataStore.getPaginateData());
};

module.exports = Foot;