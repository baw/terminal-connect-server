var Command = require("./models/command.js");

var ensureAuthenticated = function (req, res, next) {
    if (req.isAuthenticated()) return next();
    
    res.redirect("/");
};

module.exports = function (app, express) {
    app.get("/", function (req, res) {
        var user = req.user;
        
        res.render("home", {
            user: user
        });
    });
    
    app.get("/commands", ensureAuthenticated, function (req, res) {
        var user = req.user;
        
        user.populate("commands", function (err, user) {
            if (err) throw err;
            
            res.render("commands", {
                user: user
            });
        });
    });
    
    app.get("/command/:id", ensureAuthenticated, function (req, res) {
        var commandId = req.params.id;
        var user = req.user;
        
        Command.findById(commandId).populate("lines userId").exec(function (err, command) {
            if (err) throw err;
            if (command.userId._id !== user._id) return res.redirect("/");
            
            res.render("command", {
                command: command,
                user: user
            });
        });
    });

    app.use(express.static(__dirname + "/public"));
};