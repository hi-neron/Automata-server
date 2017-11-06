'use strict'

const yo = require('yo-yo')
const request = require('superagent')
const empty = require('empty-element')
const Draggable = require('draggable')

const tooltipsContainer = document.getElementById('tooltips-container')

const laBete = {
  avatar: '/img/default-bete.png',
  badges: 'all',
  masteries: 'Les mains de la bête',
  level: 'all',
  username: 'La Bête',
  title: 'le bête',
  byAdmin: 'Chuck Norris',
  dateAdded: 0,
  genre: 'male'
}


class Tooltips {
  constructor (username, user) {
    let template = yo`
      <span title="${username}" class="user-name-tooltip">
      <span class="username">${username}</span></span>
    `
    if (username == 'La Bête') {
      this.username = laBete.username
    } else {
      this.username = username
    }

    this.user = user
    this.content = template
    this.time = 0
    this.info = null
    this.tooltip = null
    this.running = false

    let running = this.running
    let time = this.time
    this.counter = 0


    this.counterTime = null

    let content = this.content
    
    let drawTooltip = this.drawTooltip.bind(this)

    template.onclick = function (ev) {
      if (!running) {
        let pos = {
          x: ev.clientX,
          y: ev.clientY
        }
        time = drawTooltip(pos)
      }
    }
  }

  drawTooltip(pos) {
    let time = this.counter
    let createTooltip = this.createTooltip.bind(this)
    createTooltip(pos)

  }

  // se crea el tooltip
  createTooltip (pos) {
    let renderTooltip = this.renderTooltip.bind(this)
    this.getUserInfo((err, res) => {
      if (err) return console.log('un error a controlar en userTooltips linea 71')
      renderTooltip(res, pos)
    })
  }

  // dibuja el tooltip
  renderTooltip(userToDraw, pos) {
    let user = this.user

    // estas maestrias deben ser remplazadas, solo para prueba
    let masteries = ['Illustrator', 'Designer']

    let masteriesTemplate = yo`
      <div class="user-tooltip-masteries"></div>
    `
    let singleMastery

    for(let i = 0; i <= masteries.length; i++) {
      singleMastery = yo`
        <div class="user-tooltip-masteries-single">
          ${masteries[i]}
        </div>
      `
      masteriesTemplate.appendChild(singleMastery)
    }

    let adminButton = yo`
      <div class="user-tooltip-mom">
        <span>set<br>mom</span>
      </div>
    `
    let setUserMom = this.setUserMom.bind(this)
    let getOrnaments = this.getOrnaments.bind(this)

    adminButton.onclick = function (ev) {
      setUserMom((err, res) => {
        if (err) return console.log(err)
        console.log(res.message)
      })
    }

    let closeTooltip = yo`
      <div class="user-tooltip-close">
      </div>
    `
    let template = yo`
      <div class="user-tooltip-container" title="${userToDraw.username}" draggable="true">
        ${getOrnaments(userToDraw.title)}
        ${user.admin ? adminButton : ''}
        ${closeTooltip}
        <div class="user-tooltip-board">
          <div class="user-tooltip-rainbow"></div>
          <div class="user-tooltip-header">
            <div class="user-tooltip-image">
              <img src="${userToDraw.avatar}" alt="">
            </div>
            <div class="user-tooltip-username">
              ${userToDraw.username}
            </div>
          </div>
          <div class="user-tooltip-title">${userToDraw.title || 'cuernito'}</div>
          ${masteriesTemplate}
          <div class="user-tooltip-footer">
            <div class="user-tooltip-points">${userToDraw.points}</div>
            <div class="user-tooltip-lvls">${userToDraw.level}</div>
            <div class="user-tooltip-images">${userToDraw.images}</div>
          </div>
        </div>
      </div>
    `
    let content = template

    let options = {
      setCursor: 'url(/img/devil-hand.png)'
    }

    new Draggable(content, options)

    closeTooltip.onclick = function (ev) {
      let toDelete = content
      tooltipsContainer.removeChild(toDelete)
    }

    let randomDeg = (Math.random() * 6) - 3
    template.style.transform = `rotateZ(${randomDeg}deg) translate(-50%, -50%)`
    template.style.position = 'fixed'
    template.style.zIndex = '2'
    template.style.top = `${pos.y}px`
    template.style.left = `${pos.x}px`
    console.log(userToDraw)
    console.log(pos.x, pos.y)
    console.log(template)
    this.tooltip = template

    this.deleteParrotedChilds(userToDraw.username, () => {
      tooltipsContainer.appendChild(this.tooltip)
    })
  }

  deleteParrotedChilds(username, cb) {
    let repeated = tooltipsContainer.querySelectorAll(`.user-tooltip-container[title=${username}]`)
    if (repeated.length > 0) {
      tooltipsContainer.removeChild(repeated[0])
    }
    cb()
  }

  getUserInfo(cb) {
    if (this.username === 'La Bête') return cb(null, laBete)
    if (this.info) {
      cb(null, this.info)
      console.log('hay')
    } else {
      console.log('no hay')
      request
      .get(`/api/users/${this.username}`)
      .set('Accept', 'application/json')
      .end((err, res) => {
        if (err) {
          return cb(err)
        }
        this.info = res.body
        cb(null, res.body)
      })
    }
  }

  getOrnaments(title){
    let template, badgeName

    switch (title) {
      case 'Dev ⛑':
        badgeName = 'horndev'
        template = yo`
        <div class="user-tooltip-badges-plain">
          <img src="/img/${badgeName}.png" alt="left">
          <img src="/img/${badgeName}.png" alt="right">
        </div>
        `
        break;
      default:
        badgeName = 'horn0'
        template = yo`
          <div class="user-tooltip-badges-origami">
            <img src="/img/${badgeName}.png" alt="left">
            <img src="/img/${badgeName}.png" alt="right">
          </div>
        `
    }
    return template
  }

  setUserMom(cb) {
    request
    .get(`/api/contributions/setmom/${this.username}`)
    .set('Accept', 'application/json')
    .end((err, res) => {
      if (err) {
        return cb(err)
      }
      cb(null, res.body)
    })
  }

  get() {
    return this.content
  }
}


module.exports = Tooltips