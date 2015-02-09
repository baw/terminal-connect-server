var express = require("express");
var app = express();
var server = require("http").Server(app);
var io = require("socket.io")(server);
var morgan = require("morgan");
var passport = require("passport");
var GitHubStrategy = require("passport-github").Strategy;

var GITHUB_CLIENT_ID = process.env.GITHUB_CLIENT_ID;
var GITHUB_CLIENT_SECRET = process.env.GITHUB_CLIENT_SECRET;
var PORT = process.env.PORT;

server.listen(PORT, function () {
    console.log("server running on PORT: " + PORT);
});

app.get("/", function (req, res) {
   res.sendFile(__dirname + "/public/index.html");
});

app.use(morgan("combined"));
app.use(express.static(__dirname + "/public"));

var terminal = io.of("/terminal").on("connection", function (socket) {
    socket.on("command", function (command) {
        web.emit("command", {
            "command": command
        });
    });
    
    socket.on("terminal-output", function (text) {
        web.emit("output", {
            "line": text
        });
    });
    
    socket.on("terminal-error", function (text) {
        web.emit("error", {
            "line": text
        });
    });
});

var web = io.of("/web");
