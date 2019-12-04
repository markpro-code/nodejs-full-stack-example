const path = require('path')
const finalhandler = require('finalhandler')
const fs = require('fs-extra')

const target = 'http://172.16.113.206:8080'
const isLocal = process.env.SERVE_MODE === 'local'
const port = isLocal ? 8081 : 8082

module.exports = {
    open: true,
    contentBase: [
        path.join(__dirname, '../dist'),
        path.join(__dirname, '../../src/mocks/ajax'),
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
    proxy: [{
        context: ['/api/'],
        target,
        changeOrigin: true,
        onProxyReq(proxyReq, req) {
            console.info(`测试请求地址：${target}${req.originalUrl}`)
        },
    }],
    before(app) {
        if (!isLocal) {
            return
        }
        app.post('/file_upload', function (req, res, next) {
            setTimeout(function () {
                res.status(200).json({ data: { url: 'http://www.xxx.image' } })
            }, 2000)
        })

        app.post('*', function (req, res, next) {
            const { originalUrl } = req
            const ajaxPrefixs = ['/api/']
            const jsonFilePath = `${path.resolve(__dirname, '../../src/mocks/ajax', originalUrl.replace(/^\/+/, '').replace(/\?[^?]*$/, ''))}.json`
            console.info('originalUrl', originalUrl)
            console.info('jsonFilePath: ', jsonFilePath)
            if (isLocal && ajaxPrefixs.some(item => originalUrl.startsWith(item))) {
                fs.readFile(jsonFilePath, 'utf8')
                    .then(data => res.json(JSON.parse(data)))
                    .catch(finalhandler(req, res))
            } else {
                next()
            }
        })
    },

}
