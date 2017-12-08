'use strict'

const yo = require('yo-yo')

module.exports = yo`
<div class="sign">
  <form class="signup-form" action="/login" method="POST">
    <div class="signin-up">
      <div class="divisor first"></div>
      <div class="input-sign">
        <label for="username" class="label"/>usuario</label>
        <input id="sign-username" type="text" name="username" autocomplete="off"/>
      </div>
      <div class="input-sign">
        <label for="password" class="label"/>password</label>
        <input id="sign-password" type="password" name="password"/>
      </div>
      <div class="divisor"></div>
      <div class="input-sign">
        <button type="submit">
          <div class="signup-button"></div>
        </button>
      </div>
      <div class="bottom-sign">
        <a class="already" href="/#!/signup">Crear una cuenta</a>
        <a class="facebook-signup" href="#"></a>
      </div>
    </div>
  </form>
</div>`
