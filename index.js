var express = require("express");
var app = express();
var server = require("http").Server(app);
var io = require("socket.io")(server);
var morgan = require("morgan");

var PORT = process.env.PORT;

server.listen(PORT, function () {
    console.log("server running on PORT: " + PORT);
});

app.get("/", function (req, res) {
   res.sendFile(__dirname + "/public/index.html");
});

app.use(morgan("combined"));
app.use(express.static(__dirname + "/public"));

io.on("connection", function (socket) {
    socket.on("terminal-output", function (text) {
        io.to("web").emit("output", {
            "text": text
        });
    });
});

