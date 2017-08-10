let yo = require('yo-yo')
let d3 = require('d3')

let loader = yo`
  <svg class="loading" data-name="Layer 2" viewBox="0 0 55.5 55.5">
    <defs>
      <style>
        .loader-cls-2 {
          clip-path: url(#loader-clip-path);
          opacity: .9;
        }

        .loader-cls-3 {
          fill: #78ffb9;
        }

        .loader-cls-4 {
          fill: #78ffb9;
          filter: url(#cardGlowSource);
        }

        .loader-cls-6 {
          filter: url(#cardGlowSource);
        }

        .loader-cls-5 {
          fill: #3f3f3f;
        }

        .loader-cls-7 {
          fill: #BFFFDF;
          stroke: #fff;
        }

        .loader-cls-8 {
          filter: url(#dropshadow);
        }

      </style>
      <clipPath id="loader-clip-path">
        <path id="mask" fill="none" d="M47.6,37.3l-39.43.12-0.25-18a5.35,5.35,0,0,1,2.63-.94c1.32,0,1.32,1.24,2.63,1.24s1.32-1.24,2.63-1.24,1.32,1.24,2.63,1.24,1.32-1.24,2.63-1.24,1.31,1.24,2.63,1.24,1.31-1.24,2.63-1.24,1.32,1.24,2.64,1.24,1.32-1.24,2.63-1.24,1.32,1.24,2.64,1.24,1.32-1.24,2.64-1.24,1.32,1.24,2.63,1.24,1.32-1.24,2.64-1.24,1.32,1.24,2.64,1.24a5.48,5.48,0,0,0,2.79-1.21V37.3Z"/>
      </clipPath>
      <mask id="sphere-reflect">
        <rect fill="#000" x="-40" y="-30" width="80" height="80" />
        <path opacity="1" class="loader-cls-5" d="
        M15 48
        L18 48
        L36 12
        L33 12 Z" />

        <path opacity="1" class="loader-cls-5" d="
        M22 48
        L21 48
        L38 12
        L35 12 Z" />
      </mask>
      <mask id="sphere-deep">
      </mask>
      <filter id="cardGlowSource" x="-1" y="0" width="150" height="150">
        <feGaussianBlur stdDeviation="1.5" in="SourceGraphic"/>
      </filter>
      <filter id="dropshadow" x="1" y="-1" width="150" height="150">
        <feGaussianBlur stdDeviation="1" in="SourceGraphic"/>
      </filter>

    </defs>
    <title>loader</title>
    <g id="loader">
      <g>
        <circle class="loader-cls-8" fill="black" opacity="0.3" cx="27.65" cy="27.78" r="5.27"/>
        <circle fill="#1a1a1a" cx="27.65" cy="27.78" r="5.27" />
        <circle fill="none" cx="27.65" cy="27.78" r="5.27" stroke="#78ffb9" stroke-width="1.1" opacity=".7"/>
      </g>
      <g class="loader-cls-2">
        <g id="body">
          <circle class="loader-cls-4" cx="27.65" cy="27.78" r="5.27"/>
          <circle class="loader-cls-3" cx="27.65" cy="27.78" r="5.27"/>
        </g>
      </g>
      <circle class="loader-cls-7" cx="27.65" cy="27.78" r="5.27" stroke="" mask="url(#sphere-reflect)"/>
    </g>
  </svg>
`

let xmlns="http://www.w3.org/2000/svg"
let xmlns_xlink = "http://www.w3.org/1999/xlink"
// xmlns:xlink

let d3Loader = d3.select(loader)

d3Loader
  .attr("xmlns", xmlns)
  .attr("xmlns:xlink", xmlns_xlink)

module.exports = loader