Page({
  options: {
    multipleSlots: true
  },
  data: {
    value1: '',
    value2: '这是禁用状态',
    value3: '这是只读状态',
    value4: '支持清空',
    value5: 'password',
    value6: '',
    value7: '134413441344134413441344134413441344134413441344134413441344134413441344134413441344134413441344134413441344134413441344',
    value8: '',
    value9: ''
  },
  handleInput({ detail }) {
    var value = detail.value
    var pos = detail.cursor
    
    this.setData({
      value1: value.replace(/11/g, '2')
    })
  },
  handleChange1 ({ detail }) {
    this.setData({
      value1: detail
    })
  },
  handleChange4({ detail }) {
    this.setData({
      value4: detail
    })
  },
  handleChange5({ detail }) {
    this.setData({
      value5: detail
    })
  },
  handleChange6({ detail }) {
    this.setData({
      value6: detail
    })
  }
})