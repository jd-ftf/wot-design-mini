import VueComponent from '../common/component'

VueComponent({
  data: {
    expandScrollTop: 0,
    shrinkScrollTop: 0,
    expandScrollLeft: 0,
    shrinkScrollLeft: 0,
    height: 0,
    width: 0,
    scrollEventCount: 0
  },
  methods: {
    onScrollHandler () {
    },
    scrollToBottom ({ height, width }) {
      // 计算 scrollTop 的极限值
      const maxHeight = 10000 * (height)
      const maxWidth = 10000 * (width)
      const target = {
        expandScrollTop: maxHeight,
        shrinkScrollTop: maxHeight,
        expandScrollLeft: maxWidth,
        shrinkScrollLeft: maxWidth
      }
      // 性能优化
      const diff = Object.keys(target).reduce((prev, key) => {
        if (target[key] !== this.data[key]) {
          prev[key] = target[key]
        }
        return prev
      }, {})
      if (Object.keys(diff).length === 0) return
      // 所有元素滚动到底部
      this.setData(diff)
    }
  },
  mounted () {
    this.query = this.createSelectorQuery()
      .in(this)
      .select('.wd-resize__container')
      .boundingClientRect()
    this.query.exec(([res]) => {
      const { width, height } = res
      // 立即填充父容器高宽
      this.setData({
        width,
        height
      })
      // 立即把4个滚动条拉到底
      this.scrollToBottom({
        height,
        width
      })
      // 闭包记录容器高度
      let lastHeight = height
      let lastWidth = width
      // 监听滚动事件
      this.onScrollHandler = () => {
        this.query.exec(([res]) => {
          // 前两次滚动事件被触发，说明 created 的修改已渲染，通知用户代码当前容器大小
          if (this.data.scrollEventCount++ === 0) {
            const result = {};
            ['bottom', 'top', 'left', 'right', 'height', 'width'].forEach(propName => {
              result[propName] = res[propName]
            })
            this.$emit('size', result)
          }
          // 滚动条拉到底部会触发两次多余的事件，屏蔽掉。
          if (this.scrollEventCount < 3) return
          // 手动设置父容器高宽，防止父容器坍塌
          this.setData({
            height: res.height,
            width: res.width
          })
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