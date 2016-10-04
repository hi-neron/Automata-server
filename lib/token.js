const jwt = require('jsonwebtoken')

function signToken (payload, secret, options, cb) {
  jwt.sign(payload, secret, options, (err, token) => {
    if (err) return cb(err)
    return cb(null, token)
  })
}

module.exports = {
  signToken
}
