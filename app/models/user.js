var mongoose = require("mongoose");
var bcrypt = require("bycrpt-nodejs");
var Command = require("./command.js");

var userSchema = mongoose.Schema({
    commands: [Command],
    email: String,
    githubID: Number,
    githubUsername: String,
    
    createdAt: Date,
    updatedAt: Date
});

userSchema.pre("save", function (next) {
    var now = new Date();
    
    this.updatedAt = now;
    if (this.createdAt === undefined) {
        this.createdAt = now;
    }
    
    next();
});

module.exports = mongoose.model("User", userSchema);