'use strict'

const config = {
  client: {
    endpoints: {
      pictures: 'http://api.automata.com/pictures',
      users: 'http://api.automata.com/users',
      auth: 'http://api.automata.com/auth',
      contributions: 'http://api.automata.com/contributions'
    }
  },
  redis: process.env.REDIS_URL || 'http://localhost:6379',
  secret: process.env.AUTOMATA_PASS || 'aut*mata', // never use default,
  appName: process.env.AUTOMATA_NAME || 'Autómata',
  aws: {
    bucket: process.env.BUCKET || 'automata-images',
    accessKeyId: process.env.AWS_ACCESS_KEY,
    secretAccessKey: process.env.AWS_SECRET_KEY
  }
}

// For development use local micro instances
if (process.env.NODE_ENV !== 'production') {
  config.client.endpoints = {
    pictures: 'http://localhost:9000',
    users: 'http://localhost:9001',
    auth: 'http://localhost:9002',
    contributions: 'http://localhost:9003'
  }

  // config.auth.facebook.callbackURL = 'http://platzigram.test:5050/auth/facebook/callback'
}

module.exports = config
