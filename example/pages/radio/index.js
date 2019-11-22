Page({
  data: {
    value: 1
  },
  change (event) {
    this.setData({
      value: event.detail
    })
  }
})