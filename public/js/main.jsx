var React = require("react");
var Router = require("react-router");

var routes = require("./routes.jsx");

var Container = require("./views/container.jsx");

Router.run(routes, function (Handler) {
    React.render(<Handler />, document.body);
});