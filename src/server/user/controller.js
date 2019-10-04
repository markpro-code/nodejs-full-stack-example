const { body, param } = require('express-validator')
const service = require('./service')
const { handleValidationError } = require('../commons/errors.js')
const { sendData } = require('../commons/utils.js')

const register = [
    // validation
    body('username').trim().not().isEmpty().withMessage('missing username'),
    body('passowrd').trim().not().isEmpty().withMessage('missing password'),
    body('passowrd_repeat').trim().not().isEmpty().withMessage('missing passowrd_repeat'),
    handleValidationError,
    (req, res, next) => {
    },
]

const login = [
    // validation
    body('username').trim().not().isEmpty().withMessage('missing product name'),
    body('passowrd').trim().not().isEmpty().withMessage('missing product code'),
    handleValidationError,
    (req, res, next) => {
    },
]

const logout = [
    (req, res, next) => {
    },
]

module.exports = {
    register,
    login,
    logout,
}
