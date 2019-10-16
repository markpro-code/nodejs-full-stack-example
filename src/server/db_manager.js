const mongoose = require('mongoose')
const { Container } = require('typedi')
const CryptoJS = require('crypto-js')
const { isEmpty } = require('./commons/utils.js')

const { logger } = require('./log_manager.js')

function dc(value) {
    return CryptoJS.AES.decrypt(value, 'boring').toString(CryptoJS.enc.Utf8)
}

class DBManager {
    constructor(container) {
        this.container = container
    }


    connectDB() {
        const isDevMode = this.container.get('env.isDev')
        const config = this.container.get('config')

        return new Promise(((resolve, reject) => {
            mongoose.set('debug', isDevMode)
            const { host, name, user, pass } = config.get('db')
            const uri = `mongodb://${host}/${name}`
            const option = {
                useNewUrlParser: true,
                useCreateIndex: true,
            }

            if (!isEmpty(user)) {
                option.user = user
            }

            if (!isEmpty(pass)) {
                option.pass = dc(pass)
            }

            logger.info(`try to connect mogodb ${uri}`)

            mongoose.connect(uri, option)
            const db = mongoose.connection
            db.on('error', err => {
                logger.error(err)
                reject(err)
            })

            db.once('open', () => {
                console.info('----------------------------')
                logger.info('mongodb connection success !')
                resolve()
            })
        }))
    }

    disconnectDB() {
        logger.info('disconnect mongoDB')
        return mongoose.disconnect()
    }
}

module.exports = Container.get(DBManager)
