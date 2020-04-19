const path = require('path')
const fs = require('fs-extra')
const JSON5 = require('json5')

/**
 *  @param options {object}: config object
 *  @param options.enable {boolean}: enable middleware
 *  @param options.rootPath {string}: mock data root path
 *  @param options.responseDelay {string}: mock data root path
 */
const middleware = options => (req, res, next) => {
    if (options.enable !== true) {
        next()
        return
    }
    const scriptFilePath = `${path.resolve(options.rootPath, req.originalUrl.replace(/^\//, ''))}.js`
    const JsonFilePath = `${path.resolve(options.rootPath, req.originalUrl.replace(/^\//, ''))}.json`

    let mockData
    if (fs.pathExistsSync(scriptFilePath)) {
        console.info(`mock file request: ${scriptFilePath}`)
        /*eslint-disable */
        // delete module cache
        delete require.cache[scriptFilePath]
        mockData = require(scriptFilePath)(req)
        /* eslint-enable */
    } else if (fs.pathExistsSync(JsonFilePath)) {
        console.info(`mock file request: ${JsonFilePath}`)
        mockData = JSON5.parse(fs.readFileSync(JsonFilePath, 'utf8'))
    } else {
        throw new Error(`mock data not found: \n${scriptFilePath}\n${JsonFilePath}`)
    }

    setTimeout(function () {
        res.json(mockData)
    }, options.responseDelay || 500)
}

module.exports = middleware
