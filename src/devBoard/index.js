'use strict'
const request = require('superagent')
const yo = require('yo-yo')
const _ = require('lodash')
const $ = require('jquery')
const empty = require('empty-element')
const createTemplate = require('./utils/maker')
const autosize = require('autosize')

// Posiciona los objetos verticalmente
// const Masonnry = require('masonry-layout')

// tooltips util
const Tooltips = require('./../utils/userTooltips')
const Single = require('./utils/contrib')
const communicator = require('./../utils/activityCommunicator')

// contenedor principal
let devBoardContainer = document.getElementById('devboard-container')

// pantalla oscura
let ecran = yo`
<div class='ecran-gray'>
</div>
`
devBoardContainer.appendChild(ecran)


class devBoard {
  constructor (user, socket) {
    // construye una plantilla basica
    this.right = yo`<div class="devboard devBoard-right"></div>`
    this.left = yo`<div class="devboard devBoard-left"></div>`
    this.inside = yo`<div id="devboard-scroll" class="clearfix"></div>`
    this.tagBoard = yo`<div class="devboard-left-tags"></div>`
    this.launcher = yo`
      <div id="chat-launcher">
        <div class="chat-launcher-icon">
        </div>
      </div>
    `
    this.tags = []
    this.contribList = []
    this.user = user
    this.contentOpen = false
    this.contentOpened = null

    this.$ecran = $(ecran)

    // Identificador abierto y cerrado
    this.open = true

    // nombre del tablero
    this.boardName = 'conexiones'
    devBoardContainer.append(this.inside)

    // REALTIME
    // delete contrib
    socket.on('deleteContrib', (contribDeleted) => {
      console.log(contribDeleted)
      let id = contribDeleted.publicId
      let deleted = _.find(this.contribList, {id: id}).contrib
      deleted.removeThis()
    })

    socket.on('settedMom', (mom) => {
      let data = {
        type: 'newMom',
        message: `${mom.username} ha pasado a ser el nuevo iluminado de la semana`,
        info: 'null'
      }

      communicator.addMessage(data)
    })

    // new message
    socket.on('newDevBoardMessage', (newMessage) => {
      let id = newMessage.contribId

      let modified = _.find(this.contribList, {id: id}).contrib
      modified.addNewMessage(newMessage)
    })

    // delete message
    socket.on('deleteDevBoardMessage', (deletedMessage) => {
      let id = deletedMessage.contribId
      let deleted = _.find(this.contribList, {id: id}).contrib
      deleted.removeMessage(deletedMessage)
    })


    // lanzador
    // se abre el panel
    devBoardContainer.appendChild(this.launcher)
    let $devBoardContainer = $(devBoardContainer)
    let open = this.open
    let newChatBoard = this.newChatBoard.bind(this)

    let inside = this.inside

    this.launcher.onclick = function(ev) {
      // se crea un loader
      let loader = yo`
      <div class="devboard-loader">
        <div class="devboard-loader-content">
          <div class="devboard-loader-back-eyes">
            <div class="devboard-loader-back-eyes-pupil">
            </div>
          </div>
        </div>
      </div>
      `
      devBoardContainer.appendChild(loader)
      $devBoardContainer.toggleClass('devboard-open')

      if (open) {
        setTimeout(function() {
          newChatBoard(user)
          setTimeout(function() {
            devBoardContainer.removeChild(loader)
          }, 2000)
        }, 200);
        open = false
        // Primero se pide el mom, luego todas las contribuciones
      } else {
        empty(inside)
        devBoardContainer.removeChild(loader)
        open = true
      }

      setTimeout(function() {
      }, 2000);

    }
  }

  newChatBoard () {
    this.getMOM((err, mOM) => {
      if (err) console.log(`ha ocurrido un error obteniendo el MOM: ${err}`)

      // Crea una plantilla para mostrar, crear, y
      // pedir todas las contribuciones, para hacer esto se divide en:

      // lado izquierdo (contiene la marca, el hombre del mes y las contribuciones
      // en proceso).
      // pdta1: Se comporta de forma distinta en pantallas pequeñas
      // pdta2: se tiene en cuenta si es dev o no, para renderizar el formulario
      this.buildLeft(this.user, mOM)

      // lado derecho, contiene los tags, el formulario de contribuciones, las contribuciones.
      // pdta: se tiene en cuenta si es dev o no, para renderizar el formulario
      this.getContribs(null, (err, response) => {
        if (err) return console.log(err)
        this.buildRight(this.user, response.contributions)
      })
    })
  }

  // get man of the month
  getMOM (cb) {
    // this need a server req
    request
    .get('/api/contributions/getmom')
    .set('Accept', 'application/json')
    .end(function (err, res) {
      if (err) return cb(err)
      cb(null, res.body.mom)
    })
  }

