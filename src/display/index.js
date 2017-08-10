const displayTemplate = require('./displayTemplate')
const $ = require('jquery')

let displayContainer = document.getElementById('display-container')
$displayContainer = $(displayContainer)

let $display = null

function createDisplay(ctx, next){
  let data = ctx.auth

  $display = $('<div id="display-score-container"></div>')
  let $templateScore = $(displayTemplate(data))


  $display.append($templateScore)
  $displayContainer.append($display)

  let scoreVar = document.getElementById('score-var')

  scoreVar.addEventListener('scoreUpdate', (e) => {
    console.log(e)
    let _this = $(e.currentTarget)
    _this.html(e.detail.data.points)
  })


  next()
}

module.exports = createDisplay
