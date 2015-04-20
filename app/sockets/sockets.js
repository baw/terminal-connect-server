var socketsIO = require("socket.io");

var client = require("./client.js");

var Line = require("../models/line.js");
var Command = require("../models/command.js");
var User = require("../models/user.js");

module.exports = function (server, session) {
    var io = socketsIO(server);
    
    require("../../config/sockets_auth.js")(io, session);
    
    var terminal = io.of("/terminal").on("connection", function (socket) {
        socket.on("command", function (commandText, key) {
            User.findOne({ apiKey: key }, function (err, user) {
                if (err) throw err;
                if (user === null) return noUser(socket);
                
                process.stdout.write("received command from: " + user.githubUsername);
                
                var commandId = addCommand(user, commandText);
                web.emit("command", {
                    "command": commandText
                });
                socket.emit("commandID", commandId);
            });
        });
        
        socket.on("terminal-output", function (text, apiKey, commandID) {
            checkAuthForCommand({
                apiKey: apiKey,
                commandID: commandID,
                socket: socket
            }, function (command) {
                addLine(command, text, false);
                
                web.emit("output", {
                    "line": text
                });
            });
        });
        
        socket.on("terminal-error", function (text, apiKey, commandID) {
            checkAuthForCommand({
                apiKey: apiKey,
                commandID: commandID,
                socket: socket
            }, function (command) {
                addLine(command, text, true);
                
                web.emit("error", {
                    "line": text
                });
            });
        });
    });

    var web = io.of("/web");
};