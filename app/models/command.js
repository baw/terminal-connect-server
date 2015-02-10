var mongoose = require("mongoose");
var Line = require("./line.js");

var commandSchema = mongoose.Schema({
    lines: [Line],
    name: String,
    public: { type: Boolean, default: true },
    userId: { type: String, index: true },
    
    createdAt: Date,
    updatedAt: Date
});

commandSchema.pre("save", function (next) {
    var now = new Date();
    
    this.updatedAt = now;
    if (this.createdAt === undefined) {
        this.createdAt = now;
    }
    
    next();
});

module.exports = mongoose.model("Command", commandSchema);