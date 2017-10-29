'use strict'

const yo = require('yo-yo')
const request = require('superagent')
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
        ${username}
      </span>
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


    let time = this.time

    console.log(this.username)

    this.counterTime = null

    let startCounterTime = this.startCounterTime.bind(this)

    template.onmouseover = function () {
      time = startCounterTime()
    }

    template.onmouseout = function () {
      clearInterval(time)
      console.log('terminado')
    }
  }

  // start the counter
  startCounterTime() {
    let time = 0
    let createTooltip = this.createTooltip.bind(this)
    let counterTime = setInterval(()=>{
      console.log(time)
      if (time => 10) {
        createTooltip()
        clearInterval(counterTime)
      }
      time =+ 1
    }, 1000)
    return counterTime
  }

  // se crea el tooltip
  createTooltip () {
    let renderTooltip = this.renderTooltip.bind(this)
    this.getUserInfo((err, res) => {
      if (err) return console.log('un error a controlar en userTooltips linea 71')
      renderTooltip(res)
    })
  }

  renderTooltip(userToDraw) {
    let user = this.user
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

  get() {
    return this.content
  }
}


module.exports = Tooltips