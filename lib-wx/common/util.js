import debounce from './lodash/debounce';
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
/**
 * @description 默认的外部格式化函数 - picker组件
 * @param items
 * @param labelKey
 * @return {*}
 */

export const defaultDisplayFormat = function (items, {
  labelKey = 'value'
}) {
  // 在props中，this被指向了全局data
  return items.map(item => item[labelKey]).toString();
};
/**
 * @description 默认函数占位符 - pickerView组件
 * @param value
 * @return value
 */

export const defaultFunction = value => value;
/**
 * @description 是否不为空
 * @param value
 * @return {Boolean}
 */

export const isDef = value => value !== undefined && value !== null;
export { debounce };
/**
 * @description 防止数字小于零
 * @param {Number} num
 * @param {String} label 标签
 */

export const checkNumRange = (num, label = 'value') => {
  if (num < 0) {
    throw Error(`${label} shouldn't be less than zero`);
  }
};
/**
 * @description 防止pixel无意义
 * @param {Number} num
 * @param {String} label 标签
 */

export const checkPixelRange = (num, label = 'value') => {
  if (num <= 0) {
    throw Error(`${label} should be greater than zero`);
  }
};