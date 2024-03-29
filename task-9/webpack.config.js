const path = require('path');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const isDev = process.env.NODE_ENV === 'development';
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const LinkTypePlugin = require('html-webpack-link-type-plugin').HtmlWebpackLinkTypePlugin;
const ExportsLoad = require('exports-loader');
const Vanilla = require('vanilla-tilt');
const OptimizeCssAssetWebpackPlugin = require('optimize-css-assets-webpack-plugin');
const TerserWebpackPlugin = require('terser-webpack-plugin');
const isProd = !isDev;
const filename = (ext) => isDev ? `[name].${ext}` : `[name].[contenthash].${ext}`;

module.exports = {
    devtool: 'eval',
    context: path.resolve(__dirname, 'src'),
    mode: 'development',
    entry: './js/script.ts',
    output: {
        filename: `./js/${filename('js')}`,
        path: path.resolve(__dirname, 'app'),
        publicPath: "",
    },
    resolve: {
        extensions: ['.ts', '.tsx', '.js'],
    },
    devServer: {
        historyApiFallback: true,
        contentBase: path.resolve(__dirname, 'app'),
        open: true,
        compress: true,
        hot: true,
        port: 3000,
    },
    plugins: [
        new HTMLWebpackPlugin({
            template: path.resolve(__dirname, 'src/index.html'),
            filename: "index.html",
            minify: {
                collapseWhitespace: isProd
            }
        }),
        new CleanWebpackPlugin(),
        new MiniCssExtractPlugin({
            filename: `./css/${filename('css')}`,
        }),
        new CopyWebpackPlugin({
            patterns: [
                {from: path.resolve(__dirname, 'src/assets'), to: path.resolve(__dirname, 'app')}
            ]
        }),

    ],
    module: {
        rules: [
            {
                test: /\.css$/i,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader,
                        options: {
                            publicPath: (resourcePath, context) => {
                                return path.relative(path.dirname(resourcePath), context) + '/';
                            },
                        }
                    },
                    'css-loader','resolve-url-loader'],
            },
            {
                test: /\.s[ac]ss$/,
                use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader' ]
            },
            {
                test: /\.exec.js$/,
                use: [ 'script-loader' ]
            },
            {
                test: /\.tsx?$/,
                use: ['ts-loader'],
                exclude: /node_modules/
            },

            // {
            //     test: /\.js$/,
            //     exclude: /node_modules/,
            //     use: ['babel-loader'],
            // },
            {
                test: /\.(?:|gif|png|jpg|jpeg|svg)$/,
                use: [{
                    loader: "file-loader",
                    options: {
                        name: `./img/${filename('[ext]')}`
                    }
                }],
            },
            {
                test: /\.(?:|eot|otf|ttf|wolf|svg)$/,
                use: [{
                    loader: "file-loader",
                    options: {
                        name: `./fonts/${filename('[ext]')}`,

                    }
                }],
            },
            {
                test: /\.svg/,
                use: {
                    loader: "svg-url-loader",
                    options: {
                        // make all svg images to work in IE
                        iesafe: true,
                    },
                },
            },
            {
                test: /\.js$/,
                enforce: 'pre',
                use: ['source-map-loader'],
            }

        ]
    },
};