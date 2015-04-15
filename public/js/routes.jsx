var React = require("react");
var Router = require("react-router");

var Route = Router.Route;

var Container = require("./views/container.jsx");

module.exports = (
    <Route handler={Container} />
);