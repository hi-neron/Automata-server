'use strict'

let yo = require('yo-yo')
let $ = require('jQuery')

/*
  name
  pos
  rotation
  src
  username
  userId
*/

module.exports = function (data) {
  if (!data) {
    return yo`
    <div class="corpose-container">
      <div class="empty"></div>
    </div>
    `
  }

  let template = yo`
    <div class="corpose-container">
      <div class="corpose-body" public="${data.publicId}">
        <div class="corpose-image">
          <img src="${data.src}" alt="">
        </div>
        <div class="corpose-hover">
          <div class="header">
            <h2 class="name">${data.name}</h2>
            <h3 class="from">${data.username}</h2>
          </div>
          <div class="body">
              <div class="tooltip-people"></div>
            <a href="#" class="award-container" type="amazing">
              <div class="icon fa fa-heart awards"></div>
              <p class="amazing info awards">0</p>
            </a>
            <a href="#" class="award-container" type="bastard">
              <div class="icon fa fa-bomb awards"></div>
              <p class="bastard info awards">240</p>
            </a>
            <a href="#" class="award-container" type="takeMyMoney">
              <div class="icon fa fa-shopping-basket awards"></div>
              <p class="takeMyMoney info awards">23</p>
            </a>
          </div>
        </div>
      </div>
    </div>
  `
  let $template = $(template)

  return template
}