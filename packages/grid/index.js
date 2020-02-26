import VueComponent from '../common/component'

VueComponent({
  props: {
    clickable: Boolean,
    square: Boolean,
    column: {
      type: Number,
      observer (newValue) {
        if (newValue <= 0) {
          throw Error('The number of columns attribute value is invalid. The attribute must be greater than 0 and it is not recommended to use a larger value attribute.')
        }
      }
    },
    border: {
      type: Boolean,
      value: true
    },
    gutter: Number
  },
  relations: {
    '../gridItem/index': {
      type: 'child',
      linked (target) {
        this.children = this.children || []
        this.children.push(target)
      },
      unlinked (target) {
        this.children = this.children.filter(child => child !== target)
      }
    }
  },
  mounted () {
    if (!this.data.border) return
    const { length } = this.children
    this.children.forEach((item, index) => {
      const { column } = this.data
      if (column) {
        const isRightItem = length - 1 === index || (index + 1) % column === 0
        const isFirstLine = (index + 1) <= column

        isFirstLine && item.set('itemClass', 'is-first')
        isRightItem && item.set('itemClass', 'is-right')
        !isFirstLine && !isRightItem && item.set('itemClass', 'is-border')

        // 没有完全替换时, 倒数第二行最后一个
        if (index === length - (length % column) - 1) {
          item.set('itemClass', 'is-last')
        }
      } else {
        item.set('itemClass', 'is-first')
      }
      if (length - 1 === index) {
        item.set('itemClass', 'is-last')
      }
    })
  }
})