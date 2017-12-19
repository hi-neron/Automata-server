'use strict'

let yo = require('yo-yo')
let $ = require('jquery')
require('howler')
require('gsap')

let spine, sp1, sp2, sp3, sp4,
    sp1Bone, sp2Bone, sp3Bone, sp4Bone,
    sp1Shadow, sp2Shadow, sp3Shadow, sp4Shadow,
    skull, land, eyeB, eyeR, head, tongue,
    nuage1, nuage2, shadowB, timeline, background, blackBackground, scene,
    dialogBottom, dialogTop, dialogContainer,
    cranium, craniumBone, shadowCranium,
    jaw, jawBone, jawShadow, mask


function createAssets(cb) {
  // corpose
  background = yo`<div class="on-boarding-background"></div>`
  land = yo`<div class="on-boarding-land"></div>`
  shadowB = yo`<div class="on-boarding-shadow-bottom"></div>`
  nuage1 = yo`<div class="on-boarding-nuage1"></div>`
  nuage2 = yo`<div class="on-boarding-nuage2"></div>`

  // top pieces
  eyeB = yo`<div class="on-boarding-eye"></div>`
  eyeR = yo`<div class="on-boarding-eye-on"></div>`
  cranium = yo`<div class="on-boarding-cranium"></div>`
  craniumBone = yo`<div class="on-boarding-cranium-bone"></div>`
  shadowCranium = yo`<div class="on-boarding-cranium-shadow"></div>`
  tongue = yo`<div class="on-boarding-tongue"></div>`
  jaw = yo`<div class="on-boarding-jaw"></div>`
  jawShadow = yo`<div class="on-boarding-jaw-shadow"></div>`
  jawBone = yo`<div class="on-boarding-jaw-bone"></div>`


  // cranium
  cranium.appendChild(eyeR)
  cranium.appendChild(eyeB)
  cranium.appendChild(craniumBone)
  cranium.appendChild(shadowCranium)

  // jaw
  jaw.appendChild(jawBone)
  jaw.appendChild(jawShadow)


  // whole top
  head = yo`<div class="on-boarding-head"></div>`

  // bottom pieces
  sp1 = yo`<div class="on-boarding-sp1"></div>`
  sp2 = yo`<div class="on-boarding-sp2"></div>`
  sp3 = yo`<div class="on-boarding-sp3"></div>`
  sp4 = yo`<div class="on-boarding-sp4"></div>`
  sp1Bone = yo`<div class="on-boarding-sp1-bone"></div>`
  sp2Bone = yo`<div class="on-boarding-sp2-bone"></div>`
  sp3Bone = yo`<div class="on-boarding-sp3-bone"></div>`
  sp4Bone = yo`<div class="on-boarding-sp4-bone"></div>`
  sp1Shadow = yo`<div class="on-boarding-sp1-shadow"></div>`
  sp2Shadow = yo`<div class="on-boarding-sp2-shadow"></div>`
  sp3Shadow = yo`<div class="on-boarding-sp3-shadow"></div>`
  sp4Shadow = yo`<div class="on-boarding-sp4-shadow"></div>`

  // whole bottom
  spine = yo`<div class="on-boarding-spine"></div>`

  // all
  skull = yo`<div class="on-boarding-skull"></div>`
  
  // scene
  scene = yo`<div class="on-boarding-scene"></div>`

  // composition
  // top
  head.appendChild(jaw)
  head.appendChild(tongue)
  head.appendChild(land)
  head.appendChild(shadowB)
  head.appendChild(cranium)

  // bottom


  sp1.appendChild(sp1Bone)
  sp2.appendChild(sp2Bone)
  sp3.appendChild(sp3Bone)
  sp4.appendChild(sp4Bone)

  sp1.appendChild(sp1Shadow)
  sp2.appendChild(sp2Shadow)
  sp3.appendChild(sp3Shadow)
  sp4.appendChild(sp4Shadow)

  spine.appendChild(sp4)
  spine.appendChild(sp3)
  spine.appendChild(sp2)
  spine.appendChild(sp1)

  // skull
  skull.appendChild(spine)
  skull.appendChild(head)


  scene.appendChild(background)
  scene.appendChild(skull)
  scene.appendChild(nuage1)
  scene.appendChild(nuage2)

  cb(scene)
}

