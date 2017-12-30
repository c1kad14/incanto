/// <binding />
"use strict";

module.exports = {
	entry: {
		app: "./wwwroot/js/app/index.js",
		store: "./wwwroot/js/store/index.js"
	},
	output: {
		filename: "./wwwroot/js/[name].js"
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