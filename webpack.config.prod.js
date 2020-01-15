const commonConfig = require("./webpack.config.common.js");

process.env.NODE_ENV = "production";

module.exports = Object.assign(commonConfig, {
    mode: "production"
});
