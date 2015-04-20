var Command = require("../models/command.js");

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

module.exports = {
  "addCommand": addCommand,
  "addLine": addLine,
  "checkAuthForCommand": checkAuthForCommand,
  "noUser": noUser
};