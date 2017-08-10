'use strict'

const yo = require('yo-yo')
const request = require('superagent')
const $ = require('jquery')
const dummy = require('./dummy')

function onsubmit(ev) {
  ev.preventDefault();
  let data = new FormData(this);
  request
    .post('/api/images')
    .send(data)
    .end(function (err, res) {
      // This is the user uploaded images container
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

      console.log(res.body)

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
      }

    })
}

module.exports = function (type) {
  let form = yo`
  <div id="upload-form">
    <div class="toCenter">
      <div id="image-upload-form">
        <form enctype="multipart/form-data" id="data-form-upload" onsubmit=${onsubmit}>
          <div class="file-upload-images">
              <input type="file" id="file" name="file" />
              <label for="file" class="label">NUEVO</label>
          </div>
          <div class="input-upload-images">
              <label for="name">NOMBRE</label>
              <input type="text" name="name"/>
          </div>
          <div class="input-submit-images">
            <button type="submit" action="#">
              <div class="upload-image"></div>
            </button>
          </div>
        </form>
      </div>
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

