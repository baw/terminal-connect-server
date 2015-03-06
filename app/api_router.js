var apiRouter = require("express").Router();

var Command = require("./models/command.js");

var unauthorizedRequest = function (res) {
    res.status(401).json({ error: "Unauthorized request" });
};

var ensureAuthenticated = function (req, res, next) {
    if (req.isAuthenticated()) return next();
    
    unauthorizedRequest(res);
};

var editCommandJSON = function (command) {
    return editJSON(command, [
        "name",
        "public",
        "_id",
        "createdAt",
        "updatedAt",
        function (newObj, oldObj) {
            newObj.lines = oldObj.lines.map(editLineJSON);
        }
    ]);
};

var editCommandsJSON = function (command) {
    return editJSON(command, [
        "name",
        "public",
        "_id",
        "createdAt",
        "updatedAt",
        function (newObj, oldObj) {
            newObj.numOfLines = oldObj.length;
        }
    ]);
};

var editJSON = function (oldObj, members) {
    var newObj = {};
    
    members.forEach(function (m) {
        if (typeof m === "function") {
            m(newObj, oldObj);
        } else {
            newObj[m] = oldObj[m];
        }
    });
    
    return newObj;
};

var editLineJSON = function (line) {
    return editJSON(line, [
        "_id",
        "text",
        "error",
        "createdAt",
        "updatedAt"
    ]);
};

apiRouter.get("/commands", ensureAuthenticated, function (req, res) {
    req.user.populate("commands", function (err, user) {
        if (err) throw err;
        
        res.json(user.commands.map(editCommandsJSON));
    });
});

apiRouter.get("/command/:id", ensureAuthenticated, function (req, res) {
    var commandId = req.params.id;
    
    Command.findById(commandId).populate("lines user").exec(function (err, command) {
        if (err) throw err;
        
        if (!command.user._id.equals(req.user._id)) return unauthorizedRequest(res);
        
        res.json(editCommandJSON(command));
    });
});

module.exports = apiRouter;