'use strict'

let yo = require('yo-yo')

module.exports = function (skills) {
    return yo`
    <div class="skills-list-container">
      <div class="small-target">
        <svg id="skillIcon" viewBox="0 0 18 18">
          <defs>
            <style>
              .cls-skillBox-1, .cls-skillBox-6 {
                fill: none;
                stroke-miterlimit: 10;
              }

              .cls-skillBox-1 {
                stroke: #1a1a1a;
                stroke-width: 0.58px;
              }

              .cls-skillBox-2, .cls-skillBox-3, .cls-skillBox-4 {
                fill: #1a1a1a;
              }

              .cls-skillBox-2 {
                opacity: 0.30;
              }

              .cls-skillBox-3, .cls-skillBox-7 {
                opacity: 0.20;
              }

              .cls-skillBox-5 {
                fill: #4d4d5d;
              }

              .cls-skillBox-6 {
                stroke: #fff;
                stroke-width: 0.35px;
                opacity: 0.5;
              }

              .cls-skillBox-7 {
                fill: #61FFAE;
              }

              .cls-skillBox-8 {
                fill: #61FFAE;
              }

              .cls-skillBox-9 {
                opacity: 0.6;
              }

              .cls-skillBox-10 {
                fill: #fff;
              }
            </style>
          </defs>
          <title>skill-box</title>
          <g>
            <line class="cls-skillBox-1" x1="0.08" y1="9.44" x2="18" y2="9.44"/>
            <rect class="cls-skillBox-2" x="2.42" y="4.46" width="13.21" height="13.21"/>
            <rect class="cls-skillBox-3" x="2.42" y="2.02" width="13.21" height="13.21"/>
            <rect class="cls-skillBox-4" x="1.65" y="7.93" width="1.41" height="3.01"/>
            <rect class="cls-skillBox-4" x="14.93" y="7.93" width="1.41" height="3.01"/>
            <rect class="cls-skillBox-5" x="1.65" y="7.93" width="1.41" height="1.5"/>
            <rect class="cls-skillBox-5" x="14.93" y="7.93" width="1.41" height="1.5"/>
            <path class="cls-skillBox-4" d="M15.3,16H2.75a0.33,0.33,0,0,1-.33-0.33V3.16a0.33,0.33,0,0,1,.33-0.33H15.3a0.33,0.33,0,0,1,.33.33V15.71A0.33,0.33,0,0,1,15.3,16Z"/>
            <path class="cls-skillBox-5" d="M2.42,2.13H15.63a0,0,0,0,1,0,0v1a0.34,0.34,0,0,1-.34.34H2.63a0.21,0.21,0,0,1-.21-0.21V2.13A0,0,0,0,1,2.42,2.13Z"/>
            <line class="cls-skillBox-6" x1="15.86" y1="3.48" x2="2.42" y2="3.48"/>
          </g>
          <g class="light">
            <rect id="skill-sheen" class="cls-skillBox-7" x="5.95" y="6.39" width="6.15" height="6.15" rx="3.08" ry="3.08"/>
            <rect id="skill-sheen-2" data-name="skill-sheen" class="cls-skillBox-8" x="7.8" y="8.23" width="2.46" height="2.46" rx="1.23" ry="1.23"/>
            <rect id="skill-sheen-3" data-name="skill-sheen" class="cls-skillBox-7" x="6.79" y="7.23" width="4.48" height="4.48" rx="2.24" ry="2.24"/>
          </g>
          <g>
            <g id="reflects-light">
              <g class="cls-skillBox-9">
                <path class="cls-skillBox-10" d="M10.08,10.11a0.94,0.94,0,0,1-.23.34,1.3,1.3,0,0,1-.85.34,1.29,1.29,0,0,1-.83-0.37,0.94,0.94,0,0,1-.22-0.35,1.44,1.44,0,0,0,.28.28,1.17,1.17,0,0,0,.78.27,1.17,1.17,0,0,0,.79-0.24A1.4,1.4,0,0,0,10.08,10.11Z"/>
              </g>
              <path class="cls-skillBox-3" d="M9,8.54a1.23,1.23,0,0,1,1.22,1.08,1.22,1.22,0,0,0,0-.15,1.23,1.23,0,1,0-2.46,0,1.22,1.22,0,0,0,0,.15A1.23,1.23,0,0,1,9,8.54Z"/>
              <rect class="cls-skillBox-10" x="8.34" y="8.71" width="0.41" height="0.41"/>
              <rect class="cls-skillBox-10" x="8.99" y="8.71" width="0.41" height="0.41"/>
            </g>
          </g>
        </svg>

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