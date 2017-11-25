/// <binding />
"use strict";

module.exports = {
    entry: "./wwwroot/js/app/index.js",
    output: {
        filename: "./wwwroot/js/site.js"
    },
    module: {
        loaders: [
            {
                test: /\.js$/,
                loader: "babel-loader",
                exclude: /node_modules/,
                query: {
                    presets: ["es2015", "react"]
                }
            }
        ]
    }
};