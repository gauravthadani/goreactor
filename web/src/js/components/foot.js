var React = require('react');
var Button = require('./controls/button');
var Option = require('./controls/option');

var Foot = React.createClass({
    displayName: 'Foot',
    render: function () {
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
            onClick: this.props.onFirst,
            disabled: this.props.data.paginate.page === 1
        }),
        React.createElement(Button, {
            text: "< Prev",
            onClick: this.props.onPrev,
            disabled: this.props.data.paginate.page === 1
        }),
        React.createElement(Button, {
            text: "Next >",
            onClick: this.props.onNext,
            disabled: this.props.data.paginate.page === this.props.data.paginate.pages
        }),
        React.createElement(Button, {
            text: "Last >>",
            onClick: this.props.onLast,
            disabled: this.props.data.paginate.page === this.props.data.paginate.pages
        }),
        React.createElement(Button, {
            text: "Refresh",
            onClick: this.props.onRefresh,
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

module.exports = Foot;