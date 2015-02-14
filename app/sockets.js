var Line = require("./models/line.js");
var Command = require("./models/command.js");
var User = require("./models/user.js");


var checkAuthForCommand = function (commandID, apiKey, callback) {
    Command.find(commandID, function (err, command) {
        if (err) throw err;
        
        if (command.user.apiKey === apiKey) {
            callback();
        } else {
            socket.emit("error", "Error Code: 1 - Wrong API Key");
            socket.disconnect();
        }
    });
}


module.exports = function (io) {
    var terminal = io.of("/terminal").on("connection", function (socket) {
        socket.on("command", function (commandText, key) {
            User.findOne({ apiKey: key }, function (err, user) {
                if (err) throw err;
                
                var command = new Command({
                    name: commandText,
                    userId: user.id
                });
                user.commands.push(command);
                
                command.save();
                user.save();
                
                web.emit("command", {
                    "command": commandText
                });
                socket.emit("commandID", command.id);
            });
        });
        
        socket.on("terminal-output", function (text, apiKey, commandID) {
            checkAuthForCommand(commandID, apiKey, function () {
                web.emit("output", {
                    "line": text
                });
            });
        });
        
        socket.on("terminal-error", function (text, apiKey, commandID) {
            checkAuthForCommand(commandID, apiKey, function () {
                web.emit("error", {
                    "line": text
                });
            });
        });
    });

    var web = io.of("/web");
};