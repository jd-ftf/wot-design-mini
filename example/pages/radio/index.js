Page({
  data: {
    value: 1,
    value0: 1,
    value1: 1,
    value2: 1,
    value3: 1,
    value4: 1,
    value5: 1,
    value6: 1
  },
  change (event) {
    const index = event.target.dataset.index
    this.setData({
      [`value${index}`]: event.detail
    })
  }
})