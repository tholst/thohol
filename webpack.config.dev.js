const commonConfig = require("./webpack.config.common.js");

process.env.NODE_ENV = "development";

module.exports = Object.assign(commonConfig, {
    mode: "development",
    devServer: {
        // stats: "minimal",
        // contentBase: ".",
        historyApiFallback: true
        // historyApiFallback: {
        //     rewrites: [{ from: /^\/posts\/.*/, to: "/" }]
        // }
    }
});
