'use strict'

const yo = require('yo-yo')
const request = require('superagent')
const $ = require('jquery')
const dummy = require('./dummy')

let dummyButton, uploadForm

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
        dummyButton.style.display = 'none'
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
      ${closer}
      <form enctype="multipart/form-data" id="data-form-upload" onsubmit=${onsubmit}>
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

  dummyButton = yo`
    <div id="baby-dummy">
      ${dummy}
      <div class="title-baby-dummy">
        CREAR UNA PIEZA
      </div>
    </div>
  `

  if(type > 0) {
    dummy.style.display = 'none'
    dummyButton.style.position = 'inherit'
  }

  // events
  closer.onclick = (ev) => {
    uploadForm.style.display = 'none'
  }
  dummyButton.onclick = (ev) => {
    uploadForm.style.display = 'block'
  }

  let form = yo`
  <div id="upload-form">
    <div class="toCenter">
      ${dummyButton}
      ${uploadForm}
    </div>
  </div>
  `
  if (type === 0) {
    form.classList.add('big-upload-form')
  }

  // if type is normal let it pass
  // if type class is big, add class big

  return form
}

