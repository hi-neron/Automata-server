const yo = require('yo-yo')
const container = document.getElementById('container')
const $ = require('jquery')
const request = require('superagent')

const appendTo = document.getElementById('game-container')
const singleContainer = document.getElementById('single-card')
const $scrollBars = $('<div></div>')
const $grid = $('<div></div>')
const $appendTo = $(appendTo)
const _ = require('lodash')
const empty = require('empty-element')

const $singleContainer = $(singleContainer)
// card faces
let frontCard = require('./faces/front')
let backCard = require('./faces/back')

let imageTemplate = require('./imageTemplate')
let skillTemplate = require('./skillTemplate')

$scrollBars.addClass('game-scrollbars')
$grid.addClass('game-grid')

$scrollBars.append($grid)
$appendTo.append($scrollBars)

let $sight

let skillTimeLine = new TimelineMax({paused: true})
let singleImageTL = new TimelineMax({paused: true})
let nextTl = new TimelineLite({onComplete: () => {
  singleImageTL.clear()
  nextTl.clear()
  $singleContainer.empty()
}})

skillTimeLine.eventCallback('onReverseComplete', function () {
  skillTimeLine.clear()
})

// activa las habilidades
$grid.on('click', '.skills-list-container', (e) => {
  e.preventDefault()
  let $this = $(e.currentTarget).find('.skills-list')
  let $particlesLeft = $this.find('.skill-particles[name=left]')
  let $particlesRight = $this.find('.skill-particles[name=right]')
  let $singleSkills = $this.find('.skills-single')

  if (skillTimeLine.time() <= 0) {
    skillTimeLine.to($this, 0.01, {
      opacity: 1,
      ease: Power2.easeOut,
    })
    .to($this, 0.2, {
      // marginTop: -50,
      height: 2,
      width: 180,
      marginLeft: -90,
      ease: Power2.easeOut
    })
    .to($this, 0.2, {
      marginTop: -90,
      height: 180,
      ease: Elastic.easeOut.config(1.75, 0.75)
    }, '-=0.05')
    .to($particlesLeft, 0.05, {
      width: 20,
      marginLeft: '0px',
      ease: Power2.easeIn
    }, '-=0.15')
    .to($particlesLeft, 0.15, {
      width: 0,
      marginLeft: '-40px',
      ease: Power2.easeOut
    }, '-=0.1')
    .to($particlesRight, 0.05, {
      width: 20,
      marginLeft: '-10px',
      ease: Power2.easeIn
    }, '-=0.25')
    .to($particlesRight, 0.05, {
      width: 0,
      marginLeft: '40px',
      ease: Power2.easeOut
    }, '-=0.1')
    .staggerTo($singleSkills, 0.05, {
      ease: Power2.easeOut,
    }, '-=0.1')
    .staggerTo($singleSkills, 0.15, {
      rotationX: "0deg",
      ease: Elastic.easeOut.config(2.75, 1.75),
    }, 0.1)


    skillTimeLine.play()
  }


})

// devuelve la animacion de las habilidades
$grid.on('mouseleave', '.skills-list-container', (e) => {
  e.preventDefault()
  // skillTimeLine.clear()
  skillTimeLine.reverse()
})

// envia al servidor una peticion para agregar awards, tambien los elimina
$grid.on('click', '.corpose-container .corpose-hover .body .award-container', (e) => {
  let _this = e.currentTarget
  let $this = $(_this)
  let id = $this.closest('.corpose-body').attr('public')

  let type = $this.attr('type')

  request
    .get(`/api/images/awards/${type}/${id}`)
    .set('Accept', 'application/json')
    .end((err, res) => {
      console.log(res.body)
      if (res.body.error) {
        return console.log(res.body.error)
      }

      let newData = res.body.awards
      let $body = $this.closest('.body')

      $body.find('.amazing').text(newData['amazing'])
      $body.find('.bastard').text(newData['bastard'])
      $body.find('.takeMyMoney').text(newData['takeMyMoney'])

      let sponsors = res.body.sponsors

      tooltipForPeople($body, sponsors)
    })
})

// Muestra el tooltip: personas que han agregado un award.
$grid.on('mouseover', '.corpose-container .corpose-hover .body', (e) => {
  let _this = e.currentTarget
  let $this = $(_this)
  let $tooltip = $this.closest('.corpose-body').attr('public')

})

