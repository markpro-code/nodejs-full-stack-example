const path = require('path')
const webpack = require('webpack')
const CaseSensitivePlugin = require('case-sensitive-paths-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCSSExtractPlugin = require('mini-css-extract-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const ProgressBarPlugin = require('progress-bar-webpack-plugin')
const { clientRoot, outputPath, optimization, publicPath, fileLoaders, namespaceInjectLoader, alias } = require('./webpack_common.js')


module.exports = {
    mode: 'production',
    entry: {
        index: path.resolve(clientRoot, 'index.js'),
    },
    output: {
        path: outputPath,
        filename: '[name].[hash].js',
        publicPath: `${publicPath}`,
    },
    optimization,
    cache: true,
    devtool: 'nosources-source-map',
    plugins: [
        new CaseSensitivePlugin(),
        new CleanWebpackPlugin(),
        new webpack.DefinePlugin({
            'process.env.COMPILE_ENV': JSON.stringify('prod'),
        }),
        new HtmlWebpackPlugin({
            template: path.resolve(clientRoot, 'index_prod.html'),
            filename: '../index.html',
        }),
        new MiniCSSExtractPlugin({
            filename: '[name].[hash].css',
        }),
        new ProgressBarPlugin(),
    ],

    module: {
        rules: fileLoaders.concat([{
            test: /\.(js|jsx)$/,
            use: ['babel-loader', namespaceInjectLoader],
            include: [clientRoot],
        },
        {
            test: /\.css$/,
            use: [
                {
                    loader: MiniCSSExtractPlugin.loader,
                    options: {
                        publicPath: './',
                    },
                },
                'css-loader',
            ],
        },
        {
            test: /\.less$/,
            use: [
                {
                    loader: MiniCSSExtractPlugin.loader,
                    options: {
                        publicPath: './',
                    },
                },
                {
                    loader: 'css-loader',
                    options: {
                        importLoaders: 2,
                        modules: {
                            localIdentName: '[name]__[local]___[hash:base64:5]',
                        },
                    },
                },
                'less-loader',
            ],
            include: [clientRoot],
        },
        {
            test: /\.less$/,
            use: [
                {
                    loader: MiniCSSExtractPlugin.loader,
                    options: {
                        publicPath: './',
                    },
                },
                'css-loader',
                'less-loader',
            ],
            include: [path.resolve(__dirname, '../node_modules')],
        }]),
    },

    resolve: {
        alias,
    },
}
