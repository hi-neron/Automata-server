'use strict'

const auth = require('./auth')
const automata = require('automata-client')
const bodyParser = require('body-parser')
const config = require('./config')
const cookieParser = require('cookie-parser')
const express = require('express')
const expressSession = require('express-session')
const path = require('path')
const flash = require('connect-flash')

// utils
const _ = require('lodash')

// passport
const RedisStore = require('connect-redis')(expressSession)
const redisUrl = require('redis-url')

const sessionStore = new RedisStore(
  {client: redisUrl.connect(config.redis)})

const passport = require('passport')
const passportSIo = require('passport.socketio')

const Rt = require('./lib/realtime')

// Multer and aws
const aws = require('aws-sdk')
const multer = require('multer')
const multerS3 = require('multer-s3')
const ext = require('file-extension')

// servidor
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

// req parser
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}))

app.use(function (err, req, res, next) {
  if (err instanceof SyntaxError && err.status === 400) {
    res.json({error: 'Bad JSON'})
  }
})

// archivos estaticos
app.use(express.static(path.join(__dirname, 'public')))

app.use(cookieParser())
let sessionMiddleware = expressSession({
  key: 'connect.sid',
  resave: false,
  saveUninitialized: false,
  secret: config.secret,
  store: sessionStore
})

// sessions & security
app.use(sessionMiddleware)
app.use(passport.initialize())
app.use(passport.session())
app.use(flash())
// Templates
app.set('view engine', 'ejs')

passport.use(auth.localStrategy)
passport.deserializeUser(auth.deserializeUser)
passport.serializeUser(auth.serializeUser)

// socket.io & realtime module
var usersSockets = []

function onSuccess (data, accept) {
  console.log('success socket')
  accept()
}

function onFail (data, message, error, accept) {
  if (error) {
    console.log(message, 'FAIL')
  }
  console.log(message, 'FAIL')
  accept(new Error(message))
}

function ioFunc (io) {
  io.use(passportSIo.authorize({
    cookieParser: cookieParser,
    key: 'connect.sid',
    passport: passport,
    secret: config.secret,
    store: sessionStore,
    success: onSuccess,
    fail: onFail
  }))

  io.on('connection', (socket) => {
    // se busca el perfil logeado
    console.log(socket.request.user)

    let user = {
      publicId: socket.request.user.publicId,
      username: socket.request.user.username
    }

    // let user = req.user

    // busca si ya existe un socket del usuario
    let oldUserSocket = _.findIndex(usersSockets, {id: user.publicId})

    // elmina ese socket
    if (oldUserSocket !== -1) {
      usersSockets.splice(oldUserSocket, 1)
      console.log('existe un viejo socket con este usuario')
      console.log(oldUserSocket)
    }

    // crea un nuevo socket para el usuario
    // template para crear un objeto RT con socket
    let userSession = {
      username: user.username,
      userData: user,
      socket: socket,
      io: io
    }

    // se crea el objeto RT del usuario
    let rt = new Rt(userSession)

    // se crea el template del socket de usuario
    let userRt = {
      id: user.publicId,
      username: user.username,
      rt: rt
    }

    // se agrega el socket al array
    usersSockets.push(userRt)
    console.log(usersSockets)

    socket.on('disconnect', () => {
      let socketToKill = _.findIndex(usersSockets, {id: user.publicId})
      console.log(`see you later ${usersSockets[socketToKill].username}`)
    })
  })
}

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

app.get('/', (req, res) => {
  req.socket.emit('hiToo', 'hi')
  res.render('index', {title: config.appName, message: req.flash('status')})
})

app.get('/signup', (req, res) => {
  res.render('index', {title: config.appName + ' Signup', message: req.flash('status')})
})

app.get('/signin', (req, res) => {
  res.render('index', {title: config.appName + ' Signin', message: req.flash('status')})
})

app.post('/signup', (req, res) => {
  let user = req.body
  client.createUser(user, (err, usr) => {
    if (err) {
      return res.render('index', {title: config.appName + ' Signup', message: err.error.error})
    }
    req.flash('status', 'Log in with your new account')
    res.redirect('/#!/signin')
  })
})

/* login */
app.post('/login', function(req, res, next) {
  passport.authenticate('local', function(err, user, info) {
    if (err) return next(err)
    if (!user) {
      req.flash('status', 'Invalid username or password')
      return res.redirect('/#!/signin')
    } else {
      req.logIn(user, function(err) {
        if (err) {
          req.flash('status', err)
          return res.redirect('/#!/signin')
        }
        return res.redirect('/');
      })
    }
  })(req, res, next)
})

