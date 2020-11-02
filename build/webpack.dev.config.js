/**
 * 本地预览
 */

const path = require("path");
const webpack = require("webpack");
// const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require("html-webpack-plugin");
const merge = require("webpack-merge");
const webpackBaseConfig = require("./webpack.base.config.js");

module.exports = merge(webpackBaseConfig, {
    devtool: "eval-source-map",

    // 入口
    entry: {
        main: "./examples/main",
        vendors: ["vue", "vue-router"]
    },
    // 输出
    output: {
        path: path.join(__dirname, "../examples/dist"),
        publicPath: "",
        filename: "[name].js",
        chunkFilename: "[name].chunk.js"
    },
    resolve: {
        alias: {
            iview: "../../src/index",
            vue: "vue/dist/vue.esm.js"
            // vue: 'vue/dist/vue.runtime.js'
        }
    },

    optimization: {
        splitChunks: {
            cacheGroups: {
                common: {
                    name: "app-common",
                    chunks: "initial",
                    // 表示被引用次数，默认为1；
                    minChunks: 2,
                    //初始话并行请求不得超过3个
                    maxInitialRequests: 5,
                    minSize: 0,
                    priority: 1,
                    reuseExistingChunk: true,
                    enforce: true
                },
                vendors: {
                    name: "chunk-vendors",
                    test: /[\\/]node_modules[\\/]/,
                    chunks: "initial",
                    priority: 2,
                    reuseExistingChunk: true,
                    enforce: true
                },
                elementUI: {
                    name: "chunk-elementui",
                    test: /[\\/]node_modules[\\/]element-ui[\\/]/,
                    chunks: "all",
                    priority: 3,
                    reuseExistingChunk: true,
                    enforce: true
                }
            }
        }
    },
    plugins: [
        new HtmlWebpackPlugin({
            inject: true,
            filename: path.join(__dirname, "../examples/dist/index.html"),
            template: path.join(__dirname, "../examples/index.html")
        })
    ]
});