function timelineStart() {
  // CREATE SOUND
  let windSound = new Howl({
    src: ['wind.mp3'],
    loop: true,
    volume: 0.07 
  })

  TweenMax.set([nuage1, nuage2], {
    x: '-240',
    opacity: 0
  })

  TweenMax.set([dialogTop, dialogBottom], {
    opacity: 0
  })

  TweenMax.set(head, {
    transformOrigin: '225px 80px'
  })

  TweenMax.set(cranium, {
    transformOrigin: '50% 0%',
  })

  TweenMax.set(tongue, {
    transformOrigin: '100% 0%',
    y: '0',
    x: '5',
    rotation: 0
  })

  TweenMax.set(jaw, {
    transformOrigin: '110px 0px',
    y: '-25',
    x: '16',
    rotation: '+=10',
  })

  TweenMax.set([eyeB, eyeR], {
    transformOrigin: '50% -50%',
    opacity: 1
  })

  TweenMax.set([land, background], {
    transformOrigin: '200px 10px',
    opacity: 1
  })


  let mainTimeLine = new TimelineMax({
  })
  
  let cloudsTimeLine = new TimelineMax({
    repeat: -1,
  })

  let breatheTimeLine = new TimelineMax({
    repeat: -1,
    yoyo: true,
    paused: true
  })

  cloudsTimeLine.to(nuage1, 4, {
    x: '125',
    opacity: 0,
    ease: Sine.easeInOut
  })
  .to(nuage1, 2, {
    opacity: 0.6,
    ease: Sine.easeInOut
  }, '-=4')
  .to(nuage2, 6, {
    opacity: 1,
    x: '140',
    ease: Sine.easeInOut
  }, '-=3')
  .to(nuage1, 3, {
    opacity: 0
  }, '-=3')
  .to(nuage2, 3, {
    opacity: 0
  })

  breatheTimeLine
  .to(sp1, 2, {
    y: '-=4',
    x: '-=2',
    ease: Power1.easeInOut
  })
  .to(sp2, 2, {
    y: '-=3',
    x: '-=2',
    ease: Power1.easeInOut
  }, '-=2')
  .to(sp3, 2, {
    y: '-=2',
    x: '-=2',
    ease: Power1.easeInOut
  }, '-=2')
  .to(head, 2, {
    y: '-=6',
    x: '-=4',
    rotation: '+=4',
    ease: Power1.easeInOut
  }, '-=2')
  .to(tongue, 2,{
    rotation: '+=3',
    ease: Power1.easeInOut
  }, '-=2')

  .to(jaw, 2,{
    rotation: '+=4',
    ease: Power1.easeInOut
  }, '-=2')


  mainTimeLine
  .call(function(){
    windSound.play()
  })
  .call(changeText,
    ['top', 'Soy un hijo del hombre']
  )
  .to(dialogTop, 2, {
    opacity: 1
  }, '+=0.1')
  .call(changeText,
    ['bottom', 'Un bastardo con los huesos enterrados en el olvido']
  )
  .to(dialogBottom, 2, {
    opacity: 1
  }, '+=0.1')
  .to(dialogTop, 1, {
    opacity: 0
  }, '+=0.1')
  .call(changeText,
    ['top', 'He aprendido del tiempo']
  )
  .to(dialogBottom, 1, {
    opacity: 0
  }, '+=0.1')
  .call(changeText,
    ['bottom', '... de la soledad']
  )
  .to(dialogTop, 1, {
    opacity: 1
  }, '+=0.1')
  .to(dialogBottom, 1, {
    opacity: 1
  }, '+=0.1')
  .to(dialogTop, 0.7, {
    opacity: 0
  }, '-=0.1')
  .to(dialogBottom, 0.7, {
    opacity: 0
  }, '+=0.1')
  .to(eyeB, 0.05, {
    opacity: '.1',
    ease: Expo.easeIn
  }, '-=3')
  .to(eyeB, 0.1, {
    opacity: '1',
    ease: Expo.easeOut
  }, '-=2.95')
  .to(eyeB, 0.2, {
    opacity: '.4',
    ease: Expo.easeIn
  }, '+=1')
  .to(eyeB, 0.2, {
    opacity: '1',
    ease: Expo.easeOut
  })

  // segundo dialogo
  .call(changeText,
    ['top', 'A tener esperanza']
  )
  .to(dialogTop, 2, {
    opacity: 1
  }, '+=0.1')
  .call(changeText,
    ['bottom', 'Para luego perderla']
  )
  .to(dialogBottom, 2, {
    opacity: 1
  }, '+=0.1')
  .to(dialogTop, 1, {
    opacity: 0
  }, '+=0.1')
  .call(changeText,
    ['top', 'Se que es el bien']
  )
  .to(dialogBottom, 1, {
    opacity: 0
  }, '+=0.1')
  .call(changeText,
    ['bottom', 'Aún cuando soy todo maldad']
  )
  .to(dialogTop, 2, {
    opacity: 1
  }, '+=0.1')
  .to(dialogBottom, 2, {
    opacity: 1
  }, '+=0.1')
  .to(dialogTop, 1, {
    opacity: 0
  }, '+=0.1')
  .to(dialogBottom, 1, {
    opacity: 0
  }, '+=0.1')

  // tercer dialogo
  .call(changeText,
    ['top', 'He sentido angustia']
  )
  .to(dialogTop, 1, {
    opacity: 1
  }, '+=0.1')
  .to(dialogTop, 0.5, {
    opacity: 0
  }, '+=0.1')


  .call(changeText,
    ['top', 'Deseo']
  )
  .to(dialogTop, 0.9, {
    opacity: 1
  }, '+=0.1')
  .to(dialogTop, 0.4, {
    opacity: 0
  }, '+=0.1')

  // eye flicker
  .to(eyeB, 0.05, {
    opacity: '0.6',
    ease: Power4.easeOut
  }, '-=0.5')
  .to(eyeB, 0.05, {
    opacity: '1',
    ease: Power4.easeOut
  }, '-=0.4')
  .to(eyeB, 0.02, {
    opacity: '0.6',
    ease: Power4.easeOut
  }, '-=0.3')
  .to(eyeB, 0.02, {
    opacity: '1',
    ease: Power4.easeOut
  }, '-=0.25')


  .call(changeText,
    ['top', 'Envidia']
  )
  .to(dialogTop, 0.8, {
    opacity: 1
  }, '+=0.1')
  .to(dialogTop, 0.3, {
    opacity: 0
  }, '+=0.1')

  .call(changeText,
    ['top', 'He mentido']
  )
  .to(dialogTop, 0.7, {
    opacity: 1
  }, '+=0.1')
  .to(dialogTop, 0.2, {
    opacity: 0
  }, '+=0.1')
  
  .call(changeText,
    ['top', 'Aprendi a sobrevivir']
  )
  .to(dialogTop, 0.6, {
    opacity: 1
  }, '+=0.1')
  .to(dialogTop, 0.15, {
    opacity: 0
  }, '+=0.1')

  .call(changeText,
    ['top', 'A ser consciente']
  )
  .to(dialogTop, 0.5, {
    opacity: 1
  }, '+=0.1')
  .to(dialogTop, 0.1, {
    opacity: 0
  }, '+=0.1')

  .call(changeText,
    ['top', 'A volver a empezar']
  )
  .to(dialogTop, 0.4, {
    opacity: 1
  }, '+=0.1')
  .to(dialogTop, 0.09, {
    opacity: 0
  }, '+=0.1')

  .call(changeText,
    ['top', 'A ser libre']
  )
  .to(dialogTop, 0.3, {
    opacity: 1
  }, '+=0.1')
  .to(dialogTop, 0.07, {
    opacity: 0
  }, '+=0.1')

  .call(changeText,
    ['top', 'Amar y odiar']
  )
  .to(dialogTop, 0.2, {
    opacity: 1
  }, '+=0.1')
  .to(dialogTop, 0.06, {
    opacity: 0
  }, '+=0.1')

  .call(changeText,
    ['top', 'De la muerte']
  )
  .to(dialogTop, 0.1, {
    opacity: 1
  }, '+=0.1')
  .to(dialogTop, 0.05, {
    opacity: 0
  }, '+=0.1')

  // Parte parte tres

  .call(changeText,
    ['top', 'La venganza']
  )
  .to(dialogTop, 0.09, {
    opacity: 1
  }, '+=0.1')
  .to(dialogTop, 0.04, {
    opacity: 0
  }, '+=0.1')

  .call(changeText,
    ['top', 'Lo obsceno']
  )
  .to(dialogTop, 0.08, {
    opacity: 1
  }, '+=0.1')
  .to(dialogTop, 0.03, {
    opacity: 0
  }, '+=0.1')

  .call(changeText,
    ['top', 'Lo impuro']
  )
  .to(dialogTop, 0.07, {
    opacity: 1
  }, '+=0.1')
  .to(dialogTop, 0.02, {
    opacity: 0
  }, '+=0.1')

  .call(changeText,
    ['top', 'Lo repugnante']
  )
  .to(dialogTop, 0.06, {
    opacity: 1
  }, '+=0.1')
  .to(dialogTop, 0.02, {
    opacity: 0
  }, '+=0.1')

  .call(changeText,
    ['top', 'Lo bizarro']
  )
  .to(dialogTop, 0.05, {
    opacity: 1
  }, '+=0.1')
  .to(dialogTop, 0.01, {
    opacity: 0
  }, '+=0.1')

  .call(changeText,
    ['top', 'Lo grotesco']
  )
  .to(dialogTop, 0.04, {
    opacity: 1
  }, '+=0.1')
  .to(dialogTop, 0.01, {
    opacity: 0
  }, '+=0.1')

  .call(changeText,
    ['top', 'El olvido']
  )
  .to(dialogTop, 0.03, {
    opacity: 1
  }, '+=0.1')
  .to(dialogTop, 0.01, {
    opacity: 0
  }, '+=0.1')

  .call(changeText,
    ['top', 'La nausea']
  )
  .to(dialogTop, 0.03, {
    opacity: 1
  }, '+=0.1')
  .to(dialogTop, 0.01, {
    opacity: 0
  }, '+=0.1')

  .call(changeText,
    ['top', 'El dolor']
  )
  .to(dialogTop, 0.02, {
    opacity: 1
  }, '+=0.1')
  .to(dialogTop, 0.01, {
    opacity: 0
  }, '+=0.1')

  .call(changeText,
    ['top', 'Empatia']
  )
  .to(dialogTop, 0.02, {
    opacity: 1
  }, '+=0.1')
  .to(dialogTop, 0.01, {
    opacity: 0
  }, '+=0.1')

  .call(changeText,
    ['top', 'El silencio']
  )
  .to(dialogTop, 0.02, {
    opacity: 1
  }, '+=0.1')
  .to(dialogTop, 0.01, {
    opacity: 0
  }, '+=0.1')

  .call(changeText,
    ['top', 'El ruido']
  )
  .to(dialogTop, 0.02, {
    opacity: 1
  }, '+=0.1')
  .to(dialogTop, 0.01, {
    opacity: 0
  }, '+=0.1')

  .call(changeText,
    ['top', 'Frío']
  )
  .to(dialogTop, 0.01, {
    opacity: 1
  }, '+=0.08')
  .to(dialogTop, 0.01, {
    opacity: 0
  }, '+=0.08')

  .call(changeText,
    ['top', 'Oscuridad']
  )
  .to(dialogTop, 0.01, {
    opacity: 1
  }, '+=0.08')
  .to(dialogTop, 0.01, {
    opacity: 0
  }, '+=0.08')

  .call(changeText,
    ['top', 'Extinción']
  )
  .to(dialogTop, 0.02, {
    opacity: 1
  }, '+=0.1')
  .to(dialogTop, 0.01, {
    opacity: 0
  }, '+=0.1')

  .call(changeText,
    ['top', 'Soy una historia']
  )
  .to(dialogTop, 2, {
    opacity: 1,
    ease: Expo.easeIn
  }, '+=0.5')
  .to(dialogTop, 2, {
    opacity: 0,
    ease: Expo.easeIn
  }, '+=1')

  // eye flicker
  .to(eyeB, 0.05, {
    opacity: '0.6',
    ease: Power4.easeOut
  }, '-=7.5')
  .to(eyeB, 0.05, {
    opacity: '1',
    ease: Power4.easeOut
  }, '-=7.4')
  .to(eyeB, 0.02, {
    opacity: '0.6',
    ease: Power4.easeOut
  }, '-=7.3')
  .to(eyeB, 0.02, {
    opacity: '1',
    ease: Power4.easeOut
  }, '-=7.25')

  // eye flicker
  .to(eyeB, 0.05, {
    opacity: '0.6',
    ease: Power4.easeOut
  }, '-=7')
  .to(eyeB, 0.05, {
    opacity: '1',
    ease: Power4.easeOut
  }, '-=6.9')
  .to(eyeB, 0.02, {
    opacity: '0.6',
    ease: Power4.easeOut
  }, '-=6.8')
  .to(eyeB, 0.02, {
    opacity: '1',
    ease: Power4.easeOut
  }, '-=6.75')

  // eye flicker
  .to(eyeB, 0.04, {
    opacity: '0.6',
    ease: Power4.easeOut
  }, '-=6.2')
  .to(eyeB, 0.05, {
    opacity: '1',
    ease: Power4.easeOut
  }, '-=6.15')
  .to(eyeB, 0.02, {
    opacity: '0.6',
    ease: Power4.easeOut
  }, '-=6.1')
  .to(eyeB, 0.01, {
    opacity: '1',
    ease: Power4.easeOut
  }, '-=6.05')

  // eye flicker
  .to(eyeB, 0.04, {
    opacity: '0.6',
    ease: Power4.easeOut
  }, '-=6')
  .to(eyeB, 0.05, {
    opacity: '1',
    ease: Power4.easeOut
  }, '-=5.9')
  .to(eyeB, 0.02, {
    opacity: '0.6',
    ease: Power4.easeOut
  }, '-=5.85')
  .to(eyeB, 0.01, {
    opacity: '1',
    ease: Power4.easeOut
  }, '-=5.75')

  // eye flicker
  .to(eyeB, 0.04, {
    opacity: '0.6',
    ease: Power4.easeOut
  }, '-=6')
  .to(eyeB, 0.05, {
    opacity: '0.2',
    ease: Power4.easeOut
  }, '-=5.9')
  .to(eyeB, 0.02, {
    opacity: '0.8',
    ease: Power4.easeOut
  }, '-=5.85')
  .to(eyeB, 0.01, {
    opacity: '0.1',
    ease: Power4.easeOut
  }, '-=5.75')
  .to(eyeB, 0.04, {
    opacity: '0.5',
    ease: Power4.easeOut
  }, '-=6')
  .to(eyeB, 0.05, {
    opacity: '0.2',
    ease: Power4.easeOut
  }, '-=5.9')
  
  // eye flicker
  .to(eyeB, 0.04, {
    opacity: '0.6',
    ease: Power4.easeOut
  }, '-=2.5')
  .to(eyeB, 0.05, {
    opacity: '0.3',
    ease: Power4.easeOut
  }, '-=2.4')
  .to(eyeB, 0.02, {
    opacity: '0.4',
    ease: Power4.easeOut
  }, '-=2.35')
  .to(eyeB, 0.01, {
    opacity: '0.1',
    ease: Power4.easeOut
  }, '-=2.25')
  .to(eyeB, 0.04, {
    opacity: '0.2',
    ease: Power4.easeOut
  }, '-=2.20')
  .to(eyeB, 0.05, {
    opacity: '0',
    ease: Power4.easeOut
  }, '-=2.1')

  .call(changeText,
    ['top', 'Para muchos el olvido puede ser el infierno']
  )
  .to(dialogTop, 1, {
    opacity: 1
  }, '+=0.2')
  .to(dialogTop, 0.5, {
    opacity: 0
  }, '+=2')

  .call(changeText,
    ['top', 'Lo que ahí cae esta condenado a desaparecer... morir en el tiempo']
  )
  .to(dialogTop, 1, {
    opacity: 1
  }, '+=0.2')
  .to(dialogTop, 0.5, {
    opacity: 0
  }, '+=2.5')

  .call(changeText,
    ['top', 'He pactado con el infierno']
  )
  .to(dialogTop, 1, {
    opacity: 1
  }, '+=0.2')
  .to(dialogTop, 0.5, {
    opacity: 0
  }, '+=2.5')
  .call(changeText,
    ['top', '... Mi libertad a cambio historias']
  )

  .to([cranium, jaw, tongue, spine], 1, {
    y: '-=45',
    x: '-=20',
    ease: Back.easeOut.config(3)
  })
  .to([cranium, jaw, tongue, spine], 3, {
    y: '-=30',
    x: '-=25',
    ease: Back.easeOut.config(3)
  })

  .to(cranium, 3, {
    rotation: '-=6',
    ease: Back.easeOut.config(3)
  }, '-=5.9')

  .to(cranium, 3, {
    rotation: '-=4',
    ease: Power4.easeOut,
  }, '-=2.9')

  .to(cranium, 4, {
    rotation: '+=2',
    ease: Back.easeOut.config(3)
  }, '-=1.9')

  .to(tongue, 1.4,{
    rotation: '-=10',
    ease: Bounce.easeOut
  }, '-=5')

  .to(jaw, 0.8,{
    rotation: '-=20',
    ease: Bounce.easeOut
  }, '-=4.95')
  .to(spine, 3,{
    y: '-=22',
    ease: Elastic.easeOut.config(1.5, 0.4)
  }, '-=6')
  .add(() => { breatheTimeLine.play() }, '-=1')
  .to([background, land], 1, {
    y: '+=20',
    x: '-=10',
    ease: Power4.easeOut
  }, '-=5')

  .to([nuage1, nuage2], 0.1, {
    y: '+=50',
  }, '-=5')

  .to(shadowB, 0.05, {
    opacity: 0,
    x: '+=10',
    y: '+=40',
    ease: Power1.easeOut
  }, '-=5.7')

  .to(mask, 0.4, {
    x: '-=35',
    y: '-=75',
    ease: Back.easeOut.config(3)
  }, '-=6.1')

  .to(dialogTop, 1, {
    opacity: 1
  }, '-=2')
  .to(dialogTop, 0.5, {
    opacity: 0
  })

  .add( () => {cloudsTimeLine.pause()})

  .call(changeText,
    ['top', 'Déjame liberar las tuyas']
  )
  .to(dialogTop, 1, {
    opacity: 1
  }, '+=0.2')
  .to(dialogTop, 0.5, {
    opacity: 0
  }, '+=2.5')

  .call(changeText,
    ['top', 'y pacta conmigo']
  )
  .to(dialogTop, 1, {
    opacity: 1
  }, '+=0.2')
  .to(dialogTop, 0.5, {
    opacity: 0
  }, '+=2.5')

  .to([background, blackBackground, mask, land,
    shadowCranium, jawShadow, shadowB, sp1Shadow,
    sp2Shadow, sp3Shadow, sp4Shadow, nuage1, nuage2,
    dialogBottom, dialogTop, dialogContainer], 0.2, {
    opacity: 0
  }, '-=2.5')

  .to([background, blackBackground, mask, land,
    shadowCranium, jawShadow, shadowB, sp1Shadow,
    sp2Shadow, sp3Shadow, sp4Shadow, nuage1, nuage2,
    dialogBottom, dialogTop, dialogContainer], 0.1, {
    display: 'none'
  })
  .call(function(){
    windSound.stop()
  })

}

