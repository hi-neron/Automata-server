'use strict'

const request = require('superagent')
const Piece = require('./piece')
const yo = require('yo-yo')



class Game {
  constructor (container, user, socket) {
    this.container = container || 'game-container'
    this.skills = []
    this.length = 0
    this.user = user
    let drawImages = this.drawImages.bind(this)

    socket.on('fail', (err) => {
      console.log('socketIo-Fail', err)
    })

    // se asigna a una variable global las lista de skills del usuario
    let getGrid = this.getGrid.bind(this)
    let addSkills = this.addSkills.bind(this)
    let getImagesBoard = this.getImagesBoard.bind(this)

    socket.on('userSkills', (userSkills) => {
      // peticion get a: /game
      getGrid((err, body) => {
        if (err) return err
        // Agrega las skills al objeto Game
        addSkills(userSkills)

        // dibuja las imagenes en el Dom
        drawImages(body.grid.grid)
        // las funciones de control de scroll se hacen en la clase Piece
        // porque allá se construyeron los contenedores:
        //    - Scroll de la grilla.
        //    - y Grid.
        // Son funciones tipo static que estan mas relacionadas al Game
        // que al objeto piece

        // Activar el scroll al centro del juego
        Piece.viewportToCenter()
        // Activa el movimiento por mouser
        Piece.viewportMoveActivate()
      })
    })

    socket.on('newGrid', (data) => {})
    socket.on('newScore', (data) => {
      // console.log(data, ' new score')
    })

    socket.on('gridChanges', (data) => {
      // devuelve
      // {
      //  pos: {x:, y:} : punto de partida de las posiciones
      //  changes: las nuevas posiciones
      //  [0, 1
      //   2, 3]
      //  status
      //}

      let myBoard = getImagesBoard()
      let myChanges = data.changes
      let oldValues = []

      let startPointX = data.pos.x
      let startPointY = data.pos.y

      let newX, newY

      for (let x = startPointX; x <= startPointX + 1; x++) {
        for (let y = startPointY; y <= startPointY + 1; y++) {

          if (myBoard[x][y].data) {
            for (let i = 0; i < myChanges.length; i++) {
              if (myChanges[i]) {
                if (myBoard[x][y].data.name === myChanges[i].name) {
                  switch (i) {
                    case 0:
                      newX = x
                      newY = y
                      break;

                    case 1:
                      newX = x + 1
                      newY = y
                      break;

                    case 2:
                      newX = x
                      newY = y + 1
                      break;

                    case 3:
                      newX = x + 1
                      newY = y + 1
                      break;
                  }

                  console.log(myBoard[x][y].data.name, i, {x: x, y: y}, {x: newY, y: newX})

                  // myBoard[x][y].drawMoveTo(newX, newY)
                }
              }
            }
          } else {
            // console.log('null')
          }

        }
      }

      // console.log(oldValues, counter)
      // console.log(data)

      // console.log(getImagesBoard())
      // buscar la imagen en el tablero
      // actualizer las cuatro imagenes que se modificaron
    })
  }

  addSkills (skills) {
    this.skills = skills
    console.log(`getting this skills ${this.skills}`)
  }

  getImagesBoard () {
    return this.imagesBoard
  }

  skillTemplateGenerator () {
    return yo`
    <div class="skills-list-container">
      <div class="small-target"></div>
      <div class="skills-list">
        <div class="skill-particles" name="left"></div>
        <div class="skill-particles" name="right"></div>
          ${this.skills.map((item) => {
          return yo`<div class="skills-single" name="${item}">
        </div>`
        })}
      </div>
    </div>
    `
  }

  drawImages (grid) {
    // la grilla es un array bi-dimensional
    let size = 280;
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
        piece = new Piece(this, x, y, size, publicId, grid[x][y], this.skills, this.user)

        if (y !== grid.length - 1 && x !== grid.length - 1) {
          piece.skillTemplateOn(this.skillTemplateGenerator())
        }

        this.imagesBoard[x][y] = piece
      }
    }
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