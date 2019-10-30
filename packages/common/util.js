export function addUnit (num) {
  return Number.isNaN(Number(num)) ? num : `${num}px`
}
