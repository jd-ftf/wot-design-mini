import Toast from '../../dist/toast/toast'

Page({
  data: {
    show: false,
    content: '显示内容',
    menu: [
      {
        name: 'person',
        content: '全部标记已读'
      },
      {
        name: 'close-fill',
        content: '清空最近会话'
      }
    ]
  },
  hide () {
    this.setData({ show: !this.data.show })
  },
  onShow () {
    console.log('显示')
  },
  onHide () {
    Toast('文字提示关闭')
  },
  link (param) {
    const data = param.detail.item
    console.log('调用', data)
  }
})