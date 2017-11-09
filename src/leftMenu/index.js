'use strict'

require('gsap')
const noise = require('./noise.js')
const empty = require('empty-element')
const yo = require('yo-yo')
const uploadImages = require('../menuUploadImages')

let startMenu = function () {
  function getObject (x) {
    return document.querySelector(x)
  }

  function getObjects (x) {
    return document.querySelectorAll(x)
  }
  // Containers
  var container = getObject('#menu')

  //  Noise Menu
  var noise_background = getObject('#back_noise')
  var noise_icons = getObjects('#noise .over_noise')
  var menu_static = getObject('#noise')

  // Trigger Menu
  var square = getObject('#menu .trigger_menu')
  var menuSvg = getObject('#menuSvg')
  var eme = getObject('#eme')
  var grad = getObject('#grad')

  // logo Menu
  var logo = getObject('#logo')

  // Search
  var search_trigger = getObject('#search_trigger')

  var search_eye = getObject('#search_eye')

  var search_body = getObject('#search_body')
  var search_lighter = getObject('#search_lighter')
  var search_darker = getObject('#search_darker')
  var search_darker_2 = getObject('#search_darker_2')

  var search_handle = getObject('#search_handle')

  var search_x = getObject('#search_x')
  var search_line1 = getObject('#search_line1')
  var search_line2 = getObject('#search_line2')

  var search_shine = getObject('#search_shine')
  var search_trigger_all = getObject('#search_trigger_all')

  var search_inputContainer = getObject('#search_inputContainer')
  var search_input = getObject('#search_input')

  // toggle search menu
  let search_trigger_active = false
  let t1StillPlaying = false

  // modal background
  var empty_screen =  getObject('#empty_screen')

  // noisy container
  noise('#back_noise', {
    patternWidth: 100,
    patternHeight: 100,
    grainOpacity: 1,
    grainDensity: 1,
    grainWidth: 2,
    grainHeight: 2
  })
  // Search settings
  TweenMax.set('#search_input input', {
    attr: {
      disabled: true
    }
  })

  TweenMax.set(empty_screen, {
    width: '1%',
    height: '1%',
  })

  TweenMax.set(search_trigger, {
    top: '90%',
    left: '49',
    transformOrigin: '50% 50%'
  })

  TweenMax.set(search_trigger_all, {
    transformOrigin: '50% 50%'
  })

  TweenMax.set(search_eye, {
    transformOrigin: '50% 50%'
  })

  TweenMax.set(search_darker, {
    transformOrigin: '61% 38%'
  })

  TweenMax.set(search_lighter, {
    transformOrigin: '38% 61%'
  })

  TweenMax.set(search_inputContainer, {
    width: '1%',
    visibility: 'hidden',
    opacity: 0
  })


  // MEnu settings
  TweenMax.set(noise_icons, {
    visibility: 'hidden',
    opacity: 0
  })

  TweenMax.set(logo, {
    // visibility: 'hidden',
    opacity: 1,
    height: '0',
    top: '110'
  })

  TweenMax.set(noise_background, {
    visibility: 'hidden',
    right: '49.5%',
    rotationX: '91',
    scaleX: 0.01
  })

  TweenMax.set(square, {
    width: '80px'
  })

  TweenMax.set(eme, {
    attr: {
      points: '66.48 54.73 66.48 31.1 78.2 48.66 89.93 31.1 89.93 54.76'
    }
  })

  var tlMenu = new TimelineMax({repeat: 0, paused: true})
  var searchTl = new TimelineMax({repeat: 0, paused: true})
  var searchTl2 = new TimelineMax({repeat: 0, paused: true})

  // timelines
  // Menu
  tlMenu.to(eme, 0.30, {
      attr: {  points: '61.17 54.73 66.48 31.1 78.2 48.66 89.93 31.1 95.23 54.76'
      },
      ease:Power4.easeOut
    }).to(square, 0.35, {
      width: '100px',
      ease: Power4.easeOut
    }, '-=0.35').to(menuSvg, 0.25, {
      left: '10',
      ease: Power4.easeOut
    }, '-=0.35').to(noise_background, 0.01, {
      'visibility': 'visible',
    }, '-=0.55').to(noise_background, 0.3, {
      right: 0,
      scaleX: 1,
      ease: Power3.easeOut
    }, '-=0.35').to(noise_background, 0.2, {
      rotationX: 0,
      ease: Expo.easeOut
    }, '+=0.2').to(noise_icons, 0.01, {
      'visibility': 'visible'
    }, '-=0.5').to(noise_icons, 0.4, {
      opacity: '1',
      ease: RoughEase.ease.config({ template: Sine.easeInOut, strength: 1.2, points: 6, taper: "none", randomize: false, clamp: false})
    }).to(logo, 0.3, {
      height: '130',
      top: '20',
      ease: Expo.easeOut
    }, '-=0.7')

  // Search
  searchTl.to(search_trigger, 0.5, {
    top: '120',
    ease: Sine.easeOut
  }).to(search_trigger, 0.5, {
    ease: Power3.easeOut,
    left: '50%'
  }, '-=0.5').to(search_trigger_all, 0.4, {
    rotationZ: '-135',
    ease: Sine.easeIn
  }).to(empty_screen, 0.01, {
    'visibility': 'visible'
  }, '-=0.4').to(search_trigger, 0.6, {
    top: '-=25',
    ease: Power2.easeOut
  }, '-=0.4').to(empty_screen, 0.4, {
    width: '4000',
    height: '4000',
    opacity: 1,
    ease: Power3.easeIn
  }, '-=0.7').to(search_inputContainer, 0.05, {
    visibility: 'visible',
    opacity: 1
  }).to(search_inputContainer, 0.3, {
    width: '50%',
    minWidth: 360
  },'-=0.05').to('.cls-9_search', 0.3, {
    stroke: '#FFFA75'
  }).to(search_line1, 0.1, {
    attr: {
      x1:'35.06',
      y1:'41.73',
      x2:'47.06',
      y2:'41.73'
    },
    stroke: '#363636'
  }, '-=0.6').to(search_line2, 0.1, {
    attr: {
      x1:'41.06',
      y1:'47.73',
      x2:'41.06',
      y2:'35.73'
    },
    stroke: '#363636'
  }, '-=0.6').to(search_darker, 0.15, {
    rotationZ: '-50',
    ease: Power3.easeOut
  },'-=0.15').to(search_lighter, 0.15, {
    rotationZ: '50',
    ease: Power3.easeOut
  }, '-=0.15').to(search_eye, 0.3, {
    rotationZ: '20', // eye move
    ease: Power3.easeOut
  }, '+=0.6').to(search_trigger, 0.8, {
    rotationZ: '+=30',
    ease: Power3.easeOut
  }, '-=0.3').to(search_eye, 0.3, {
    rotationZ: '-20',
    ease: Power3.easeOut
  }).to(search_trigger, 0.8, {
    rotationZ: '-=60',
    ease: Power3.easeOut
  }, '-=0.3').to(search_eye, 0.8, {
    rotationZ: '0',
    ease: Power3.easeOut
  }).to(search_darker, 0.1, {
    rotationZ: '0',
    ease: Power3.easeOut
  }).to(search_lighter, 0.1, {
    rotationZ: '0',
    ease: Power3.easeOut
  }, '-=0.1').to(search_darker, 0.1, {
    rotationZ: '-50',
    ease: Power2.easeOut
  }).to(search_lighter, 0.1, {
    rotationZ: '50',
    ease: Power2.easeOut
  }, '-=0.1').to(search_darker, 0.1, {
    rotationZ: '0',
    ease: Power4.easeOut
  }).to(search_lighter, 0.1, {
    rotationZ: '0',
    ease: Power4.easeOut
  }, '-=0.1').to(search_darker, 0.1, {
    rotationZ: '-55'
  }).to(search_lighter, 0.12, {
    rotationZ: '55'
  }, '-=0.1').to(search_trigger, 2, {
    rotationZ: '0',
    ease: Elastic.easeOut.config(0.3, 0.2)
  }, '-=1.2').addCallback( function(){
    search_trigger_active = true
    t1StillPlaying = false
  }, '-=5')

  searchTl2.to(search_trigger, 0.4, {
    opacity: 0,
    ease: Power1.easeOut
  }).to(empty_screen, 0.4, {
    width: 0,
    height: 0,
    ease: Power1.easeOut
  }, '-=0.2').to(search_input, 0.2, {
    value: ''
  },'-=0.6').to(search_inputContainer, 0.3, {
    width: 0,
    minWidth: 0,
  }, '-=0.1').to(search_inputContainer, 0.01, {
    opacity: 0,
    'visibility': 'hidden'
  }, '-=0.02').set(search_trigger, {
    opacity: 1,
    top: '90%',
    left: '-49',
    rotationZ: 0
  }).set(search_trigger_all, {
    rotationZ: 0
  }).set(search_lighter, {
    rotationZ: 0
  }).set(search_darker, {
    rotationZ: 0
  }).set(search_line1, {
    attr: {
      x1:"40.81",
      y1:"41.59",
      x2:"41.31",
      y2:"41.59"
    },
    stroke: '#FFFA75'
  }).set('.cls-9_search', {
    stroke: '#FFFA75'
  })
  .set(search_line2, {
    attr: {
      x1:"41.06",
      y1:"41.45",
      x2:"41.06",
      y2:"41.73"
    },
    stroke: '#FFFA75'
  }).to(search_trigger, 0.6, {
    left: '49',
    ease: Bounce.easeOut
  }).addCallback( function(){
    search_trigger_active = false
  })
  // Drawing
  // Menu
  let timer = 3
  TweenMax.to('#grad', timer, {
    attr: {
      gradientTransform: "translate(-100, 100)"
    },
    repeat: -1
  })

  square.onmouseover = function (event) {
    tlMenu.play()
  }

  container.onmouseleave = function (event) {
    tlMenu.reverse()
  }

  search_trigger.onclick = function (event) {
    if (!search_trigger_active){
      searchTl.play(0)
    } else {
      searchTl.kill()
      searchTl2.play(0)
    }
  }
}

