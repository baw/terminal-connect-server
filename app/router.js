module.exports = function (app, express) {
    app.get("/", function (req, res) {
        var user = req.user;
        
        res.render("home", {
            user: user
        });
    });
    
    app.get("/commands", function (req, res) {
        var user = req.user;
        
        user.populate("commands", function (err, user) {
            if (err) throw err;
            
            res.render("commands", {
                user: user
            });
        });
    });

    app.use(express.static(__dirname + "/public"));
};