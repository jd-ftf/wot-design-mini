Page({
  options: {
    multipleSlots: true
  },
  data: {
    value: '',
    value1: '',
    value2: '这是禁用状态',
    value3: '这是只读状态',
    value4: '支持清空',
    value5: 'password',
    value6: '',
    value7: '123456789123456789123456789',
    value8: '',
    value9: '',
    value10: '',
    value11: '该输入框禁用',
    value12: '12345678',
    value13: '',
    value14: '',
    value15: '',
    value16: ''
  },
  handleInput({ detail }) {
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
  handleChange2({ detail }) {
    this.setData({
      value5: detail
    })
  },
  handleChange3({ detail }) {
    this.setData({
      value6: detail
    })
  }
})