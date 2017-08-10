'use strict'

const yo = require('yo-yo')

module.exports = function (image) {
  return yo`
  <div class="front-card">
    <div class="header-single-card">
      <h1 class="title">${image.name}</h1>
      <h2 class="username">${image.username}</h1>
      <div class="close-single-card">
        <div class="closer-single-image"></div>
      </div>
    </div>
    <div class="body-single-card">
      <div class="image-single-card">
        <img src="${image.src}" alt="${image.name}"/>
      </div>
    </div>
    <div class="footer-single-card">
      <div class="awards-single-card">
        <div class="award-container">
          <div class="icon">
            <div className="fa fa-icon fa-heart"></div>
          </div>
          <p class="data-single-image">${image.awards.amazing}</p>
        </div>
        <div class="award-container">
          <div class="icon">
            <div className="fa fa-icon fa-bomb"></div>
          </div>
          <p class="data-single-image">${image.awards.bastard}</p>
        </div>
        <div class="award-container">
          <div class="icon">
            <div className="fa fa-icon fa-shopping-basket"></div>
          </div>
          <p class="data-single-image">${image.awards.takeMyMoney}</p>
        </div>
      </div>
    </div>
  </div>
  `
}