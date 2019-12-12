Page({
  data: {
    label: ''
  },
  handleChange (event) {
    this.setData({
      label: event.detail
    })
  }
})