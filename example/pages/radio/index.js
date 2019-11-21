Page({
  data: {
    value: 3,
    child: 1
  },
  change (event) {
    console.log('Event:change. the selected value is ' + event.detail)
  },
  onReady () {
    setTimeout(() => {
      this.setData({ child: 1 })
    }, 3000)

    setTimeout(() => {
      this.setData({ child: 3 })
    }, 4000)

    setTimeout(() => {
      this.setData({
        child: 1,
        value: 2
      })
    }, 5000)
  }
})