import Toast from '../../dist/toast/toast.js'

Page({
  data: {
    value1: Date.now(),
    value2: Date.now(),
    value3: '09:20',
    value4: Date.now(),
    value5: Date.now(),
    value6: Date.now(),
    value7: Date.now(),
    value8: Date.now(),
    value9: Date.now(),
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
    },
    displayFormat (items) {
      return `${items[0].label}年${items[1].label}月${items[2].label}日 ${items[3].label}:${items[4].label}`
    },
    beforeConfirm (value, resolve, picker) {
      picker.setData({
        loading: true
      })
      setTimeout(() => {
        picker.setData({
          loading: false
        })
        if (value > Date.now()) {
          resolve(false)
          Toast.error('不能选择大于今天的日期')
        } else {
          resolve(true)
        }
      }, 2000)
    }
  },
  /** picker触发confirm事件，同步触发confirm事件 */
  onConfirm ({ detail }) {
  },
  /** picker触发cancel事件，同步触发cancel事件 */
  onCancel () {
  },
  handleConfirm ({ detail }) {
    this.setData({
      value6: detail
    })
  }
})