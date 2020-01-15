const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

process.env.NODE_ENV = "development";

module.exports = {
    entry: "./src/index.js",
    mode: "development",
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
            },
            {
                test: /\.(png|jpg|gif)$/i,
                use: [
                    {
                        loader: "file-loader",
                        options: {
                            name: "posts/[name].[ext]"
                        }
                    }
                ]
            }
            // {
            //     test: /\.(png|jpg|gif)$/i,
            //     use: [
            //         {
            //             loader: "url-loader",
            //             options: {
            //                 limit: 0 // images smaller than limit (in bytes) will be inlined via data-url, otherwise file-loader is used
            //             }
            //         }
            //     ]
            // }
        ]
    },
    resolve: { extensions: ["*", ".js", ".jsx"] },
    devServer: {
        // stats: "minimal",
        // contentBase: ".",
        historyApiFallback: true
        // historyApiFallback: {
        //     rewrites: [{ from: /^\/posts\/.*/, to: "/" }]
        // }
    },
    plugins: [
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
            template: "./src/index.html"
            // favicon: "src/favicon.ico"
        })
    ]
};
