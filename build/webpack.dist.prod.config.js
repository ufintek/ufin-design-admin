const path = require("path");
const webpack = require("webpack");
const merge = require("webpack-merge");
const webpackBaseConfig = require("./webpack.base.config.js");
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");

process.env.NODE_ENV = "production";

module.exports = merge(webpackBaseConfig, {
    devtool: "source-map",
    entry: {
        main: "./packages/index.js"
    },
    output: {
        path: path.resolve(__dirname, "../dist"),
        publicPath: "/dist/",
        filename: "ufin-admin.min.js",
        library: "ufin-admin",
        libraryTarget: "umd",
        umdNamedDefine: true
    },
    externals: {
        vue: {
            root: "Vue",
            commonjs: "vue",
            commonjs2: "vue",
            amd: "vue"
        }
    },
    plugins: [
        new UglifyJsPlugin({
            parallel: true,
            sourceMap: true
        })
    ],
    optimization: {
        minimizer: [
            new UglifyJsPlugin({
                parallel: true,
                sourceMap: true
            })
        ]
    }
});
