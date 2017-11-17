let yo = require('yo-yo')
let OnScreen = require('onscreen')
let $ = require('jquery')
let _ = require('lodash')
let empty = require('empty-element')
const request = require('superagent')

// utilidades propias
let utils = require('./utils')

// constructor de templates
let templates = require('./maker')

// Constructor de tootips
const Tooltips = require('./../../utils/userTooltips')
const communicator = require('./../../utils/activityCommunicator')

// Dialog container
const barContainer = document.getElementById('dialog-container')
const bar = yo`<div class="dialog-bar"></div>`
barContainer.appendChild(bar)


// global variables
let os
let container
let scrollMaster
let list

class Contrib {
  constructor (data, user, position) {
    this.dateAdded = data.dateAdded
    this.dev = data.dev
    this.id = data.id
    this.inProcess = data.inProcess
    this.messages = data.messages
    this.publicId = data.publicId
    this.rate = data.rate
    this.tags = data.tags
    this.title = data.title
    this.user = data.user
    this.my = user
    this.info = data.data || data.info

    // abierto o cerrado
    this.opened = false
    this.barHide = false

    // si el elemento esta visible en scroll TRUE
    this.onView = false

    // dibuja la fecha
    let dateString = utils.drawDate(this.dateAdded)

    // llama los tooltips
    let usernameTooltip = new Tooltips (this.user.username, this.my)

    // icono de eliminar
    let trash = templates.getTrash()

    // pequeño boton de  like
    this.likeButton = templates.drawLikesDevil()

    // dibuja los nombres del rate
    let contribRate = templates.renderRate(this.rate, this.my.username, this.user.username)

    let deleteContribButton = yo`
      <div class="one-contrib-delete-container">
        <div class="one-contrib-delete">
          ${trash}
        </div>
      </div>
    `

    // el dev panel tiene dos partes
    // la respuesta del dev, y en caso de que el user sea admin, el formulario

    // FORMULARIO DEV
    // formulario para dar una opinión dev a la contribución
    // El dev form se dibuja si es un usuario dev
    this.devForm = yo`
      <div class="bar-item-dev-res-form">
        <form class="bar-item-dev-form">
          <div class="bar-item-dev-textarea-container">
            <textarea name="message" placeholder="Puedes escribir algo aquí, ¿o no?" class="bar-item-dev-textarea" maxlength="140"></textarea>
          </div>
          <div class="bar-item-dev-buttons">
            <button class="bar-item-dev-input-true button" value="true">
            </button>
            <button class="bar-item-dev-input-false button" value="false">
            </button>
          </div>
        </form>
      </div>
      `


    let devResponse = this.drawDevResponse()

    // PANEL DE RESPUESTA DEV
    // el dev panel se dibuja si existe una respuesta del dev
    // let devResponse = this.drawDevResponse(contrib)

   // MENSAJES DE USUARIO
    // texarea donde se sube el mensaje

    this.userMessageForm = yo`
    <p class="bar-item-messages-text-editable" contenteditable="true">
    </p>
    `

    this.messageSending = yo`
      <div class="bar-item-messages-submit-sending"></div>
    `

    let containerMessage = yo`
      <div class="bar-item-messages-text-form">
        ${this.userMessageForm}
        <input type="submit" class="bar-item-messages-submit" value="enviar">
        ${this.messageSending}
      </div>
    `

    this.userMessageForm.addEventListener("paste", function(e) {
      // cancel paste
      e.preventDefault();

      // get text representation of clipboard
      var text = e.clipboardData.getData("text/plain");

      // insert text manually
      document.execCommand("insertHTML", false, text);
    });

    // formulario de subida de mensajes de usuario
    this.messagesForm = yo`
      <form action="" class="bar-item-messages-form">
          <div class="bar-item-messages-uimage-container">
            <img src="${this.user.avatar}" alt="" class="bar-item-messages-uimage">
          </div>
          <div class="bar-item-messages-text-form-container">
            ${containerMessage}
          </div>
      </form>
    `


    this.closeBarItem = yo`<span class="bar-item-close"></span>`

    let barHeader = yo`
      <div class="bar-item-label">
      <span class="bar-item-title" title="${this.title}">${this.title}</span>
      <span class="bar-item-username">${this.user.username}</span>
      ${this.closeBarItem}
    </div>
    `

    this.barClearfix = yo`
      <div class="bar-item-clearfix">
      </div>
    `

    this.open = yo`
      <div class="one-contrib-likes-container-button-arrow">
      </div>
    `

    this.title = yo`
      <div class="one-contrib-title" title="${this.title}">${this.title}</div>
    `

    this.likeContainerNames = yo`
      <div class="one-contrib-likes-container-names">
        ${contribRate}
      </div>
    `
    this.basicContainer = yo`
      <div class="one-contrib-content" contrib="${this.publicId}">
        <div class="one-contrib-content-scroll">
          <div class="one-contrib-header">
            <div class="one-contrib-left">
              <div class="one-contrib-avatar-container">
                <img src="${this.user.avatar}" alt="" class="one-contrib-user-image">
              </div>
            </div>
            <div class="one-contrib-right">
              ${this.title}
              <div class="one-contrib-username"><span class="one-contrib-por">por:</span>${usernameTooltip.get()}</div>
              ${dateString}
            </div>
            <div class="one-contrib-info">${this.info.data || this.info.info}</div>
          </div>
          <div class="one-contrib-likes">
            <div class="one-contrib-likes-container">
              ${this.open}
              ${this.my.username === this.user.username ? deleteContribButton: ''}
              ${this.likeButton}
              ${this.likeContainerNames}
            </div>
          </div>
        </div>
      </div>
    `

    this.loader = yo`
      <div class="one-contrib-loader">
        <div class="loader"></div>
      </div>
    `

    this.wrapper = yo`
      <div class="one-contrib-wrapper">
        ${this.loader}
      </div>
    `

    this.loaderContainer = yo`
      <div id="${this.publicId}" class="one-contrib-container devboard-right-content-items grid-item">
      ${this.wrapper}
      </div>
    `

    this.bar = yo`
      <div class="bar-item-container">
        ${barHeader}
        <div class="bar-item-content">
          <div class="bar-item-content-data">
            <div class="bar-item-content-icons-bar">
              <div class="bar-item-content-icons-avatar">
                <img src="${this.user.avatar}" alt="${this.user.username}">
              </div>
              ${devResponse}
            </div>
            <div class="bar-item-content-text">
              ${this.info.data || this.info.info}
            </div>
          </div>
          <div class="bar-item-dev-res">
            ${this.my.admin ? this.devForm : ''}
          </div>
          <div class="bar-item-messages-container">
            <div class="bar-item-messages-form-container">
              ${this.messagesForm}
            </div>
            ${this.drawMessages()}
          </div>
        </div>
      </div>
    `


    this.barClearfix.appendChild(this.bar)
    let hideBar = this.hideBar.bind(this)

    barHeader.onclick = function(ev) {
      hideBar()
    }

    let setEvents = this.setEvents.bind(this)
    this.drawContrib(position, () => {
      setEvents()
    })
  }

