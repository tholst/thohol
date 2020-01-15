const commonConfig = require("./webpack.config.common.js");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

process.env.NODE_ENV = "production";

module.exports = Object.assign(commonConfig, {
    mode: "production",
    plugins: [new CleanWebpackPlugin()].concat(commonConfig.plugins)
});
