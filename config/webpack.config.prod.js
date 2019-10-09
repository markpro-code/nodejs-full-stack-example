const path = require('path')
const webpack = require('webpack')
const CaseSensitivePlugin = require('case-sensitive-paths-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCSSExtractPlugin = require('mini-css-extract-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const ProgressBarPlugin = require('progress-bar-webpack-plugin')
const { optimization, publicPath, fileLoaders, namespaceInjectLoader, alias } = require('./config/webpack_common.js')

module.exports = {
    mode: 'production',
    entry: {
        index: './src/index',
    },
    output: {
        path: path.join(__dirname, '../dist/assets'),
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
            'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
        }),
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, '../src/client/index_prod.html'),
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
            include: [path.join(__dirname, '../src/client')],
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
                        modules: true,
                        importLoaders: 2,
                        localIdentName: '[name]__[local]___[hash:base64:5]',
                    },
                },
                'less-loader',
            ],
            include: [path.resolve(__dirname, '../src/client')],
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
