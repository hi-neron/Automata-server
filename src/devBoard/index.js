'use strict'
const request = require('superagent')
const yo = require('yo-yo')
const _ = require('lodash')
const $ = require('jquery')
const empty = require('empty-element')
const createTemplate = require('./utils/maker')
const autosize = require('autosize')

// Posiciona los objetos verticalmente
const Masonnry = require('masonry-layout')

// contenedor principal
let devBoardContainer = document.getElementById('devboard-container')

// pantalla oscura
let ecran = yo`<div class='ecran-gray'></div>`
devBoardContainer.appendChild(ecran)


class devBoard {
  constructor (user, socket) {
    // construye una plantilla basica
    this.inside = yo`<div class="clearfix"></div>`
    this.tagBoard = yo`<div class="devboard-right-tags"></div>`
    this.tags = []
    this.user = user

    devBoardContainer.append(this.inside)

    socket.on('newDevBoardMessage', (data) => {
      console.log('llego un mensaje', data)
    })

    // se piden todas las contribuciones
    this.getMOM((err, mOM) => {
      if (err) console.log(`ha ocurrido un error obteniendo el MOM: ${err}`)

      // Crea una plantilla para mostrar, crear, y
      // pedir todas las contribuciones, para hacer esto se divide en:

      // lado izquierdo (contiene la marca, el hombre del mes y las contribuciones
      // en proceso).
      // pdta1: Se comporta de forma distinta en pantallas pequeñas
      // pdta2: se tiene en cuenta si es dev o no, para renderizar el formulario
      this.buildLeft(user, mOM, this.getCIP())

      // lado derecho, contiene los tags, el formulario de contribuciones, las contribuciones.
      // pdta: se tiene en cuenta si es dev o no, para renderizar el formulario
      this.buildRight(user)
    })
  }

  // get Contribs in process
  getCIP () {
    // this need a server req
    return [
      {
        publicId: '6QjLPtk8EYHsb0G9FIqftU',
        id: 'e0de1420-01ba-4e19-91c6-00a76ba0668a',
        title: 'Si se tiene un chat donde pariticpe solo mujeres',
        dateAdded: new Date(),
        inProcess: true,
        user: {
          userId: '6QjLPtk8EYHsb0G9FIqftU',
          username: 'Mauricio',
          title: 'Esparandaculo',
          avatar: 'pepe.jpg'
        },
        tags: ['#tipografia', '#servicios', '#moral', '#salto'],
        data: {
          type: 'message',
          info: 'Eiusmod officia laborum adipisicing et aliquip magna velit. Officia nulla officia laboris pariatur nisi qui do quis laborum. Irure deserunt in aliquip occaecat tempor commodo amet eiusmod est dolor incididunt. Aliquip proident eiusmod nulla incididunt ut et quis. Magna qui excepteur excepteur nisi magna duis aliquip sit incididunt.',
          image: 'noTieneImage.png'
        },
        messages: [
          {
            date: new Date(),
            message: 'hola mundo',
            user: {
              username: 'titi',
              avatar: 'nono.png'
            }
          }
        ],
        rate: ['pepe', 'conan', 'last'],
        dev: {
          message: null,
          approval: false
        }
      },
      {
        publicId: '6QjLPtk8EYHsb0G9FIqftU',
        id: 'e0de1420-01ba-4e19-91c6-00a76ba0668a',
        title: 'Una contrib',
        dateAdded: new Date(),
        inProcess: true,
        user: {
          userId: '6QjLPtk8EYHsb0G9FIqftU',
          username: 'roberto',
          title: 'Esparandaculo',
          avatar: 'pepe.jpg'
        },
        tags: ['#love', '#data'],
        data: {
          type: 'message',
          info: 'Laborum excepteur nostrud voluptate laborum nisi ullamco nisi sit sunt sit veniam. Aute anim do sit tempor incididunt. Ipsum irure labore ullamco dolor dolor ipsum incididunt consectetur proident cupidatat. Ea culpa laboris in qui. Laboris aliquip eiusmod quis quis ad. Aliquip irure aliqua ad dolore adipisicing deserunt. Et minim duis aute esse ex ad aute tempor.',
          image: 'noTieneImage.png'
        },
        messages: [
          {
            date: new Date(),
            message: 'hola mundo',
            user: {
              username: 'titi',
              avatar: 'nono.png'
            }
          }
        ],
        rate: ['pepe', 'conan'],
        dev: {
          message: null,
          approval: false
        }
      }
    ]
  }
  // get man of the month
  getMOM (cb) {
    // this need a server req
    cb(null, {
      username: 'adriana',
      image: '/images/none.jpg',
      title: 'Beast',
      genre: 'female',
      publicId: '123124124'
    })
  }

