/* eslint-disable @typescript-eslint/no-var-requires */

const path = require("path");
const fs = require("fs");

const merge = require("webpack-merge").merge;

// plugins
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CopyPlugin = require("copy-webpack-plugin");
const TsconfigPathsPlugin = require("tsconfig-paths-webpack-plugin");

const getFiles = (src, ext, files = []) => {
    const list = fs.readdirSync(src);
    list.forEach((el) => {
        const pathEl = path.join(src, el).replace(/\\/g, "/");
        if (fs.statSync(pathEl).isDirectory()) {
            getFiles(pathEl, ext, files);
        } else if (el.includes(ext)) {
            files.push([pathEl, el.split(ext)[0]]);
        }
    });
    return files;
};

module.exports = (env) => {
    const appsFiles = getFiles("./apps/", ".ts");
    const entry = appsFiles.reduce((obj, [filePath, name]) => {
        obj[name] = `./${filePath}`;
        return obj;
    }, {});

    const config = {
        entry,

        resolve: {
            extensions: [".ts", ".tsx", ".js", ".json"],
            plugins: [new TsconfigPathsPlugin()],
        },

        module: {
            rules: [
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
                },
                filename: "index.html",
                template: "./index-template.html",
            }),
            // Copy assets into webpack build.
            new CopyPlugin({
                patterns: [
                    {
                        from: "assets/**",
                    },
                ],
            }),
        ],
    };
    const envConfig = require(path.resolve(__dirname, `./webpack.${env.mode}.js`))(env);

    const mergedConfig = merge(config, envConfig);

    return mergedConfig;
};
