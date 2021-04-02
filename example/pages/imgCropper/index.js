Page({
  data: {
    src: '',
    imgSrc: '',
    show: false
  },
  upload () {
    const that = this
    jd.chooseImage({
      count: 1,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success (res) {
        jd.showLoading({
          title: '加载中'
        })
        const tempFilePaths = res.tempFilePaths[0]
        that.setData({
          show: true,
          src: tempFilePaths
        }, () => {
          jd.hideLoading()
        })
      }
    })
  },
  handleConfirm (event) {
    const { url } = event.detail
    this.setData({
      src: url,
      imgSrc: url
    })
  },
  imgLoaderror (res) {
    console.log('加载失败', res)
  },
  imgLoaded (res) {
    console.log('加载成功', res)
  },
  handleCancel (event) {
    console.log('取消', event)
  },
  preview () {
    jd.previewImage({
      current: this.data.imgSrc, // 当前显示图片的http链接
      urls: [this.data.imgSrc] // 需要预览的图片http链接列表
    })
  }
})