  // TEMPLATE
  buildLeft (user, MoM, contribsInProcess) {
    // contenedores
    let wrapper = yo`<div class="devboard-wrapper"></div>`
    let left = yo`<div class="devBoard-left devboard"></div>`

    // BRAND
    let brand = createTemplate.drawBrand()

    // MAN OF THE MONTH
    // Simplemente un setter y getter
    // que puede comidficar el dev... el formulario solo apareceria
    // si se es dev
    if (user.admin) {
      console.log('Pendiente: crear un fromulario para dar el hombre del mes: MoM')
    }

    let manOfMonth = createTemplate.drawManOfMonth(MoM)

    // IN PROCESS CONTRIBUTIONS
    // se crea un listado de las contribuciones que estan en proceso
    let inProcess = createTemplate.drawInProcess(contribsInProcess)

    // se añanden los contenidos al wrapper
    wrapper.appendChild(brand)
    wrapper.appendChild(manOfMonth)
    wrapper.appendChild(inProcess)

    // se añade el contenido al contenedor
    left.appendChild(wrapper)

    this.inside.appendChild(left)
  }

  buildRight (user, contribs) {
    let right = yo`<div class="devboard devBoard-right"></div>`
    let wrapper = yo`<div class="devboard-wrapper"></div>`
    let tagContainer = yo`<div class="tag-devboard-container"></div>`

    // contenido
    let content = yo`<div class="devboard-right-content"></div>`

    // masonry init: ajusta el layout de forma vertical
    let msnry = new Masonnry (content, {
      itemSelector: '.grid-item',
      columWidth: 270,
      transitionDuration: '0.2s',
      isInitLayout: false
    })

    // FORMULARIO DE CONTRIBUCIONES -------
    let formTemplate = createTemplate.drawContribsForm(user)
    let form = formTemplate.form
    let counterTemplate = formTemplate.counter

    let mainForm = yo`
      <div class="contrib-create-form-wrapper devboard-right-content-items">
        <h2 class="devboard-form-title">
          NEW
        </h2>
        ${form}
        ${counterTemplate}
      </div>
    `

    msnry.stamp(mainForm)

    // evento cuando se hace submit del formulario
    form.onsubmit = (ev) => {
      ev.preventDefault()
      let myForm = ev.target
      let $myForm = $(myForm)

      let data = $myForm.serializeArray()
      let dataToSend = {}

      // se construye el body de la peticion
      // {
      //  title
      //  type
      //  info
      // }
      for (let i = 0; i < data.length; i++) {
        dataToSend[data[i].name] = data[i].value
      }

      // se incluye el metodo de renderizar una sola contribucion al contexto
      let renderContrib = this.renderContrib.bind(this)

      request
        .post('/api/contributions')
        .send(dataToSend)
        .end(function (err, res) {
          if (err) return(err)
          let newContrib = res.body
          let newContribRendered = renderContrib(user, newContrib)
          content.appendChild(newContribRendered)
          msnry.prepended(newContribRendered)
          myForm.reset()
        })
    }

    // se agrega el formulario
    content.appendChild(mainForm)

    // Muestra y esconde de nuevo el contenido oculto.
    let $content = $(content)
    $content.on('click', '.one-contrib-container .one-contrib-wrapper .one-contrib-content .one-contrib-likes .one-contrib-likes-container-button-arrow', (ev) => {
      let $masIcon = $(ev.currentTarget)
      let $this = $masIcon.closest('.one-contrib-container')

      let $containerToMove =  $this.find('.one-contrib-content')
      let $back =  $this.find('.one-contrib-content-back')
      let $eyes =  $back.find('.one-contrib-content-back-eyes')
      let $hiddenC = $this.find('.one-contrib-hidden-content')

      let myHeightToSave = $this.height()

      let width = $containerToMove.width() + 100;
      let height = $containerToMove.height()

      let $ecran = $(ecran)
      $ecran.toggleClass('ecran-display')
      $hiddenC.toggleClass('one-contrib-show-hidden-content')
      $back.toggleClass('back-display')

      $("<style/>", {text: `.get-devboard-contrib {
        margin-top: 7px !important;
        margin-bottom: 7px !important;
        overflow: scroll;
        position: fixed !important;
        left: 50% !important;
        top: 5% !important;
        height: 90%;
        width: ${width}px !important;
        margin-left: -${width / 2}px;
        z-index: 12 !important;
      }`}).appendTo('head');

      if($eyes.hasClass('show-eyes')){
        $eyes.removeClass('show-eyes')
      }

      $containerToMove.toggleClass('opacity-zero')
      setTimeout(function() {
        $containerToMove.toggleClass('get-devboard-contrib')
        setTimeout(function() {
          $containerToMove.toggleClass('opacity-zero')

          if(!$eyes.hasClass('show-eyes')){
            setTimeout(function() {
              $eyes.addClass('show-eyes')
            }, 200);
          }

        }, 100);
      }, 100);

      $this.css('height', myHeightToSave)
    })

    // se agregan todas las contribuciones
    this.buildContribList(user, content, msnry, (err, content) => {
      if (err) console.log(err)
      tagContainer.appendChild(this.tagBoard)
      wrapper.appendChild(tagContainer)
      wrapper.appendChild(content)
      setTimeout(function() {
        msnry.layout()
      }, 50);
    })

    // se agregan los elementos a la envoltura
    right.appendChild(wrapper)
    this.inside.append(right)
  }

