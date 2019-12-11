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
    axleWidth: 0,
    activeLineWidth: 0,
    activeLineLeft: 0,
    firstBallX: 0,
    secondBallX: 0
  },
  props: {
    hideMinMax: Boolean,
    hideLabel: Boolean,
    disabled: {
      type: Boolean,
      value: false
    },
    max: {
      type: Number,
      value: 100
    },
    min: {
      type: Number,
      value: 0
    },
    value: {
      type: null,
      value: 0,
      observer () {
        const { value } = this.data
        this.setData({
          handlePosition: typeof value === 'number'
            ? [this.value2Pos(value), 0]
            : [this.value2Pos(value[0]), this.value2Pos(value[1])]
        })
      }
    },
    step: {
      type: Number,
      value: 1
    },
    handlePosition: {
      type: Array,
      value: [0, 0],
      observer (newValue) {
        this.setData({
          activeLineWidth: newValue[0] - newValue[1],
          activeLineLeft: Math.min(newValue[0], newValue[1])
        })
      }
    }
  },
  created () {
    this.initState()
  },
  methods: {
    checkType (value) {
      return Object.prototype.toString.call(value).slice(8, -1)
    },
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
    initState () {
      const { value } = this.data
      Promise.all([
        this.getRect('.jm-slider__handle-container'),
        this.getRect('.jm-slider__axle')
      ]).then(rects => {
        const [container, axle] = rects
        if (!container || !axle || !container.width || !axle.width) return
        this.setData({
          axleWidth: axle.width,
          handleRadius: container.width / 2
        }, () => {
          this.setData({
            handlePosition: this.checkType(value) === 'Array'
              ? [this.value2Pos(value[0]), this.value2Pos(value[1])]
              : [this.value2Pos(value), 0]
          })
        })
      })
    },
    // 开始拖动事件
    slidingStart (event) {
      if (!this.data.disabled) {
        this.$emit('slidingstart', this.data.value)
      }
    },
    // 拖动事件
    sliding (event) {
      const touchX = event.touches[0].clientX
      const { value } = this.data
      let newValue
      if (!this.data.disabled) {
        this.getRect('.jm-slider__axle').then(rect => {
          // 线条左端点距离屏幕长度
          const axleX = rect.left
          const currentPos = touchX - axleX

          if (this.checkType(value) === 'Number') {
            newValue = this.pos2Value(currentPos)
          } else {
            const deltaLeft = Math.abs(currentPos - this.value2Pos(value[0]))
            const deltaRight = Math.abs(currentPos - this.value2Pos(value[1]))
            const currentValue = this.pos2Value(currentPos)
            newValue = deltaLeft < deltaRight ? [currentValue, value[1]] : [value[0], currentValue]
          }
          this.$emit('sliding', newValue)
          this.$emit('input', newValue)
        })
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
      const { min, max } = this.data
      value < min && (value = min)
      value > max && (value = max)
      return value
    },
    // 将pos转化为value
    pos2Value (pos) {
      const { axleWidth, max, min, step } = this.data
      const percent = pos / axleWidth
      const value = percent * (max - min) + min
      const res = min + Math.floor((value - min) / step) * step
      return this.fixValue(res)
    },
    // 将value转化为pos
    value2Pos (value) {
      const { min, max, axleWidth } = this.data
      const fixedValue = this.fixValue(value)
      // 移动距离的宽度比例
      const percent = (fixedValue - min) / (max - min)
      return percent * axleWidth
    }
  }
})