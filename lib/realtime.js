'use strict'
let game = require('./game')

class Realtime {
  constructor (userSession) {
    this.socket = userSession.socket
    this.io = userSession.io
    this.user = userSession.userData

    this.socket.on('hi', () => {
      console.log(`hi ${this.user.publicId}`)
    })
  }

  pushImage (image, cb) {
    game.pushImage(image, (err, response) => {
      if (err) {
        this.socket.emit('fail', err)
        return cb(err)
      }
      this.socket.emit('newScore', response.score)
      this.io.sockets.emit('newGrid', response.grd)
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

  getGrid (cb) {
    game.getGrid((err, grid) => {
      if (err) {
        this.socket.emit('fail', err)
        return cb(err)
      }
      this.socket.emit('grid', grid)
      return cb(null, grid)
    })
  }
}

module.exports = Realtime

