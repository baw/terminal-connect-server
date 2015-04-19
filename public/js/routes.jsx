var React = require("react");
var Router = require("react-router");

var Route = Router.Route;

var Container = require("./components/container.jsx");

module.exports = (
    <Route handler={Container} />
);