var React = require('react');
var Head = require('./head');
var Body = require('./body');
var Foot = require('./foot');

var data = {};

var Table = React.createClass({
    displayName: 'Table',
    loadData: function () {
       
    },
    getInitialState: function () {
        return {
            data: {
                columns: [],
                items: [],
                paginate: {
                    page: 1,
                    pages: 1,
                    offset: 0,
                    row_count: 5,
                    total: 0,
                    col_name: "Name",
                    direction: "desc"
                }
            }
        };
    },
    componentDidMount: function () {
        this.loadData();
    },
    getFirst: function () {
        this.setState({
            paginate: $.extend(this.state.paginate, {
                page: 1
            })
        });
        this.loadData.call(this);
    },
    getPrev: function () {
        this.setState({
            paginate: $.extend(this.state.paginate, {
                page: this.state.paginate.page - 1
            })
        });
        this.loadData.call(this);
    },
    getNext: function () {
        this.setState({
            paginate: $.extend(this.state.paginate, {
                page: this.state.paginate.page + 1
            })
        });
        this.loadData.call(this);
    },
    getLast: function () {
        this.setState({
            paginate: $.extend(this.state.paginate, {
                page: this.state.paginate.pages
            })
        });
        this.loadData.call(this);
    },
    changeRowCount: function (e) {
        var el = e.target;
        this.setState({
            paginate: $.extend(this.state.paginate, {
                row_count: el.options[el.selectedIndex].value
            })
        });
        this.loadData.call(this);
    },
    sortData: function (e) {
        e.preventDefault();
        var el = e.target,
            col_name = el.getAttribute("data-column"),
            direction = el.getAttribute("data-direction");
        this.setState({
            paginate: $.extend(this.state.paginate, {
                col_name: col_name,
                direction: direction
            })
        });
        this.loadData.call(this);
    },
    render: function () {
        return (
        React.createElement("table", {
            className: "r-table"
        },
        React.createElement(Head, {
            data: this.state.data,
            onSort: this.sortData
        }),
        React.createElement(Body, {
            data: this.state.data
        }),
        React.createElement(Foot, {
            data: this.state.data,
            onFirst: this.getFirst,
            onPrev: this.getPrev,
            onNext: this.getNext,
            onLast: this.getLast,
            onChange: this.changeRowCount,
            onRefresh: this.loadData
        })));
    }
});


module.exports = Table;