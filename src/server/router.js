const express = require('express')

const router = express.Router()
const user = require('./user')

router.post('/api/register', ...user.controller.register)
router.post('/api/login', ...user.controller.login)
router.post('/api/logout', ...user.controller.logout)


module.exports = router
