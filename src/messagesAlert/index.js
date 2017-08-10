'use strict'

const $ = require('jquery')
const yo = require('yo-yo')


module.exports = function (data, status) {
  let body = document.getElementsByTagName("body")[0]

  let message = null

  let allowedFormats = yo`
    <div>
      <span class="messages-slanted">Formatos permitidos: <span class="red-cast"> gif, jpg, png </span></span>
    </div>
  `

  if (data === 'LIMIT_FILE_SIZE') {
  message = yo`
    <p>
      La imagen debe ser menor a <span class="red-cast">800</span>kb
    </p>`
  }

  if (data === 'invalid file') {
    message = yo`
    <p>
      Tipo de archivo invalido <br>
      ${allowedFormats}
    </p>`
  }

  if (data === 'Image not sent') {
    message = yo`
    <p>
      No has enviado imagen <br>
      ${allowedFormats}
    </p>
    `
  }

  if (typeof data === 'object') {
    message = yo`
    <p>
      Ocurrío un error y Automatá no sabe que pasó
    </p>`

    if (data.error) {
      message = yo`
      <p>
        Has subido una imagen recientemente <br>espera <span class="red-cast">${data.error}</span> minutos para subir otra
      </p>`
    }

    if (data.error === 'invalid picture') {
      message = 'La imagen necesita un titulo'
    }
  }

  let messagesBody = yo`
    <div className="message-body">
      <div class="icon-message-alert-container">
        <i class="fa fa-exclamation" aria-hidden="true"></i>
      </div>
      <p className="message">${message}</p>
    </div>
  `

  let messagesContainer = yo`
  <div id="messages-container">
  </div>
  `

  messagesContainer.appendChild(messagesBody)
  body.appendChild(messagesContainer)

  setTimeout(function() {
    messagesContainer.classList.add('visible-messagesContainer')
    messagesBody.classList.add('visible-messageBody')
  }, 100);


  messagesContainer.onclick = function (){
    body.removeChild(messagesContainer)
  }


}