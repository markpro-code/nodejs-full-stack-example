const { Container } = require('typedi')
const config = require('../config')
const { logger } = require('../src/server/log_manager.js')

logger.info('config', config.toString())

Container.set('env.isDev', config.get('env') === 'dev')

// start server
require('../src/server').start()
