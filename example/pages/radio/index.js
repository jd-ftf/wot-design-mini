Page({
  data: {
    value: 1,
    child: 3
  },
  change (e) {
  },
  onReady () {
    setTimeout(() => {
      this.setData({ child: 1 })
    }, 5000)
  }
})