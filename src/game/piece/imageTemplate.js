'use strict'

let yo = require('yo-yo')


module.exports = function (data) {
  console.log(data, 'piece')
  /*
    name
    pos
    rotation
    src
    username
    userId
  */

  if (!data) {
    return yo`
    <div class="corpose-container">
    </div>
    `
  }

  return yo`
    <div id="${data.publicId}" class="corpose-container">
      <div class="corpose-body">
        <div class="corpose-image">
          <img src="${data.src}" alt="">
        </div>
      </div>
    </div>
  `
}