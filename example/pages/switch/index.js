
Page({
  data: {
    checked1: true,
    checked2: '京麦',
    checked3: true,
    checked4: true,
    checked5: true,
    checked6: false
  },
  handleChange1 ({ detail }) {
    this.setData({
      checked1: detail.value
    })
  },
  handleChange2 ({ detail }) {
    this.setData({
      checked2: detail.value
    })
  },
  handleChange3 ({ detail }) {
    this.setData({
      checked3: detail.value
    })
  },
  handleChange4 ({ detail }) {
    this.setData({
      checked4: detail.value
    })
  }
})