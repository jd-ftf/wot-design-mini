import { isDef } from '../common/util'

// 本地时间戳
export const currentYear = new Date().getFullYear()
/** @description 判断时间戳是否合法 */
export const isValidDate = date => isDef(date) && !Number.isNaN(date)
/** @description 保证num不超出min和max的范围 */
export const range = (num, min, max) => Math.min(Math.max(num, min), max)
/** @description 不满10补0 */
export const padZero = val => `00${val}`.slice(-2)
/**
 * @description 生成n个元素，并使用iterator接口进行填充
 * @param n
 * @param iteratee
 * @return {any[]}
 */
export const times = (n, iteratee) => {
  let index = -1
  const result = Array(n < 0 ? 0 : n)
  while (++index < n) {
    result[index] = iteratee(index)
  }
  return result
}
/**
 * @description 还原数据，例如 2019年 ->getTrueValue-> 2019
 * @param {String} formattedValue
 * @return {Number}
 */
export const getTrueValue = (formattedValue) => {
  if (!formattedValue) return
  while (isNaN(parseInt(formattedValue, 10))) {
    formattedValue = formattedValue.slice(1)
  }
  return parseInt(formattedValue, 10)
}
/**
 * @description 获取某年某月有多少天
 * @param {Number} year
 * @param {Number} month
 * @return {Number} day
 */
export const getMonthEndDay = (year, month) => {
  return 32 - new Date(year, month - 1, 32).getDate()
}
/**
 * @description 所有选项的展示文案
 * @param {'date'|'year-month'|'time'|'datetime'} type
 * @param {String} value
 * @return {String} value
 */
export const defaultFormatter = (type, value) => value
/**
 * @description 默认的过滤选项
 * @param {'date'|'year-month'|'time'|'datetime'} type
 * @param {Array<{value,label}>} values
 * @return {Array<{value, label}>} 过滤后的values
 */
export const defaultFilter = (type, values) => values
/**
 * @description 自定义选中后展示文案的格式化函数
 * @param {Array<{value,label}>} items 所有选中项
 * @return {String} 展示的文案
 */
export const defaultDisplayFormat = function (items) {
  if (items.length === 0) return ''
  switch (this.data.type) {
  case 'date':
    return `${items[0].label}-${items[1].label}-${items[2].label}`
  case 'year-month':
    return `${items[0].label}-${items[1].label}`
  case 'time':
    return `${items[0].label}:${items[1].label}`
  case 'datetime':
    return `${items[0].label}-${items[1].label}-${items[2].label} ${items[3].label}:${items[4].label}`
  }
}