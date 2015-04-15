module.exports = {
    context: __dirname + "/public",
    devServer: {
        contentBase: __dirname + "/public",
    },
    entry: "./js/main.jsx",
    output: {
        path: __dirname + "/js",
        flename: "main.js"
    },
    module: {
        loaders: [
            {
                test: /\.jsx$/,
                loader: "jsx-loader"
            }
        ]
    }
};
