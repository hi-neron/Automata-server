'use strict'

const yo = require('yo-yo')

class ActivityBoard {
  constructor () {
    let listContainer = yo`<div id="list-container"></div>`
    let domContainer = document.getElementById('actions-container')
    domContainer.appendChild(listContainer)

    this.container = listContainer
  }

  addMessage (data) {
    let style
    switch (data.type) {
      case 'newMom':
        style = 'single-message styl-mom'
        break;
      case 'error':
        style = 'single-message styl-error'
        break;
      case 'delete':
        style = 'single-message styl-delete'
        break;
      default:
        style = 'single-message styl-normal'
    }

    let template = yo`
      <div class="${style}">${data.message}</div>
    `

    let removeChild = this.removeChild.bind(this)

    this.container.appendChild(template)
    console.log(data.info)
    this.drawMessage(template, (err, toDelete) => {
      removeChild(toDelete)
    })
  }

  removeChild (toDelete) {
    this.container.removeChild(toDelete)
  }

  drawMessage (toDelete, cb) {
    let container = this.container

    setTimeout(function() {
      cb(null, toDelete)
    }, 2000);
  }

  setSocket(socket) {
    this.socket = socket
  }
}

let currentBoard = new ActivityBoard()

module.exports = currentBoard