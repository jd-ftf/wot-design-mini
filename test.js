const isEqual = (value1, value2) => {
  if (value1 === value2) return true
  if (!(value1 instanceof Array)) return false
  if (!(value2 instanceof Array)) return false
  if (value1.length !== value2.length) return false
  for (let i = 0; i !== value1.length; ++i) {
    if (value1[i] !== value2[i]) return false
  }
  return true
}
console.log(isEqual([1, 2, 3], [1, 2, 3]))
console.log(isEqual([1, 2, 3], ['1', 2, 3]))
console.log(isEqual([1, 2, 3], [2, 2, 3]))
console.log(isEqual([1, 2, 3], [1, 3, 2]))
console.log(isEqual([1, 2, 3], [1, 3, 3]))
console.log(isEqual(1, '1'))