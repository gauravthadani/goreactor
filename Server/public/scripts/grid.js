var Table = React.createClass({
    displayName: 'Table',
    loadData: function () {
        $.ajax({
            url: this.props.url,
            data: {
                page: this.state.data.paginate.page,
                row_count: this.state.data.paginate.row_count,
                col_name: this.state.data.paginate.col_name,
                direction: this.state.data.paginate.direction
            },
            dataType: "json",
            success: function (data) {
                this.setState({
                    paginate: data.paginate
                });
                this.setState({
                    data: data
                });
            }.bind(this),
            error: function (xhr, status, err) {
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

var Head = React.createClass({
    displayName: 'Head',
    render: function () {
        var that = this;
        return (
        React.createElement("thead", null,
        React.createElement("tr", null,
        this.props.data.columns.map(function (column, i) {
            return React.createElement(HeadCell, {
                key: i,
                column: column,
                direction: that.props.data.paginate.direction,
                onSort: that.props.onSort
            })
        }))));
    }
});

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

var Button = React.createClass({
    displayName: 'Button',
    render: function () {
        return (
        React.createElement("button", {
            type: "button",
            onClick: this.props.onClick,
            disabled: this.props.disabled
        }, this.props.text));
    }
});

var Option = React.createClass({
    displayName: 'Option',
    render: function () {
        return (
        React.createElement("option", {
            value: this.props.value
        }, this.props.value));
    }
});

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

var Cell = React.createClass({
    displayName: 'Cell',
    render: function () {
        return (
        React.createElement("td", null, Draw(this.props.column, this.props.value)));
    }
});

var Draw = function (column, value) {
    switch (column.type) {
        case 'Number':
            return value;
            break;
        case 'String':
            return value;
            break;
        case 'Image':
            return React.createElement('img', {
                src: value
            }, null);
            break;
    }
}



React.render(
React.createElement(Table, {
    url: "http://localhost:3001/GetData"
}),
document.getElementById("grid"));