const path = require('path')
const log4js = require('log4js')
const { Container } = require('typedi')

const compileEnv = Container.get('config').get('env')
const logConfig = {
    appenders: {
        // standard output logger
        stdout: {
            type: 'stdout',
        },

        // file logger, daily per file, keep file of 30 days
        file: {
            type: 'dateFile',
            filename: path.resolve(__dirname, '../../logs/access.log'),
            pattern: '.yyyy-MM-dd',
            compress: true,
            // keep old log file for 30 days
            daysToKeep: 30,
        },
    },
    categories: {
        default: {
            appenders: ['stdout'],
            level: 'debug',
        },
        'sfecli-manager': {
            appenders: ['stdout', 'file'],
            level: compileEnv === 'dev' ? 'debug' : 'info',
        },
    },
}
log4js.configure(logConfig)

const logger = log4js.getLogger('sfecli-manager')
logger.info('logger configuration:', JSON.stringify(logConfig, null, 4))

Container.set('logger', logger)

const logMiddleware = function (req, res, next) {
    const payload = req.body != null ? `payload=${JSON.stringify(req.body)}` : ''
    logger.debug(`request [${req.method}]${req.originalUrl} ${payload}`)
    next()
}


/**
 *  shut down log service
 */
function shutdownLog() {
    logger.info('shut down log4js')
    return new Promise(((resolve, reject) => {
        log4js.shutdown(() => resolve())
    }))
}

module.exports = {
    logger,
    logMiddleware,
    shutdownLog,
}
