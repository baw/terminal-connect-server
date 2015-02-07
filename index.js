var app = require("express").createServer();
var io = require("socket.io")(app);

app.listen(80);

app.get("/", function (req, res) {
   res.sendFile(__dirname + "public/index.html");
});

io.on("connection", function (socket) {
    socket.on("terminal-output", function (text) {
        io.to("web").emit("output", {
            "text": text
        });
    });
});
