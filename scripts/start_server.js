const { Container } = require('typedi')

Container.set('debug', require('debug')('sfecli-manager'))

// load config first
const config = require('../config')

Container.set('env.isDev', config.get('env') === 'development')
Container.set('config', config)

// start server
require('../src/server').start()