app.get('/logout', function (req, res) {
  req.flash('status', 'logout successful')
  req.logout()
  res.redirect('/#!/signin')
})

/* profile */
app.get('/whoami', function (req, res) {
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
  // buscar el socket en la lista de usuarios conectados
  // utilizar el publicId para hacer la busqueda

  let userSocket = _.find(usersSockets, {username: req.user.username})

  if (!userSocket) {
    return res.status(500).json({error: 'you need be logged with realtime too'})
  }

  upload(req, res, (err) => {
    if (err) return res.status(500).json(err)
    let username = req.user.username
    let name = req.body.name || ''
    let token = req.user.token
    let src

    console.log(req.body)
    console.log(req.file)

    try {
      console.log('try')
      src = req.file.location
    } catch (e) {
      return res.status(500).json({error: e})
    }

    let image = {
      userId: username,
      src: src,
      name: name
    }

    console.log('before create picture')

    client.createPicture(image, token, (err, data) => {
      if (err) return res.json(err)

      console.log(data)

      image.username = req.user.username
      image.publicId = data.publicId

      let toSend = {}

      console.log('before user socket')
      // activar la accion pushImage en el socket
      userSocket.rt.pushImage(image, (err, response) => {
        if (err) return res.status(400).json(err)
        let reg = /\w+([A-z])-\w+([0-9]).\w+([a-z])$/g
        let imagename = reg.exec(src)
        toSend.message = `image: ${imagename[0]} was uploaded`
        res.status(200).json(toSend)
      })
    })
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
  let publicId = req.params.image
  let token = req.user.token
  let userId = req.user.username

  let data = {
    userId: userId,
    publicId: publicId
  }

  // buscar el socket en la lista de usuarios conectados
  // utilizar el publicId para hacer la busqueda
  let userSocket = _.find(usersSockets, {index: req.user.publicId})

  if (!userSocket) {
    return res.status(500).json({error: 'you need be logged with realtime too'})
  }

  client.deletePicture(data, token, (err, response) => {
    /*
      response = {
        code: 200,
        message: 'image was deleted',
        status: 'ok',
        publicId: publicId
      }
    */
    if (err) return res.status(500).json(err)

    // activar la accion pushImage en el socket
    data.username = req.user.username

    userSocket.rt.deleteImage(data, (err, response) => {
      if (err) return res.status(400).json(err)
      res.status(200).json(response)
    })

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

/* getPicture */
app.get('/api/images/:image', (req, res) => {
  let imageId = req.params.image

  client.getPicture(imageId, (err, picture) => {
    if (err) return res.status(500).json(err)
    res.status(200).json(picture)
  })
})

/* getAllPictures */
app.get('/api/images', (req, res) => {
  client.getAllPictures((err, pictures) => {
    if (err) return res.status(500).json(err)
    res.status(200).json(pictures)
  })
})

/* GAME CRUD */
// ----------------------------------

// activar una skill
// El usuario activa una skill
// no se hace directamente con socket-io porque debe pasar por filtro de seguridad
app.post('/game/:skill', secure, (req, res) => {
  // peticion POST al cliente RT:
  /*
    data: {
      pos: {x:, y:},
      skill: <skillname>,
    }
  */

  let userSocket = _.find(usersSockets, {username: req.user.username})

  // activar la accion pushImage en el socket
  if (!userSocket) {
    return res.status(500).json({error: 'you need be logged with realtime too'})
  }

  let body = req.body
  let skill = req.params.skill
  let username = req.user.username
  let publicId = req.user.publicId

  if (body.username !== req.user.username) {
    return res.status(400).json({error: 'invalid user, are u kidding me?'})
  }

  let data = {
    pos: body.pos,
    skill: skill,
    username: username
  }

  userSocket.rt.skillActivate(data, (err, response) => {
    if (err) return res.status(400).json(err)
    res.status(200).json(response)
  })
})


app.get('/game', (req, res) => {
  Rt.getGrid((err, grid) => {
    console.log('\n/game')
    console.log(err)
    if (err) return res.json(err)
    res.json(grid)
  })
})

// secure middleware
function secure (req, res, next) {
  if (req.isAuthenticated()) return next()
  res.status(401).json({error: 'not authorized'})
}

module.exports = {
  app: app,
  socket: ioFunc
}
