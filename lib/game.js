'use strict'

const Grid = require('automata-grid')
const Score = require('automata-score')
const co = require('co')
const Promise = require('bluebird')

const config = require('../config')

const settings = {
  db: config.db
}

const grid = new Grid(settings)
const score = new Score(settings)

let game = {
  pushImage: (image, cb) => {
    let username = image.username

    let tasks = co.wrap(function * () {
      let imageInGrid

      try {
        imageInGrid = yield grid.pushImage(image)
      } catch (e) {
        return Promise.reject(e)
      }
      // username, action, data, cb
      let scoreResponse

      try {
        scoreResponse = yield score.rateAction(username, 'pushImage', null)
      } catch (e) {
        return Promise.reject(e)
      }

      let info = {
        grid: imageInGrid,
        score: scoreResponse
      }

      return Promise.resolve(info)
    })
    return Promise.resolve(tasks()).asCallback(cb)
  },
  deleteImage: (image, cb) => {
    let username = image.username

    let tasks = co.wrap(function * () {
      let imageInGrid

      try {
        imageInGrid = yield grid.removeImage(image)
      } catch (e) {
        return Promise.reject(e)
      }
      // username, action, data, cb
      let scoreResponse

      try {
        scoreResponse = yield score.rateAction(username, 'deleteImage', null)
      } catch (e) {
        return Promise.reject(e)
      }

      let info = {
        grid: imageInGrid,
        score: scoreResponse
      }

      return Promise.resolve(info)
    })

    return Promise.resolve(tasks()).asCallback(cb)
  },
  skillActivate: (data, cb) => {
    // data = {
    //   pos: {x, y},
    //   skill: <skillname>,
    //   username:
    // }

    let tasks = co.wrap(function * () {
      let newChangesGrid

      console.log('88')
      try {
        newChangesGrid = yield grid.onSkill(data)
      } catch (e) {
        return Promise.reject(e)
      }
      console.log('after-grid changes')
      // username, action, data, cb
      let scoreResponse

      try {
        scoreResponse = yield score.rateAction(data.username, 'skillActivate', null)
      } catch (e) {
        return Promise.reject(e)
      }

      let info = {
        grid: newChangesGrid,
        score: scoreResponse
      }

      return Promise.resolve(info)
    })

    return Promise.resolve(tasks()).asCallback(cb)
  },
  getGrid: (cb) => {
    /*
      grid: {
        grid:
        date:
      }
    */
    grid.getGrid((err, grid) => {
      if (err) return err
      cb(null, grid)
    })
  },
  getUserSkills: (username, cb) => {
    score.getUserSkills(username, (err, skills) => {
      if (err) return cb(err)
      cb(null, skills)
    })
  }
}

module.exports = game
