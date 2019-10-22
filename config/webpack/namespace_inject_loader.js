/* eslint import/order: 0 */
const projectName = require('../../package.json').name
const debug = require('debug')(projectName)
const { clientRoot } = require('./webpack_common.js')

const pageRoot = clientRoot.replace(/\\/g, '/')

module.exports = function (content, map, meta) {
    const namespace = this.context.replace(/\\/g, '/').replace(pageRoot, '').replace(/^\/+/, '')

    if (!namespace.startsWith('pages')) {
        return content
    }

    debug('--------------------------------')
    debug(`namespace: ${namespace}`)
    debug(`transform file: ${this.resourcePath}`)

    // for other files in page folder
    return `
/* page-connect-loader injection start */
const $namespace = '${namespace}'
/* page-connect-loader injection end */

${content}`
}
