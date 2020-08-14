Page({
  options: {
    multipleSlots: true
  },
  data: {
    value: '',
    value1: '这是禁用状态',
    value2: '这是只读状态',
    value3: '123456',
    value4: '支持清空',
    value5: 'password',
    value6: '',
    value7: '1234',
    value8: '',
    value9: '',
    value10: '支持清空和字数限制的文本域',
    value11: '输入文字后，输入框高度跟随字数多少变化',
    value12: '',
    value13: '该输入框禁用',
    value14: '12345678',
    value15: '',
    value16: '',
    value17: '',
    value18: '',
    value19: ''
  },
  handleInput ({ detail }) {
    var value = detail.value

    this.setData({
      value1: value.replace(/11/g, '2')
    })
  },
  handleChange ({ detail }) {
    this.setData({
      value: detail
    })
  },
  handleChange1 ({ detail }) {
    this.setData({
      value4: detail
    })
  },
  handleChange2 ({ detail }) {
    this.setData({
      value5: detail
    })
  },
  handleChange3 ({ detail }) {
    this.setData({
      value6: detail
    })
  }
})