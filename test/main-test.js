'use strict'

const test = require('ava')
const app = require('../app')
const request = require('supertest')

const uuid = require('uuid-base62')

const user = `user_${uuid.uuid()}`

test.beforeEach(t => {
  t.context.username = user
  t.context.request = request(app)
})

test.cb('sign up', t => {
  let username = t.context.username

  t.context.request
    .post('/signup')
    .send({
      username: username,
      password: 'aRandomPassw0rd'
    })
    .expect(200)
    .end(function (err, res) {
      if (err) throw err
      t.falsy(err)
      t.is(res.body.message, `hi ${username}`)
      t.end()
    })
})
