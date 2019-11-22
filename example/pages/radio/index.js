Page({
  data: {
    value: 1,
    selectValue: null
  },
  change (event) {
    this.setData({
      selectValue: event.detail,
      value: event.detail
    })
  }
})