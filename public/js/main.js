/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	var React = __webpack_require__(1);
	var Router = __webpack_require__(2);

	var routes = __webpack_require__(3);

	var Container = __webpack_require__(4);

	Router.run(routes, function (Handler) {
	    React.render(React.createElement(Handler, null), document.body);
	});

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = React;

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = ReactRouter;

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	var React = __webpack_require__(1);
	var Router = __webpack_require__(2);

	var Route = Router.Route;

	var Container = __webpack_require__(4);

	module.exports = (
	    React.createElement(Route, {handler: Container})
	);

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	var Container = React.createClass({displayName: "Container",
	    render: function () {
	        return React.createElement("div", null, "test")
	    }
	});

	module.exports = Container;

/***/ }
/******/ ]);