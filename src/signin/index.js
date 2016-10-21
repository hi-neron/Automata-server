'use strict'

let auth = require('../utils').authenticated
let empty = require('empty-element')
let modal = require('../modal')
let page = require('page')
let template = require('./template')
let messages = require('../messages')

page('/signin', auth, messages, (ctx, next) => {
  let modalContainer = document.getElementById('modal-container')
  empty(modalContainer).appendChild(modal(template))
})

module.exports = function (ctx, next) {
  if (ctx.auth) {
    next()
  } else {
    page.redirect('/signin')
  }
}
