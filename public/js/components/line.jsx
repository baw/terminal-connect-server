var React = require("react");

var Line = React.createClass({
    render: function () {
        <pre className="line">{this.props.text}</pre>
    }
});

module.exports = Line;