  buildContribList (user, container, msnry, cb) {
    this.getcontribs(0, (err, res) => {
      if (err) return cb(err)
      let contribs = res.contributions

      for (let i = 0; i < contribs.length; i++) {
        let oneContrib = contribs[i]
        let renderedContrib = this.renderContrib(user, oneContrib)
        msnry.addItems(renderedContrib)
        container.appendChild(renderedContrib)
      }

      cb(null, container, contribs)
    })
  }

  // extrae los tags, y los dibuja
  addTagToBoard(contrib) {
    let contribTags = contrib.tags

    for (let i = 0; i < contribTags.length; i++) {
      if (!this.tags.includes(contribTags[i])) {
        let tagTemplate = yo`
            <a href="" class="contrib-tag">
              ${contribTags[i]}
            </a>
        `
        this.tagBoard.appendChild(tagTemplate)
        this.tags.push(contribTags[i])
      }
    }
  }

  // contruye un template para una sola contribución
  renderContrib (user, contrib) {
    // agrega los tags de la contribucion, al tablero de tags
    // en la parte superior
    this.addTagToBoard(contrib)

    // construye el mensaje de la fecha
    let dateString = createTemplate.drawDate(contrib.dateAdded)

    // SE CONSTRUYEN LAS CONTRIBUCIONES -----------

    // dibuja el boton de rate
    let likeButton = createTemplate.drawLikesDevil()

    // dibuja las etiquetas de los que dan un rate
    let contribRate = createTemplate.renderRate(contrib.rate, this.user.username)

    // el dev panel tiene dos partes
    // la respuesta del dev, y en caso de que el user sea admin, el formulario

    // FORMULARIO DEV
    // formulario para dar una opinión dev a la contribución
    // El dev form se dibuja si es un usuario dev
    let devForm = createTemplate.drawDevForm()

    // PANEL DE RESPUESTA DEV
    // el dev panel se dibuja si existe una respuesta del dev
    let devResponse = this.drawDevResponse(contrib)

    // MENSAJES DE USUARIO
    // texarea donde se sube el mensaje
    // <textarea name="message" class="one-contrib-messages-text-form" maxlength="340" value="">
    // </textarea>

    let userMessageForm = yo`
      <p class="one-contrib-messages-text-editable" contenteditable="true">
      </p>
    `

    let containerMessage = yo`
      <div class="one-contrib-messages-text-form">
        ${userMessageForm}
        <input type="submit" class="one-contrib-messages-submit" value="enviar">
      </div>
    `
    userMessageForm.addEventListener("paste", function(e) {
      // cancel paste
      e.preventDefault();

      // get text representation of clipboard
      var text = e.clipboardData.getData("text/plain");

      // insert text manually
      document.execCommand("insertHTML", false, text);
    });

    // formulario de subida de mensajes de usuario
    let messagesForm = yo`
      <form action="" class="one-contrib-messages-form">
          <div class="one-contrib-messages-uimage-container">
            <img src="${this.user.avatar}" alt="" class="one-contrib-messages-uimage">
          </div>
          <div class="one-contrib-messages-text-form-container">
            ${containerMessage}
          </div>
      </form>
    `

    // EVENT: subir mensaje.
    // let $messagesForm = $(messagesForm)
    // $messagesForm.on('submit', (ev) => {
    //   ev.preventDefault()
    // })

    // template de mensajes de usuario

    // template del contenido escondido
    let hiddenContent = yo`
      <div class="one-contrib-hidden-content">
        <div class="one-contrib-messages-container">
          ${this.drawMessages(contrib)}
          <div class="one-contrib-messages-form-container">
            ${messagesForm}
          </div>
        </div>
        <div class="one-contrib-dev-res">
          <div class="one-contrib-dev-res-to-change">
            ${devResponse}
          </div>
          ${this.user.admin ? devForm : ''}
        </div>
      </div>
    `

    // TEMPLATE PRINCIPAL
    let contribTemplate = yo`
      <div class="one-contrib-container devboard-right-content-items grid-item">
        <div class="one-contrib-wrapper">
          <div class="one-contrib-content-back">
            <div class="one-contrib-content-back-eyes">
              <div class="one-contrib-content-back-eyes-pupil"></div>
            </div>
          </div>
          <div class="one-contrib-content" contrib="${contrib.publicId}">
            <div class="one-contrib-content-scroll">
              <div class="one-contrib-header">
                <div class="one-contrib-left">
                  <div class="one-contrib-avatar-container">
                    <img src="${contrib.user.avatar}" alt="" class="one-contrib-user-image">
                  </div>
                </div>
                <div class="one-contrib-right">
                  <div class="one-contrib-username">${contrib.user.username}</div>
                    <span>${dateString}</span>
                  </div>
                <div class="one-contrib-info">${contrib.data.data || contrib.data.info}</div>
              </div>
              <div class="one-contrib-likes">
                <div class="one-contrib-likes-container">
                  <div class="one-contrib-likes-container-button-arrow">
                  </div>
                  ${likeButton}
                  <div class="one-contrib-likes-container-names">
                    ${contribRate}
                  </div>
                </div>
              </div>
              ${hiddenContent}
            </div>
          </div>
        </div>
      </div>
    `

    let addUserMessage = this.addUserMessage.bind(this)

    messagesForm.onsubmit = (ev) => {
      ev.preventDefault()
      let $head = $(ev.target).closest('.one-contrib-content')
      let id = $head.attr('contrib')

      let $this = $(ev.currentTarget)
      let textToSend = $this.find('.one-contrib-messages-text-editable').html()

      let data = {
        userMessage: textToSend
      }

      addUserMessage(id, data, (err, res) => {
        if (err) console.log(err)
      })
    }

    let $devForm = $(devForm)
    // callback que agrega la respuesta del desarrollador a la contribucion
    let devAddApproval = this.devResponse.bind(this)
    // dibuja la contribucion
    let drawDevResponse = this.drawDevResponse.bind(this)

    $devForm.on('click', '.one-contrib-dev-buttons .button', (ev) => {
      ev.preventDefault()
      let $head = $(ev.target).closest('.one-contrib-content')
      let id = $head.attr('contrib')

      let $textArea = $devForm.find('.one-contrib-dev-textarea')
      let message = $textArea[0].value

      let $this = $(ev.currentTarget)
      let action = $this.attr('value')

      let $contribToChange = $head.find('.one-contrib-dev-res-to-change')

      let data = {
        approval: action,
        message: message
      }

      devAddApproval(id, data, (err, res) => {
        if (err) return console.log('este es un mensaje de error a optimizar', err)

        let changes = {
          dev: res.body.data
        }

        $textArea.val('')
        let templateToDraw = drawDevResponse(changes)
        console.log($contribToChange)
        $contribToChange.empty().append(templateToDraw)
      })
    })

    // EVENTOS DEL FEATURE <RATE>
    let $likeButton = $(likeButton)
    let rateContrib = this.rateContrib.bind(this)

    $likeButton.on('click', (ev) => {
      ev.preventDefault()
      let $newRateContainer = $(ev.target).closest('.one-contrib-likes-container').find('.one-contrib-likes-container-names')
      let $head = $(ev.target).closest('.one-contrib-content')
      let id = $head.attr('contrib')

      rateContrib(id, (err, contribRated) => {
        if (err) return console.log(err)
        let newRateRender = createTemplate.renderRate(contribRated.rate, this.user.username)
        $newRateContainer.empty().append(newRateRender)
        // $newRateContainer
      })
    })

    return contribTemplate
  }

