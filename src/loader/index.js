let yo = require('yo-yo')

module.exports = function (){
  let loader = yo`
    <div class="loader-container">
      <div class="loader">
      </div>
    </div>
  `
  return loader
}
