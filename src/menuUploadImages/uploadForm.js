'use strict'

const yo = require('yo-yo')
const request = require('superagent')

const dummy = require('./dummy')

function onsubmit(ev) {
  ev.preventDefault();

  let data = new FormData(this);

  request
    .post('/api/images')
    .send(data)
    .end(function (err, res) {
      console.log(err, res);
    })
}

module.exports = function () {
  return yo`
  <div id="upload-form">
    <div class="toCenter">
      <div id="baby-dummy">${dummy}</div>
      <div id="image-upload-form">
        <form enctype="multipart/form-data" id="data-form-upload" onsubmit=${onsubmit}>
          <div class="file-upload-images">
              <input type="file" id="file" name="file" />
              <label for="file" class="label">NUEVO</label>
          </div>
          <div class="input-upload-images">
              <label for="name">NOMBRE</label>
              <input type="text" name="name"/>
          </div>
          <div class="input-submit-images">
            <button type="submit" action="#">
              <div class="upload-image"></div>
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
  `
}

