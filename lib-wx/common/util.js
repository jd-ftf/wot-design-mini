/**
 * @description 对num自动填充px
 * @param {Number} num
 * @return {string} num+px
 */
export function addUnit(num) {
  return Number.isNaN(Number(num)) ? num : `${num}px`;
}
/**
 * @description 获取当前页面栈顶(当前显示的页面)
 * @return {wx.Page}
 */

export function getContext() {
  const pages = getCurrentPages();
  return pages[pages.length - 1];
}
/**
 * @description 判断target是否对象
 * @param obj
 * @return {boolean}
 */

export function isObj(obj) {
  // Object.prototype.toString.call(obj).match(/\[object (\w+)\]/)[1].toLowerCase() === 'object'
  return typeof obj === 'object';
}
/**
 * @description 获取目标原始类型
 * @param target 任意类型
 * @returns {string} type 数据类型
 */

export function getType(target) {
  // 得到原生类型
  const typeStr = Object.prototype.toString.call(target); // 拿到类型值

  const type = typeStr.match(/\[object (\w+)\]/)[1]; // 类型值转小写并返回

  return type.toLowerCase();
}