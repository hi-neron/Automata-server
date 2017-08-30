'use strict'

const co = require('co')
const config = require('../config')

const settings = {
  db: config.db
}

const grid = new Grid(settings)
const score = new Score(settings)