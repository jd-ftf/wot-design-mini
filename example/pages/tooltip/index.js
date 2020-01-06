Page({
  data: {
    show: false,
    content: '显示内容',
    menu: [
      {
        name: 'person',
        title: '全部标记已读'
      },
      {
        name: 'close-fill',
        title: '清空最近会话'
      }
    ]
  },
  hide () {
    this.setData({ show: !this.data.show })
  }
})