function render () {
  let searchTrigger = yo`
  <div id="search_trigger">
    <svg id="m_glass" viewBox="0 0 82.31 82.28">
      <defs>
        <style>
          .cls-1_search {
            fill: #959590;
          }

          .cls-2_search {
            fill: #c5c5c0;
          }

          .cls-3_search {
            fill: #343430;
          }

          .cls-4_search {
            opacity: 0.22;
          }

          .cls-5_search {
            fill: #FFFA75;
          }

          .cls-6_search {
            fill: #FFFA75;
          }

          .cls-7_search, .cls-8_search, .cls-9_search {
            fill: none;
            stroke-miterlimit: 10;
          }

          .cls-7_search {
            stroke: #FFFA75;
            stroke-width: 7px;
          }

          .cls-8_search {
            /*stroke: #545327;*/
            stroke: #FFFA75;
            stroke-width: 5px;
          }

          .cls-10_search {
            fill: #363636;
          }

          .cls-8_search, .cls-9_search {
            stroke-linecap: square;
          }

          .cls-9_search {
            stroke: #FFFA75;
            stroke-width: 4px;
          }
        </style>
      </defs>
      <title>m_glass</title>
      <g id='search_trigger_all'>
        <g id="search_eye">
          <g>
            <path class="cls-1_search" d="M55.37,55.9h0L26.59,27.12h0A20.35,20.35,0,1,0,55.37,55.9Z"/>
            <path class="cls-2_search" d="M55.37,55.9h0L26.59,27.12h0A20.35,20.35,0,1,1,55.37,55.9Z"/>
            <ellipse class="cls-3_search" cx="26.87" cy="27.4" rx="3.93" ry="2.42" transform="translate(-11.51 27.03) rotate(-45)"/>
          </g>
        </g>
        <g id="search_body">
          <path class="cls-4_search" d="M55.37,55.9h0a20.33,20.33,0,0,0-17-34.56V38.89H20.82A20.33,20.33,0,0,0,55.37,55.9Z"/>
          <g>
            <path id="search_darker" class="cls-6_search" d="M23.93,24.39h0A24.16,24.16,0,1,0,58.11,58.56h0Z"/>
          </g>
          <g>
            <path id="search_lighter" class="cls-6_search" d="M58.07,58.6h0A24.16,24.16,0,1,0,23.89,24.42h0Z"/>
            <path class="cls-6_search" d="M65.26,41.51a24.2,24.2,0,0,0-7.11-17.16L41,41.51,58.15,58.68h0A24.2,24.2,0,0,0,65.26,41.51Z"/>
          </g>
          <path class="cls-6_search" id="search_darker_2" d="M41.06,65.71A24.2,24.2,0,0,1,23.89,58.6L41.06,41.43,58.22,58.6h0A24.2,24.2,0,0,1,41.06,65.71Z"/>
        </g>
        <line id="search_handle" class="cls-7_search" x1="68.6" y1="69.13" x2="40.98" y2="41.51"/>
        <g id="search_x">
          <line id="search_line2" class="cls-8_search" x1="40.81" y1="41.59" x2="41.31" y2="41.59"/>
          <line id="search_line1" class="cls-8_search" x1="41.06" y1="41.45" x2="41.06" y2="41.73"/>
        </g>
      </g>
      <g id="search_shine">
        <path class="cls-9_search" d="M26.64,27.17a20.19,20.19,0,0,1,8-4.94"/>
        <path class="cls-9_search" d="M21.1,37.51a20.07,20.07,0,0,1,1.08-3.61"/>
      </g>
    </svg>
  </div>
  `
  return yo`
    <div>
      <aside id="profile"></aside>
      <aside id="images"></aside>
      <menu id="menu">
        <div id="logo">
          <img src="img/logo.svg" alt="">
          <a id="logout" href="/logout">
            <a class="close-logout"></a>
          </a>
        </div>
        <div class="trigger_menu">
          <svg id="menuSvg" viewBox="48 2 85 76.67">
            <defs>
              <style>
                .cls-1_menu, .cls-4_menu {
                  fill: none;
                }

                .cls-3_menu {
                  clip-path: url(#clip-path);
                }

                .cls-4_menu {
                  stroke-miterlimit: 10;
                  stroke-width: 4.45px;
                }
              </style>
              <clipPath id="clip-path">
                <polygon class="cls-1_menu" points="98.28 51.62 80.65 51.62 78.2 53.43 75.83 51.62 58.65 51.62 58.65 23.93 98.28 23.93 98.28 51.62"/>
              </clipPath>
              <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%" gradientUnits="userSpaceOnUse" gradientTransform='translate(100, 100)'>
                <stop offset="0%" stop-color="#FF2B4A" />
                <stop offset="30%" stop-color="#FF2B4A" />
                <stop offset="40%" stop-color="#ff6078" />
                <stop offset="60%" stop-color="#ff6078" />
                <stop offset="70%" stop-color="#FF2B4A" />
                <stop offset="100%" stop-color="#FF2B4A" />
              </linearGradient>
            </defs>
            <title>automata</title>
            <g id="menu_icon">
              <g class="cls-3_menu">
                <polyline id="eme" class="cls-4_menu" stroke="url(#grad)" points="61.17 54.73 66.48 31.1 78.2 48.66 89.93 31.1 95.23 54.76"/>
              </g>
            </g>
          </svg>
        </div>
        <div id="noise">
          <a id="profile-menu-trigger" class="over_noise">
          </a>
          <div class="line over_noise">
            <svg id="lineSvg" viewBox="0 0 10 130">
              <line x1="0.5" y1="14" x2="3.5" y2="117" stroke="#FFFFFF" stroke-width="3"/>
              <line x1="1" y1="2" x2="4" y2="127" stroke="#1D1A20" stroke-width="2"/>
            </svg>
          </div>
          <a id="images-menu-trigger" class="over_noise">
          </a>
          <div id="back_noise">
            <div class="grained"></div>
          </div>
        </div>
      </menu>
      ${searchTrigger}
      <div id="empty_screen">
      </div>
      <div id="search_inputContainer">
        <input type="text" id="search_input">
      </div>
    </div>
    `
}

module.exports = function leftMenu (ctx, next) {
  let container = document.getElementById('left-container')
  empty(container).appendChild(render());
  let user = ctx.auth.username
  // Menu Triggers
  let imagesMenuTrigger = document.getElementById('images-menu-trigger')
  let profileMenuTrigger = document.getElementById('profile-menu-trigger')


  imagesMenuTrigger.onclick = function () {
    uploadImages(user, (err, data) => {
      if (err) {
        console.log(err)
        return err
      }
      // Menu Container
      let imageMenu = document.getElementById('images-menu-container')
      imageMenu.classList.add('active-images-supervisor')
    })
  }

  profileMenuTrigger.onclick = function () {
    console.log('profile Menu Opened')
  }

  startMenu()
  next();
}