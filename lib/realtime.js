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

    let socket = this.socket

    // se envian las skills al front, para que emppiece a dibujarlas
    game.getUserSkills(this.user.username, (err, skills) => {
      if (err) return socket.emit('fail', err)
      socket.emit('userSkills', skills)
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

  // GAME
  pushImage (image, cb) {
    game.pushImage(image, (err, response) => {
      if (err) {
        this.socket.emit('fail', err)
        return cb(err)
      }
      this.socket.emit('newScore', response.score)
      this.io.sockets.emit('newImage', response.grid)
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
        console.log(err)
        this.socket.emit('fail', err)
        return cb(err)
      }
      this.socket.emit('newScore', response.score)
      this.io.sockets.emit('gridChanges', response.grid)
      return cb(null, response)
    })
  }

  // DEVBOARD
  deleteContrib (data, cb) {
    try {
      this.io.sockets.emit('deleteContrib', data)
      data.message = `la contribucion ${data.publicId} se ha eliminado`
      cb(null, data)
    } catch (e) {
      cb(e, null)
    }
  }

  newUserMessage (addedMessage, cb) {
    try {
      this.io.sockets.emit('newDevBoardMessage', addedMessage)
      cb(null, addedMessage)
    } catch (e) {
      cb(e, null)
    }
  }

  deleteUserMessage (deletedMessage, cb) {
    try {
      this.io.sockets.emit('deleteDevBoardMessage', deletedMessage)
      cb(null, deletedMessage)
    } catch (e) {
      cb(e, null)
    }
  }
  setManOfMonth (mom, cb) {
    try {
      this.io.sockets.emit('settedMom', mom)
      cb(null, mom)
    } catch (e) {
      cb(e, null)
    }
  }
}

module.exports = Realtime

