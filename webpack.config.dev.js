const commonConfig = require("./webpack.config.common.js");

process.env.NODE_ENV = "development";

module.exports = Object.assign(commonConfig, {
    mode: "development",
    devServer: {
        host: "0.0.0.0", // listen for requests from network
        // stats: "minimal",
        // contentBase: ".",
        historyApiFallback: true
        // historyApiFallback: {
        //     rewrites: [{ from: /^\/posts\/.*/, to: "/" }]
        // }
    }
});
