Page({
  data: {
    value1: Date.now(),
    value2: Date.now(),
    value3: '09:20',
    value4: Date.now(),
    value5: Date.now(),
    formatter (type, value) {
      switch (type) {
      case 'year':
        return value + '年'
      case 'month':
        return value + '月'
      case 'date':
        return value + '日'
      case 'hour':
        return value + '时'
      case 'minute':
        return value + '分'
      default:
        return value
      }
    },
    filter (type, values) {
      if (type === 'year') {
        return values.filter(value => value % 5 === 0)
      }
      return values
    },
    displayFormat (items) {
      return `${items[0].label}年${items[1].label}月${items[2].label}日 ${items[3].label}:${items[4].label}`
    }
  },
  /** picker触发confirm事件，同步触发confirm事件 */
  onConfirm ({ detail }) {
  },
  /** picker触发cancel事件，同步触发cancel事件 */
  onCancel () {
  }
})