let yo = require('yo-yo')

module.exports = function template (data) {
  console.log(data, 'piece')
  return yo`
    <div>${data}</div>
  `
}