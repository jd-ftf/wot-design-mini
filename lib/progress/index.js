import VueComponent from '../common/component'
import { getType } from '../common/util'

VueComponent({
  props: {
    percentage: {
      type: Number,
      value: 0,
      observer (percent) {
        // 校验类型
        if (Number.isNaN(percent) || percent < 0 || percent > 100) {
          throw Error('The value of percentage must be between 0 and 100')
        }
        this.controlProgress()
      }
    },
    hideText: {
      type: Boolean,
      value: false
    },
    color: {
      type: null,
      value: '#0084ff',
      observer (color) {
        const type = getType(color)
        const canUse = ['string', 'array', 'function']
        // 类型判断
        if (canUse.indexOf(type) === -1) {
          throw Error(`The type of color in props must be one of ${canUse.join()}`)
        }
        if (type === 'string') {
          // color为字符串直接使用
          this.setData({
            showColor: color,
            noArrayColor: true
          })
        } else if (type === 'array') {
          // color数组，需要手动更换颜色
          this.setData({
            noArrayColor: false
          })
          this.controlProgress()
        }
      }
    }
  },
  data: {
    showColor: '',
    showPercent: 0,
    noArrayColor: true
  },
  methods: {
    /**
     * @description jd小程序不兼容activeend事件,此处手动模拟
     * @param showPercent
     * @param showColor
     */
    update ({ showPercent, showColor }) {
      if (this.timer) return
      setInterval(() => {
      }, 2000)
      this.timer = setInterval(() => {
        if (this.data.showPercent === showPercent) {
          clearInterval(this.timer)
          delete this.timer
          this.controlProgress()
        }
        this.setData({
          showPercent: this.data.showPercent + 1,
          showColor
        })
      }, 30)
    },

    /**
     * @description 控制进度条的进度和每段的颜色
     */
    controlProgress () {
      const {
        // prop中传入的color是否为colorArray类型
        noArrayColor,
        // 当前百分比
        showPercent,
        // 目标百分比
        percentage,
        // 传入的color数组
        color: colorArray
      } = this.data
      // 锁
      if (noArrayColor || showPercent === percentage || !percentage) return
      /**
       * 数组边界安全判断
       */
      if (colorArray.length === 0) throw Error('The colorArray is empty')
      const isStrArray = colorArray.every(item => typeof item === 'string')
      const isObjArray = colorArray.every(color => color.hasOwnProperty('color') && color.hasOwnProperty('percentage'))
      if (!isStrArray && !isObjArray) {
        throw Error('Color must be String or Object with color and percentage')
      }
      if (
        isObjArray &&
        colorArray.some(({ percentage }) => Number.isNaN(parseInt(percentage)))
      ) {
        throw Error('All the percentage must can be formatted to Number')
      }
      /**
       * 根据colorArray平均分布每段color值，或使用用户自定义的值
       */
      const partNum = parseInt(100 / colorArray.length)
      const partList = isObjArray
        ? colorArray.sort((a, b) => a.percentage - b.percentage)
        : colorArray.map((item, index) => {
          return {
            color: item,
            percentage: (index + 1) * partNum
          }
        })
      /**
       * 找到当前目标
       */
      showPercent > percentage
        // 减小不加动画，找到第一个比target大的锚点，取锚点颜色并设置target值
        ? partList.some(part => {
          if (percentage <= part.percentage) {
            this.update({
              showPercent: percentage,
              showColor: part.color
            })
            return true
          }
        })
        // 增加使用分段动画
        : partList.some((part, index) => {
          if (showPercent < part.percentage && part.percentage <= percentage) {
            // 找到第一个比now大的点，如果这个点比target小或等，就把这个点设置为下一个即将展示的点
            this.update({
              showPercent: part.percentage,
              showColor: part.color
            })
            return true
          } else if (index === partList.length - 1) {
            this.update({
              showPercent: percentage,
              showColor: part.color
            })
          }
        })
    }
  },

  mounted () {
    if (this.data.noArrayColor) {
      this.setData({
        showColor: this.data.color,
        showPercent: this.data.percentage
      })
    }
  }
})