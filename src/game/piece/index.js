const yo = require('yo-yo')
const container = document.getElementById('container')
const $ = require('jquery')

const appendTo = document.getElementById('game-container')
const $scrollBars = $('<div></div>')
const $grid = $('<div></div>')
const $appendTo = $(appendTo)

let imageTemplate = require('./imageTemplate')
// let skillTemplate = require('./skillTemplate')

$scrollBars.addClass('game-scrollbars')
$grid.addClass('game-grid')

$scrollBars.append($grid)
$appendTo.append($scrollBars)

// setInterval(moveTo, 10)
let $sight

function targetClick (x, y) {

  if ($sight) {
    $sight.remove()
  }

  let sight = yo`
    <div class="mouse-target"></div>
  `
  $sight = $(sight)

  let body = document.getElementsByTagName('body')[0]
  body.appendChild(sight)

  $sight.css({
    left: x + 'px' ,
    top: y + 'px'
  })

  setTimeout(function() {
    $sight.addClass('mouse-target-start')
    setTimeout(function() {
      $sight.remove()
    }, 200);
  }, 1);
}

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
      borderBottom: '0.5px dotted rgba(200, 200, 200, 0.04)',
      borderRight: '0.5px dotted rgba(200, 200, 200, 0.04)'
    }).html(imageTemplate(this.data))

    let gridSize = this.size * this.game.length + 'px'

    $grid.css({
      width: gridSize,
      height: gridSize,
    })

    $grid.append(this.$pieceContainer)
  }

  skillTemplateOn (skillTemplate) {
    this.$pieceContainer.append(skillTemplate)
  }

  static viewportToCenter () {
    // antes se hacia cuando se cargaba el objeto window
    let scrollWidth = $scrollBars[0].clientWidth
    let scrollHeight = $scrollBars[0].clientHeight

    $scrollBars[0].scrollTop = ($scrollBars[0].scrollHeight - scrollHeight) / 2
    $scrollBars[0].scrollLeft = ($scrollBars[0].scrollWidth - scrollWidth) / 2
  }

  static viewportMoveActivate () {
    let distance, startPoint
    let scrollLeft = 0
    let scrollTop = 0
    let x, y = 0
    let move = false
    // let computer = true

    if (computer) {
      $scrollBars
        .mousemove(function (e) {
          if (!move) return
          this.scrollLeft = scrollLeft + x - e.clientX
          this.scrollTop = scrollTop + y - e.clientY
        })
        .mousedown(function (e) {
          if (e.which === 2) {
            move = true
            scrollLeft = this.scrollLeft
            scrollTop = this.scrollTop
            x = e.clientX
            y = e.clientY

            targetClick(x, y)
          }
        })
        .mouseup(function (e) {
          move = false
        })
    }
  }
}

module.exports = Image