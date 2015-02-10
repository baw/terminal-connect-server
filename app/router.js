module.exports = function (app, express) {
    app.get("/", function (req, res) {
        var user = req.user;
        
        res.render("home", {
            user: user
        });
    });

    app.use(express.static(__dirname + "/public"));
};