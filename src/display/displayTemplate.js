const yo = require('yo-yo')

module.exports = function (score, num) {
  return yo`
    <div class="display-score-body">
      <div class="header"></div>
      <div class="body">
        <div id="score-var" class="text-score">${score.score}</div>
      </div>
    </div>
  `
}