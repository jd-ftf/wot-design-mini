Page({
  focus () {
    console.log('聚焦')
  },
  blur () {
    console.log('失焦')
  },
  search () {
    console.log('搜索')
  },
  clear () {
    console.log('重置')
  },
  cancel () {
    console.log('取消')
  },
  input (e) {
    console.log('输入', e)
  }
})
