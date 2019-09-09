
Page({
  data: {
    checked1: true,
    checked2: true,
  },

  onChange1({ detail }) {
    this.setData({
      checked1:detail
    })
  },

  asyncChange({ detail }) {
    let _this = this;
    console.log("异步调用")
    wx.showToast({
      title: '加载中',
      icon: 'loading',
      duration: 10000
    })

    setTimeout(function () {
      wx.hideToast();
      _this.setData({
        checked2: detail
      })
    }, 1000)
  }
});