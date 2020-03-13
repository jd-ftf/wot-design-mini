import Toast from '../../dist/toast/toast'

Page({
  data: {
    value: 0
  },
  handleClick (event) {
    Toast(`当前状态：${event.detail}`)
  }
})