  // TEMPLATE
  buildLeft (user, MoM) {
    // contenedores
    let wrapper = yo`<div class="devboard-wrapper"></div>`
    let left = this.left
    let tagContainer = yo`<div class="tag-devboard-container"></div>`

    // MAN OF THE MONTH
    // Simplemente un setter y getter
    // que puede comidficar el dev... el formulario solo apareceria
    // si se es dev
    if (user.admin) {
      console.log('Pendiente: crear un fromulario para dar el hombre del mes: MoM')
    }

    let manOfMonth = createTemplate.drawManOfMonth(MoM, Tooltips, this.user)

    // se añanden los contenidos al wrapper
    tagContainer.appendChild(this.tagBoard)
    wrapper.appendChild(manOfMonth)
    wrapper.appendChild(tagContainer)

    // se añade el contenido al contenedor
    empty(left).appendChild(wrapper)

    this.inside.appendChild(left)
  }

  buildRight (user, contribs) {
    // let container = document.getElementById('devboard-wrapper-right')
    // let $container = $(container)
    // $container.remove()

    console.log(contribs)

    let wrapper = Single.setContainer(this.inside)

    // contenido
    let content = yo`<div class="devboard-right-content"></div>`

    // FORMULARIO DE CONTRIBUCIONES -------
    let formTemplate = createTemplate.drawContribsForm(user)
    let form = formTemplate.form
    let counterTemplate = formTemplate.counter

    let mainForm = yo`
      <div class="contrib-create-form-wrapper devboard-right-content-items">
        <h2 class="devboard-form-title">
          NUEVA
        </h2>
        ${form}
        ${counterTemplate}
      </div>
    `

    // evento cuando se hace submit del formulario
    let createContrib = this.createContrib.bind(this)

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


      request
        .post('/api/contributions')
        .send(dataToSend)
        .end(function (err, res) {
          if (err) return communicator.addMessage({
            message:`La contribucion no se creo Error: ${err.message}.`,
            type: 'error',
            info: err
          })
          let newContrib = res.body
          // se crea un objeto contribución
          createContrib(newContrib, 'before')
          myForm.reset()
        })
    }

    // se agrega el formulario
    content.appendChild(mainForm)

    // se agregan todas las contribuciones
    this.buildContribList(user, content, contribs, (err) => {
      if (err) console.log(err)
      Single.addList(this.contribList)
      wrapper.appendChild(content)
    })

    // se agregan los elementos a la envoltura
    empty(this.right)
    this.right.appendChild(wrapper)
    this.inside.append(this.right)
  }

  createContrib (contrib, position) {
    this.contribList.push({
      id: contrib.publicId || contrib.id,
      contrib: new Single(contrib, this.user, position),
      position: position
    })
  }

  buildContribList (user, container, contribs, cb) {
    this.contribList = []
    for (let i = 0; i < contribs.length; i++) {
      let oneContrib = contribs[i]
      this.createContrib(oneContrib, 'after')
      // agrega los tags de la contribucion, al tablero de tags
      // en la parte superior

      this.addTagToBoard(oneContrib)
      // let renderedContrib = this.renderContrib(user, oneContrib)
      // container.appendChild(renderedContrib)
    }

    cb(null)
  }

  // extrae los tags, y los dibuja
  addTagToBoard(contrib) {
    let contribTags = contrib.tags

    contribTags.unshift('#all')

    for (let i = 0; i < contribTags.length; i++) {
      if (!this.tags.includes(contribTags[i])) {
        let tagToSend = contribTags[i].slice(1, contribTags[i].length);
        let tagTemplate = yo`
            <div title="${tagToSend}" class="contrib-tag ${tagToSend==='all'? 'contrib-tag-all': ''}">
              ${tagToSend==='all'? tagToSend: contribTags[i]}
            </div>
          `
        let $tagTemplate = $(tagTemplate)

        let getContribsByTag = this.getContribsByTag.bind(this)
        let getContribs = this.getContribs.bind(this)
        let buildRight = this.buildRight.bind(this)

        let user = this.user

        $tagTemplate.on('click', (e) => {
          let tag = e.target['title']
          let $container = $(e.target)
          if (tag === 'all') {
            getContribs(null, (err, res) => {
              if (err) return console.log({error: err})
              buildRight(user, res.contributions)
            })
          } else {
            getContribsByTag(tag, (err, contribs) => {
              if (err) return console.log({error: err})
              buildRight(user, _.uniqBy(contribs, 'publicId'))
            })
          }
        })

        this.tagBoard.appendChild(tagTemplate)
        this.tags.push(contribTags[i])
      }
    }
  }


  // TAGS
  // pide las contribuciones por tags
  getContribsByTag (tag, cb) {
    request
    .get(`/api/contributions/getbytag/${tag}`)
    .set('Accept', 'application/json')
    .end((err, res) => {
      if (err) return cb(err)
      cb(null, res.body)
    })
  }

  // get info
  getContribs (group, cb) {
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
}

module.exports = devBoard

// :clock: se edita una contribucion.

// 🍷 return button
// 💀 icons about contribution type
// 🍷 Titles ¿What are we going to do whit it?
// 🍷 hovers de users
// 🍷 se elimina una contribucion.
// 🍷 se pide una contribucion por tags.
// 🍷 get mow
// 🍷 set mow
// 🍷 se agrega un mensaje a la contribucion.
// 🍷 se elimina un mensaje a la contribucion.
// 🍷 realtime para mensajes.
// 🍷 se piden las contribuciones por id
// 🍷 se pide una contribucion por id
// 🍷 se lee si el usuario es dev
// 🍷 se agrega una respuesta de dev
