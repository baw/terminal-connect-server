var Line = require("./models/line.js");
var Command = require("./models/command.js");
var User = require("./models/user.js");


var checkAuthForCommand = function (opts, callback) {
    Command.findById(opts.commandID).populate("userId").exec(function (err, command) {
        if (err) throw err;
        
            callback();
        if (command.userId.apiKey === opts.apiKey) {
        } else {
            var errorText = "Error Code: 1 - Wrong API Key For Command";
            
            process.stdout.write(errorText);
            opts.socket.emit("error", errorText);
            
            opts.socket.disconnect();
        }
    });
};

module.exports = function (io) {
    var terminal = io.of("/terminal").on("connection", function (socket) {
        socket.on("command", function (commandText, key) {
            User.findOne({ apiKey: key }, function (err, user) {
                if (err) throw err;
                
                process.stdout.write("received command from: " + user.githubUsername);
                
                var command = new Command({
                    name: commandText,
                    userId: user._id
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
            checkAuthForCommand({
                    apiKey: apiKey,
                    commandID: commandID,
                    socket: socket
                }, function () {
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
            }, function () {
                web.emit("error", {
                    "line": text
                });
            });
        });
    });

    var web = io.of("/web");
};