function changeText (place, text) {
  switch (place) {
    case 'top':
      dialogTop.innerHTML = text
      break
      case 'bottom':
      dialogBottom.innerHTML = text
      break
  }
}

function generateDialogs() {
  // dialogs
  dialogTop = yo`<div class="on-boarding-dialog-top"></div>`
  dialogBottom = yo`<div class="on-boarding-dialog-bottom"></div>`
  dialogContainer = yo`<div class="on-boarding-dialog-container"></div>`

  // composition dialogs
  dialogContainer.appendChild(dialogTop)
  dialogContainer.appendChild(dialogBottom)

  return dialogContainer
}

function start () {
  let svgMask = yo`
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 600">
    <path class="on-boarding-mask" d="M0,0V600H600V0ZM510.79,223.92c0,8.16-9.23,119.14-9.62,126-4.49,5.18-11.08-1.79-16.16,5.84,1.31,1.39-3.28.29-1.6,3.59-.86-1.35-2.28-.87-3.21-1,1.46-1.1,2.92-2.2,3-4.07-6.95-.72-14.45.37-21.36-1-4.1-1.68-5.52,6.95-6.45,6.85l.18-3.12-4.17-.43c.75,3.21,0,8.15,1.78,9.6-.11,1.86-1.43.48-2.85,1,.5-.57,1.57-3,.68-3.69-3.24-.34-1.07,2.4-4.89,3.88,0-.63,2.6-4.75-.53-7-7.72-2.67-51,.37-59.75.77-.06.12-.1.13-.14,0h.14c.5-1.07,1.63-10.87,2.09-11.59l-3.87,3.31,2.1,4c-4.56,6.42-30.46,10.66-35.41,15.78l1.39.14c-3.89,2.73-6.7,3.07-11.36,3.2l2.89-1.58c-1.1-5.13-3.46-4.74-6.27-4.42l1.74,2.06c-3.06,4.69-5.63.68-10.33,1.43l1.79,1.45c-1,1.15-2.35.38-3.74.23,2.46-2.25-1.67-3.31-2.46-5.9,1.57,5.19-3.06,4.7-4.49,5.18-.71-3.83-4.34,2.68-4.59-1.11-1.46,1.1-.22,3.75.25,3.79-3.13-2.21-5.81,3.79-11.43,4.45-9.72-1-1.26-3.32-12.23,1.18l-1.24-2.65-.72,4.32c-1.89-7.73-6.41-1.93-7.37-9.55-1.1,3-2.28-.86-4.77,2,1.11,5.13,4,2.93,5.23,6.19-9.43,2.16-51.48-2-60.24-3.53,1.42-.47,1.1-3-.21-4.4l-3.35,1.53c.4,1.3,1.32,1.39.79,2.59-1.46,1.1-3.14-2.21-3.85,2.11.15-2.49-2.17-2.73-2.14-3.36-1.64,4.23-7.65-4.55-9.51,3.4-4.74,1.39-1.11-5.13-6.23-5L198,382c-.43-.68-27.38-.44-26.59,2.15-.39-1.29-.75-3.21-2.06-4.61-4.74,1.39-9.36.91-14.57,2.25.5-.58,1-.53.57-1.83-17.27.7-33.83-2.91-50.92-5.32-3.24-.34-.64-5.09-3.42-5.38-1.78-1.44-3.81,1.49-5.27,2.59.42.68,1.35.77.81,2a6.18,6.18,0,0,0-3.13-1.63l0,0,0-.07c-2.16-.57-4.44-.89-5.76-4.29,2.33-.38,4.1,1,5.76,4.29l.08,0c1-1.76,2.93-3.41.22-4.31l3.7.38c.18-3.11-1.06.5-3.76-1l-2.25.4.18-3.11C80.14,341.68,89.1,234.31,89.1,234.31l.81-.88,5.57,8.89c8.61-4.12,18.55,1.31,25,2.6,2.82-.33,10.19,1.06,14.11-2.29l-.18,3.12c4.7-.76,11.15-5.72,14-6.68l-.07,1.25c1.89-.43,6.84-3.67,6.24-9.37,4.55,1.73,3.76,7.29,9.54,4.14l-.89-.73c6.62-1.82,38.88,2.89,44.57,1l-.53,1.2c5.31-3.21,12.07.63,17.48-4.45,10.08,2.94,53.55,6.59,64.9,3.38,9.86-1.47.77-4.25,10.52-3.86,1.39.14,2-2.31.22-3.74,3.2,1,7.43.15,10.5,3.6,19.84-4.83,59.24-4.55,78.43-6.3l-.49.56c12.6-.56,62.13-5.54,74.67-4.86l2.53-3.5c2.63,2.79,5.09.53,8.69,2.79,1.88-.43,1.11-3,.21-3.74,3.13,2.21,6.55-.57,8.29,1.5l-.53,1.2c4.91,3.65,7.76-5.47,13.14-1.77l0,.63c2.21,2.12,4.74-1.38,6.67-2.44,2.7,1.53.21,4.41,2.45,5.9,1-3.92,3.35-1.31,5.74-.89l1.78-.21a2.59,2.59,0,0,1-1.78.21c-2.65.34-5.66,1.11-5.49,4.69,3.27-.3.71,3.83,4.06,2.3l.25-4.37a3.07,3.07,0,0,1,4.56,1.74C513.57,224.21,512.19,224.07,510.79,223.92Z"/>
  </svg>

  `

  // containers
  let container = document.getElementById('on-boarding-container')
  let wrapper = yo`<div class="on-boarding-wrapper"></div>`
  let vignette = yo`<div class="on-boarding-vignette"></div>`
  mask = yo`<div class="on-boarding-mask">
    ${svgMask}
  </div>`
  let top = yo`<div class="on-boarding-top-container"></div>`
  blackBackground = yo`<div class="on-boarding-black-background">
  </div>`

  createAssets((scene) =>{
    vignette.appendChild(scene)
    let dialogs = generateDialogs()
    vignette.appendChild(mask)
    top.appendChild(vignette)
    wrapper.appendChild(top)
    wrapper.appendChild(dialogs)
    container.appendChild(blackBackground)
    container.appendChild(wrapper)
    $('<img/>').attr('src', 'img/onboarding.png').on('load', function() {
      $(this).remove(); // prevent memory leaks as @benweet suggested
      timelineStart()
   });
  })
}

module.exports = {
  start
}
