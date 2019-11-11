Page({
  data: {
    show: false,
    actions: '',
    cancelText: '',
    show2: false
  },
  showActions1 () {
    this.updateData([
      {
        name: '选项1'
      }, {
        name: '选项2'
      }, {
        name: '选项3',
        subname: '描述信息'
      }
    ])
  },
  showActions2 () {
    this.updateData([
      {
        name: '颜色',
        color: '#0083ff'
      }, {
        name: '禁用',
        disabled: true
      }, {
        loading: true
      }
    ])
  },
  showActions3 () {
    this.updateData([
      {
        name: '选项1'
      }, {
        name: '选项2'
      }, {
        name: '选项3',
        subname: '描述信息'
      }
    ], '取消')
  },
  showActions4 () {
    this.setData({
      show2: true
    })
  },
  updateData (actions, cancelText) {
    this.setData({
      show: true,
      actions,
      cancelText
    })
  },
  close () {
    this.setData({
      show: false
    })
  },
  close2 () {
    this.setData({
      show2: false
    })
  }
})