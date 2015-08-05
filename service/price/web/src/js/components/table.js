var React = require('react');
var Head = require('./head');
var Body = require('./body');
var Foot = require('./foot');
var $ = require('jquery')


var Table = React.createClass({
    displayName: 'Table',
    loadData: function () {
        console.log('going to send the request');
        $.ajax({

            url: "/GetData",
            data: {
                page: this.state.data.paginate.page,
                row_count: this.state.data.paginate.row_count,
                col_name: this.state.data.paginate.col_name,
                direction: this.state.data.paginate.direction
            },
            contentType : "application/json",
            dataType: "json",            
            success: function (data) {
                console.log('received some data');
                this.setState({ 
                    paginate: data.paginate
                });
                this.setState({
                    data: data
                });
            }.bind(this),
            error: function (xhr, status, err) {
                console.log('in error block');
                console.log(this.props.url, status, err.toString());
            }.bind(this)
        });
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
        var el = e.target;
        col_name = el.getAttribute("data-column");
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

        var that = this;
        return (
            React.createElement("table", {
                className: "r-table"
            },
            React.createElement(Head, {
                data: that.state.data,
                onSort: that.sortData
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