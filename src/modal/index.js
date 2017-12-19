const yo = require('yo-yo')

module.exports = function modal(form) {
  return yo`
    <div id="modal-center">
      ${form}
      <div class="automata-letters"></div>
    </div>
  `
}