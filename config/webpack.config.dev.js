const path = require('path')
const webpack = require('webpack')
const CaseSensitivePlugin = require('case-sensitive-paths-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { optimization, publicPath, fileLoaders, namespaceInjectLoader, alias } = require('./webpack_common.js')
const { devServer } = require('./webpack_dev_server.js')

module.exports = {
    mode: 'development',
    entry: {
        index: path.resolve(__dirname, '../src/client/index.js'),
    },
    output: {
        path: path.join(__dirname, '../dist/assets/'),
        filename: '[name].js',
        publicPath,
    },
    optimization,
    cache: true,
    devtool: 'cheap-module-eval-source-map',
    plugins: [
        new CaseSensitivePlugin(),
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
        }),
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, '../src/client/index_dev.html'),
            filename: '../index.html',
        }),
    ],

    module: {
        rules: fileLoaders.concat([{
            test: /\.(js|jsx)$/,
            use: ['babel-loader', namespaceInjectLoader],
            include: [path.join(__dirname, '../src')],
        },
        {
            test: /\.css$/,
            use: [
                'style-loader',
                'css-loader',
            ],
        },
        {
            test: /\.less$/,
            use: [
                'style-loader',
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
            include: [path.join(__dirname, '../src')],
        },
        {
            test: /\.less$/,
            use: [
                'style-loader',
                'css-loader',
                'less-loader',
            ],
            include: [path.join(__dirname, '../node_modules')],
        }]),
    },

    resolve: {
        alias,
    },
    devServer,
}
