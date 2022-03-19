/* eslint-disable @typescript-eslint/no-var-requires */

const path = require("path");
const TsconfigPathsPlugin = require("tsconfig-paths-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const fs = require("fs");
// const ESLintPlugin = require("eslint-webpack-plugin");
// const webpack = require("webpack");

const getFiles = (src, ext, files = []) => {
  const list = fs.readdirSync(src);
  list.forEach((el) => {
    const pathEl = path.join(src, el).replace(/\\/g, "/");
    if (fs.statSync(pathEl).isDirectory()) {
      if (!pathEl.includes("helpers")) {
        getFiles(pathEl, ext, files);
      }
    } else if (el.includes(ext)) {
      files.push([pathEl, el.split(ext)[0]]);
    }
  });
  return files;
};

const appsFiles = getFiles("./apps/", ".ts");
const entry = appsFiles.reduce((obj, [filePath, name]) => {
  obj[name] = `./${filePath}`;
  return obj;
}, {});

module.exports = {
  entry,
  resolve: {
    alias: {
      /**
       * with the alias we can mimic the usage of the library like it would be in real application
       * `import {ParticleSystem} from 'XXX`
       */
      "modular-particle-system": path.resolve(
        __dirname,
        "../modular-particle-system/src/"
      ),
    },
    extensions: [".ts", "..."],
    plugins: [new TsconfigPathsPlugin()],
  },
  module: {
    rules: [
      {
        test: /\.ts$/i,
        use: ["ts-loader"],
        exclude: /node_modules/,
      },
      {
        test: /\.css$/i,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
          },
          "css-loader",
        ],
      },
    ],
  },
  mode: "development",
  devServer: {
    open: true,
  },
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "[name].js",
  },
  plugins: [
    // Generate html file for each file inside apps/ folder.
    ...appsFiles.map(([src, name]) => {
      const srcTo = src.split("/");
      return new HtmlWebpackPlugin({
        title: name,
        chunks: [name],
        filename:
          // check if path includes nested folders
          srcTo.length > 2
            ? // construct path to html document
              `${srcTo.slice(1, srcTo.length - 1).join("/")}/${name}.html`
            : `${name}.html`,
      });
    }),
    // Generate index.html page for development webpack build.
    // This is just simple HTML that contains a link to every file inside apps/ folder.
    new HtmlWebpackPlugin({
      chunks: [],
      title: "Index",
      templateParameters: {
        apps: appsFiles.map(([src, name]) => {
          const srcTo = src.split("/");
          return srcTo.length > 2
            ? `${srcTo.slice(1, srcTo.length - 1).join("/")}/${name}.html`
            : `${name}.html`;
        }),
        titles: appsFiles.map(([src, name]) => {
          const srcTo = src.split("/");
          return srcTo.length > 2
            ? `${srcTo.slice(1, srcTo.length - 1).join("/")}/${name}`
            : `${name}`;
        }),
      },
      filename: "index.html",
      template: "./index-template.html",
    }),
    // Copy assets into webpack build.
    new CopyPlugin({
      patterns: [
        {
          from: "public/**",
        },
      ],
    }),
    new MiniCssExtractPlugin({
      filename: "[name].css",
    }),
  ],
  devtool: "inline-source-map",
  optimization: {
    splitChunks: {
      cacheGroups: {
        defaultVendor: {
          test: /[\\/]node_modules[\\/]/,
          idHint: "vendor",
          chunks: "all",
        },
      },
    },
  },
};
