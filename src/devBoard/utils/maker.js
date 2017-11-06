const yo = require('yo-yo')
const d3 = require('d3')
const $ = require('jquery')
const Tooltips = require('./../../utils/userTooltips')

function drawRateName (left, item, right, user) {
  let itemWithTooltip = item ? new Tooltips(item, user).get(): ''

  let conectorLeft = yo`<span class="conector">${left || ''}</span>`
  let conectorRight = yo`<span class="conector">${right || ''}</span>`
  let itemToDraw = yo`<span class="name">${itemWithTooltip}</span>`


  return yo`
  <span class="one-contrib-likes-container-item">
    ${left ? conectorLeft: ''}
    ${item ? itemToDraw: ''}
    ${right ? conectorRight: ''}
  </span>
  `
}

module.exports = {
  drawManOfMonth: (moM, Tooltips, user) => {
    // se construye la template donde ira el hombre/mujer del mes
    let title = moM.genre === 'male' ? 'DON': 'MISS'
    let phrase = yo`

    <div class="genre">
      <span class="genre-message"></span>hombre del mes
    </div>`

    if (moM.genre==='female') {
      phrase = yo`
      <div class="genre">
        <span class="genre-message-woman">mujer</span>
        <span class="genre-message-bad">hombre</span>
        del mes
      </div>`
    }

    console.log(user, moM)

    let userTooltip = new Tooltips (moM.username, user)

    let manOfMonth = yo`
    <div class="mom">
      <div class="image-container">
        <img src="" alt="">
      </div>
      ${phrase}
      <div class="mom-divisor">${title}</div>
      <div class="user-name">${userTooltip.get()}</div>
    </div>`

    return manOfMonth
  },

  drawInProcess: (contribsInProcess) => {
    // se dibuja el template donde iran las contribuciones en estado de desarrollo
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

    return yo`
    <div class="devBoard-item in-process">
      <h2 class="in-process-title">
        EN PROCESO
      </h2>
      <div class="in-process-alert">!</div>
      ${templateContribsInProcess}
    </div>
    `
  },

  drawContribsForm: (user) => {
    let adminForm

    if (user.admin) {
      adminForm = yo`
      `
    }

    let limit = 240
    let counterTemplate = yo`
      <div id="contrib-create-form-counter">
        ${limit}
      </div>
    `
    let containerTextarea = yo`
      <textarea placeholder="Escribe mensaje aqui" name="info" id="comment-contrib-textarea-form" maxlength="${limit}"></textarea>
    `
    containerTextarea.onkeyup = function () {
      let result = limit - this.value.length

      if (result <= 15) {
        counterTemplate.classList.add('red-text-counter')
      } else {
        counterTemplate.classList.remove('red-text-counter')
      }

      counterTemplate.innerHTML = result
    }

    let form = yo`
        <form id="contrib-create-form">
          <div class="type-contrib-form">
            <div class="type-contrib-aporte-form">
              <input type="radio" name="type" value="contribution" id="type-contrib-contribution-form" checked="checked">
              <span for="aporte">APORTE</span>
            </div>
            <div class="type-contrib-message-form">
              <input type="radio" name="type" value="message" id="type-contrib-message-form">
              <span for="message">MENSAJE</span>
            </div>
            <div class="type-contrib-advert-form">
              <input type="radio" name="type" value="advertise" id="type-contrib-advert-form" title="advert">
              <span for="advert">ANUNCIO</span>
            </div>
            <div class="type-contrib-bug-form">
              <input type="radio" name="type" value="bug" id="type-contrib-bug-form" title="bug">
              <span for="bug">BUG!</span>
            </div>
          </div>
          <div class="title-contrib-form">
              <input type="text" placeholder="titulo" name="title" autocomplete="off" maxlength="140"/>
          </div>
          <div class="comment-contrib-form">
              ${containerTextarea}
          </div>
          <div class="submit-contrib-form">
            <button type="submit">
              <div class="submit-contrib">listo</div>
            </button>
          </div>
        </form>
    `
    return {
      form: form,
      counter: counterTemplate
    }
  },

  drawLikesDevil: () => {
    return yo`
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
    `
  },

  drawDate: (contribDate) => {
    let date = new Date(contribDate)

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

    return dateString
  },

  drawDevForm: () => {
    return yo`
      <div class="one-contrib-dev-res-form">
      <form class="one-contrib-dev-form">
        <div class="one-contrib-dev-textarea-container">
          <textarea name="message" placeholder="Puedes escribir algo aquí, ¿o no?" class="one-contrib-dev-textarea" maxlength="140"></textarea>
        </div>
        <div class="one-contrib-dev-buttons">
          <button class="one-contrib-dev-input-true button" value="true">
          </button>
          <button class="one-contrib-dev-input-false button" value="false">
          </button>
        </div>
      </form>
    </div>
    `
  },

  renderRate: (rate, username, Tooltips, myUser) => {
    let users = rate.length

    if (users > 0){
      let rateTemplate = yo`<div class="one-contrib-likes-container-names-list"></div>`
      let item, itemToDraw
      let user = false
      let guion = ','

      function removeItemMe(arr, i) {
        if ( i !== -1 ) {
            arr.splice( i, 1 );
        }
        return arr
      }

      let index = rate.indexOf(username)

      if (index != -1) {
        if (users === 2) {
          itemToDraw = drawRateName('Sumercé', null, null, myUser)
        } else {
          itemToDraw = users > 1 ? drawRateName('Sumercé,', null, null, myUser) : drawRateName('Sumercé', null, null, myUser)
        }
        rateTemplate.prepend(itemToDraw)
        rate = removeItemMe(rate, index)
        user = true
      }
      let counter = 0

      for (let i = 0; i < rate.length; i++) {
        item = rate[i]
        let limit = 4
        if (i < limit) {
          if (rate.length === 1){
            itemToDraw = user ? drawRateName(' y ', item, null, myUser): drawRateName(null, item, null, myUser)
          } else {
            if (i === 0) {
              itemToDraw = drawRateName(null, item, null, myUser)
            } else {
              itemToDraw = i === rate.length - 1 && i < limit? drawRateName(' y ', item, null, myUser) : drawRateName(guion, item, null, myUser)
            }
          }
          rateTemplate.appendChild(itemToDraw)
        } else {
          counter++
        }
      }
      if (counter > 0) {
        let q = counter === 1? 'uno mas': `${counter} mas`
        let counterContainer = yo`<span class="counter-plus">y ${q}</span>`
        rateTemplate.appendChild(counterContainer)
      }

      let finalRes = users > 1 ? ' apoyan estó': 'apoyá estó'
      let finalMessage = yo`<span class="counter-plus">${finalRes}</span>`
      rateTemplate.appendChild(finalMessage)

      return rateTemplate
    }
    return null
  },

  getTrash: () => {
    let xmlns="http://www.w3.org/2000/svg"
    let xmlns_xlink = "http://www.w3.org/1999/xlink"

    let trash = yo`
      <svg viewBox="0 -75 414.19 530">
        <defs>
          <style>
          .trash-cls-1 {
            fill:#222;
          }
          .trash-cls-2 {
            fill: #222;
          }
          .trash-cls-3 {
            fill:#222;
          }
          </style>
        </defs>
        <title>trash</title>
        <path class="trash-cls-1 trash-body-hover" d="M40.26,126.2V480H373.93V126.2H40.26Zm86.25,284H93.15V183.74h33.37V410.21Zm97.27,0H190.41V183.74h33.37V410.21Zm97.26,0H287.67V183.74H321V410.21Z"/>
        <path class="trash-cls-3 trash-body" d="M40.26,126.2V480H373.93V126.2H40.26Zm86.25,284H93.15V183.74h33.37V410.21Zm97.27,0H190.41V183.74h33.37V410.21Zm97.26,0H287.67V183.74H321V410.21Z"/>
        <path class="trash-cls-2 trash-cap" d="M292.79,77.09V0H114.56V77.09H0v54H414.19v-54H292.79Zm-37.88,0H152.45V34.65H254.91V77.09Z"/>
      </svg>
    `

    let okAccept = yo`
      <div class="accept">
        <i class="fa fa-check"></i>
      </div>
    `

    let confirm = yo`
      <div class="confirmation">
        ${okAccept}
      </div>
    `
    let d3trash = d3.select(trash)

    d3trash
    .attr("xmlns", xmlns)
    .attr("xmlns:xlink", xmlns_xlink)

    trash.classList.add('focused-trash')

    let $trash = $(trash)
    let $confirm = $(confirm)
    
    // oculta el dialogo de eliminar imagen cuando se da click afuera
    $trash.blur(function(){
      setTimeout(function() {
        $confirm.removeClass('appear-confirm')
      }, 100);
    })

    $trash.click(function(){
      $confirm.toggleClass('appear-confirm')
    })

    return yo`
      <div class="one-contrib-messages-single-delete-container">
        ${trash}
        ${confirm}
      </div>
    `
  }
}