// muestra y actualiza el hover, hace una peticion al servidor para pedir datos de la imagen
$grid.on('mouseover', '.corpose-container .corpose-hover', (e) => {
  let _this = e.currentTarget

  let $this = $(_this)
  let id = $this.closest('.corpose-body').attr('public')

  let $amazing = $this.find('.amazing')
  let $bastard = $this.find('.bastard')
  let $takeMyMoney = $this.find('.takeMyMoney')

  if(!_this.getAttribute('downloaded')){
    request
      .get(`/api/images/${id}`)
      .set('Accept', 'application/json')
      .end((err, res) => {
        if (err) {
          console.log(err)
        }

        let image = res.body


        $amazing.fadeOut(100, function () {
          $(this).text(`${image.awards['amazing']}`).fadeIn(200)
        })

        $bastard.fadeOut(100, function () {
          $(this).text(`${image.awards['bastard']}`).fadeIn(200)
        })

        $takeMyMoney.fadeOut(100, function () {
          $(this).text(`${image.awards['takeMyMoney']}`).fadeIn(200)
        })

        let $body = $this.find('.body')
        let sponsors = res.body.sponsors

        tooltipForPeople($body, sponsors)

      })

    setTimeout(() => {
      _this.removeAttribute('downloaded', false)
    }, 15000);
  }
  _this.setAttribute('downloaded', true)

})

// despliega la tarjeta.
$grid.on('click', '.corpose-container .corpose-hover .header', (e) => {
  let _this = e.currentTarget
  let $this = $(_this)
  let id = $this.closest('.corpose-body').attr('public')

  // contenedores de la carta
  let $body = $('<div class="body-single-card"></div>')
  let $back = $('<div></div>')
  let $front = $('<div></div>')

  request
      .get(`/api/images/${id}`)
      .set('Accept', 'application/json')
      .end((err, res) => {
        if (err) {
          console.log(err)
        }

        let image = res.body
        let emptySpace = 250;
        let ratio, cardHeight, cardWidth

        let windowH = window.innerHeight
        let windowW = window.innerWidth

        let cardHeightFixed = 480
        let cardWidthFixed = 340

        ratio = (cardWidthFixed * 100) / cardHeightFixed

        cardHeight = windowH - emptySpace;
        cardWidth = cardHeight * (ratio * 0.01)

        if (windowH < 700 || windowW < 500) {
          cardHeight = 480
          cardWidth = 340
        }

        TweenMax.set($singleContainer, {css: {
          transformStyle: 'preserve-3d',
          perspectiveOrigin: '50% 50% 0px',
          visibility: 'hidden'
        }})

        TweenMax.set($body, {css: {
          perspective: 800,
          perspectiveOrigin: '50% 50% 0px',
          transformStyle: 'preserve-3d',
          width: cardWidth,
          height: cardHeight,
          position: 'absolute',
          z:0,
          top: '50%',
          left: '50%',
          marginLeft: (cardWidth / 2) - cardWidth + 'px',
          marginTop: (cardHeight / 2) - cardHeight + 'px',
          borderRadius: '2px',
          boxShadow: '0 0 4px rgba(0, 0, 0, 0.5), 0 0 0 1px rgba(0, 0, 0, 0.2),'
        }})

        TweenMax.set($back, {css:{
          backgroundColor: '#ededed',
        }})

        TweenMax.set($front, {css:{
          backgroundColor: '#ededed',
          rotationX: -180
        }})

        TweenMax.set([$back, $front], {css: {
          borderRadius: '5px',
          width: cardWidth,
          height: cardHeight,
          backfaceVisibility: 'hidden',
          position:'absolute'
        }})

        $back.empty().append(backCard())
        $front.empty().append(frontCard(image))

        $body.append($front)
        $body.append($back)

        $singleContainer.append($body)

        singleImageTL.to($singleContainer, 0.01, {
          css: {
            visibility: 'visible',
          }
        }).to($singleContainer, 0.5, {
          css: {
            width: windowW + 'px',
            height: windowH + 'px'
          },
          ease: Power2.easeOut
        }).to($singleContainer, 0.4, {
          css: {
            width: windowW + 'px',
            height: windowH + 'px'
          },
          ease: Power2.easeOut
        }).to($body, 0.3, {
          transformOrigin: "0 70%"
        }, '+=0.5').to($body, 0.3, {
          css: {
            rotationX: '-=90',
            z: 1000
          },
          transformOrigin: "0 50%",
          ease: Power4.easeOut
        }, '-=0.1').to($body, 0.7, {
          css: {
            rotationX: '-=90',
            z: 0
          },
          transformOrigin: "0 10%",
          ease: Bounce.easeOut
        }, '-=0.1').to($body, 0.4, {
          y: '-45%',
          ease: Power2.easeIn
        }, '-=0.9').to($body, 0.5, {
          y: '-=5',
          css: {
            rotationZ: '-=2'
          },
          ease: Bounce.easeOut,
        }, '-=0.5').to($body, 0.2, {
          css: {
            rotationZ: '+=2'
          },
          ease: Power4.easeIn
        }, '+=0.7').pause()

        if (singleImageTL.time() <= 0) {
          singleImageTL.play()
        }
      })

})

