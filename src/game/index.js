'use strict'

const request = require('superagent')
const Piece = require('./piece')
const yo = require('yo-yo')

class Game {
  constructor (container, user, socket) {
    this.container = container || 'game-container'
    this.skills = []
    this.length = 0
    let drawImages = this.drawImages.bind(this)

    socket.on('fail', (err) => {
      console.log(err)
    })

    // se asigna a una variable global las lista de skills del usuario
    let getGrid = this.getGrid.bind(this)
    let addSkills = this.addSkills.bind(this)

    socket.on('userSkills', (userSkills) => {
      getGrid((err, body) => {
        if (err) return err
        addSkills(userSkills)
        drawImages(body.grid)
        // activar el scroll de seguimiento al mouse
        Piece.viewportToCenter()
        Piece.viewportMoveActivate()
      })
      this.skills = userSkills
      console.log(userSkills)
    })

    socket.on('newGrid', (data) => {})
    socket.on('newScore', (data) => {})
    socket.on('gridChanges', (data) => {})
  }

  addSkills (skills) {
    this.skills = skills
    console.log(`geting this skills ${this.skills}`)
  }

  skillTemplateGenerator () {
    return yo`
    <div class="skills-list-container">
      <ul>${this.skills.map((item) => {
        return yo`<li class="skill-item">
          <a name="${item}">${item}</a>
        </li>`
        })}
      </ul>
    </div>
    `
  }

  drawImages (grid) {
    // la grilla es un array bi-dimensional
    let size = 220;
    let publicId = 'nothing yet'
    let skillsTemplate = true

    this.length = grid.length

    let piece

    this.imagesBoard = new Array(grid.length)

    for (let y = 0; y < grid.length; y++) {
      this.imagesBoard[y] = new Array(grid.length)
    }

    for (let x = 0; x < grid.length; x++) {
      for (let y = 0; y < grid.length; y++ ) {
        // game, x, y, width, publicId, data
        piece = new Piece(this, x, y, size, publicId, grid[x][y])

        if (y !== grid.length - 1 && x !== grid.length - 1) {
          piece.skillTemplateOn(this.skillTemplateGenerator())
        }

        this.imagesBoard[x][y] = piece
      }
    }
    console.log(this.imagesBoard)
  }

  activateTemplate (cb) {
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