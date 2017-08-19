const yo = require('yo-yo')

module.exports = {
  drawBrand: () => {
    // se construye la template donde ira el logo
    return yo`
    <div class="brandContainer">
    <div id="dev-logo">
    <img class='dev-logo-image' src="" alt="">
    </div>
    <h1 class="dev-logo-message">DEV BOARD</h1>
    </div>`
  },

  drawManOfMonth: (MoM) => {
    // se construye la template donde ira el hombre/mujer del mes
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
      <div class="user-name"><span>${MoM.username}</span></div>
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
      counterTemplate: counterTemplate
    }
  }

}