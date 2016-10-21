const yo = require('yo-yo')
const container = document.getElementById('container')
const $ = require('jquery')

const appendTo = document.getElementById('game-container')
const $scrollBars = $('<div></div>')
const $appendTo = $(appendTo)

let imageTemplate = require('./template')

$scrollBars.addClass('scrollBarGame')

$appendTo.append($scrollBars)

class Image {
  constructor (game, x, y, size, publicId, data) {
    this.x = x
    this.y = y
    this.size = size || 70;
    this.id = publicId
    this.data = data
    this.game = game
    this.$pieceContainer = $('<div></div>')
    this.init()
  }

  init () {
    let _thisX = this.x
    let _thisY = this.y
    let _thisSize = this.size
    this.$pieceContainer.css({
      position: 'absolute',
      top: _thisX * _thisSize + 'px',
      left: _thisY * _thisSize + 'px',
      width: _thisSize + 'px',
      height: _thisSize + 'px',
      border: '1px solid rgba(200, 200, 200, 0.4)'
    }).html(imageTemplate(this.data))
    $scrollBars.append(this.$pieceContainer)
  }
}

module.exports = Image