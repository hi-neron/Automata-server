'use strict'
const request = require('superagent')
const yo = require('yo-yo')
const _ = require('lodash')

let devBoardContainer = document.getElementById('devboard-container')

class devBoard {
  constructor (user, socket) {
    // construye una plantilla basica
    this.inside = yo`<div class="clearfix"></div>`
    devBoardContainer.append(this.inside)

    // se piden todas las contribuciones
    this.getcontribs(0, (err, contribs) => {
      if (err) console.log(`ha ocurrido un error:${err}`)
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
        this.buildRight(user, contribs)
      })
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
    let brand = yo`<div class="brandContainer">
      <div id="dev-logo">
        <img class='dev-logo-image' src="" alt="">
      </div>
        <h1 class="dev-logo-message">DEV BOARD</h1>
    </div>`

    // MAN OF THE MONTH
    // Simplemente un setter y getter
    // que puede comidficar el dev... el formulario solo apareceria
    // si se es dev
    if (user.admin) {
      console.log('Pendiente: crear un fromulario para dar el hombre del mes: MoM')
    }

    let title = MoM.genre === 'male' ? 'DON': 'MISS'

    let phrase = yo`
    <div class="genre">
      <span class="genre-message"></span>hombre del mes
    </div>`

    if (MoM.genre==='female') {
      phrase = yo`
      <div class="genre">
        <span class="genre-message-woman">mujer</span>
        <span class="genre-message-bad">hombre</span>
        del mes
      </div>`
    }

    let manOfMonth = yo`
    <div class="devBoard-item mom">
      <div class="image-container">
        <img src="" alt="">
      </div>
      ${phrase}
      <div class="mom-divisor">${title}</div>
      <div class="user-name">▴ ${MoM.username} ▴</div>
    </div>`

    // IN PROCESS CONTRIBUTIONS

    // se crea un listado de las contribuciones que estan en proceso

    let templateContribsInProcess = yo`<div class="contribs-in-process"></div>`

    for (let i = 0; i < contribsInProcess.length; i++) {
      let tags = yo`<div class="contribs-process"></div>`

      for (let x = 0; x < contribsInProcess[i].tags.length && x < 3; x++) {
        tags.appendChild(
          yo`
            <div class="contrib-inProcess-tag">
              <a href="#">${contribsInProcess[i].tags[x]}</a>
            </div>
          `
        )
      }

      templateContribsInProcess.appendChild( yo`
        <div class="contrib-in-process contrib">
          <div class="title">
            <a href="/${contribsInProcess[i].publicId}">
              ${contribsInProcess[i].title}
            </a>
          </div>
          <div class="data">
            ${tags}
          </div>
          <div class="author">
            <a href="${contribsInProcess[i].user.userId}" class="contrib-author">
              <span class="author">author</span>${contribsInProcess[i].user.username}
            </a>
          </div>
        </div>
      `)
    }

    let inProcess = yo`
    <div class="devBoard-item in-process">
      <h2 class="in-process-title">
        EN PROCESO
      </h2>
      <div class="in-process-alert">!</div>
      ${templateContribsInProcess}
    </div>
    `

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

    // tags
    let tags = yo`<div class="devboard-right-tags"></div>`

    // contenido
    let content = yo`<div class="devboard-right-content"></div>`

    // formulario de creacion de contribuciones
    let adminForm

    if (user.admin) {
      adminForm = yo`
      `
    }

    let mainForm = yo`
      <div class="contrib-create-form-wrapper devboard-right-content-items">
        <h2 class="devboard-form-title">
          NEW
        </h2>
        <form enctype="multipart/form-data" class="contrib-create-form" onsubmit=${this.submitContrib}>
          <div class="type-contrib-form radio">
            <input type="radio" name="type" id="type-contrib-message-form">
            <label for="message"> MENSAJE </label>

            <input type="radio" name="type" id="type-contrib-idea-form">
            <label for="idea"> IDEA </label>

            <input type="radio" name="type" id="type-contrib-bug-form">
            <label for="bug"> BUG </label>
          </div>
          <div class="title-contrib-form">
              <input type="text" placeholder="titulo" name="title"/>
          </div>
          <div class="comment-contrib-form">
              <textarea placeholder="titulo" id="comment-contrib-textarea-form"/>
          </div>
          <div class="submit-contrib-form">
            <button type="submit" action="#">
              <div class="submit-contrib">listo</div>
            </button>
          </div>
        </form>
      </div>
    `

    // todas las contribuciones que aparecen en
    // la direccion de la api getTenContribs
    // se genera un formulario para crear una nueva contribucion
    // se pide una contribucion por id
    // se pide una contribucion por titulo
    // se edita una contribucion
    // se lee si el usuario es dev
    // se agrega una respuesta de dev
    // se elimina una contribucion
    // se agrega un mensaje a la contribucion
    // se elimina un mensaje a la contribucion
    content.appendChild(mainForm)

    // se agregan los elementos a la envoltura
    wrapper.appendChild(tags)
    wrapper.appendChild(content)

    right.appendChild(wrapper)
    this.inside.append(right)
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
          console.log('getContribs')
          cb(null, res.body)
        })
  }
  submitContrib () {

  }
}

module.exports = devBoard