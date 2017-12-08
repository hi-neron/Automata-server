'use strict'

const yo = require('yo-yo')
const request = require('superagent')
const $ = require('jquery')
const dummy = require('./dummy')

let trigger, uploadForm

function onsubmit(ev) {
  ev.preventDefault();
  let data = new FormData(this);
  console.log(data)

  request
    .post('/api/images')
    .send(data)
    .end(function (err, res) {
      // This is the user uploaded images container
      console.log(res.body)
      let $imagesContainer = $('#lastest-images')

      // this is the image template
      let imageTemplate = require('./image-template')
      let onMessage = require('../messagesAlert')

      /* si llega un error, muestra un cuadro de dialogo
         sino, agrega la imagen al contenedor
         supervisor-user-images
         res {
           data: {
            username: 'hi',
            token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJoaSIsImlhdCI6MTQ4NTYyNTk4N30.q6uP2dQAaZ2ogSOgJZCoCzQoiqe-RhxtB2UqLTCs9pQ',
            publicId: '5VqhIrDeCfp3WHqcuh5FMH',
            avatar: '/standard.png',
            skills: [],
            score: 0,
            level: 0,
            images: 0,
            logged_in: true
          }
      */

      if (res.body.error || res.body.code ){
        let data = res.body.error || res.body.code
        // error time, body : {error, message, name}
        // error large picture, body : {code}
        // error invalid picture, body.error.error {invalid picture}
        // funcion que agrega un cuadro de dialogo en la pagina
        onMessage(data)
      }else{
        let toDraw = imageTemplate(res.body.data)
        $imagesContainer.append(toDraw)
        dummy.style.display = 'none'
        uploadForm.style.display = 'none'
      }

    })
}

module.exports = function (type) {
  let closer = yo`
  <div class="closer-upload-form">
  </div>
  `
  console.log(type)

  uploadForm = yo`
    <div id="image-upload-form">
      <form enctype="multipart/form-data" id="data-form-upload" onsubmit=${onsubmit}>
        ${closer}
        <h2 class="upload-images-title">NUEVA IMAGEN</h2>
        <div class="upload-images-right">
          <div class="title-upload-images">
            <label for="name">NOMBRE</label>
            <input type="text" name="name" maxlength="22"/>
          </div>
          <div class="file-upload-images">
            <label for="file" class="label">NUEVO</label>
            <input type="file" id="file" name="file" />
          </div>
          <div class="submit-upload-images">
            <button type="submit" action="#">
              <span class="upload-image">SUBIR</span>
            </button>
          </div>
        </div>
        <div id="image-upload-container" class="upload-images-left">
        </div>
      </form>
    </div>
  `

  let message = 'SUBIR UNA PIEZA'

  let smallIcon = yo`<p class="upload-form-trigger-icon">
  </p>`

  trigger = yo`
    <div id="upload-form-trigger">
      <div class="dummy-container">
        ${type > 0? smallIcon: dummy}
      </div>
      <div class="upload-form-trigger">
        <p class="upload-form-trigger-label">
          ${message}
        </p>
      </div>
    </div>
  `

  // events
  closer.onclick = (ev) => {
    uploadForm.style.display = 'none'
  }

  trigger.onclick = (ev) => {
    uploadForm.style.display = 'block'
  }

  let form = yo`
  <div id="upload-form-container">
    ${trigger}
    ${uploadForm}
  </div>
  `

  if(type > 0) {
    dummy.style.display = 'none'
    // dummyButton.classList.add('now-fixed')
    form.classList.add('now-fixed')
  }

  // if type is normal let it pass
  // if type class is big, add class big

  return form
}

