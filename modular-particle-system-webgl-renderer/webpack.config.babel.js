const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin");

module.exports = {
  entry: "./src/index.js",
  mode: "development",
  devServer: { open: true },
  plugins: [
    new HtmlWebpackPlugin({}),
    new CopyPlugin({
      patterns: [{ from: "assets", to: "assets" }],
    }),
  ],
  output: {
    filename: "[name].bundle.js",
    path: path.resolve(__dirname, "dist"),
    clean: true,
  },
  module: {
    // https://webpack.js.org/loaders/babel-loader/#root
    rules: [
      {
        test: /.m?js$/,
        loader: "babel-loader",
        exclude: /node_modules/,
      },
    ],
  },
  devtool: "source-map",
};
