const path = require('path')

const port = 8081
const target = 'http://localhost:8080'

module.exports = function () {
    return {
        open: true,
        contentBase: [path.resolve(__dirname, '../dist')],
        historyApiFallback: true,
        hot: true,
        host: '0.0.0.0',
        port,
        useLocalIp: true,
        disableHostCheck: true,
        publicPath: './assets/',
        noInfo: false,
        overlay: true,
        writeToDisk(p) {
            console.info(p)
            return p.indexOf('.html') > -1
        },
        proxy: {
            '/api/*': {
                target,
                changeOrigin: true,
                onProxyReq(proxyReq, req) {
                    console.info(`测试请求地址：${target}${req.originalUrl}`)
                },
            },
        },
        after() {

        },

    }
}
