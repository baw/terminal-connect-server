var React = require("react");

var Line = require("./line.jsx");

var Command = React.createClass({
    lines: function () {
        return this.props.lines.map(function (line, index) {
            return <Line key={index} text={line.text}/>
        });
    },
    
    render: function () {
        <div className="command">
            <h1>{this.props.commandName}</h1>
            <div className="lines">
                {this.lines()}
            </div>
        </div>
    }
});

module.exports = Command;