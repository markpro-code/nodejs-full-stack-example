const mongoose = require('mongoose')
const { Container } = require('typedi')

class DBManager {
    constructor(container) {
        this.container = container
        this.debug = container.get('debug')
    }

    connectDB() {
        const isDevMode = this.container.get('env.isDev')
        const config = this.container.get('config')

        return new Promise(((resolve, reject) => {
            mongoose.set('debug', isDevMode)
            const uri = config.get('db.connectUrl')
            console.info(`connect to db ${uri}`)
            mongoose.connect(uri, {
                useNewUrlParser: true,
                autoIndex: this.isDevMode,
                useCreateIndex: true,
            })

            const db = mongoose.connection
            db.on('error', err => {
                console.error('mongodb connection error:', err)
                reject(err)
            })

            db.once('open', () => {
                console.info('----------------------------')
                console.info('mongodb connection success !')
                resolve()
            })
        }))
    }
}

module.exports = Container.get(DBManager)
