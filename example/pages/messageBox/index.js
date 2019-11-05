import MessageBox from '../../dist/messageBox/messageBox.js'

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
      msg: (() => {
        let s = '1'
        for (let i = 0; i <= 500; i++) {
          s = s + '1'
        }
        return s
      })(),
      title: '标题'
    })
  },
  withSlot () {
    MessageBox({
      selector: '#jm-message-box-slot'
    })
  }
})
