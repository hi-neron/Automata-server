'use strict'

const page = require('page')
const auth = require('../utils').authenticated
const signup = require('../signup')
const leftMenu = require('../leftMenu')
const io = require('socket.io-client')
const Game = require('../game')
const empty = require('empty-element')

let socket = io.connect('//' + window.location.host)

page('/', auth, signup, modalClose, leftMenu, (ctx, next) => {
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
  let container = 'game-container'
  let game = new Game (container, socket)

  if (ctx.auth.username) {
    next()
  } else {
    page.redirect('/signup')
  }
})

function modalClose (ctx, next) {
  let modal = document.getElementById('modal-container')
  empty(modal)
  next()
}