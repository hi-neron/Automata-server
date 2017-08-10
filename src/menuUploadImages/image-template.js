const yo = require('yo-yo')
const loader = require('../loader')
const $ = require('jquery')
const d3 = require('d3')

module.exports = function(image) {

  let imageObj = new Image()
  imageObj.src = image.src

  let xmlns="http://www.w3.org/2000/svg"
  let xmlns_xlink = "http://www.w3.org/1999/xlink"
  // xmlns:xlink

  let trash = yo`
    <svg viewBox="0 -75 414.19 530">
      <defs>
        <style>
        .trash-cls-1 {
          fill:url(#linear-gradient-trash-hover);
        }
        .trash-cls-2 {
          fill: #fff;
        }
        .trash-cls-3 {
          fill:url(#linear-gradient-trash);
        }
        </style>
        <linearGradient id="linear-gradient-trash" x1="207.09" y1="480" x2="207.09" y2="126.2" gradientUnits="userSpaceOnUse">
          <stop offset="0" stop-color="#acfae0"/>
          <stop offset="1" stop-color="#fff"/>
        </linearGradient>
        <linearGradient id="linear-gradient-trash-hover" x1="207.09" y1="480" x2="207.09" y2="126.2" gradientUnits="userSpaceOnUse">
          <stop offset="0" stop-color="#ff1959"/>
          <stop offset="1" stop-color="#ff486b"/>
        </linearGradient>
      </defs>
      <title>trash</title>
      <path class="trash-cls-1 trash-body-hover" d="M40.26,126.2V480H373.93V126.2H40.26Zm86.25,284H93.15V183.74h33.37V410.21Zm97.27,0H190.41V183.74h33.37V410.21Zm97.26,0H287.67V183.74H321V410.21Z"/>
      <path class="trash-cls-3 trash-body" d="M40.26,126.2V480H373.93V126.2H40.26Zm86.25,284H93.15V183.74h33.37V410.21Zm97.27,0H190.41V183.74h33.37V410.21Zm97.26,0H287.67V183.74H321V410.21Z"/>
      <path class="trash-cls-2 trash-cap" d="M292.79,77.09V0H114.56V77.09H0v54H414.19v-54H292.79Zm-37.88,0H152.45V34.65H254.91V77.09Z"/>
    </svg>
  `

  let okAccept = yo`
    <div class="accept">
      <i class="fa fa-check"></i>
    </div>
  `

  let confirm = yo`
    <div class="confirmation">
      ${okAccept}
      <p class="rly">rly?</p>
    </div>
  `

let reflex = yo`<div className="reflex"></div>`

  let d3trash = d3.select(trash)

  let template = yo`
  <div class="supervisor-loading-image supervisor-image-single">
    <img class="supervisor-image-main" src="${imageObj.src}" alt="${image.name}">
    <div class="supervisor-image-awards">
      <ul class="awards-body">
        <li class="awards">
          <p class="label inner-award">${image.awards.amazing}</p>
          <div class="fa fa-heart inner-award icon"></div>
        </li>
        <li class="awards">
          <p class="label inner-award">${image.awards.bastard}</p>
          <div class="fa fa-glass inner-award icon"></div>
        </li>
        <li class="awards">
          <p class="label inner-award">${image.awards.takeMyMoney}</p>
          <div class="fa fa-credit-card-alt inner-award icon"></div>
        </li>
      </ul>
    </div>
    <div class="supervisor-body-content">
      ${reflex}
      <div class="supervisor-image-delete">
        ${trash}
        ${confirm}
      </div>
      <div class="supervisor-image-name">
        <h2 class="image-name">
          ${image.name}
        </h2>
      </div>
      <div class="supervisor-image-line">
      </div>
    </div>
  </div>
  `

  d3trash
  .attr("xmlns", xmlns)
  .attr("xmlns:xlink", xmlns_xlink)

  let time = (Math.random() * 200) + 200

  trash.classList.add('focused-trash')

  let $trash = $(trash)
  let $confirm = $(confirm)
  let $okAccept = $(okAccept)

  let container = document.getElementById('images-menu-container')
  let $container = $(container)


// mueve el reflejo cuando se hace scroll
  function reflectMove (content) {
    console.log(content)
  }

  $container.on('mousewheel', '#supervisor-images-user', (ev) => {
    reflectMove(ev)
  })

  $container.on('touchmove', '#supervisor-images-user', (ev) => {
    reflectMove(ev)
  })

  // abre el dialogo de eliminar imagen
  $trash.click(function(){
    $confirm.toggleClass('appear-confirm')
  })

  // oculta el dialogo de eliminar imagen cuando se da click afuera
  $trash.blur(function(){
    setTimeout(function() {
      $confirm.removeClass('appear-confirm')
    }, 100);
  })

  // escucha cuando el usuario este completamente seguro de eliminar una imagen
  $okAccept.click(function(){
    let $image = $(this).closest('.supervisor-image-single')
    let imageSrc = $image.find('img').attr('src')
    let imageName = $image.find('img').attr('alt')
    console.log(`this image:${imageName} going to be deleted`)
  })

  // muestra la imagen cuando esta cargada
  imageObj.onload = function(){
    setTimeout(function() {
      template.classList.remove('supervisor-loading-image')
    }, time);
  }

  return template
}