const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

process.env.NODE_ENV = "production";

module.exports = {
    entry: "./src/index.js",
    mode: "production",
    output: {
        filename: "bundle.js",
        path: path.resolve(__dirname, "build"),
        publicPath: "/"
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /(node_modules|bower_components)/,
                loader: ["babel-loader", "eslint-loader"]
            },
            {
                test: /\.val\.js$/,
                use: ["val-loader"]
            },
            {
                test: /\.css$/,
                use: ["style-loader", "css-loader"]
            },
            {
                test: /\.mdx?$/,
                use: [
                    {
                        loader: "babel-loader"
                    },
                    {
                        loader: "mdx-loader"
                    }
                ]
            }
        ]
    },
    resolve: { extensions: ["*", ".js", ".jsx"] },
    devServer: {
        stats: "minimal",
        historyApiFallback: true
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: "./src/index.html"
            // favicon: "src/favicon.ico"
        })
    ]
};
