Page({
  data: {
    value1: '',
    value2: '初始文案',
    value3: '',
    searchType: '全部',
    menu: [
      {
        content: '全部'
      }, {
        content: '订单号'
      }, {
        content: '退款单号'
      }
    ]
  },
  focus () {
    console.log('聚焦')
  },
  blur () {
    console.log('失焦')
  },
  search (e) {
    console.log('搜索', e)
  },
  clear () {
    console.log('重置')
  },
  cancel () {
    console.log('取消')
  },
  change (e) {
    console.log('输入', e)
  },
  changeSearchType ({ detail: { item } }) {
    this.setData({
      searchType: item.content
    })
  }
})