const yo = require('yo-yo')
const request = require('superagent')
const empty = require('empty-element')

// constructor de templates
let templates = require('./maker')


// Constructor de tootips
const Tooltips = require('./../../utils/userTooltips')
const communicator = require('./../../utils/activityCommunicator')

class SingleMessage {
  constructor (data, contribId, my) {
    this.message = data.content.userMessage
    this.date = data.date
    this.messageId = data.id
    this.user = data.user
    this.my = my
    this.deleted = false

    // ID contribucion
    this.contribId = contribId

    // Content
    this.content = this.createTemplate()


    // Main
    this.main = yo`
      <div class="bar-item-messages-single" messageId="${this.messageId}">
      </div>
    `

    //deleted template
    let tooltipName = new Tooltips(this.user.username, this.my)

    this.deleteTemplate = yo`
      <div class="delete-message-template">
        <span class="delete-message-template-username">
          ${tooltipName.get()}
        </span>
        ha eliminado el comentario ...
      </div>
    `

    this.mainTemplate = this.main.appendChild(this.content)
  }

  createTemplate () {
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

    let ifMy = this.user.username === this.my.username? 'message-my': ''
    let message = yo`
      <span class="bar-item-messages-single-message">
      </span>
    `

    // Queda a la escucha de una eliminacion del mensaje! XD
    let deleteMessageContrib = this.deleteMessageContrib.bind(this)

    ok.onclick = (ev) => {
      ev.preventDefault()
      // let $head = $(ev.target).closest('.bar-item-content')
      // let $message = $(ev.target).closest('.bar-item-messages-single')

      let messageId = this.messageId
      deleteMessageContrib((err, res) => {
        if (err) return communicator.addMessage({
          message:`El mensaje no fue eliminado. Error: ${err.message}.`,
          type: 'error'
        })

        console.log(res)
      })
    }

    // let $message = $(message)
    // $message.html(data.content.userMessage)

    return yo`
      <div class="bar-item-messages-wrapper ${ifMy}">
        <div class="bar-item-messages-single-left">
          <div class="bar-item-messages-single-avatar-container">
            <img src="${this.user.image}" alt="${this.user.username}">
          </div>
        </div>
        <div class="bar-item-messages-single-right">
          ${this.user.username === this.my.username ? deleteMessage: ''}
          <p class="bar-item-messages-single-content">
            <span class="bar-item-messages-single-userName">
              ${this.user.username}
            </span>
            <span class="bar-item-messages-single-message">
              ${this.message}
            </span>
          </p>
          <p class="bar-item-messages-single-date">${templates.drawDate(this.date)}</p>
        </div>
      </div>
    `
  }

  remove(){
    console.log(this.messageId, 'removed')
    this.deleted = true
    empty(this.mainTemplate).appendChild(this.deleteTemplate)
  }
  // elimina un mensaje en una contribucion
  deleteMessageContrib(cb){
    request
    .get(`/api/contributions/delmessage/${this.contribId}/${this.messageId}`)
    .set('Accept', 'application/json')
    .end((err, res) => {
      if (err) {
        return cb(err)
      }
      cb(null, res.body)
    })
  }

  getTemplate () {
    return this.mainTemplate
  }
}

module.exports = SingleMessage