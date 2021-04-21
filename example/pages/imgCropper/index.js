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
        const tempFilePaths = res.tempFilePaths[0]
        that.setData({
          show: true,
          src: tempFilePaths
        })
      }
    })
  },
  handleConfirm (event) {
    const { url } = event.detail
    jd.showLoading({
      title: '加载中'
    })
    const _this = this
    jd.uploadFile({
      url: 'https://ftf.jd.com/api/uploadImg',
      filePath: url,
      name: 'file',
      formData: {},
      success (res) {
        jd.hideLoading()
        _this.setData({
          imgSrc: url
        })
        // do something
      },
      fail () {
        jd.hideLoading()
      }
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
  }
})