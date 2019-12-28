const path = require('path')
const webpack = require('webpack')
const CaseSensitivePlugin = require('case-sensitive-paths-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const { clientRoot, outputPath, optimization, publicPath, fileLoaders, namespaceInjectLoader, alias } = require('./webpack_common.js')
const devServer = require('./webpack_dev_server.js')


module.exports = {
    mode: 'development',
    entry: {
        index: path.resolve(clientRoot, 'index.js'),
    },
    output: {
        path: outputPath,
        filename: '[name].js',
        publicPath,
    },
    optimization,
    cache: true,
    devtool: 'cheap-module-eval-source-map',
    plugins: [
        new CaseSensitivePlugin(),
        new CleanWebpackPlugin(),
        new webpack.DefinePlugin({
            'process.env.COMPILE_ENV': JSON.stringify('dev'),
        }),
        new HtmlWebpackPlugin({
            template: path.resolve(clientRoot, 'index_dev.html'),
            filename: '../index.html',
        }),
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
            include: [clientRoot],
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
