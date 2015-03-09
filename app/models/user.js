var mongoose = require("mongoose");
var bcrypt = require("bcrypt-nodejs");
var timestamps = require('mongoose-timestamp');

var Command = require("./command.js");

var userSchema = mongoose.Schema({
    commands: [{ type: mongoose.Schema.Types.ObjectId, ref: "Command" }],
    email: String,
    githubID: { type: Number, index: true },
    githubUsername: String,
    apiKey: { type: String, index: { unique: true } }
});

userSchema.plugin(timestamps);

module.exports = mongoose.model("User", userSchema);
