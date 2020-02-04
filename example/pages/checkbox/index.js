Page({
  data: {
    value1: '京麦',
    value2: [1]
  },
  handleChange1 (event) {
    this.setData({
      value1: event.detail
    })
  },
  handleChange2 (event) {
    this.setData({
      value2: event.detail
    })
  }
})