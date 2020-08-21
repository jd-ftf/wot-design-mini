Page({
  options: {
    multipleSlots: true
  },
  data: {
    show: false,
    value1: '2',
    value2: '0',
    value3: '0',
    option1: [
      { text: '全部商品', value: '0' },
      { text: '新款商品', value: '1' },
      { text: '活动商品', value: '2' }
    ],
    option2: [
      { text: '综合', value: '0' },
      { text: '销量', value: '1' },
      { text: '上架时间', value: '2' }
    ],
    option3: [
      { text: '综合', value: 'a' },
      { text: '销量', value: 'b' },
      { text: '上架时间', value: 'c' }
    ]
  },
  click () {
    this.setData({ value1: '0' })
  },
  choose1 ({ detail }) {
    this.setData({ value1: detail.value })
  },
  choose2 ({ detail }) {
    this.setData({ value2: detail.value })
  },
  choose3 ({ detail }) {
    this.setData({ value3: detail.value })
  },
  confirm () {
    // 关闭下拉框
    const drop = this.selectComponent('#drop-menu')
    drop.close()
  }
})