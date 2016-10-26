const LocalStrategy = require('passport-local').Strategy
// const FacebookStrategy = require('passport-facebook').Strategy
const automata = require('automata-client')
// const jwt = require('jsonwebtoken')
const config = require('../config')

const client = automata.newClient(config.client)

exports.localStrategy = new LocalStrategy((username, password, done) => {
  client.authenticate(username, password, (err, token) => {
    if (err) {
      return done(null, false, { message: 'username and password not found' })
    }
    client.getUser(username, (err, user) => {
      if (err) {
        return done(null, false, { message: `an error ocurred: ${err.message}` })
      }

      user.token = token
      console.log(`${username} has been loged in`)
      return done(null, user)
    })
  })
})

/*
exports.facebookStrategy = new FacebookStrategy({
  clientID: config.auth.facebook.clientID,
  clientSecret: config.auth.facebook.clientSecret,
  callbackURL: config.auth.facebook.callbackURL,
  profileFields: ['id', 'displayName', 'email']
}, function (accessToken, refreshToken, profile, done) {
  let userProfile = {
    username: profile._json.id,
    name: profile._json.name,
    email: profile._json.email,
    facebook: true
  }

  // Find a previous registered user or create a new one
  findOrCreate(userProfile, (err, user) => {
    if (err) return done(err)

    jwt.sign({ userId: user.username }, config.secret, {}, (e, token) => {
      if (e) return done(e)

      user.token = token

      return done(null, user)
    })
  })

  function findOrCreate(user, callback) {
    client.getUser(user.username, (err, usr) => {
      if (err) {
        return client.saveUser(user, callback)
      }

      callback(null, usr)
    })
  }
})
*/

exports.serializeUser = function (user, done) {
  done(null, {
    username: user.username,
    token: user.token,
    publicId: user.publicId,
    avatar: user.avatar,
    skills: user.skills
  })
}

exports.deserializeUser = function (user, done) {
  // client.getUser(user.username, (err, usr) => {
  //   // tener en cuanta para optimizar, deserializar, devolver el usario y agregar el token
  //   // sin llamar a la BD
  //   /*
  //   Optimize PassportJS
  //     I realized that in the old app, we followed the default suggestion and were
  //     hitting the database twice on every single API call to populate all the user's
  //     information in memory. But in practice, we rarely needed more than the userId
  //     in our backend code. So this time around, I've made the decision to stuff the
  //     name and email into the session object and avoid making multiple database trips
  //     on every single API call. With many pages on the site making 5-10 calls to render
  //     a single page, this seemed like a cheap way to significantly reduce database load.
  //     Here's what the new app looks like:

  //     passport.serializeUser( (user, done) => {
  //       var sessionUser = { _id: user._id, name: user.name, email: user.email, roles: user.roles }
  //       done(null, sessionUser)
  //     })

  //     passport.deserializeUser( (sessionUser, done) => {
  //       // The sessionUser object is different from the user mongoose collection
  //       // it's actually req.session.passport.user and comes from the session collection
  //       done(null, sessionUser)
  //     })
  //   */
  //   if (err) return done(err)
  //   console.log('deserializeUser')
  //   usr.token = user.token
  //   done(null, usr)
  // })

  // client.getUser(user.username, (err, usr) => {
  //   if (err) return done(err)
  //   usr.token = user.token
  // })

  done(null, user)
  // done(null, user)
}
