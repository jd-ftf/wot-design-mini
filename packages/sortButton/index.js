import VueComponent from '../common/component'

VueComponent({
  props: {
    title: String,
    titleColor: {
      type: String,
      value: ''
    },
    value: {
      type: Number,
      value: 0,
      observer (value) {
        this.changeState(value)
      }
    },
    oneArrow: {
      type: Boolean,
      observer () {
        this.changeState(this.data.value)
      }
    },
    color: {
      type: String,
      value: '#4d80f0'
    },
    allowReset: Boolean
  },
  data: {
    top: {
      display: true,
      color: ''
    },
    bottom: {
      display: true,
      color: ''
    }
  },
  methods: {
    /**
     * @description 数值兑换方向
     * @param {Number} value 代码
     * @return {String} direction 方向
     */
    getDirection (value) {
      // 1 升序，0 无序，-1 降序
      const target = [-1, 0, 1]
      // 类型检测
      if (target.indexOf(value) === -1) {
        throw Error(`value must be one of ${target}`)
      }
      let direction = ''
      if (value === 1) {
        direction = 'top'
      } else if (value === -1) {
        direction = 'bottom'
      }
      return direction
    },
    /**
     * @description 根据传入的value展示不同的箭头
     * @param {Number} value
     */
    changeState (value = 0) {
      // 如果在oneArrow状态设置 value 只能为：1或-1，非法参数自动修正为1
      if (
        this.data.oneArrow &&
        (value !== -1 && value !== 1)
      ) {
        console.warn('value can\'t be 0 when use oneArrow')
        return this.setData({ value: 1 })
      }
      // 根据数值对方要展示的方向
      const direction = this.getDirection(value)
      const { oneArrow, color } = this.data
      // 要设置的箭头如果有color，说明其当前处于选中状态，本次行为无效。
      if (
        this.data[direction] &&
        this.data[direction].color === color
      ) {
        return
      }
      const data = {
        top: {},
        bottom: {}
      }
      if (oneArrow && direction === 'top') {
        // 单箭头升序
        data.top.display = true
        data.top.color = color
        data.bottom.display = false
        data.bottom.color = ''
      } else if (oneArrow && direction === 'bottom') {
        // 单箭头降序
        data.top.display = false
        data.top.color = ''
        data.bottom.display = true
        data.bottom.color = color
      } else if (!oneArrow && direction === 'top') {
        // 双箭头升序
        data.top.display = true
        data.top.color = color
        data.bottom.display = true
        data.bottom.color = ''
      } else if (!oneArrow && direction === 'bottom') {
        // 双箭头降序
        data.top.display = true
        data.top.color = ''
        data.bottom.display = true
        data.bottom.color = color
      } else if (!oneArrow && direction === '') {
        // 双箭头重置
        data.top.display = true
        data.top.color = ''
        data.bottom.display = true
        data.bottom.color = ''
      }
      // 更新value，选中的箭头
      this.setData(Object.assign(data, { value }))
    },
    handleClick () {
      let { value, allowReset, oneArrow } = this.data
      if (value === 1) {
        // 无论单价头还是双箭头，只要点击就应该由升序切换到降序
        value = -1
      } else if (!oneArrow && allowReset && value === -1) {
        // 双箭头并且允许重置时，只要点击就应该由降序切换到重置状态
        value = 0
      } else if (value === -1) {
        // 不允许重置，只要点击就应该由降序切换到升序
        value = 1
      } else {
        // 不管是否允许重置，只要点击就应该由 重置状态 切换到升序
        value = 1
      }
      this.$emit('click', value)
      this.changeState(value)
    }
  },
  created () {
    this.changeState(this.data.value)
  }
})