  setEvents() {
    let id = this.publicId
    let addToBar = this.addToBar.bind(this)
    this.open.onclick = function (ev) {
      addToBar()
    }

    this.closeBarItem.onclick = function(ev) {
      addToBar()
    }

    // EVENTO DE FORMULARIO DEV
    let $devForm = $(this.devForm)
    let publicId = this.publicId

    let devAddApproval = this.devResponse.bind(this)
    let drawDevResponse = this.drawDevResponse.bind(this)

    // add to bar
    $devForm.on('click', '.bar-item-dev-buttons .button', (ev) => {
      ev.preventDefault()
      let id = publicId
      
      let $head = $(ev.target).closest('.bar-item-content')
      let $textArea = $devForm.find('.bar-item-dev-textarea')
      let message = $textArea[0].value

      let $this = $(ev.currentTarget)
      let action = $this.attr('value')

      let $contribToChange = $head.find('.bar-item-dev-res-to-change')

      let data = {
        approval: action,
        message: message
      }

      devAddApproval(id, data, (err, res) => {
        if (err) return console.log('este es un mensaje de error a optimizar', err)

        let approval = res.body.data.approval

        console.log(res.body)

        let changes = {
          dev: res.body.data
        }

        let approved = approval==='true' ? 'aprobado': 'no aprobado'

        let data = {
          info: approval,
          type: 'dev',
          message: `Su acción: ${approved}, se ha guardado con exito`
        }

        communicator.addMessage(data)

        $textArea.val('')
        let templateToDraw = drawDevResponse(changes)
        $contribToChange.empty().append(templateToDraw)
      })
    })

    // Add to abr
    this.title.onclick = function (ev) {
      addToBar()
    }

    // likebutton
    let rateContrib = this.rateContrib.bind(this)
    let user = this.user
    let my = this.my
    let likeContainerNames = this.likeContainerNames

    this.likeButton.onclick = function(ev){
      ev.preventDefault()

      rateContrib(id, (err, contribRated) => {
        if (err) return console.log(err)
        console.log(my, user)
        let newRateRender = templates.renderRate(contribRated.rate, my.username, user.username)
        newRateRender = newRateRender === null ? '': newRateRender
        empty(likeContainerNames).append(newRateRender)
        // $newRateContainer
      })
    }

    let $form = $(this.userMessageForm)
    let addUserMessage = this.addUserMessage.bind(this)

    this.messagesForm.onsubmit = (ev) => {
      ev.preventDefault()

      let textToSend = $form.html()

      let data = {
        userMessage: textToSend.replace(/<\/?[^>]+(>|$)/g, "")
      }

      let sendingMessage = yo`
        <span class="info-sending"> sending ...</span>
      `
      $form.prop('disabled', true)
      this.messageSending.appendChild(sendingMessage)

      addUserMessage(id, data, (err, res) => {
        if (err) {
          console.log(err)
          $form.html('')
          $form.prop('disabled', false)
          empty(this.messageSending)
          return communicator.addMessage(err.message)
        }

        empty(this.messageSending)
        $form.html('')
        $form.prop('disabled', false)
      })
    }

    this.messagesForm.onkeyup = (ev) => {
      ev.preventDefault()
      if (ev.key === 'Enter'){
        let $messagesForm = $(this.messagesForm)
        $messagesForm.unbind().submit()
      }
    }
  }

