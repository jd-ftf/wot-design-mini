
Page({
  data: {
    value: 1,
    value1:1,
  },
  handleChange1 ({ detail }) {
    this.setData({
      value1: detail.value
    })
  },
  asyncChange({detail}) {

    let _this = this;

    wx.showToast({
      title: '加载中',
      icon: 'loading',
      duration: 10000
    })

    setTimeout(function () {
      wx.hideToast();
      _this.setData({
        value1: detail.value
      })
    }, 1000)
  }
});