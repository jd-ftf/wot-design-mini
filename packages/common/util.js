/**
 * @description 对num自动填充px
 * @param {Number} num
 * @return {string} num+px
 */
export function addUnit (num) {
  return Number.isNaN(Number(num)) ? num : `${num}px`
}

/**
 * @description 获取当前页面栈顶(当前显示的页面)
 * @return {wx.Page}
 */
export function getContext () {
  const pages = getCurrentPages()
  return pages[pages.length - 1]
}

/**
 * @description 判断target是否对象
 * @param obj
 * @return {boolean}
 */
export function isObj (obj) {
  // Object.prototype.toString.call(obj).match(/\[object (\w+)\]/)[1].toLowerCase() === 'object'
  return typeof obj === 'object'
}
