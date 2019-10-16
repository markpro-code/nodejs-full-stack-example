const passport = require('passport')
const { Strategy, ExtractJwt } = require('passport-jwt')
const userService = require('./service.js')

const opts = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: 'jwt_boring_secret',
    issuer: 'accounts.examplesoft.com',
    audience: 'yoursite.net',
}

const strategy = new Strategy(opts, function (jwtPayload, done) {
    userService.findOne({ id: jwtPayload.sub }, function (err, user) {
        if (err) {
            return done(err, false)
        }
        if (user) {
            return done(null, user)
        }
        return done(null, false)
        // or you could create a new account
    })
})
passport.use(strategy)


module.exports = passport.initialize()
