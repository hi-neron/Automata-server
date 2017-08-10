'use strict'

const request = require('superagent')
const jQuery = require('jquery')

function authenticated (ctx, next) {
  request
    .get('/whoami')
    .set('Accept', 'application/json')
    .end((err, res) => {
      if (err) {
        console.log(err)
      }

      let profile = res.body
      console.log(profile, 'utils / authenticated')

      if (profile.username) {
        ctx.auth = profile
      } else {
        ctx.auth = false
      }
      next()
    })
}

(function ($) {
  $(document).on('mousewheel', function(e) { 
    var $target = $(e.target).closest('.scrollable-h');
    var scroll = $target.scrollLeft();
    var maxScroll = $target.find('.scrollable-h-content').width() - $target.width();

    if(scroll <= 0) {
      // Prevent "back" navigation.
      if(scroll <= 0 && e.originalEvent.wheelDeltaX > 0) {
        e.preventDefault();
      }
    }
    if(scroll >= maxScroll) {
      // Prevent "forward" navigation.
      if (scroll > 1 && e.originalEvent.wheelDeltaX < 0) {
        e.preventDefault();
      }
    }
});}(jQuery));

module.exports = { authenticated }