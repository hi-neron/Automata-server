'use strict'
require('babel-polyfill')
var page = require('page')
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
