var socketsIO = require("socket.io");

var Line = require("./models/line.js");
var Command = require("./models/command.js");
var User = require("./models/user.js");

var addCommand = function (user, commandText) {
    var command = new Command({
        name: commandText,
        user: user._id
    });
    user.commands.push(command);
    
    command.save();
    user.save();
    
    return command._id;
};

var addLine = function (command, text, error) {
    var line = new Line({
        command: command._id,
        error: error,
        text: text
    });
    line.save();
    
    command.lines.push(line._id);
    command.save();
};

var checkAuthForCommand = function (opts, callback) {
    Command.findById(opts.commandID).populate("user").exec(function (err, command) {
        if (err) throw err;
        
        if (command.user.apiKey === opts.apiKey) {
            callback(command);
        } else {
            var errorText = "Error Code: 1 - Wrong API Key For Command";
            
            process.stdout.write(errorText);
            opts.socket.emit("serverError", errorText);
            
            opts.socket.disconnect();
        }
    });
};

var noUser = function (socket) {
    var errorText = "Error Code: 2 - No user with that API Key";
    
    process.stdout.write(errorText);
    socket.emit("serverError", errorText);
    
    socket.disconnect();
};

module.exports = function (server) {
    var io = socketsIO(server);
    
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