import VueComponent from '../common/component'
// VueComponent({
//   externalClasses: [
//     'custom-min-class',
//     'custom-max-class'
//   ],
//   data: {
//     handleRadius: 0,
//     showRight: false,
//     axleWidth: 0,
//     activeLineWidth: 0,
//     activeLineLeft: 0,
//     handlePosition: [0, 0]
//   },
//   props: {
//     hideMinMax: Boolean,
//     hideLabel: Boolean,
//     disabled: {
//       type: Boolean,
//       value: false
//     },
//     max: {
//       type: Number,
//       value: 100,
//       observer (newValue) {
//         if (newValue < 0) {
//           this.setData({ max: 100 })
//           console.warn('max value must be greater than 0')
//         } else if (newValue <= this.data.min) {
//           this.setData({ max: 100 })
//           console.warn('max value must be greater than min value')
//         }
//       }
//     },
//     min: {
//       type: Number,
//       value: 0,
//       observer (newValue) {
//         if (newValue < 0) {
//           this.setData({ min: 0 })
//           console.warn('min value must be greater than 0')
//         } else if (newValue >= this.data.max) {
//           this.setData({ min: 0 })
//           console.warn('min value must be less than max value')
//         }
//       }
//     },
//     value: {
//       type: null,
//       value: 0,
//       observer (newValue, oldValue) {
//         // 类型校验，支持所有值(除null、undefined。undefined建议统一写成void (0)防止全局undefined被覆盖)
//         if (newValue === null || newValue === undefined) {
//           this.setData({ value: oldValue })
//           console.warn('value can\'t be null or undefined')
//         } else if (this.checkType(newValue) === 'Array' && newValue.length !== 2) {
//           throw Error('value must be dyadic array')
//         } else if (this.checkType(newValue) !== 'Number' && this.checkType(newValue) !== 'Array') {
//           this.setData({ value: oldValue })
//           console.warn('value must be dyadic array Or Number')
//         }
//         this.setData({
//           value: this.fixValue(newValue),
//           showRight: this.checkType(newValue) === 'Array'
//         })
//         this.sliderControl()
//       }
//     },
//     step: {
//       type: Number,
//       value: 1,
//       observer (newValue) {
//         if (newValue <= 0) {
//           this.setData({ step: 1 })
//           console.warn('step must be greater than 0')
//         }
//       }
//     }
//   },
//   mounted () {
//     this.initState()
//   },
//   methods: {
//     checkType (value) {
//       return Object.prototype.toString.call(value).slice(8, -1)
//     },
//     getRect (select) {
//       return new Promise(resolve => {
//         this.createSelectorQuery()
//           .select(select)
//           .boundingClientRect(rect => {
//             rect && resolve(rect)
//           }).exec()
//       })
//     },
//     sliderControl () {
//       const { value } = this.data
//       const handlePosition = this.checkType(value) === 'Number'
//         ? [this.value2Pos(value), 0]
//         : [this.value2Pos(value[0]), this.value2Pos(value[1])]
//       this.setData({
//         handlePosition,
//         activeLineWidth: Math.abs(handlePosition[0] - handlePosition[1]),
//         activeLineLeft: Math.min(handlePosition[0], handlePosition[1])
//       })
//     },
//     initState () {
//       Promise.all([
//         this.getRect('.jm-slider__handle-container'),
//         this.getRect('.jm-slider__axle')
//       ]).then(rects => {
//         const [container, axle] = rects
//         if (!container || !axle || !container.width || !axle.width) return
//         this.setData({
//           axleWidth: axle.width,
//           handleRadius: container.width / 2
//         })
//         this.sliderControl()
//       })
//     },
//     // 开始拖动事件
//     handleTouchStart () {
//       if (!this.data.disabled) this.$emit('dragstart', this.data.value)
//     },
//     // 拖动事件
//     handleTouchMove (event) {
//       const touchX = event.touches[0].clientX
//       const { value } = this.data
//       let newValue
//       if (!this.data.disabled) {
//         this.getRect('.jm-slider__axle').then(rect => {
//           // 线条左端点距离屏幕长度
//           const axleX = rect.left
//           const currentPos = touchX - axleX
//           if (this.checkType(value) === 'Number') {
//             newValue = this.pos2Value(currentPos)
//           } else {
//             // 在这个地方把数据限制死
//             const deltaLeft = Math.abs(currentPos - this.value2Pos(value[0]))
//             const deltaRight = Math.abs(currentPos - this.value2Pos(value[1]))
//             const currentValue = this.pos2Value(currentPos)
//             newValue = deltaLeft < deltaRight ? [currentValue, value[1]] : [value[0], currentValue]
//           }
//           this.$emit('dragmove', newValue)
//         })
//       }
//     },
//     // 结束拖动事件
//     handleTouchEnd () {
//       if (!this.data.disabled) {
//         this.$emit('dragend', this.data.value)
//       }
//     },
//     // 如果value超出限定值则设定为限定值
//     fixValue (value) {
//       const { min, max } = this.data
//       if (this.checkType(value) !== 'Array') {
//         value < min && (value = min)
//         value > max && (value = max)
//       } else {
//         value[0] < min && (value[0] = min)
//         value[1] > max && (value[1] = max)
//       }
//       return value
//     },
//     // 将pos转化为value
//     pos2Value (pos) {
//       const { axleWidth, max, min, step } = this.data
//       const percent = pos / axleWidth
//       const value = percent * (max - min) + min
//       const res = min + Math.floor((value - min) / step) * step
//       return this.fixValue(res)
//     },
//     // 将value转化为pos
//     value2Pos (value) {
//       const { min, max, axleWidth } = this.data
//       const fixedValue = this.fixValue(value)
//       // 移动距离的宽度比例
//       const percent = (fixedValue - min) / (max - min)
//       return percent * axleWidth
//     }
//   }
// })

