var mongoose = require("mongoose");
var timestamps = require('mongoose-timestamp');

var commandSchema = mongoose.Schema({
    lines: [{ type: mongoose.Schema.Types.ObjectId, ref: "Line" }],
    name: String,
    public: { type: Boolean, default: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", index: true }
});

commandSchema.plugin(timestamps);

module.exports = mongoose.model("Command", commandSchema);
