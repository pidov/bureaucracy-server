const passport = require('passport')

module.exports = {
  authorize (req, res) {
    passport.authenticate('ldapauth', (err, user, info) => {
      if (err || !user) return ResponseService.json(res, 401, null, info.message )

      const response = info || { token: JwtService.issue(user) }
      sails.log.debug('Sending auth token to client')
      return ResponseService.json(res, 200, response)
    })(req, res)
  }
}