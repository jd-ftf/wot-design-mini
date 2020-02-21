Page({
  data: {
    value1: 5,
    value2: 3.5
  },
  changeValue1 ({ detail }) {
    this.setData({ value1: detail })
  },
  changeValue2({ detail }) {
    this.setData({ value2: detail })
  }
})