var mongoose = require("mongoose");

var lineSchema = mongoose.Schema({
    text: String,
    commandId: { type: String, index: true },
    
    createdAt: Date,
    updatedAt: Date
});

lineSchema.pre("save", function (next) {
    var now = new Date();
    
    this.updatedAt = now;
    if (this.createdAt === undefined) {
        this.createdAt = now;
    }
    
    next();
});

module.exports = mongoose.model("Line", lineSchema);