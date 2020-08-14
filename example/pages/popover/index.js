import Toast from '../../dist/toast/toast'

Page({
  data: {
    menu: [
      {
        iconClass: 'read',
        content: '全部标记已读'
      },
      {
        iconClass: 'delete',
        content: '清空最近会话'
      },
      {
        iconClass: 'detection',
        content: '消息订阅设置'
      },
      {
        iconClass: 'subscribe',
        content: '消息异常检测'
      }
    ]
  },
  link ({ detail: { item } }) {
    Toast('选择了' + item.content)
  }
})