$singleContainer.on('click', '.body-single-card .front-card .close-single-card', (e) => {
  let $this = $(e.currentTarget)
  let $card = $this.closest('.body-single-card')

  nextTl.to($singleContainer, 0.4, {
    css: {
      width: '1px',
      height: '1px',
    },
    ease: Power1.easeOut
  }, '-=0.3').to($singleContainer, 0.01, {
    css: {
      visibility: 'hidden'
    },
    ease: Power4.easeIn
  })

  singleImageTL.append(nextTl)
})


function tooltipForPeople ($body, sponsors) {

  let $tooltip = $body.find('.tooltip-people')
  let firstUser = _.find(sponsors, {'sponsorId': userId})
  let others = _.reject(sponsors, {'sponsorId': userId})

  let firstUserTemplate = ''
  let othersTemplate = ''
  let numTemplate = ''

  let othersToShow = []
  let num = 0

  if (sponsors.length > 0) {
    $tooltip.css({
      visibility: 'visible'
    })

    if (others.length > 2) {

      for (let i = 0; i < 2; i++) {
        othersToShow.push(others[i])
      }

      num = others.length - othersToShow.length

      others = othersToShow

      let plural = 'personas'

      if (num <= 1) {
        plural = 'persona'
        num = 'una'
      }

      numTemplate = yo`
        <span class="num">
          y ${num} ${plural} más.
        </span>
      `
    }

    let comma = ''

    if (others.length > 0) {
      comma = ', '

      othersTemplate = yo`
        <span class="others">
          ${others.map(function(user){
            return yo`
              <a class="sponsor-names" href="#">${user.username}</a>`
          })}
        </span>
      `
    }

    if (firstUser) {
      firstUserTemplate = yo`
        <span class="first-user">
          Tú <span class="awards-${firstUser.type}"></span>${comma}
        </span>
      `
    }

    let people = yo`
      <p class="people-container">
        ${firstUserTemplate}
        ${othersTemplate}
        ${numTemplate}
      </p>`
    $tooltip.html('').append(people)
  } else {
    $tooltip.css({
      visibility: 'hidden'
    })
  }
}

class Skill {
  constructor (x, y, size, skills, username, images) {
    this.x = x
    this.y = y
    this.size = size
    this.skills = skills
    this.username = username
    this.$skillContainer = $('<div></div>')
    this.images = images
    this.init()
  }

  init () {
    let _thisX = this.x
    let _thisY = this.y
    let _thisSize = this.size

    this.$skillContainer.css({
      position: 'absolute',
      top: _thisX * _thisSize + 'px',
      left: _thisY * _thisSize + 'px',
      width: _thisSize + 'px',
      height: _thisSize + 'px'
    }).html(skillTemplate(this.skills, this.images))

    $grid.append(this.$skillContainer)

    switch (this.skills.length) {
      // case 1:
      //   this.$skillContainer.find('.skills-single').css({
      //     width: '100%',
      //     height: '100%'
      //   })
      //   break;
      // case 2:
      //   this.$skillContainer.find('.skills-single').css({
      //     width: '50%',
      //     height: '50%'
      //   })
      //   break;
      default:
        this.$skillContainer.find('.skills-single').css({
          width: '33.3%',
          height: '33.3%'
        })
    }

    let getterPos = this.getterPos.bind(this)
    let getterUsername = this.getterUsername.bind(this)

    this.$skillContainer.on('click', '.skills-single', (e) => {
      e.preventDefault()
      skillTimeLine.reverse(0)

      let $skill = $(e.currentTarget)
      let skill = $skill[0].attributes['name'].value
      let dataToSend = {
        pos: getterPos(),
        skill: skill,
        username: getterUsername()
      }

      console.log(dataToSend)

      request
        .post(`/game/${skill}`)
        .send(dataToSend)
        .end(function (err, res) {
          console.log(err, res);
        })
      })
  }

