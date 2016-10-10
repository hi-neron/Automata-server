'use strict'

const page = require('page')
const auth = require('../utils').authenticated
const signup = require('../signup')
const signin = require('../signin')
const leftMenu = require('../leftMenu')
const io = require('socket.io-client')
const cookie = require('js-cookie')

let socket = io.connect('//' + window.location.host)

socket.emit('hi')

page('/', auth, signup, leftMenu, (ctx, next) => {
  console.log(cookie.get())
  // revisar si esta autenticado
  // LOADER
  // autenticado ?
  // SI
  // si esta autenticado renderizar:
  // ----------------------------------------
  // NO
  // si NO esta autenticado renderizar solo:
  //  modal:
  //    signups
  //  la grilla

  if (ctx.auth.username) {
    next()
  } else {
    page.redirect('/signup')
  }
})