'use strict'

const page = require('page')
const auth = require('../utils').authenticated
const signup = require('../signup')
const leftMenu = require('../leftMenu')
const io = require('socket.io-client')
const Game = require('../game')
const empty = require('empty-element')
const yo = require('yo-yo')
const $ = require('jQuery')

let socket = io.connect('//' + window.location.host)

page('/', auth, signup, modalClose, leftMenu, mouseInfo, (ctx, next) => {
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
  let game = new Game (container, ctx.auth, socket)

  if (ctx.auth.username) {
    next()
  } else {
    page.redirect('/signup')
  }
})

function mouseInfo (ctx, next) {
  let mouse = yo`
    <div id="mouse-indicator"></div>
  `
  let body = document.getElementsByTagName('body')[0]
  body.appendChild(mouse)
  let $mouse = $(mouse)

  setTimeout(function() {
    $mouse.remove()
  }, 5100);
  next()
}

function modalClose (ctx, next) {
  let modal = document.getElementById('modal-container')
  if (ctx.auth.username) {
    modal.classList.add('activate-modal')
  }
  next()
}