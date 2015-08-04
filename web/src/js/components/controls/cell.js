var React = require('react');

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
};







