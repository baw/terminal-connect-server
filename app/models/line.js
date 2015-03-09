var mongoose = require("mongoose");
var timestamps = require('mongoose-timestamp');

var lineSchema = mongoose.Schema({
    text: String,
    command: { type: mongoose.Schema.Types.ObjectId, ref: "Command", index: true },
    error: { type: Boolean, default: false }
});

lineSchema.plugin(timestamps);

module.exports = mongoose.model("Line", lineSchema);
