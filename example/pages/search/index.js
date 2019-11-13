Page({
  data: {
    initValue: ''
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
  input (e) {
    console.log('输入', e)
  },
  onReady () {
    setTimeout(() => {
      this.setData({ initValue: '初始文案' })
    }, 1000)
  }
})