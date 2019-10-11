const { Container } = require('typedi')
const express = require('express')
const compression = require('compression')
const morgan = require('morgan')
const session = require('express-session')
const FileStore = require('session-file-store')(session)
const ip = require('ip')

const appRouter = require('./router.js')
const { RequestValidationError } = require('./errors.js')
const dbManager = require('./db_manager.js')


function start() {
    const isDevMode = Boolean(Container.get('env.isDev'))
    const config = Container.get('config')

    const app = express()
    // enable ETag
    app.enable('etag')
    // request log
    app.use(morgan('combined'))
    // gzip
    app.use(compression())
    // auth
    app.use(require('./user/jwt_auth_middleware'))

    // session
    app.use(session({
        name: config.get('session.name'),
        store: new FileStore(),
        secret: config.get('session.secret'),
        cookie: { maxAge: 60 * 60 * 1000 },
        resave: true,
        saveUninitialized: false,
    }))

    // parsing application/json
    app.use(express.json({ limit: '50mb' }))
    // parsing application/x-www-form-urlencoded
    app.use(express.urlencoded({ extended: true }))

    app.use(appRouter)

    // ============ global error handler ============ //
    app.use((err, req, res, next) => {
        if (err instanceof RequestValidationError) {
            res.json({
                status: err.statusCode,
                messages: err.message,
                data: {},
            })
        } else {
            res.json({
                status: 'error',
                data: {},
                messages: `${err}\n${err.stack}`,
            })
        }
        console.error(err)
    })

    process.on('unhandledRejection', (error, promise) => {
        console.error(error.message)
        console.error(error)
    })

    const port = config.get('port')
    app.listen(port, () => {
        console.info('-----------------------------')
        console.info(`server started in ${isDevMode ? 'DEV' : 'PROD'} mode, at port ${port}`)
        dbManager.connectDB().then(() => {
            console.info(`server started: http://${ip.address()}:${port}`)
        })
    })
}


module.exports = { start }
