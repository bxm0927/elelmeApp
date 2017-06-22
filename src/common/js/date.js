// 将 Sat Jul 23 2016 21:52:44 GMT+0800 (中国标准时间) 转化为 2016-7-23 21:52
// formatDate (time) {
//   let date = new Date(time)
//   return formatDate(date, 'YYYY-MM-DD hh:mm')
// }

export function formatDate (date, format) {
  var year = date.getFullYear()
  var month = date.getMonth() + 1
  var day = date.getDate()
  var hour = date.getHours()
  var minutes = date.getMinutes()
  var seconds = date.getSeconds()

  // 给一位数数据前面加 “0”
  if (month >= 1 && month <= 9) {
    month = '0' + month
  }
  if (day >= 0 && day <= 9) {
    day = '0' + day
  }
  if (hour >= 0 && hour <= 9) {
    hour = '0' + hour
  }
  if (minutes >= 0 && minutes <= 9) {
    minutes = '0' + minutes
  }
  if (seconds >= 0 && seconds <= 9) {
    seconds = '0' + seconds
  }

  if (/(Y+)/.test(format)) {
    format = format.replace(RegExp.$1, (year + '').substr(4 - RegExp.$1.length))
  }

  if (/(M+)/.test(format)) {
    format = format.replace(RegExp.$1, (month + ''))
  }

  if (/(D+)/.test(format)) {
    format = format.replace(RegExp.$1, (day + ''))
  }

  if (/(h+)/.test(format)) {
    format = format.replace(RegExp.$1, (hour + ''))
  }

  if (/(m+)/.test(format)) {
    format = format.replace(RegExp.$1, (minutes + ''))
  }
  if (/(s+)/.test(format)) {
    format = format.replace(RegExp.$1, (seconds + ''))
  }

  return format
}
