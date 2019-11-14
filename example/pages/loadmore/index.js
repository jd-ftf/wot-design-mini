Page({
  data: {
    state: 'loading',
    num: 10,
    max: 100
  },
  onReachBottom () {
    const { num, max } = this.data
    if (num === 50) {
      this.setData({
        state: 'error'
      })
    } else if (num < max) {
      this.loadmore()
    } else if (num === max) {
      this.setData({
        state: 'finished'
      })
    }
  },
  reload () {
    this.loadmore()
  },
  loadmore () {
    const { num } = this.data
    setTimeout(() => {
      this.setData({
        num: num + 10,
        state: 'loading'
      })
    }, 200)
  }
})