var express = require("express");
var app = express();
var server = require("http").Server(app);
var io = require("socket.io")(server);

var bodyParser   = require('body-parser');
var cookieParser = require("cookie-parser");
var session = require("express-session");
var mongoose = require("mongoose");
var morgan = require("morgan");
var passport = require("passport");

mongoose.connect(process.env.MONGOHQ_URL || "mongodb://localhost/tc");

app.set("db", mongoose);

app.use(morgan("combined"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
var sessionSecret = process.env.secret || "abc";
app.use(session({
    secret: sessionSecret,
    resave: false,
    saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());
require("./config/passport.js")(passport, app);

require("./app/models/line.js")(app);
require("./app/models/command.js")(app);
require("./app/models/user.js")(app);

var PORT = process.env.PORT;

server.listen(PORT, function () {
    console.log("server running on PORT: " + PORT);
});

app.get("/", function (req, res) {
   res.sendFile(__dirname + "/public/index.html");
});

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
