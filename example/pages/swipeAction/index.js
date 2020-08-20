import Toast from '../../dist/toast/toast'

Page({
  data: {
    value: 'close',
    beforeClose (reason, position) {
      if (reason === 'click') {
        Toast(`${reason} ${position}导致滑动按钮关闭`)
      } else {
        Toast(`${reason}导致${position}滑动按钮关闭`)
      }
    }
  },
  changeState (event) {
    const { value } = event.target.dataset
    this.setData({ value: value })
  },

  handleClick (event) {
    Toast(`点击${event.detail.value}关闭操作按钮`)
  },

  handleAction (event) {
    Toast(`点击了${event.target.dataset.action}`)
  }
})