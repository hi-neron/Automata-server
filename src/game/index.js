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
    this.size = 220;

    let drawImages = this.drawImages.bind(this)

    socket.on('fail', (err) => {
      console.log('socketIo-Fail', err)
    })

    // se asigna a una variable global las lista de skills del usuario
    let getGrid = this.getGrid.bind(this)
    let addSkills = this.addSkills.bind(this)
    let getImagesBoard = this.getImagesBoard.bind(this)
    let addChangesFromSkill = this.addChangesFromSkill.bind(this)
    let drawImage = this.drawImage.bind(this)

    socket.on('userSkills', (userSkills) => {
      // peticion get a: /game
      getGrid((err, body) => {
        if (err) return err
        // Agrega las skills al objeto Game
        addSkills(userSkills)

        // dibuja las imagenes en el Dom
        drawImages(body.grid)
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

      console.log('gridChanges')

      let myBoard = getImagesBoard()
      let newValues = data.changes
      let oldValues = []

      let startPointX = data.pos.x
      let startPointY = data.pos.y

      let toChange = []
      let counter = 0

      for (let x = startPointX; x <= startPointX + 1; x++) {
        for (let y = startPointY; y <= startPointY + 1; y++) {
          oldValues.push(myBoard[x][y])
        }
      }

      let nullsUsed = [] // controla los nulos disponibles
      let nulls = 0

      for(let i = 0; i < oldValues.length; i++ ){
        if (!oldValues[i].data) {
          nullsUsed.push(oldValues[i])
        }
      }

      console.log('losnulos', nullsUsed)

      toChange = newValues.map((camp) => {
        if (!camp) {
          let toReturn = nullsUsed[nulls]
          nulls++
          return toReturn
        } else {
          for(let i = 0; i < oldValues.length; i++ ){
            if (oldValues[i].data){
              console.log(camp.name, oldValues[i].data.name)
              if (camp.name == oldValues[i].data.name) {
                return oldValues[i]
              }
            }
          }
        }
      })

      console.log(oldValues, newValues, toChange)

      addChangesFromSkill(data.pos, toChange)
    })

    // recive informacion de una nueva image agregada
    socket.on('newImage', (newImage) => {
      /*
        newImage {
          name:
          pos: {x, y}
          publicId: "xxxx"
          rotation:
          src:
          userId
          username;
        }
      */

      drawImage(newImage, (piece) => {
        console.log(piece.publicId, ' has been created')
      })

    })
  }

  addSkills (skills) {
    this.skills = skills
    console.log(`getting this skills ${this.skills}`)
  }

  getImagesBoard () {
    return this.imagesBoard
  }

  addChangesFromSkill (pos, changes) {
    let startPointX = pos.x
    let startPointY = pos.y

    let counter = 0

    for (let x = startPointX; x <= startPointX + 1; x++) {
      for (let y = startPointY; y <= startPointY + 1; y++) {
        this.imagesBoard[x][y] = changes[counter]

        let newRotation = this.imagesBoard[x][y].rotation

        this.imagesBoard[x][y].drawMoveTo({x, y}, newRotation)
        counter++
      }
    }

  }

  drawImage (newImage, cb) {
    let x = newImage.pos['x']
    let y = newImage.pos['y']
    let publicId = newImage.publicId
    let rotation = newImage.rotation

    let data = {
      publicId: publicId,
      src: newImage.src
    }

    let piece = new Piece (this, x, y, rotation, this.size, publicId, data, this.skills, this.user)
    this.imagesBoard[x][y] = piece

    // if (y !== this.imagesBoard[0].length - 1 && x !== this.imagesBoard[0].length - 1) {
    //   skillBoard = Piece.skillBoxCreator(x, y, this.size, this.skills, this.user)
    //   this.skillsBoard[x][y] = skillBoard
    // }

    cb(piece)
  }

  drawImages (grid) {
    // la grilla es un array bi-dimensional
    let rotation = 0
    let publicId = 'nothing yet'
    let skillsTemplate = true

    this.length = grid.length

    let piece, skillBoard

    this.imagesBoard = new Array(grid.length)
    this.skillsBoard = new Array(grid.length)

    for (let y = 0; y < grid.length; y++) {
      this.imagesBoard[y] = new Array(grid.length)
      this.skillsBoard[y] = new Array(grid.length)
    }

    for (let x = 0; x < grid.length; x++) {
      for (let y = 0; y < grid.length; y++ ) {
        // game, x, y, width, publicId, data
        piece = new Piece(this, x, y, rotation, this.size, publicId, grid[x][y], this.skills, this.user)

        if (y !== grid.length - 1 && x !== grid.length - 1) {
          skillBoard = Piece.skillBoxCreator(x, y, this.size, this.skills, this.user)
          this.skillsBoard[x][y] = skillBoard
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