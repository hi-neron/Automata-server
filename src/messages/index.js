module.exports = function (ctx, next) {
  let container = document.getElementById('messages')
  if (container.innerText !== "") {
    container.classList.add('visible-message')
    setTimeout(() =>{
      container.classList.remove('visible-message')
      container.innerText = ""
    }, 2000);
  }
  next()
}
