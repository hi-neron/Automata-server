'use strict'

const auth = require('./auth')
const automata = require('automata-client')
const bodyParser = require('body-parser')
const config = require('./config')
const cookieParser = require('cookie-parser')
const express = require('express')
const expressSession = require('express-session')
const passport = require('passport')

// Multer and aws
const aws = require('aws-sdk')
const multer = require('multer')
const multerS3 = require('multer-s3')
const ext = require('file-extension')

const app = express()

// Arma las peticiones a los microservicios
const client = automata.newClient(config.client)

let s3 = new aws.S3({
  accessKeyId: config.aws.accessKeyId,
  secretAccessKey: config.aws.secretAccessKey
})

let upload = multer({
  storage: multerS3({
    s3: s3,
    bucket: config.aws.bucket,
    acl: 'public-read',
    metadata: function (req, file, cb) {
      cb(null, {fieldName: file.fieldname})
    },
    key: function (req, file, cb) {
      cb(null, req.user.username + '-' + Date.now() + '.' + ext(file.originalname))
    }
  }),
  limits: {
    fileSize: 800000
  }
}).single('file')

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

/* profile */
app.get('/myprofile', function (req, res) {
  if (req.isAuthenticated()) {
    return res.json(req.user)
  }
  res.json({ authenticate: false })
})

/* edit profile */

/* edit masteries */
app.post('/api/users/masteries', secure, (req, res) => {
  let userId = req.user.username
  let masteriesSrc = req.body.masteries
  let token = req.user.token

  let masteries = {
    userId: userId,
    masteries: masteriesSrc
  }

  client.editMasteries(userId, masteries, token, (err, user) => {
    if (err) return res.status(500).json(err)
    res.status(200).json(user)
  })
})

/* edit avatar */
app.post('/api/users/avatar', secure, (req, res) => {
  let userId = req.user.username
  let avatarSrc = req.body.avatar
  let token = req.user.token

  let avatar = {
    userId: userId,
    avatar: avatarSrc
  }

  client.addAvatar(userId, avatar, token, (err, user) => {
    if (err) return res.status(500).json(err)
    res.status(200).json(user)
  })
})

/* getUser */
app.get('/api/users/:username', (req, res) => {
  let username = req.params.username
  client.getUser(username, (err, user) => {
    if (err) return res.status(500).json(err)
    res.status(200).json(user)
  })
})

/* getUsersByMastery */
app.get('/api/users/mastery/:mastery', (req, res) => {
  let mastery = req.params.mastery
  client.getUsersByMastery(mastery, (err, users) => {
    if (err) return res.status(500).json(err)
    res.status(200).json(users)
  })
})

// PICTURES <::::::::

/* createPicture
* token firmado con username
*/
app.post('/api/images', secure, (req, res) => {
  upload(req, res, function (err) {
    if (err) return res.status(500).json(err)
    let username = req.user.username
    let description = req.body.description || ''
    let token = req.user.token
    let src

    try {
      src = req.file.location
    } catch (e) {
      return res.status(500).json({error: 'invalid file'})
    }

    let image = {
      userId: username,
      src: src,
      description: description
    }

    client.createPicture(image, token, (err, data) => {
      if (err) return res.send(err)
      let reg = /\w+([A-z])-\w+([0-9]).\w+([a-z])$/g
      let imagename = reg.exec(src)
      res.status(200).json({message: `image: ${imagename[0]} was uploaded`})
    })
  })
})

/* getAllPictures */
app.get('/api/images', (req, res) => {
  console.log('hi')
  client.getAllPictures((err, pictures) => {
    if (err) return res.status(500).json(err)
    res.status(200).json(pictures)
  })
})

/* getPicture */
app.get('/api/images/:image', (req, res) => {
  let imageId = req.params.image

  client.getPicture(imageId, (err, picture) => {
    if (err) return res.status(500).json(err)
    res.status(200).json(picture)
  })
})

/* getPicturesByUser */
app.get('/api/images/byuser/:username', (req, res) => {
  let username = req.params.username

  client.getPicturesByUser(username, (err, pictures) => {
    if (err) return res.status(500).json(err)
    res.status(200).json(pictures)
  })
})

/* deletePicture <--- secure rute
  data: {
    userId: userId,
    imageId: imageId
  }
*/
app.get('/api/images/delete/:image', secure, (req, res) => {
  let imageId = req.params.image
  let token = req.user.token
  let userId = req.user.username

  let data = {
    userId: userId,
    imageId: imageId
  }

  client.deletePicture(data, token, (err, response) => {
    if (err) return res.status(500).json(err)
    res.status(200).json(response)
  })
})

/* addPictureAward */
app.post('/api/images/award/:picture', secure, (req, res) => {
  let sponsor = req.user.username
  let type = req.body.type

  let picture = req.params.picture

  let token = req.user.token

  let award = {
    sponsor: sponsor,
    type: type
  }

  client.addPictureAward(picture, award, token, (err, picture) => {
    if (err) return res.status(500).json(err)
    res.status(200).json(picture)
  })
})

// secure middleware
function secure (req, res, next) {
  if (req.isAuthenticated()) return next()
  res.status(401).json({error: 'not authorized'})
}

module.exports = app
