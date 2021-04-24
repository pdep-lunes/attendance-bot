const isSameDay = (aDay, anotherDay) => aDay.getDate() === anotherDay.getDate() 
  && aDay.getMonth() === anotherDay.getMonth()
  && aDay.getFullYear() === anotherDay.getFullYear()

module.exports = {
  isSameDay,
}