  drawDevResponse () {
    let approval = JSON.parse(this.dev.approval)
    let message = this.dev.message

    if (approval === null && message === null) {
      return
    }

    let devMessageTemplate = yo`
      <div class="bar-item-dev-content">
        ${message}
      </div>
    `

    return yo`
      <div class="bar-item-content-icons-dev-response">
        <div class="bar-item-dev-icon">
          <div class="bar-item-dev-response">
            <div class="bar-item-dev-title">
              <div class="bar-item-dev-hand">
                <img src="img/${approval ? 'true' : 'false'}.png" alt="${approval}">
              </div>
              <div class="bar-item-dev-string">
                ${approval ? 'POSIBLE': 'IMPOSIBLE'}
              </div>
            </div>
            ${message ? devMessageTemplate : ''}
          </div>
        </div>
      </div>
    `
  }

  hideBar() {
    if (!this.barHide) {
      this.bar.style.marginTop = '-45px'
      this.barHide = true
    } else {
      this.bar.style.marginTop = '-600px'
      this.barHide = false
    }
  }
  // crea una instancia de ventana independiente... con chat
  addToBar () {
    if (!this.opened) {
      bar.appendChild(this.barClearfix)
      this.opened = true
    } else {
      bar.removeChild(this.barClearfix)
      this.opened = false
    }
  }

  drawContrib(position, cb) {
    if (position === 'after') {
      container.appendChild(this.loaderContainer)
      return cb()
    } else {
      container.prepend(this.loaderContainer)
      empty(this.wrapper).appendChild(this.basicContainer)
      return cb()
    }
  }

  increase() {
    empty(this.wrapper).appendChild(this.basicContainer)
  }

  reduce() {
    empty(this.wrapper).appendChild(this.loader)
  }

  drawMessages(){
    let myMessages = this.messages
    let allMessages = yo`
      <div class="bar-item-messages">
      </div>
    `
    for(let i = 0; i < myMessages.length; i++) {
      allMessages.prepend(this.drawSingleMessage(myMessages[i]))
    }

    this.allMessages = allMessages
    return allMessages
  }

