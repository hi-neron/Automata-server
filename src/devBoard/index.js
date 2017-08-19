'use strict'
const request = require('superagent')
const yo = require('yo-yo')
const _ = require('lodash')
const $ = require('jquery')
const templateMaker =  require('./utils/maker')

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

    devBoardContainer.append(this.inside)

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
    let brand = templateMaker.drawBrand()

    // MAN OF THE MONTH
    // Simplemente un setter y getter
    // que puede comidficar el dev... el formulario solo apareceria
    // si se es dev
    if (user.admin) {
      console.log('Pendiente: crear un fromulario para dar el hombre del mes: MoM')
    }

    let manOfMonth = templateMaker.drawManOfMonth(MoM)

    // IN PROCESS CONTRIBUTIONS
    // se crea un listado de las contribuciones que estan en proceso
    let inProcess = templateMaker.drawInProcess(contribsInProcess)

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
    let form = templateMaker.drawContribsForm(user).form
    let counterTemplate = templateMaker.drawContribsForm(user).counterTemplate

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
        })
    }

    // se agrega el formulario
    content.appendChild(mainForm)

    let $content = $(content)

    $content.on('click', '.one-contrib-container .one-contrib-wrapper .one-contrib-content .one-contrib-likes .one-contrib-likes-container-button-arrow', (ev) => {
      let $masIcon = $(ev.currentTarget)
      console.log($masIcon)
      let $this = $masIcon.closest('.one-contrib-container')

      let $containerToMove =  $this.find('.one-contrib-content')
      let $back =  $this.find('.one-contrib-content-back')
      let $eyes =  $back.find('.one-contrib-content-back-eyes')

      let myHeightToSave = $this.height()

      let width = $containerToMove.width()
      let height = $containerToMove.height()

      let $ecran = $(ecran)
      $ecran.toggleClass('ecran-display')
      $back.toggleClass('back-display')

      $("<style/>", {text: `.get-devboard-contrib {
        position: fixed !important;
        left: 50% !important;
        top: 40% !important;
        margin-left: -${width / 2}px;
        margin-top: -${height / 2}px;
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

  // obtiene
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
    let date = new Date(contrib.dateAdded)

    this.addTagToBoard(contrib)

    let month
    switch (date.getMonth()) {
      case 0:
        month = 'enero'
        break;
      case 1:
        month = 'febrero'
        break;
      case 2:
        month = 'marzo'
        break;
      case 3:
        month = 'abril'
        break;
      case 4:
        month = 'mayo'
        break;
      case 5:
        month = 'junio'
        break;
      case 6:
        month = 'julio'
        break;
      case 7:
        month = 'agosto'
        break;
      case 8:
        month = 'septiembre'
        break;
      case 9:
        month = 'octubre'
        break;
      case 10:
        month = 'noviembre'
        break;
      case 11:
        month = 'diciembre'
        break;
    }

    let myHour = date.getHours()

    let newHour =  myHour < 12 ? myHour: myHour - 12
    let meridian = myHour < 12 ? 'am': 'pm'

    let dateString = yo`<span class="date">${month} ${date.getDate()}, ${date.getFullYear()} / ${newHour} ${meridian}</span>`

    let containerMessage = yo`
    <textarea name="message" class="message-onecontrib-textarea-form" maxlength="140"></textarea>
    `
    let messagesForm = yo`
      <form action="">
          <div class="comment-contrib-form">
              ${containerMessage}
          </div>
          <div class="submit-onecontrib-messages-form">
            <button type="submit">
              <div class="submit-onecontrib">añadir</div>
            </button>
          </div>
      </form>`

      let contribTemplate = yo`
      <div class="one-contrib-container devboard-right-content-items grid-item">
        <div class="one-contrib-wrapper">
          <div class="one-contrib-content-back">
            <div class="one-contrib-content-back-eyes">
              <div class="one-contrib-content-back-eyes-pupil"></div>
            </div>
          </div>
          <div class="one-contrib-content">
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
                <div class="one-contrib-likes-container-button">
                  <div class="demon-body">
                    <div class="demon-head">
                    <div class="demon-ears"></div>
                    <div class="demon-horn"></div>
                    <div class="demon-tongue"></div>
                    <div class="demon-face">
                      <div class="demon-plus1">1</div>
                    </div>
                    </div>
                  </div>
                </div>
                <div class="one-contrib-likes-container-names"></div>
              </div>
            </div>
            <div class="one-contrib-hidden-content">
              <div class="one-contrib-messages">
                <div class="one-contrib-messages-form">
                  ${messagesForm}
                </div>
              </div>

              <div class="one-contrib-messages">
                <div class="one-contrib-messages-form">
                  ${messagesForm}
                </div>
              </div>
              <div class="one-contrib-dev-reply">
              </div>
            </div>
          </div>
        </div>
      </div>
    `
    messagesForm.onsubmit = (ev) => {
      ev.preventDefault()
    }

    return contribTemplate
  }

  // obtiene los tags de las contribuciones
  getTags () {}

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

// se pide una contribucion por id
// se pide una contribucion por titulo
// se edita una contribucion
// se lee si el usuario es dev
// se agrega una respuesta de dev
// se elimina una contribucion
// se agrega un mensaje a la contribucion
// se elimina un mensaje a la contribucion
