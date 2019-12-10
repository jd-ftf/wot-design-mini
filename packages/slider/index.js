import VueComponent from '../common/component'
VueComponent({
  externalClasses: [
    'custom-suffix-class',
    'custom-prefix-class',
    'custom-textarea-class',
    'custom-input-class'
  ],
  data: {
    handleRadius: 0,
    axleWidth: 0
  },
  props: {
    hideMinMax: Boolean,
    hideLabel: Boolean,
    disabled: {
      type: Boolean,
      value: false
    },
    maxValue: {
      type: Number,
      value: 100
    },
    minValue: {
      type: Number,
      value: 0
    },
    value: {
      type: null,
      value: 0,
      observer () {
      }
    },
    step: {
      type: Number,
      value: 1
    },
    handlePosition: {
      type: Array,
      observer () {
        console.log('应当更改')
      }
    }
  },
  created () {
    const { value } = this.data
    this.setData({
      handlePosition: typeof value === 'number'
        ? [this.value2Pos(value), 0]
        : [this.value2Pos(value[0]), this.value2Pos(value[1])]
    })
    console.log('handle: ', value, this.data.handlePosition)
  },
  mounted () {
    Promise.all([
      this.getRect('.jm-slider__handle-container'),
      this.getRect('.jm-slider__axle')
    ]).then(rects => {
      console.log('created: ', rects)
      const [container, axle] = rects
      if (!container || !axle || !container.width || !axle.width) return
      this.setData({
        axleWidth: axle.width,
        handleRadius: container.clientWidth / 2
      })
    })
  },
  methods: {
    getRect (select) {
      return new Promise(resolve => {
        this.createSelectorQuery()
          .select(select)
          .boundingClientRect(rect => {
            if (rect) {
              resolve(rect)
            }
          }).exec()
      })
    },
    // 开始拖动事件
    slidingStart () {
      if (!this.data.disabled) {
        console.log('开始拖动')
        this.$emit('slidingstart', this.data.value)
      }
    },
    // 拖动事件
    // TODO this：需要获取元素节点值
    sliding (event) {
      if (!this.disabled) {
        console.log('拖动中', event.changedTouches[0].clientX)
        this.setData({

        })
        // const touchX = event.changedTouches[0].clientX
        // this.getRect('.jm-slider__axle').then(rect => {
        //   console.log('offset获取：', rect.left)
        //   const axleX = rect.left
        //   const currentPos = touchX - axleX

        //   if (typeof this.data.value === 'number') {
        //     const value = this.pos2Value(currentPos)
        //     this.$emit('sliding', value)
        //     this.$emit('input', value)
        //   } else {
        //     const deltaLeft = Math.abs(currentPos - this.value2Pos(this.data.value[0]))
        //     const deltaRight = Math.abs(currentPos - this.value2Pos(this.data.value[1]))

        //     const value = this.pos2Value(currentPos)
        //     const currentValue = deltaLeft < deltaRight
        //       ? [value, this.data.value[1]]
        //       : [this.data.value[0], value]
        //     console.log(currentValue)
        //     this.$emit('sliding', currentValue)
        //     this.$emit('input', currentValue)
        //   }
        // })
        // const axleX = event.currentTarget.offsetLeft
      }
    },
    // 结束拖动事件
    slidingEnd () {
      if (!this.data.disabled) {
        this.$emit('slidingend', this.data.value)
      }
    },
    // 如果value超出限定值则设定为限定值
    fixValue (value) {
      const { minValue, maxValue } = this.data
      value < minValue && (value = minValue)
      value > maxValue && (value = maxValue)
      return value
    },
    // 将pos转化为value
    pos2Value (pos) {
      const { axleWidth, maxValue, minValue, step } = this.data
      const percent = pos / axleWidth
      const value = percent * (maxValue - minValue) + minValue
      const res = minValue + Math.floor((value - minValue) / step) * step
      return this.fixValue(res)
    },
    // 将value转化为pos
    value2Pos (value) {
      const { minValue, maxValue, axleWidth } = this.data
      const fixedValue = this.fixValue(value)
      const percent = (fixedValue - minValue) / (maxValue - minValue)
      return percent * axleWidth
    }
  }
})