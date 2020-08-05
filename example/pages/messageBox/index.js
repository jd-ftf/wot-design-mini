import MessageBox from '../../dist/messageBox/messageBox'

Page({
  data: {
    value: 1
  },
  changeValue ({ detail }) {
    this.setData({ value: detail })
  },
  alert () {
    MessageBox.alert('操作成功')
  },
  alertWithTitle () {
    MessageBox.alert({
      msg: '提示文案',
      title: '标题'
    })
  },
  confirm () {
    MessageBox.confirm({
      msg: '是否删除',
      title: '提示'
    }).then(() => {
      MessageBox.alert('删除成功')
    })
  },
  prompt () {
    MessageBox.prompt({
      title: '请输入邮箱',
      inputPattern: /.+@.+\..+/i
    })
  },
  alertWithLongChar () {
    MessageBox.alert({
      msg: '以上文字是示意以上文字是示意以上文字是示意以上文字是示意以上文字是示意以上文字是示意以上文字是示意以上文字是示意以上文字是示意以上文字是示意以上文字是示意以上文字是示意以上文字是示意以上文字是示意以上文字是示意以上文字是示意以上文字是示意以上文字是示意以上文字是示意以上文字是示意以上文字是示意以上文字是示意以上文字是示意以上文字是示意以上文以上文字是示意以上文字是示意以上文字是示意以上文字是示意以上文字是示意以上文字是示意以上文字是示意以上文字是示意以上文字是示意以上文字是示意以上文字是示意以上文字是示意以上文字是示意以上文字是示意以上文字是示意以上文字是示意以上文字是示意以上文字是示意以上文字是示意以上文字是示意以上文字是示意以上文字是示意以上文字是示意以上文字是示意以上文',
      title: '标题'
    })
  },
  withSlot () {
    MessageBox({
      title: '评分',
      selector: '#wd-message-box-slot'
    })
  }
})