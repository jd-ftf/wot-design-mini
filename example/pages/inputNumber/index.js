Page({
  data: {
    value: 2
  },
  handleChange ({ detail }) {
    this.setData({
      value: detail
    })
  }
})