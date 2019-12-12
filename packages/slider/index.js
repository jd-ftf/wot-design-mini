import VueComponent from '../common/component'
VueComponent({
  externalClasses: [
    'custom-suffix-class'
  ],
  data: {
    handleRadius: 0,
    showRight: false,
    axleWidth: 0,
    activeLineWidth: 0,
    activeLineLeft: 0,
    handlePosition: [0, 0],
    isTouch: false
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
      value: 100,
      observer (newValue) {
        if (newValue < 0) {
          this.setData({ max: 100 })
          throw Error('max value must be greater than 0')
        } else if (newValue <= this.data.min) {
          this.setData({ max: 100 })
          throw Error('max value must be greater than min value')
        }
      }
    },
    min: {
      type: Number,
      value: 0,
      observer (newValue) {
        if (newValue < 0) {
          this.setData({ min: 0 })
          throw Error('min value must be greater than 0')
        } else if (newValue >= this.data.max) {
          this.setData({ min: 0 })
          throw Error('min value must be less than max value')
        }
      }
    },
    value: {
      type: null,
      value: 0,
      observer (newValue, oldValue) {
        // 类型校验，支持所有值(除null、undefined。undefined建议统一写成void (0)防止全局undefined被覆盖)
        if (newValue === null || newValue === undefined) {
          throw Error('value can\'t be null or undefined')
        }
        const handlePosition = this.checkType(newValue) === 'Number'
          ? [this.value2Pos(newValue), 0]
          : [this.value2Pos(newValue[0]), this.value2Pos(newValue[1])]
        this.setData({
          value: this.fixValue(newValue),
          showRight: this.checkType(newValue) === 'Array',
          handlePosition
        })
        this.setData({
          activeLineWidth: Math.abs(handlePosition[0] - handlePosition[1]),
          activeLineLeft: Math.min(handlePosition[0], handlePosition[1])
        })
      }
    },
    step: {
      type: Number,
      value: 1,
      observer (newValue) {
        if (newValue <= 0) {
          this.setData({ step: 1 })
          throw Error('step must be greater than 0')
        }
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
    valueControl (oldValue) {
    },
    initState () {
      const { value } = this.data
      Promise.all([
        this.getRect('.jm-slider__handle-container'),
        this.getRect('.jm-slider__axle')
      ]).then(rects => {
        const [container, axle] = rects
        if (!container || !axle || !container.width || !axle.width) return
        this.data.axleWidth = axle.width
        this.data.handleRadius = container.width / 2
        this.setData({
          handlePosition: this.checkType(value) === 'Array'
            ? [this.value2Pos(value[0]), this.value2Pos(value[1])]
            : [this.value2Pos(value), 0]
        })
        this.setData({
          activeLineWidth: Math.abs(this.data.handlePosition[0] - this.data.handlePosition[1]),
          activeLineLeft: Math.min(this.data.handlePosition[0], this.data.handlePosition[1])
        })
      })
    },
    // 开始拖动事件
    handleTouchStart (event) {
      this.setData({ isTouch: true })
      if (this.data.isTouch) return
      if (!this.data.disabled) this.$emit('touchstart', this.data.value)
    },
    // 拖动事件
    handleTouchMove (event) {
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
          this.$emit('touchmove', newValue)
          this.$emit('input', newValue)
        })
      }
    },
    // 结束拖动事件
    handleTouchEnd () {
      this.setData({ isTouch: false })
      if (!this.data.disabled) {
        this.$emit('touchend', this.data.value)
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