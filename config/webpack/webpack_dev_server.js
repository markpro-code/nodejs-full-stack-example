const path = require('path')

const port = 8081
const target = 'http://localhost:8080'

const contentBase = path.join(__dirname, '../dist')
module.exports = {
    open: true,
    contentBase,
    historyApiFallback: true,
    hot: true,
    host: '0.0.0.0',
    port,
    useLocalIp: true,
    disableHostCheck: true,
    publicPath: '/assets/',
    noInfo: false,
    overlay: true,
    writeToDisk(p) {
        console.info('dev sever writeToDisk:', p)
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
