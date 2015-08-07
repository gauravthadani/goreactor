var React = require('react');
var Head = require('./head');
var Body = require('./body');
var Foot = require('./foot');
var $ = require('jquery');
var DataStore = require('../stores/datastore')
var ViewActions = require('../actions/viewactions')


var Table = React.createClass({
    displayName: 'Table',

    getInitialState: function() {
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
    componentDidMount: function() {
        ViewActions.load(this.state.data.paginate);
        DataStore.addChangeListener(this._onChange);
    },
    componentDidUnMount: function() {
        DataStore.removeChangeListener(this._onChange);
    },
    getFirst: function() {
        this.setState({
            paginate: $.extend(this.state.data.paginate, {
                page: 1
            })
        });
        ViewActions.load(this.state.data.paginate);
    },
    getPrev: function() {
        this.setState({
            paginate: $.extend(this.state.data.paginate, {
                page: this.state.data.paginate.page - 1
            })
        });
        ViewActions.load(this.state.data.paginate);
    },
    getNext: function() {
        this.setState({
            paginate: $.extend(this.state.data.paginate, {
                page: this.state.data.paginate.page + 1
            })
        });
        ViewActions.load(this.state.data.paginate);
    },
    getLast: function() {
        this.setState({
            paginate: $.extend(this.state.data.paginate, {
                page: this.state.data.paginate.pages
            })
        });
        ViewActions.load(this.state.data.paginate);
    },
    changeRowCount: function(e) {
        var el = e.target;
        this.setState({
            paginate: $.extend(this.state.data.paginate, {
                row_count: el.options[el.selectedIndex].value
            })
        });
        ViewActions.load(this.state.data.paginate);
    },
    sortData: function(e) {

        e.preventDefault();

        var el = e.target;
        col_name = el.getAttribute("data-column");
        direction = el.getAttribute("data-direction");
        this.setState({
            paginate: $.extend(this.state.data.paginate, {
                col_name: col_name,
                direction: direction
            })
        }); 
        ViewActions.load(this.state.data.paginate);
    },
    render: function() {

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
    },

    _onChange: function() {
        this.setState({
            data: DataStore.getData().data
        });
    }
});


module.exports = Table;