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
    

    render: function() {

        return (
            React.createElement("table", {
                    className: "r-table"
                },
                React.createElement(Head, {
                    data: this.state.data,
                }),
                React.createElement(Body, {
                    data: this.state.data
                }),
                React.createElement(Foot, {
                    data: this.state.data,                    
                    onPrev: this.getPrev,                    
                    onLast: this.getLast,
                    onChange: this.changeRowCount,
                    onRefresh: this.loadData
                })));
    },

    _onChange: function() {
        this.setState({
            data: DataStore.getData()
        });
    }
});


module.exports = Table;