  getterUsername () {
    return this.username
  }

  getterPos () {
    console.log(this.x, this.y, '--getter pos')
    return {
      x: this.x,
      y: this.y
    }
  }
}

class Image {
  constructor (game, x, y, rotation, size, publicId, data, skills, user) {
    this.x = x
    this.y = y
    this.size = size || 200;
    this.id = publicId
    this.data = data
    this.skills = skills
    this.rotation = rotation || 0
    this.user = user
    this.game = game
    this.$pieceContainer = $('<div></div>')
    this.$shadow = $('<div></div>')
    this.init()
  }

  init () {
    let _thisX = this.x
    let _thisY = this.y
    let _thisSize = this.size

    this.$pieceContainer.css({
      position: 'absolute',
      top: _thisX * _thisSize + 'px',
      left: _thisY * _thisSize + 'px',
      width: _thisSize + 'px',
      height: _thisSize + 'px',
      transform: `rotate(${this.rotation})`,
      transition: 'all .3s cubic-bezier(0.230, 1.000, 0.320, 1.000)',
      'z-index': 2
    }).html(imageTemplate(this.data))

    this.$shadow.css({
      position: 'absolute',
      top: _thisX * _thisSize + 'px',
      left: _thisY * _thisSize + 'px',
      width: _thisSize + 'px',
      height: _thisSize + 'px',
      transition: 'all .3s cubic-bezier(0.230, 1.000, 0.320, 1.000)',
      'z-index': 0
    })

    if (this.data) {
      this.$shadow.addClass('haveShadow')
    }

    let gridSize = this.size * this.game.length + 'px'

    $grid.css({
      width: gridSize,
      height: gridSize,
    })

    $grid.append(this.$shadow)
    $grid.append(this.$pieceContainer)
  }

  static skillBoxCreator (x, y, size, skills, user) {
    let username = user.username
    let images = user.images
    return new Skill(x, y, size, skills, username, images)
  }

  // skillTemplateOn (skillTemplate) {
  //   this.$pieceContainer.append(skillTemplate)
  //   let $skillTemplate = $(skillTemplate)

  drawMoveTo (newPos, rotation) {
    this.x = newPos.x
    this.y = newPos.y
    this.rotation = rotation

    let _thisSize = this.size
    let _thisX = this.x
    let _thisY = this.y

    this.$pieceContainer.css({
      top: _thisX * _thisSize + 'px',
      left: _thisY * _thisSize + 'px',
      transform: `rotate(${this.rotation})`
    })

    this.$shadow.css({
      top: _thisX * _thisSize + 'px',
      left: _thisY * _thisSize + 'px'
    })
  }

  static viewportToCenter () {
    // antes se hacia cuando se cargaba el objeto window
    let scrollWidth = $scrollBars[0].clientWidth
    let scrollHeight = $scrollBars[0].clientHeight

    $scrollBars[0].scrollTop = ($scrollBars[0].scrollHeight - scrollHeight) / 2
    $scrollBars[0].scrollLeft = ($scrollBars[0].scrollWidth - scrollWidth) / 2
  }

  static viewportMoveActivate () {
    let distance, startPoint
    let scrollLeft = 0
    let scrollTop = 0
    let x, y = 0
    let move = false
    // let computer = true

    if (computer) {
      $scrollBars
        .mousemove(function (e) {
          if (!move) return
          this.scrollLeft = scrollLeft + x - e.clientX
          this.scrollTop = scrollTop + y - e.clientY
        })
        .mousedown(function (e) {
          if (e.which === 2) {
            move = true
            scrollLeft = this.scrollLeft
            scrollTop = this.scrollTop
            x = e.clientX
            y = e.clientY
          }
        })
        .mouseup(function (e) {
          move = false
        })
    }
  }
}

module.exports = Image
