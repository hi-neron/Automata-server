'use strict'

const async = require('async')
const yo = require('yo-yo')
const $ = require('jQuery')
const empty = require('empty-element')
const request = require('superagent')

const uploadForm = require('./uploadForm')
const imageTemplate = require('./image-template')

let $closer = $(yo`
  <div class="closer">
    <div class="closer-images"></div>
  </div>
`)

//iniciar animacion
function dummyAnimationStart (template) {
  let $template = $(template)
  let $dummy = $template.find('#dummy')
  let $bubble1 = $template.find('#bubble1')
  let $bubble2 = $template.find('#bubble2')
  let $roach = $template.find('#ant-right')
  let timer = 3

  TweenMax.set($dummy, {
    transformOrigin: '240px 220px',
    y: 0
  })

  TweenMax.set($bubble1, {
    opacity: 0.1,
    y: 260.35
  })

  TweenMax.set($bubble2, {
    opacity: 0.1,
    y: 253
  })

  TweenMax.to($dummy, timer, {
    y: '-=4',
    rotation: '-355_cw',
    ease: Sine.easeInOut,
    repeat: -1,
    yoyo: true
  })

  TweenMax.to($bubble1, 3, {
    y: '-=65',
    ease: Power2.easeIn,
    delay: 1,
    opacity: 1,
    repeat: -1,
  }, 3)

  TweenMax.to($bubble2, 3, {
    y: '-=58',
    ease: Power2.easeIn,
    opacity: 1,
    repeat: -1,
  }, 3)

}

// renderizar la informacion de la imagenes
function renderImages (images, next) {
  let OldImages = yo`<div id="old-images"></div>`
  let lastestImages = yo`<div id="lastest-images"></div>`
  let template = yo`<div id="supervisor-images-user"></div>`
  let wrapper = yo`<div class="supervisor-images-wrapper"></div>`

  for (let i = 0; i < images.length; i++) {
    console.log(images[i])
    OldImages.appendChild(imageTemplate(images[i]))
  }

  template.appendChild(OldImages)
  template.appendChild(lastestImages)
  wrapper.appendChild(template)
  // aqui se renderizaran una a una las imagenes
  next(null, wrapper, images.length)
}

// agrega al template el formulario de subida
function addUploadForm ($template, images, next) {
  $template.append(uploadForm(images))

  dummyAnimationStart($template)
  next(null, $template)
}

module.exports = function(username, cb) {
  async.waterfall([
    // traer la informacion
    function getImages(cb) {
      request
        .get(`/api/images/byuser/${username}`)
        .set('Accept', 'application/json')
        .end((err, res) => {
          if (err) {
            console.log(err)
            return cb(err)
          }
          return cb(null, res.body)
        })
    },
    renderImages,
    addUploadForm
  ], function (err, $template) {
    if (err) {
      console.log(err)
      cb(err)
    }

    let imagesMenu = document.getElementById('images-menu-container')
    let $imagesMenu = $(empty(imagesMenu))
    $imagesMenu.append($template).append($closer)

    $closer.on('click', function (ev) {
      ev.preventDefault()
      let imageMenu = document.getElementById('images-menu-container')
      imageMenu.classList.remove('active-images-supervisor')
    })

    cb(null, {ok: 'ok'})
  })
}