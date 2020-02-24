Page({
  data: {
    value1: 1,
    value2: 1,
    value3: 1,
    value4: 2,
    value5: 1,
    value6: '1.205',
    value7: 1,
    value8: 2
  },
  handleChange1 ({ detail }) {
    this.setData({
      value1: detail
    })
  },
  handleChange2 ({ detail }) {
    this.setData({
      value2: detail
    })
  },
  handleChange3 ({ detail }) {
    this.setData({
      value3: detail
    })
  },
  handleChange4 ({ detail }) {
    this.setData({
      value4: detail
    })
  },
  handleChange5 ({ detail }) {
    this.setData({
      value5: detail
    })
  },
  handleChange6 ({ detail }) {
    this.setData({
      value6: detail
    })
  },
  handleChange7 ({ detail }) {
    this.setData({
      value7: detail
    })
  },
  handleChange8 ({ detail }) {
    this.setData({
      value8: detail
    })
  }
})