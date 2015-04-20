require("newrelic");

var express = require("express");
var app = express();
var server = require("http").Server(app);

var bodyParser   = require('body-parser');
var cookieParser = require("cookie-parser");
var expressLayouts = require("express-ejs-layouts");
var session = require("express-session");
var mongoose = require("mongoose");
var morgan = require("morgan");
var passport = require("passport");

mongoose.connect(process.env.MONGOLAB_URI || "mongodb://localhost/tc");

app.set("db", mongoose);

app.set("view engine", "ejs");
app.set("views", __dirname + "/app/views");
app.set("layout", "layout");
app.use(expressLayouts);

app.use(morgan("combined"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
var sessionSecret = process.env.secret || "abc";
var RedisStore = require('connect-redis')(session);
var redisClient = require('heroku-redis-client').createClient();
var sessionStore = new RedisStore({
    client: redisClient
});
app.use(session({
    resave: false,
    saveUninitialized: false,
    secret: sessionSecret,
    store: sessionStore
}));

app.use(express.static(__dirname + "/public"));

app.use(passport.initialize());
app.use(passport.session());
require("./config/passport.js")(passport, app);

require("./app/models/line.js")(app);
require("./app/models/command.js")(app);
require("./app/models/user.js")(app);

require("./app/router.js")(app, express);

var PORT = process.env.PORT;

server.listen(PORT, function () {
    console.log("server running on PORT: " + PORT);
});

require("./app/sockets.js")(server, {
  store: sessionStore,
  secret: sessionSecret
});
