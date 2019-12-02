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

export const getTrueValue = (formattedValue) => {
  if (!formattedValue) return
  while (isNaN(parseInt(formattedValue, 10))) {
    formattedValue = formattedValue.slice(1)
  }
  return parseInt(formattedValue, 10)
}

export const getMonthEndDay = (year, month) => {
  return 32 - new Date(year, month - 1, 32).getDate()
}