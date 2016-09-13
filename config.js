'use strict'

const config = {
  client: {
    endpoints: {
      pictures: 'http://api.platzigram.com/picture',
      users: 'http://api.platzigram.com/user',
      auth: 'http://api.platzigram.com/auth'
    }
  },
  secret: process.env.AUTOMATA_PASS || 'aut*mata' // never use default
}

// For development use local micro instances
if (process.env.NODE_ENV !== 'production') {
  config.client.endpoints = {
    pictures: 'http://localhost:9000',
    users: 'http://localhost:9001',
    auth: 'http://localhost:9002'
  }

  // config.auth.facebook.callbackURL = 'http://platzigram.test:5050/auth/facebook/callback'
}

module.exports = config
