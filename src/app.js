'use strict'
var page = require('page')

global.computer = true

if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
  computer = false
}


page.base('/#!')
require('./homepage')
require('./signin')
require('./signup')
require('./forms')
require('./leftMenu')

// axios
// empty-element
// page
// gsap
// ejs

page()
