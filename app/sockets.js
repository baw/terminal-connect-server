module.exports = function (io) {
    var terminal = io.of("/terminal").on("connection", function (socket) {
        socket.on("command", function (text) {
            web.emit("command", {
                "command": text
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
};