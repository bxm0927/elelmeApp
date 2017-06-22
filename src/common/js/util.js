// http://localhost:8080/?id=123&key=vaule#/seller

/**
 * 解析 URL
 * @example ?id=123&key=vaule
 * @return {id: 123, key: value}
 */
export function urlParse () {
  let url = window.location.search
  let obj = {}
  let reg = /[?&][^?&]+=[^?&]+/g
  let arr = url.match(reg) // ["?id=123", "&key=vaule"]

  if (arr) {
    arr.forEach((item) => {
      // 删除 ? 和 &，以 = 为标志分割数组
      let tempArr = item.substring(1).split('=') // ["id", "123"]  ["key", "vaule"]
      // 使用 decodeURIComponent() 对编码后的 URI 进行解码
      let key = decodeURIComponent(tempArr[0])
      let value = decodeURIComponent(tempArr[1])
      obj[key] = value
    })
  }
  return obj
}
