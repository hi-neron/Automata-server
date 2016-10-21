'use strict'

const request = require('superagent')
const Piece = require('./piece')

class Game {
  constructor (container, socket) {
    this.imagesBoard = []
    this.container = container || 'game-container'
    let drawImages = this.drawImages.bind(this)

    this.getGrid((err, body) => {
      if (err) return err
      drawImages(body.grid)
    })

    socket.on('fail', (data) => {})
    socket.on('newGrid', (data) => {})
    socket.on('newScore', (data) => {})
    socket.on('gridChanges', (data) => {})
  }

  drawImages (grid) {
    let size = 300;
    let publicId = 'none still'
    for (let x = 0; x < grid.length; x++) {
      for (let y = 0; y < grid.length; y++ ) {
        // game, x, y, width, publicId, data
        let piece = new Piece(this, x, y, size, publicId, grid[x][y])
        this.imagesBoard.push(piece)
        // console.log(grid[x][y])
      }
    }
    // console.log(this.imagesBoard)
  }

  getGrid (cb) {
    request
        .get('/game')
        .set('Accept', 'application/json')
        .end((err, res) => {
          if (err) {
            return cb(err)
          }
          cb(null, res.body)
        })
  }

  // grid lvl up
  updateGrid () {}

  // construir una grilla
  // aumentar la grilla
  // actualizar la grilla cuando se cree una nueva imagen
  // actualizar la grilla cuando se ejecute una skill
  // activar el menu de skills cuando el usuario este conectado
}

module.exports = Game