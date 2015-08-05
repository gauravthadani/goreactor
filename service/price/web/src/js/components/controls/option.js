var React = require('react');

var Option = React.createClass({
    displayName: 'Option',
    render: function () {
        return (
        React.createElement("option", {
            value: this.props.value
        }, this.props.value));
    }
});
module.exports = Option;