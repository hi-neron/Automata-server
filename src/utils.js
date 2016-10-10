'use strict'

const request = require('superagent')

function authenticated (ctx, next) {
  request
    .get('/whoami')
    .set('Accept', 'application/json')
    .end((err, res) => {
      if (err) {
        console.log(err)
      }

      let profile = res.body
      console.log(profile)

      if (profile.username) {
        ctx.auth = profile
      } else {
        ctx.auth = false
      }
      next()
    })
}

module.exports = { authenticated }