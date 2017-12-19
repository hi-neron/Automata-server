'use strict'

let yo = require('yo-yo')

module.exports = function (skills, images) {
    let imagesMessages = yo`
    `
    // <div class="skills-images-messages">
    //   <div class="skills-message">
    //     Crea tu primer historia para interactuar
    //   </div>
    // </div>
    console.log(images)

    return yo`
    <div class="skills-list-container">
      <div class="small-target">
      </div>
      <div class="skills-list">
        ${images === 0 ? imagesMessages: ''}
        <div class="skill-particles" name="left"></div>
        <div class="skill-particles" name="right"></div>
          ${skills.map((item) => {
          return yo`<div class="skills-single" name="${item}">
        </div>`
        })}
      </div>
    </div>
    `
}