  drawDevResponse (contrib) {
    let redAlert = '#FF2B4A'
    let greenOk = '#1EFFDC'

    let approval = JSON.parse(contrib.dev.approval)
    let message = contrib.dev.message

    if (approval === null && message === null) {
      return
    }

    console.log(contrib.dev)

    console.log(approval)
    let devMessageTemplate = yo`
      <div class="one-contrib-dev-left-content">
        ${message}
      </div>
    `

    return yo`
      <div class="one-contrib-dev-panel" style="background-color: ${approval === true ? greenOk : redAlert}">
        <div class="one-contrib-dev-response">
          <div class="one-contrib-dev-response-left">
            <div class="one-contrib-dev-left-title">
              ${approval ? 'POSIBLE': 'IMPOSIBLE'}
              <div class="one-contrib-dev-hand">
                <img src="img/${approval ? 'true' : 'false'}.png" alt="${approval}">
              </div>
            </div>
            ${message ? devMessageTemplate : ''}
          </div>
        </div>
      </div>
    `
  }

  // send dev response
  devResponse (id, req, cb) {
    request
    .post(`/api/contributions/devres/${id}`)
    .send(req)
    .end(function (err, res) {
      if (err) return cb(err)
      cb(null, res)
    })
  }

  addUserMessage (id, req, cb) {
    request
    .post(`/api/contributions/addMessage/${id}`)
    .send(req)
    .end(function (err, res) {
      if (err) return cb(err)
      cb(null, res)
    })
  }

