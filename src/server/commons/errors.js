const { validationResult } = require('express-validator')

class ActionFailError extends Error {
    constructor(title, ...params) {
    // Pass remaining arguments (including vendor specific ones) to parent constructor
        super(...params)

        // Maintains proper stack trace for where our error was thrown (only available on V8)
        if (Error.captureStackTrace) {
            Error.captureStackTrace(this, ActionFailError)
        }

        this.title = title
        this.name = 'ActionFailError'
        this.statusCode = 'action_fail'
        this.date = new Date()
    }
}

class RequestValidationError extends Error {
    constructor(...params) {
        super(...params)
        if (Error.captureStackTrace) {
            Error.captureStackTrace(this, RequestValidationError)
        }

        this.title = 'Request Validtion Error'
        this.name = 'RequestValidationError'
        this.statusCode = 'request_validation_error'
        this.date = new Date()
    }
}

function handleValidationError(req, res, next) {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        const msg = errors.array().map(item => item.msg).join('\n')
        next(new RequestValidationError(msg))
    } else {
        next()
    }
}

module.exports = {
    ActionFailError,
    RequestValidationError,
    handleValidationError,
}
