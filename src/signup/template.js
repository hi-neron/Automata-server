'use strict'

const yo = require('yo-yo')

module.exports = yo`
<div class="sign">
  <form class="signup-form" action="/signup" method="POST">
    <div class="signin-up">
      <div class="divisor first"></div>
      <div class="input-sign">
        <input id="sign-username" type="text" name="username" autocomplete="off"/>
        <label for="sign-username" class="label"/>nombre</label>
      </div>
      <div class="input-sign">
        <input id="sign-password" type="password" name="password"/>
        <label for="sign-password" class="label"/>password</label>
      </div>
      <div class="input-sign">
        <input id="sign-email" type="email" name="email" autocomplete="off"/>
        <label for="sign-email" class="label"/>email</label>
      </div>
      <div class="divisor"></div>
      <div class="input-sign">
        <button type="submit">
          <div class="signup-button"></div>
        </button>
      </div>
      <div class="bottom-sign">
        <a class="already" href="/#!/signin">Already have account</a>
        <a class="facebook-signup" href="#"></a>
      </div>
    </div>
  </form>
</div>`
