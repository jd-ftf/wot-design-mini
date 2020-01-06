Page({
  data: {
    show: false,
    content: '显示显示显示显示显示显示显示显示显示显示显示显示显示',
    menu: [
      {
        name: 'close-fill',
        title: '全部标记已读'
      },
      {
        name: 'close-fill',
        title: '清空最近会话'
      }
    ]
  },
  methods: {
    hide () {
      this.setData({ show: true })
    }
  }
})