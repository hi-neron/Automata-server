const yo = require('yo-yo')

module.exports = function(image) {
  return yo`
  <div class="supervisor-image-single">
    <img class="supervisor-image-main" src="${image.src}" alt="${image.name}">
    <div class="supervisor-body-content">
      <div class="supervisor-image-delete">
        <a href="#" class="delete-image"></a>
      </div>
      <div class="supervisor-image-name">
        <h2 class="image-name">
          ${image.name}
        </h2>
      </div>
      <div class="supervisor-image-awards">
        <ul class="awards-body">
          <li class="awards">
            <p class="label inner-award">${image.awards.amazing}</p>
            <div class="fa fa-heart inner-award icon"></div>
          </li>
          <li class="awards">
            <p class="label inner-award">${image.awards.bastard}</p>
            <div class="fa fa-glass inner-award icon"></div>
          </li>
          <li class="awards">
            <p class="label inner-award">${image.awards.takeMyMoney}</p>
            <div class="fa fa-credit-card-alt inner-award icon"></div>
          </li>
        </ul>
      </div>
      <div class="supervisor-image-line">
      </div>
    </div>
  </div>
  `
}