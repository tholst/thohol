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
                test: /\.(png|jpe?g|gif|svg)$/i,
                use: [
                    {
                        loader: "file-loader",
                        options: {
                            name: "posts/[name].[ext]"
                        }
                    },
                    {
                        loader: "image-webpack-loader",
                        options: {
                            mozjpeg: {
                                progressive: true,
                                quality: 65
                            },
                            optipng: {
                                enabled: false
                            },
                            pngquant: {
                                quality: [0.65, 0.9],
                                speed: 4
                            },
                            gifsicle: {
                                interlaced: false,
                                optimizationLevel: 3
                            },
                            svgo: {
                                plugins: [
                                    {
                                        removeViewBox: false
                                    },
                                    {
                                        removeEmptyAttrs: false
                                    }
                                ]
                            }
                            // the webp option will enable WEBP
                            // webp: {
                            //   quality: 75
                            // }
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
    plugins: [
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
            template: "./src/index.html"
            // favicon: "src/favicon.ico"
        })
    ]
};
