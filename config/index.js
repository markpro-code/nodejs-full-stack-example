const path = require('path')
const convict = require('convict')
const { Container } = require('typedi')

const debug = Container.get('debug')

// Define config schema
const config = convict({
    port: {
        doc: 'Server Port',
        format: 'port',
        default: 3000,
        env: 'port',
    },
    env: {
        doc: 'The application environment.',
        format: ['production', 'development'],
        default: 'development',
        env: 'NODE_ENV',
    },
    session: {
        name: {
            doc: 'Session ID Name',
            format: String,
            default: 'skey',
            env: 'session_name',
        },
        secret: {
            doc: 'Session ID Name',
            format: String,
            default: 'boring_secret',
            env: 'session_secret',
        },

    },
    db: {
        connectUrl: {
            doc: 'database connect url',
            format: String,
            default: '',
        },
    },
})

const env = config.get('env')
config.loadFile(path.resolve(__dirname, `./${env}.json`))
// Perform validation
config.validate({ allowed: 'strict' })

debug('load config:', config.toString())


module.exports = config
