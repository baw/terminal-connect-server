var TEST_DB_URL = "mongodb://localhost/tc-test";

var chai = require("chai");
var charDateTime = require("chai-datetime");
var mongoose = require("mongoose");
var mochaMongoose = require("mocha-mongoose")(TEST_DB_URL);

chai.use(charDateTime);
var expect = chai.expect;

var Command = require("../../app/models/command.js");
var Line = require("../../app/models/line.js");

describe("Line model", function () {
    beforeEach(function (done) {
        if (mongoose.connection.db) {
            done(null);
        } else {
            mongoose.connect(TEST_DB_URL, done);
        }
    });
    
    var lineData = {
        "text": "line text",
        "error": false
    };
    var lineId;
    beforeEach(function (done) {
        var command = new Command();
        var line = new Line(lineData);
        line.command = command.id;
        line.save();
        
        lineId = line.id;
        
        done();
    });
    
    it("should save", function () {
        Line.findById(lineId, function (err, line) {
            if (err) throw err;
            
            expect(line).to.exist;
            
            done();
        });
    });
    
    describe("text", function () {
        it("should exist", function (done) {
            Line.findById(lineId, function (err, line) {
                if (err) throw err;
                
                expect(line.text).to.be.not.undefined;
                
                done();
            });
        });
    });
    
    describe("command", function () {
        it("should exist", function (done) {
            Line.findById(lineId, function (err, line) {
                if (err) throw err;
                
                expect(line.command).to.be.not.undefined;
                
                done();
            });
        });
    });
    
    describe("error", function () {
        it("should exist", function (done) {
            Line.findById(lineId, function (err, line) {
                if (err) throw err;
                
                expect(line.error).to.be.not.undefined;
                
                done();
            });
        });
    });
    
});