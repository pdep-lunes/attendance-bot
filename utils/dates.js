const isSameDay = (aDay, anotherDay) => aDay.getDate() === anotherDay.getDate() 
  && aDay.getMonth() === anotherDay.getMonth()
  && aDay.getFullYear() === anotherDay.getFullYear()

const getDateHeader = date => `${date.getDate().toString()}/${(date.getMonth() + 1).toString()}`
  
const createESDateFrom = dateString => [...dateString.split('/').reverse(), process.env.CURRENT_YEAR].join('/');

const getDateToFilter = content => new Date(createESDateFrom(content.split(' ')[1]));

module.exports = {
  isSameDay,
  getDateHeader,
  getDateToFilter
}
