var TEST_DB_URL = "mongodb://localhost/tc-test";

var chai = require("chai");
var charDateTime = require("chai-datetime");
var mongoose = require("mongoose");
var mochaMongoose = require("mocha-mongoose")(TEST_DB_URL);

chai.use(charDateTime);
var expect = chai.expect;

var User = require("../../app/models/user.js");

describe("User model", function () {
    beforeEach(function (done) {
        if (mongoose.connection.db) {
            done(null);
        } else {
            mongoose.connect(TEST_DB_URL, done);
        }
    });
    
    var userData = {
        apiKey: "key",
        githubUsername: "username",
        githubID: 1234,
        email: "email@email.com",
        commands: []
    };
    var userId;
    beforeEach(function (done) {
        var u = new User(userData);
        u.save();
        
        userId = u.id;
        
        done();
    });
    
    describe("commands", function () {
        it("should exist", function (done) {
            User.findById(userId, function (err, user) {
                if (err) throw err;
                
                expect(user.commands).to.not.be.undefined;
                
                done();
            });
        });
    });
    
    describe("email", function () {
        it("should exist", function (done) {
            User.findById(userId, function (err, user) {
                if (err) throw err;
                
                expect(user.email).to.not.be.undefined;
                
                done();
            });
        });
    });

    describe("githubID", function () {
        it("should exist", function (done) {
            User.findById(userId, function (err, user) {
                if (err) throw err;
                
                expect(user.githubID).to.not.be.undefined;
                
                done();
            });
        });
    });

    describe("githubUsername", function () {
        it("should exist", function (done) {
            User.findById(userId, function (err, user) {
                if (err) throw err;
                
                expect(user.githubUsername).to.not.be.undefined;
                
                done();
            });
        });
    });

    describe("apiKey", function () {
        it("should exist", function (done) {
            User.findById(userId, function (err, user) {
                if (err) throw err;
                
                expect(user.apiKey).to.not.be.undefined;
                
                done();
            });
        });
    });
});