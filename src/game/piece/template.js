let yo = require('yo-yo')

module.exports = function template (data) {
  console.log(data)
  return yo`
    <div>${data}</div>
  `
}