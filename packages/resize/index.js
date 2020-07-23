import VueComponent from '../common/component'

VueComponent({
  data: {
    expandScrollTop: 0,
    shrinkScrollTop: 0,
    expandScrollLeft: 0,
    shrinkScrollLeft: 0,
    position: 'static',
    height: 0,
    width: 0
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
    const query = this.createSelectorQuery()
      .in(this)
      .select('.wd-resize__container')
      .boundingClientRect()
    query.exec(([res]) => {
      // 插槽脱离父容器文档流，需要手动设置父容器高宽，防止父容器坍塌。
      this.setData({
        // 初次挂载时先使用文档流，
        // 在此 event loop 中 可以获得正常的 layout 计算结算，
        // 在下一个帧(n 个 event loop)之后修改为绝对定位。脱离文档流，杜绝被父元素的样式影响。
        position: 'absolute',
        height: res.height,
        width: res.width
      })
      // 闭包记录容器高度
      let lastHeight = res.height
      let lastWidth = res.width
      this.scrollToBottom({
        height: lastHeight,
        width: lastWidth
      })
      this.onScrollHandler = () => {
        query.exec(([res]) => {
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
