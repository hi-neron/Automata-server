let yo = require('yo-yo')

module.exports = {
  drawDate: (contribDate) => {
    let date = new Date(contribDate)

    let month
    switch (date.getMonth()) {
      case 0:
        month = 'enero'
        break;
      case 1:
        month = 'febrero'
        break;
      case 2:
        month = 'marzo'
        break;
      case 3:
        month = 'abril'
        break;
      case 4:
        month = 'mayo'
        break;
      case 5:
        month = 'junio'
        break;
      case 6:
        month = 'julio'
        break;
      case 7:
        month = 'agosto'
        break;
      case 8:
        month = 'septiembre'
        break;
      case 9:
        month = 'octubre'
        break;
      case 10:
        month = 'noviembre'
        break;
      case 11:
        month = 'diciembre'
        break;
    }

    let myHour = date.getHours()

    let newHour =  myHour < 12 ? myHour: myHour - 12
    let meridian = myHour < 12 ? 'am': 'pm'

    let dateString = yo`<span class="date">El ${date.getDate()} de ${month}, ${date.getFullYear()} / ${newHour} ${meridian}</span>`

    return dateString
  }
}