// 定义一些关于存储的通用方法

/**
 * 存储信息到本地 window.localStorage
 * @param  {[type]} argument [description]
 * @return {[type]}          [description]
 */
export function savaToLocal (id, key, value) {
  let seller = window.localStorage.__seller__
  // if 第一次进入，没有任何商家时执行（未创建 window.localStorage.__seller__）
  // else 非第一次进入，有部分商家时执行
  if (!seller) {
    seller = {}
    seller[id] = {}
  } else {
    seller = JSON.parse(seller)
    if (!seller[id]) {
      seller[id] = {}
    }
  }
  seller[id][key] = value
  // JSON.stringify() 方法用于将 JavaScript 值转换为 JSON 字符串。
  window.localStorage.__seller__ = JSON.stringify(seller)
}

/**
 * 读取本地 window.localStorage 信息
 * @param  def 如果读不到某key的value，就用默认值 def
 * @return {[type]}          [description]
 */
export function getFromLocal (id, key, def) {
  let seller = window.localStorage.__seller__
  // if 若没有存储过就去读，此时执行
  // else 若存储过了再去读，此时执行
  if (!seller) {
    return def
  }
  seller = JSON.parse(seller)[id]
  if (!seller) {
    return def
  }
  let result = seller[key]
  return result || def
}
