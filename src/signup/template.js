'use strict'

const yo = require('yo-yo')

module.exports = yo`
<div class="sign">
  <form class="signup-form" action="/signup" method="POST">
    <div class="signin-up">
      <div class="divisor first"></div>
      <div class="input-sign">
        <input id="sign-forename" type="text" name="forename" placeholder="NOMBRE" autocomplete="off"/>
      </div>
      <div class="input-sign">
        <input id="sign-username" type="text" name="username" placeholder="USUARIO" autocomplete="off"/>
      </div>
      <div class="input-sign">
        <input id="sign-password" type="password" placeholder="PASSWORD" name="password"/>
      </div>
      <div class="input-sign">
        <input id="sign-email" type="email" name="email" placeholder="E-MAIL" autocomplete="off"/>
      </div>
      <div class="divisor"></div>
      <div class="input-sign">
        <button type="submit">
          <div class="signup-button"></div>
        </button>
      </div>
      <div class="bottom-sign">
        <a class="already" href="/#!/signin">¿Ya había pactado?</a>
        <a class="facebook-signup" href="#"></a>
      </div>
    </div>
  </form>
</div>`
