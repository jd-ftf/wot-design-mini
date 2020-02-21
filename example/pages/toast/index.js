import Toast from '../../dist/toast/toast.js'

Page({
  showToast () {
    Toast('提示信息')
  },
  showSuccessToast () {
    Toast.success('操作成功')
  },
  showErrorToast () {
    Toast.error('手机验证码输入错误，请重新输入')
  },
  showWarnToast () {
    Toast.warning('提示信息')
  },
  showTopToast () {
    Toast({
      position: 'top',
      msg: '提示信息'
    })
  },
  showBottomToast () {
    Toast({
      position: 'bottom',
      msg: '提示信息'
    })
  },
  showLoadingToast () {
    Toast.loading('3s后调用close关闭')
    setTimeout(() => {
      Toast.close()
    }, 3000)
  }
})
