const path = require('path')
const bodyParser = require('body-parser')
const mockDataMiddleware = require('./mock-data-middleware.js')

const target = 'http://39.97.227.216'

const mode = process.env.MODE
console.info('current dev mode: ', mode)

const isLocal = mode === 'local'
const port = isLocal ? 8082 : 8083

const mock = mockDataMiddleware({
    enable: isLocal,
    rootPath: path.resolve(__dirname, '../mockData/'),
})

const proxy = [{
    context: ['/api/**', '/socket.io/**'],
    target,
    changeOrigin: true,
    onProxyReq(proxyReq, req) {
        console.info(`测试请求地址：${target}${req.originalUrl}`)
    },
}]


module.exports = {
    open: true,
    contentBase: [
        path.resolve(__dirname, '../../dist'),
        path.resolve(__dirname, '../../public'),
    ],
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
    before(app, server, compiler) {
        app.all('/api/*', bodyParser.json(), mock)
    },
    proxy,
}
