var crypto = require("crypto");

var GitHubStrategy = require("passport-github").Strategy;
var GITHUB_CLIENT_ID = process.env.GITHUB_CLIENT_ID;
var GITHUB_CLIENT_SECRET = process.env.GITHUB_CLIENT_SECRET;

var User = require("../app/models/user.js");

var createNewUser = function (profile, done) {
    uniqueApiKey(function (apiKey) {
        user = new User({
            githubID: profile.id,
            email: profile.emails[0].value,
            githubUsername: profile.username,
            apiKey: apiKey
        });
        
        user.save(function (err) {
            if (err) throw err;
            
            done(null, user);
        });
    });
};

var uniqueApiKey = function (callback) {
    crypto.randomBytes(16, function(ex, buf) {
        var token = buf.toString('hex');
        
        callback(token);
    });
};

module.exports = function (passport, app) {
    passport.serializeUser(function (user, done) {
        done(null, user.id);
    });
    
    passport.deserializeUser(function (id, done) {
        User.findById(id, done);
    });
    
    passport.use(new GitHubStrategy({
        clientID: GITHUB_CLIENT_ID,
        clientSecret: GITHUB_CLIENT_SECRET,
        callbackURL: "http://connect.brianweiser.io/auth/github/callback"
    }, function (accessToken, refreshToken, profile, done) {
        process.nextTick(function () {
            User.findOne({ githubID: profile.id }, function (err, user) {
                if (err) throw err;
                
                if (user) {
                    done(null, user);
                } else {
                    createNewUser(profile, done);
                }
            });
        });
    }));
    
    app.get("/auth/github", passport.authenticate("github"));
    app.get("/auth/github/callback",
            passport.authenticate("github"),
            function (req, res) {
                res.redirect("/");
    });
};
