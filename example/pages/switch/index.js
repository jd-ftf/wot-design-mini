
Page({
  data: {
    checked1: true,
    checked2: '京麦',
    checked3: true,
    checked4: true,
    checked5: true
  },
  handleChange1 ({ detail }) {
    this.setData({
      checked1: detail
    })
  },
  handleChange2 ({ detail }) {
    this.setData({
      checked2: detail
    })
  },
  handleChange3 ({ detail }) {
    this.setData({
      checked3: detail
    })
  },
  handleChange4 ({ detail }) {
    this.setData({
      checked4: detail
    })
  }
})
