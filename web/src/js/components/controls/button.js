var React = require('react');

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