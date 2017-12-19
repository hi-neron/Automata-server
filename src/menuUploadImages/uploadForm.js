'use strict'

const yo = require('yo-yo')
const request = require('superagent')
const $ = require('jquery')
const dummy = require('./dummy')
const Cropper = require('cropperjs')
const loader = require('../loader')()

let trigger, uploadForm, cropper, loaderScreen

function onsubmit(ev) {
  ev.preventDefault();
  if (cropper) {
    let data = new FormData(this);
    loaderScreen.classList.add('show')

    cropper.getCroppedCanvas().toBlob((blob) => {
      data.append('file', blob)
      request
      .post('/api/images')
      .send(data)
      .end(function (err, res) {
        // This is the user uploaded images container
        loaderScreen.classList.remove('show')
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
    })
  } else {
    console.log('debe subir una imagen antes')
    return new Error({message: 'un error ocurrrio'})
  }

}

module.exports = function (type) {
  let closer = yo`
  <div class="closer-upload-form">
  </div>
  `
  let fileInput = yo`
    <input type="file" id="image-to-upload" name="file">
  `

  let image_container = yo`
    <div id="image-upload-container">
    </div>
  `

  loaderScreen = yo`
    <div id="upload-image-loader-screen">
      ${loader}
    </div>
  `

  console.log(type)

  uploadForm = yo`
    <div id="image-upload-form">
      ${loaderScreen}
      <div class="image-upload-form-wrapper">
      <h2 class="upload-images-title">CREADOR DE HISTORIAS</h2>
      ${closer}
        <form enctype="multipart/form-data" id="upload-form-body" class="form-wrappers" onsubmit=${onsubmit}>
          <div class="upload-images-right">
            <div class="title-upload-images">
              <label for="name">TITULO</label>
              <input type="text" name="name" maxlength="22"/>
            </div>
            <div class="licence-upload-images">
              <div class="licence-label">
                LICENCIA
              </div> 
              <div class="upload-images-radio">
                <input type="radio" class="input-upload-radio" name="licence" value="cc" checked="checked">
                <span for="aporte" class="input-upload-licence-label">Atribución</span>
              </div>
              <div class="upload-images-radio">
                <input type="radio" name="licence" value="cc-nc" class="input-upload-radio">
                <span for="message" class="input-upload-licence-label">Atribución - No comercial</span>
              </div>
            </div>
          </div>
          <div class="submit-upload-images">
            <button type="submit" action="#">
              <span class="upload-image">LISTO</span>
            </button>
          </div>
        </form>
        <div class="upload-form-image-viewer form-wrappers">
          <div class="file-upload-images">
            <label for="file" class="label">HISTORIA</label>
            <div class="upload-images-left">
              ${image_container}
            </div>
            ${fileInput}
          </div>
        </div>
        <div class="upload-form-article form-wrappers">
          <label for="article">BIO</label>
          <textarea name="article" id="form-upload-image-bio" cols="30" rows="10" class="article">
          </textarea>
        </div>
      </div>
    </div>
  `

  let message = 'SUBIR UNA PIEZA'

  let smallIcon = yo`<p class="upload-form-trigger-icon">
  </p>`

  trigger = yo`
    <div id="upload-form-trigger">
      <div class="icon-container">
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

  fileInput.addEventListener('change', (e) => {
    if (e.target.files.length) {
      const reader = new FileReader();
      reader.onload = (e)=> {
        if(e.target.result){
          // create new image
          let img = document.createElement('img');
          img.id = 'image';
          img.src = e.target.result
          // clean result before
          image_container.innerHTML = '';
          // append new image
          image_container.appendChild(img);

          cropper = new Cropper(img, {
            aspectRatio: 1/1,
            viewMode: 1,
            dragMode: 'move',
            modal: true,
            guides: false,
            background: true,
            cropBoxResizable: true,
            minCropBoxWidth: 270,
            minCropBoxHeight: 270,

          });
        }
      };
      reader.readAsDataURL(e.target.files[0]);
    }
  })

  let form = yo`
  <div id="upload-form-container">
    ${trigger}
    ${uploadForm}
  </div>
  `

  if(type > 0) {
    dummy.style.display = 'none'
    // dummyButton.classList.add('now-fixed')
    form.style.bottom = '-20px !important'
    form.classList.add('now-fixed')
  }

  // if type is normal let it pass
  // if type class is big, add class big

  return form
}

