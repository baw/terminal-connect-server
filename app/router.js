var apiRouter = require("./api_router.js");
var Command = require("./models/command.js");

var ensureAuthenticated = function (req, res, next) {
    if (req.isAuthenticated()) return next();
    
    res.redirect("/");
};

var rootRoute = function (req, res) {
    var user = req.user;
    
    if (user === undefined) {
        res.render("home", {
            user: undefined
        });
    } else {
        res.redirect("/commands");
    }
};

module.exports = function (app, express) {
    app.get("/", rootRoute);
    app.get("/index.html", rootRoute);
    
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
        
        Command.findById(commandId).populate("lines user").exec(function (err, command) {
            if (err) throw err;
            if (!command.user._id.equals(user._id)) return res.redirect("/");
            
            res.render("command", {
                command: command,
                user: user
            });
        });
    });

    app.use("/api", apiRouter);
    app.use(express.static(__dirname + "/public"));
};