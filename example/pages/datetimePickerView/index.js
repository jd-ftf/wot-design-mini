import Toast from '../../dist/toast/toast'

Page({
  data: {
    value1: Date.now(),
    value2: Date.now(),
    value3: Date.now(),
    value4: '11:12',
    value6: Date.now(),
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
      if (type === 'minute') {
        return values.filter(value => value % 5 === 0)
      }
      return values
    }
  },
  onChange ({ detail }) {
    Toast(`当前选中时间: ${detail}`)
  }
})