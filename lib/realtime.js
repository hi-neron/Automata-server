'use strict'
let game = require('./game')

class Realtime {
  constructor (userSession) {
    this.socket = userSession.socket
    this.io = userSession.io
    this.user = userSession.userData

    this.socket.on('hi', () => {
      console.log(`hi ${this.user.username}`)
    })
  }

  static getGrid (cb) {
    game.getGrid((err, grid) => {
      if (err) {
        return cb(err)
      }
      cb(null, grid)
    })
  }

  pushImage (image, cb) {
    game.pushImage(image, (err, response) => {
      if (err) {
        this.socket.emit('fail', err)
        return cb(err)
      }
      this.socket.emit('newScore', response.score)
      this.io.sockets.emit('gridChanges', response.grd)
      return cb(null, response)
    })
  }

  deleteImage (image, cb) {
    game.deleteImage(image, (err, response) => {
      if (err) {
        this.socket.emit('fail', err)
        return cb(err)
      }

      this.socket.emit('newScore', response.score)
      this.io.sockets.emit('gridChanges', response.grid)
      return cb(null, response)
    })
  }

  skillActivate (data, cb) {
    game.skillActivate(data, (err, response) => {
      if (err) {
        this.socket.emit('fail', err)
        return cb(err)
      }
      this.socket.emit('newScore', response.score)
      this.io.sockets.emit('gridChanges', response.grid)
      return cb(null, response)
    })
  }
}

module.exports = Realtime

