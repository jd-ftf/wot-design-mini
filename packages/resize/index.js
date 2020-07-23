import VueComponent from '../common/component'

VueComponent({
  data: {
    expandScrollTop: 0,
    shrinkScrollTop: 0,
    expandScrollLeft: 0,
    shrinkScrollLeft: 0
  },
  methods: {
    onScrollHandler () {
    },
    scrollToBottom ({ height, width }) {
      // 计算 scrollTop 的极限值
      const maxHeight = 10000 * (height)
      const maxWidth = 10000 * (width)
      // 所有元素滚动到底部
      this.setData({
        expandScrollTop: maxHeight,
        shrinkScrollTop: maxHeight,
        expandScrollLeft: maxWidth,
        shrinkScrollLeft: maxWidth
      })
    }
  },
  mounted () {
    const query = this.createSelectorQuery()
      .in(this)
      .select('.wd-resize')
      .boundingClientRect()
    query.exec(([res]) => {
      // 闭包记录容器高度
      let lastHeight = res.height
      let lastWidth = res.width
      this.scrollToBottom({
        height: lastHeight,
        width: lastWidth
      })
      this.onScrollHandler = () => {
        query.exec(([res]) => {
          // 滚动完，重新获取容器新的高度
          const newHeight = res.height || 1
          const newWidth = res.width || 1
          const emitStack = []
          if (newHeight !== lastHeight) {
            lastHeight = newHeight
            emitStack.push(1)
          }
          if (newWidth !== lastWidth) {
            lastWidth = newWidth
            emitStack.push(1)
          }
          if (emitStack.length !== 0) {
            const result = {};
            ['bottom', 'top', 'left', 'right', 'height', 'width'].forEach(propName => {
              result[propName] = res[propName]
            })
            this.$emit('size', result)
          }
          this.scrollToBottom({
            height: lastHeight,
            width: lastWidth
          })
        })
      }
    })
  }
})
