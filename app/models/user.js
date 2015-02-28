var mongoose = require("mongoose");
var bcrypt = require("bcrypt-nodejs");
var Command = require("./command.js");

var userSchema = mongoose.Schema({
    commands: [{ type: mongoose.Schema.Types.ObjectId, ref: "Command" }],
    email: String,
    githubID: { type: Number, index: true },
    githubUsername: String,
    apiKey: { type: String, index: { unique: true } },
    
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
