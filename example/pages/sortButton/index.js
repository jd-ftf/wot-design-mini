import Toast from '../../dist/toast/toast'
Page({
  handleClick (event) {
    Toast(`当前状态：${event.detail}`)
  }
})