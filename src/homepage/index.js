'use strict'

const page = require('page')
const auth = require('../utils').authenticated
const signup = require('../signup')
const leftMenu = require('../leftMenu')
const io = require('socket.io-client')
const yo = require('yo-yo')
const $ = require('jQuery')
const display = require('../display')

// new classes
const Game = require('../game')
const DevBoard = require('../devBoard')
const UserTooltips = require('../utils/userTooltips')


let socket = io.connect('//' + window.location.host)

page('/', auth, signup, modalClose, display, leftMenu, mouseInfo, (ctx, next) => {
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
  let container = 'game-container'

  // inicia el juego
  let game = new Game (container, ctx.auth, socket)

  // inicia el panel de conversacion
  let dev = new DevBoard (ctx.auth, socket)

  if (ctx.auth.username) {
    window.userId = ctx.auth.publicId
    console.log('/ finished path')
    next()
  } else {
    page.redirect('/signup')
  }
})

// animacion de mouse, para indicar que se usa boton del
// medio para navegar
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