  // Dibuja los mensajes
  drawMessages(contrib){
    let myMessages = contrib.messages
    let allMessages = yo`
      <div class="one-contrib-messages">
      </div>
    `
    for(let i = 0; i < myMessages.length; i++) {
      allMessages.appendChild(this.drawSingleMessage(myMessages[i]))
    }

    let $allMessages = $(allMessages)

    // Queda a la escucha de una eliminacioooon! XD
    $allMessages.on('click', '.one-contrib-messages-single .one-contrib-messages-single-right .one-contrib-messages-single-delete .one-contrib-messages-single-delete-container .confirmation .accept', (ev) => {
      ev.preventDefault()
      let $head = $(ev.target).closest('.one-contrib-messages-single')
      let id = $head.attr('messageId')
      console.log(id)
    })

    return allMessages
  }

  // Dibuja un mensaje solo
  drawSingleMessage (data) {
    let trash = createTemplate.getTrash()

    let deleteMessage = yo`
      <div class="one-contrib-messages-single-delete">
        ${trash}
      </div>
    `

    console.log(data)

    return yo`
      <div class="one-contrib-messages-single" messageId = ${data.id}>
        <div class="one-contrib-messages-single-left">
          <div class="one-contrib-messages-single-avatar-container">
            <img src="${data.user.image}.png" alt="" class="one-contrib-messages-single-avatar">
          </div>
        </div>
        <div class="one-contrib-messages-single-right">
          ${data.user.username === this.user.username ? deleteMessage: ''}
          <p class="one-contrib-messages-single-content">
            <span class="one-contrib-messages-single-userName">
              ${data.user.username}
            </span>
            ${data.content.userMessage}
          </p>
        </div>
      </div>
    `
  }

  // rate contrib
  rateContrib (id, cb) {
    request
    .get(`/api/contributions/rate/${id}`)
    .set('Accept', 'application/json')
    .end((err, res) => {
      if (err) {
        return cb(err)
      }
      cb(null, res.body)
    })

  }

  // get info
  getcontribs (group, cb) {
    group = group || 0
    request
        .get(`/api/contributions/last/${group}`)
        .set('Accept', 'application/json')
        .end((err, res) => {
          if (err) {
            return cb(err)
          }
          cb(null, res.body)
        })
  }
}

module.exports = devBoard

// 🍷 se agrega un mensaje a la contribucion
// 💀 se elimina un mensaje a la contribucion
// 💀 se pide una contribucion por tags
// 💀 se edita una contribucion
// 💀 se elimina una contribucion
// 💀 set mom
// 💀 get mom
// 🍷 se piden las contribuciones por id
// 🍷 se pide una contribucion por id
// 🍷 se lee si el usuario es dev
// 🍷 se agrega una respuesta de dev
