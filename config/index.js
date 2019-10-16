const path = require('path')
const convict = require('convict')
const { Container } = require('typedi')
const ip = require('ip')

// Define a schema
const config = convict({
    port: {
        doc: 'Server Port',
        format: 'port',
        default: 3000,
        env: 'port',
    },
    env: {
        doc: 'The application environment.',
        format: ['prod', 'dev', 'test'],
        default: 'dev',
        env: 'COMPILE_ENV',
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
        name: {
            doc: 'Database Instance Name',
            format: String,
            default: null,
        },
        host: {
            doc: 'Database Host',
            format: String,
            default: null,
        },
        user: {
            doc: 'Database Username',
            format: String,
            default: '',
        },
        pass: {
            doc: 'Database Password',
            format: String,
            default: '',
        },
    },
    cas: {
        servicePrefixAddress: {
            doc: 'CAS Service Prefix',
            format: String,
            default: `http://${ip.address()}`,
        },
        serverPath: {
            doc: 'CAS Service Path',
            format: String,
            default: null,
        },
        loginPageUrl: {
            doc: 'CAS login page url',
            format: 'url',
            default: null,
        },
    },

})

const env = config.get('env')
console.info('[config/index.js]: env = ', env)

console.info('[config/index.js]: load config file:', path.resolve(__dirname, `./${env}.json`))
config.loadFile(path.resolve(__dirname, `./${env}.json`))

config.validate({ allowed: 'strict' }) // Perform validation

Container.set('config', config)

module.exports = config
