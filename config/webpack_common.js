const path = require('path')
const TerserPlugin = require('terser-webpack-plugin')

const publicPath = '/assets/'

const namespaceInjectLoader = {
    loader: path.resolve(__dirname, '../src/client/loaders/namespace_inject'),
    options: {
        relativeRoot: path.resolve(__dirname, '../src'),
    },
}

const optimization = {
    minimizer: [
        new TerserPlugin({
            parallel: true,
            // sourceMap: true,
        }),
    ],
    splitChunks: {
        chunks: 'all',
        minSize: 30000,
        maxSize: 0,
        minChunks: 1,
        maxAsyncRequests: 5,
        maxInitialRequests: 3,
        automaticNameDelimiter: '~',
        name: true,
        cacheGroups: {
            vendors: {
                test: /[\\/]node_modules[\\/]/,
                priority: -10,
            },
            default: {
                minChunks: 2,
                priority: -20,
                reuseExistingChunk: true,
            },
        },
    },
}

const fileLoaders = [
    {
        test: /\.(png|jpg|gif|eot|svg|ttf|woff|woff2)$/,
        use: [
            {
                loader: 'url-loader',
                options: {
                    limit: 8192,
                },
            },
        ],
    },
    {
        test: /\.(mp4|ogg)$/,
        use: [
            {
                loader: 'file-loader',
            },
        ],
    },
]


module.exports = {
    namespaceInjectLoader,
    optimization,
    publicPath,
    fileLoaders,
    alias: {
        '@': path.resolve(__dirname, '../src/client'),
    },
}
