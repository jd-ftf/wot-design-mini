
Page({
  data: {
    value: 1,
    value1:1,
  },
  handleBlur(){
    console.log("这是在父组件里的blur");
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
      console.log("延迟调用============");
      _this.setData({
        value1: detail.value
      })
    }, 1000)
  }
});