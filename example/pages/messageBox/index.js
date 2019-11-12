import MessageBox from '../../dist/messageBox/messageBox'

Page({
  alert () {
    MessageBox.alert('提示文案')
  },
  alertWithTitle () {
    MessageBox.alert({
      msg: '提示文案',
      title: '标题'
    })
  },
  confirm () {
    MessageBox.confirm({
      msg: '提示文案',
      title: '标题'
    })
  },
  prompt () {
    MessageBox.prompt({
      title: '邮箱',
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
      selector: '#jm-message-box-slot'
    })
  }
})
