var express = require("express");
var app = express();
var server = require("http").Server(app);
var io = require("socket.io")(server);

var PORT = process.env.PORT;

server.listen(PORT);

app.get("/", function (req, res) {
   res.sendFile(__dirname + "/public/index.html");
});

app.use(express.static(__dirname + "/public"));

io.on("connection", function (socket) {
    socket.on("terminal-output", function (text) {
        io.to("web").emit("output", {
            "text": text
        });
    });
});

console.log("server running on PORT: " + PORT);
