Page({
  data: {
    value: 2
  },
  handleChange (event) {
    this.setData({
      value: event.detail
    })
  }
})