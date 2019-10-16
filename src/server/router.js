const express = require('express')

const router = express.Router()
const user = require('./user')

router.post('/api/user/register', ...user.controller.register)
router.post('/api/user/login', ...user.controller.login)
router.post('/api/user/logout', ...user.controller.logout)


module.exports = router
