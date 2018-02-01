const jwt = require('jsonwebtoken')

module.exports = ({secret, ttl = 3600} = {}) => {
  if (typeof secret === 'undefined') {
    throw new Error('Missing required config field: `secret`.')
  }

  return {
    sign(text, next) {
      console.log('Signing', text)
      jwt.sign({ token: text }, secret, { expiresIn: ttl }, next)
    },
    verify(token, next) {
      jwt.verify(token, secret, (err, ...rest) => {
        console.log(err, ...rest)
        next(err, ...rest) 
      })
    }
  }
}

