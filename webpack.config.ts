import * as Path from "path"
import * as Webpack from "webpack"

const configuration: Webpack.Configuration = {
	context: Path.resolve(__dirname, "src"),
	entry: "./index.ts",
	output: {
		filename: "index.js",
		libraryTarget: "umd",
		path: Path.resolve(__dirname, "dist"),
	},
	module: {
		rules: [
			{
				exclude: /node_modules/,
				loader: "ts-loader",
				test: /\.tsx?$/
			},
			{
				enforce: "pre",
				loader: "source-map-loader",
				test: /\.js$/
			}
		]
	},
	optimization: {
		minimize: true,
	},
	resolve: {
		extensions: [".ts", ".tsx"]
	}
}

export default configuration
