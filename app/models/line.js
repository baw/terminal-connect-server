var mongoose = require("mongoose");

var lineSchema = mongoose.Schema({
    text: String,
    commandId: String,
    
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

module.exports = mongooose.model("Line", lineSchema);