VueComponent({
  data: {
  },
  props: {
    hideMinMax: Boolean,
    hideLabel: Boolean,
    disabled: {
      type: Boolean,
      value: false
    },
    inactiveColor: {
      type: String,
      value: '#e5e5e5'
    },
    activeColor: {
      type: String,
      value: '#1989fa'
    },
    barStyle: {
      type: String,
      value: 'width:50%;height:6px'
    },
    max: {
      type: Number,
      value: 100
    },
    min: {
      type: Number,
      value: 0
    },
    step: {
      type: Number,
      value: 1
    },
    value: {
      type: Number,
      value: 0,
      observer (newValue) {
        this.updateValue(newValue)
      }
    },
    barHeight: {
      type: String,
      value: '6px'
    }
  },
  mounted () {
    // Promise.all([
    //   this.getRect('.jm-slider__bar-wrapper'),
    //   this.getRect('.jm-slider')
    // ]).then(rects => {
    //   const [container, axle] = rects
    //   if (!container || !axle || !container.width || !axle.width) return
    // })
    this.getRect('.jm-slider__bar-wrapper').then(rect => {
      if (!rect || !rect.width) return
      // 进度条总长度
      this.barWidth = rect.width
      // 单元距离百分
    })
    this.updateValue(this.data.value)
  },
  methods: {
    // 将pos转化为value
    pos2Value (pos) {
      const { axleWidth, max, min, step } = this.data
      const percent = pos / axleWidth
      const value = percent * (max - min) + min
      const res = min + Math.floor((value - min) / step) * step
      return res
    },
    // 将value转化为pos
    value2Pos (value) {
      const { min, max } = this.data
      // 单元距离百分比
      const percent = (value - min) / (max - min)
      return percent * this.barWidth
    },
    startDataSet (event) {
      const touch = event.touches[0]
      // 垂直？ 水平
      this.direction = ''
      this.deltaX = 0
      this.offsetX = 0
      // 元素当前位置
      this.startX = touch.clientX
    },
    moveDataSet (event) {
      const touch = event.touches[0]
      // 滚轮的初始位置
      this.deltaX = touch.clientX - this.startX
      this.offsetX = Math.abs(this.deltaX)
    },
    getRect (select) {
      return new Promise(resolve => {
        this.createSelectorQuery()
          .select(select)
          .boundingClientRect(rect => {
            rect && resolve(rect)
          }).exec()
      })
    },
    format (value) {
      const { max, min, step } = this.data
      return Math.round(Math.max(min, Math.min(value, max)) / step) * step
    },
    /**
     * 更新渲染数据
     * @param {Number} value 传入的要显示数据
     * @param {Boolean} end
     * @param {Boolean} drag
     */
    updateValue (value, end, drag) {
      value = this.format(value)
      this.setData({
        value,
        barStyle: `width: ${value}%; height: ${this.data.barHeight};`
      })
      if (drag) {
        this.$emit('drag', { value })
      }

      if (end) {
        this.$emit('change', value)
      }
    },
    onClick (event) {
      if (this.data.disabled) return
      // 做一个点击时移动的效果，需要考虑双点的 slider 情况
      this.getRect('.jm-slider').then(rect => {
        if (!rect || !rect.width) return
        const value = (event.detail.x - rect.left) / rect.width * 100
        this.updateValue(value, true)
      })
    },
    onTouchStart (event) {
      if (this.data.disabled) return
      this.startDataSet(event)
      // startValue 初始 value 值
      this.startValue = this.format(this.data.value)
    },
    onTouchMove (event) {
      if (this.data.disabled) return
      this.moveDataSet(event)
      this.getRect('.jm-slider').then(rect => {
        if (!rect || !rect.width) return
        const diff = this.deltaX / rect.width * 100
        // newValue 移动后的新值
        this.newValue = this.startValue + diff
        this.updateValue(this.newValue, false, true)
      })
    },
    onTouchEnd () {
      if (this.data.disabled) return
      this.updateValue(this.newValue, true)
    }
  }
})