const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const GoogleFontsPlugin = require("@beyonk/google-fonts-webpack-plugin");
const ESLintPlugin = require('eslint-webpack-plugin');

module.exports = {
    entry: "index.js",
    /* ... */
    plugins: []
};

process.env.NODE_ENV = "development";

module.exports = {
    entry: "./src/index.js",
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
                use: ["babel-loader"]
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
        new ESLintPlugin({}),
        new HtmlWebpackPlugin({
            template: "./src/index.html"
            // favicon: "src/favicon.ico"
        }),
        new GoogleFontsPlugin({
            local: true,
            path: "fonts",
            fonts: [
                {
                    family: "Montserrat",
                    variants: ["400", "400italic", "700", "700italic"]
                },
                {
                    family: "Roboto",
                    variants: ["400", "400italic", "700italic", "900"]
                }
            ]
        })
    ]
};
