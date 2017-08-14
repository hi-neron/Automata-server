'use strict'

let yo = require('yo-yo')

module.exports = function (skills) {
    return yo`
    <div class="skills-list-container">
      <div class="small-target">
      </div>
      <div class="skills-list">
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