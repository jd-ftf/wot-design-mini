import VueComponent from '../common/component'
import touch from '../mixins/touch'
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
    showRight: false,
    rightBarPercent: 0,
    leftBarPercent: 0,
    rightSlider: {}
  },
  mixins: [touch()],
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
      value: ''
    },
    barStyle: {
      type: String,
      value: 'width: 50%; height: 6px'
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
      type: null,
      value: 0,
      observer (newValue, oldValue) {
        if (this.checkType(newValue) === 'Array') {
          console.log(newValue)
          this.leftBarSlider(newValue[0])
          this.rightBarSlider(newValue[1])
        } else {
          newValue !== oldValue && this.leftBarSlider(newValue)
        }
      }
    },
    barHeight: {
      type: String,
      value: '6px'
    }
  },
  mounted () {
    this.setData({ showRight: this.checkType(this.data.value) === 'Array' })
    this.getRect('.jm-slider').then(rect => {
      if (!rect || !rect.width) return
      // trackWidth: 轨道全长
      this.trackWidth = rect.width
      // trackLeft: 轨道距离左侧的距离
      this.trackLeft = rect.left
    })
  },
  methods: {
    onClick (event) {
      this.pos2Value(event.detail.x)
      if (this.data.disabled) return
      console.log()
      // 做一个点击时移动的效果，需要考虑双点的 slider 情况
      // 当前位置坐标 - 轨道左侧顶端位置 / 轨道宽度
      // 此时 value 值为小数，因此需要对 value 进行一个校验取整操作
      // this.leftBarSlider(this.pos2Value(event.detail.x))
    },
    onTouchStart (event) {
      const { disabled, value } = this.data
      if (disabled) return
      this.touchStart(event)
      this.startValue = this.checkType(value) !== 'Array'
        ? this.format(value)
        : this.format(value[0])
    },
    onTouchMove (event) {
      const { disabled, max, min } = this.data
      if (disabled) return
      this.touchMove(event)
      // 移动间距 this.deltaX 就是向左(-)向右(+)
      const diff = this.deltaX / this.trackWidth * (max - min)
      this.newValue = this.startValue + diff
      this.leftBarSlider(this.newValue)
    },
    onTouchEnd () {
      if (this.data.disabled) return
      console.log()
    },
    // 右边滑轮
    onTouchStartRight (event) {
      const { disabled, rightBarPercent } = this.data
      if (disabled) return
      this.touchStart.call(this.data.rightSlider, event)
      this.data.rightSlider.startValue = this.format(rightBarPercent)
    },
    onTouchMoveRight (event) {
      if (this.data.disabled) return
      this.touchMove.call(this.data.rightSlider, event)
      const { max, min } = this.data
      const { rightSlider } = this.data
      // 移动间距 this.deltaX 就是向左向右
      const diff = rightSlider.deltaX / this.trackWidth * (max - min)
      rightSlider.newValue = this.format(rightSlider.startValue + diff)
      this.rightBarSlider(rightSlider.newValue)
    },
    onTouchEndRight () {
      if (this.data.disabled) return
      console.log()
    },
    format (value) {
      const { max, min, step } = this.data
      return Math.round(Math.max(min, Math.min(value, max)) / step) * step
    },
    /**
     * 控制蓝条
     * @param {Numbe，Array} value 值
     * @param {Boolean} left true左，false右
     */
    styleControl (value, left) {
      // const { leftBarPercent, rightBarPercent } = this.data
      // const leftP = leftBarPercent < rightBarPercent ? leftBarPercent : rightBarPercent
      // value = leftBarPercent < rightBarPercent
      //   ? [this.newValue, this.data.rightSlider.newValue]
      //   : [this.data.rightSlider.newValue, this.newValue]
      // const barStyle = `width: ${this.data.leftBarPercent}%; height: ${this.data.barHeight}; left: ${leftP}%`
    },
    rightBarSlider (value) {
      const { min, max } = this.data
      const rightBarPercent = this.format((value - min) / (max - min) * 100)
      // const barStyle = `width: ${percent}%; height: ${this.data.barHeight}; left: ${rightBarPercent}%`
      this.setData({
        rightBarPercent: this.format(rightBarPercent)
      })
      this.styleControl(value, false)
    },
    /**
     * 更新渲染数据，对 value 进行校验取整
     * @param {Number} value 传入的要显示数据
     * @param {Boolean} end 结束滑动标志
     * @param {Boolean} drag 滑动中标志
     * @param {Number} double 是否是双滑块 1:左滑块 2:右滑块
     */
    leftBarSlider (value, end, drag) {
      const { min, max } = this.data
      value = this.format(value)
      // 把 value 转换成百分比
      const percent = this.format((value - min) / (max - min) * 100)
      if (!this.data.showRight) {
        this.setData({
          value,
          leftBarPercent: this.format(percent),
          barStyle: `width: ${percent}%; height: ${this.data.barHeight};`
        })
      } else {
        this.setData({
          leftBarPercent: this.format(percent)
        })
        this.styleControl(value, true)
      }
    },
    // 将pos转化为value
    pos2Value (pos) {
      const { max, min, step } = this.data
      const percent = pos / this.trackWidth
      const value = percent * (max - min) + min
      const res = min + Math.floor((value - min) / step) * step
      return res
    },
    checkType (value) {
      return Object.prototype.toString.call(value).slice(8, -1)
    }
  }
})