  // Dibuja un mensaje solo
  drawSingleMessage (data) {
    let ok = yo`
      <div class="accept">
        <i class="fa fa-check"></i>
      </div>
    `

    let trash = templates.getTrash(ok)

    let deleteMessage = yo`
      <div class="bar-item-messages-single-delete">
        ${trash}
      </div>
    `

    let message = yo`
      <span class="bar-item-messages-single-message">
      </span>
    `


    // Queda a la escucha de una eliminacion del mensaje! XD
    // let deleteContribMessage = this.deleteMessageContrib.bind(this)

    let deleteMessageContrib = this.deleteMessageContrib.bind(this)

    ok.onclick = (ev) => {
      ev.preventDefault()
      let $head = $(ev.target).closest('.bar-item-content')
      let $message = $(ev.target).closest('.bar-item-messages-single')

      let messageId = $message.attr('messageId')

      deleteMessageContrib(this.publicId, messageId, (err, res) => {
        if (err) return console.log(err)
        console.log(res)
      })
    }

    let $message = $(message)
    $message.html(data.content.userMessage)

    return yo`
      <div class="bar-item-messages-single" messageId="${data.id}">
        <div class="bar-item-messages-single-left">
          <div class="bar-item-messages-single-avatar-container">
            <img src="${data.user.image}" alt="${data.user.username}">
          </div>
        </div>
        <div class="bar-item-messages-single-right">
          ${data.user.username === this.my.username ? deleteMessage: ''}
          <p class="bar-item-messages-single-content">
            <span class="bar-item-messages-single-userName">
              ${data.user.username}
            </span>
            ${message}
          </p>
          <p class="bar-item-messages-single-date">${templates.drawDate(data.date)}</p>
        </div>
      </div>
    `
  }

  // acciones con mensajes
  addNewMessage (message) {
    console.log(this.messages, message)
    this.messages.push(message)

    if (this.opened) {
      this.allMessages.prepend(this.drawSingleMessage(message))
    }

    // if (this.contentOpen) {
    //   let myContent = this.contentOpened.find('.one-contrib-content')
    //   let $myContent = $(myContent[0])
    //   let id = $(myContent[0]).attr('contrib')

    //   if (id === newMessage.contribId) {
    //     let $container = $myContent.find('.one-contrib-messages')
    //     $container[0].prepend(drawSingleMessage(newMessage))
    //   }
    // }
  }

  removeMessage (messageInfo) {
    let messageId = messageInfo.id
    console.log(messageId)

    if (this.opened) {
      let deleteMessageTemplate = yo`
        <div class="delete-message-template">
          <span class="delete-message-template-username">
            ${messageInfo.username}
          </span>
          ha eliminado el comentario ...
        </div>
      `
      let $container = $(this.allMessages).find('.bar-item-messages')
      console.log($container)
      let $message = $container.children(`.bar-item-messages-single[messageid='${messageId}']`)
      console.log($message)
      // $message.empty().append(deleteMessageTemplate)
    }
  }

  // PETICIONES
  // agrega un dev response
  devResponse (id, req, cb) {
    request
    .post(`/api/contributions/devres/${id}`)
    .send(req)
    .end(function (err, res) {
      if (err) return cb(err)
      cb(null, res)
    })
  }

  // agrega un rate de usuario
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

  // agrega un mensaje a la contribucion
  addUserMessage (id, req, cb) {
    request
    .post(`/api/contributions/addMessage/${id}`)
    .set('Accept', 'application/json')
    .send(req)
    .end(function (err, res) {
      if (err) {
        console.log(res)
        let data = {
          type: 'error',
          message: res.body
        }
        return cb(data)
      }
      cb(null, res)
    })
  }

  // elimina un mensaje en una contribucion
  deleteMessageContrib(contribId, messageId, cb){
    request
    .get(`/api/contributions/delmessage/${contribId}/${messageId}`)
    .set('Accept', 'application/json')
    .end((err, res) => {
      if (err) {
        console.log(err.body,'kalalalala')
        return cb(err)
      }
      cb(null, res.body)
    })
  }

  // ESTATICOS!!
  static setContainer(scrollInside) {
    container = yo`<div id="devboard-wrapper-right" class="devboard-wrapper"></div>`
    scrollMaster = scrollInside

    os = new OnScreen({
      container: scrollMaster,
      tolerance: 100,
    })

    return container
  }

  static addList(array) {
    list = array
    console.log(list)
    // dibuja
    os.on('enter', '.grid-item', (element, e) => {
      let id = element.getAttribute('id')
      let actual = _.find(list, {id: id}).contrib
      actual.increase()
    })
    
    // reduce
    // os.on('leave', '.grid-item', (element, e) => {
    //   let id = element.getAttribute('id')
    //   let actual = _.find(list, {id: id}).contrib
    //   actual.reduce()
    // })
  }
}

module.exports = Contrib