var TEST_DB_URL = "mongodb://localhost/tc-test";

var chai = require("chai");
var charDateTime = require("chai-datetime");
var mongoose = require("mongoose");
var mochaMongoose = require("mocha-mongoose")(TEST_DB_URL);

chai.use(charDateTime);
var expect = chai.expect;

var Command = require("../../app/models/command.js");
var User = require("../../app/models/user.js");

describe("Command model", function () {
    var commandId;
    var commandData = {
        lines: [],
        name: "name",
        public: true
    };
    
    beforeEach(function (done) {
        if (mongoose.connection.db) {
            done(null);
        } else {
            mongoose.connect(TEST_DB_URL, done);
        }
    });
    
    beforeEach(function (done) {
        var u = new User();
        
        c = new Command(commandData);
        c.user = u.id;
        c.save(function (err) {
          if (err) throw err;
          
          commandId = c.id;
          
          done();
        });
    });
    
    it("should save", function () {
        Command.findById(commandId, function (err, command) {
            if (err) throw err;
            
            expect(command).to.exist;
            
            done();
        });
    });
    
    describe("lines attribute", function () {
        it("should exist", function (done) {
            Command.findById(commandId, function (err, command) {
                if (err) throw err;
                
                expect(command.lines).to.not.be.undefined;
                
                done();
            });
        });
    });
    
    describe("name attribute", function () {
        it("should exist", function (done) {
            Command.findById(commandId, function (err, command) {
                if (err) throw err;
                
                expect(command.name).to.not.be.undefined;
                
                done();
            });
        });
    });
    
    describe("public attribute", function () {
        it("should exist", function (done) {
            Command.findById(commandId, function (err, command) {
                if (err) throw err;
                
                expect(command.public).to.not.be.undefined;
                
                done();
            });
        });
    });
    
    describe("user attribute", function () {
        it("should exist", function (done) {
            Command.findById(commandId, function (err, command) {
                if (err) throw err;
                
                expect(command.user).to.not.be.undefined;
                
                done();
            });
        });
    });
});