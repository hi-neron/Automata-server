'use strict'

const auth = require('./auth')
const automata = require('automata-client')
const bodyParser = require('body-parser')
const config = require('./config')
const cookieParser = require('cookie-parser')
const express = require('express')
const expressSession = require('express-session')
const passport = require('passport')

const app = express()

const client = automata.newClient(config.client)

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}))

app.use(cookieParser())
app.use(expressSession({
  secret: config.secret,
  resave: false,
  saveUninitialized: false
}))
app.use(passport.initialize())
app.use(passport.session())
app.use(express.static('public'))

passport.use(auth.localStrategy)
passport.deserializeUser(auth.deserializeUser)
passport.serializeUser(auth.serializeUser)
// Requests

/**
 * createUser
 * body: {
 * username:
 * email:
 * password:
 * name:
 * }
*/
app.post('/signup', (req, res) => {
  let user = req.body
  client.createUser(user, (err, usr) => {
    if (err) return res.status(500).json(err.message)
    res.status(200).json({message: `hi ${user.username}`})
  })
})

/* login */
app.post('/login', passport.authenticate('local', {
  successRedirect: '/',
  failureRedirect: '/signin'
}))

/* who is login */
app.get('/myprofile', function (req, res) {
  if (req.isAuthenticated()) {
    return res.json(req.user)
  }
  res.json({ authenticate: false })
})

/* createPicture */
app.post('/image', secure, (req, res) => {
  let image = req.body
  console.log(image)
  // client.createPicture(image, )
  res.status(200).json({message: 'image was created'})
})

function secure (req, res, next) {
  if (req.isAuthenticated()) return next()
  res.status(401).json({error: 'not authorized'})
}

/* edit profile */
/* edit masteries */
/* getUser */
/* getUsersByMastery */
/* authenticate */
/* deletePicture */
/* getAllPicture */
/* getPicturesByUser */
/* edit avatar */
/* addPictureAward */

module.exports = app
