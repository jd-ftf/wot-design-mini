import VueComponent from '../common/component'

VueComponent({
  relations: {
    '../radio/index': {
      type: 'child',
      linked (child) {
        this.children = this.children || []
        // 在建立relations时radioGroup保存radio实例中的value，注意value的唯一性。
        this.checkValue(child)
        this.children.push(child)
      },
      unlinked (target) {
        this.children = this.children.filter(child => child !== target)
      }
    }
  },
  props: {
    value: {
      type: null,
      observer (value, old) {
        // 类型校验，支持所有值(除null、undefined。undefined建议统一写成void (0)防止全局undefined被覆盖)
        if (value === null || value === undefined) {
          throw Error('value can\'t be null or undefined')
        }
        // prop初始化watch执行时，relations关系还没有建立，所以ready之后手动执行一下
        if (old !== null) {
          // radioGroup绑定的value变化，，立即切换到此value对应的radio
          this.changeSelect(value)
        }
      }
    },
    shape: {
      type: String,
      value: 'circle',
      observer (value) {
        // type: 'circle', 'dot', 'button'
        const type = ['circle', 'dot', 'button']
        if (type.indexOf(value) === -1) throw Error(`circle must be one of ${type.toString()}`)
        this.updateAllChild({ shape: value })
      }
    },
    checkedColor: {
      type: String,
      value: '#0083ff',
      observer (value) {
        this.updateAllChild({ checkedColor: value })
      }
    },
    disabled: {
      type: Boolean,
      value: false,
      observer (value) {
        this.updateAllChild({ disabled: value })
      }
    }
  },
  methods: {
    /**
     * @description 检测radio绑定的value是否已经被其他节点绑定
     */
    checkValue (child) {
      this.children.forEach(node => {
        const value = child.data.value
        if (
          node !== child &&
          node.data.value === value
        ) {
          throw Error(`The radio's bound value: ${value} has been used `)
        }
      })
    },
    /**
     * 修改选中的radio
     * @param value - radio绑定的value
     * @param old - 老节点，默认为已经被选中的节点
     */
    changeSelect (value) {
      // 没有radio子元素，不执行任何操作
      if (
        !this.children ||
        this.children.size === 0 ||
        value === null
      ) {
        return
      }
      this.children.forEach(child => {
        child.setData({
          isChecked: child.data.value === value
        })
      })
    },
    /**
     * @description 使用父元素的Props覆盖子元素Props中值为null的key
     * @param Props
     */
    updateAllChild (data) {
      const keys = Object.keys(data)
      if (!data || keys.length === 0) return

      this.children && this.children.forEach(child => {
        const will = {}
        keys.forEach(key => {
          if (
            data[key] !== null &&
            data[key] !== undefined &&
            child.data[key] === null
          ) {
            will[key] = data[key]
          }
        })
        child.setData(will)
      })
    },
    /**
     * @description 处理radio子节点通知
     */
    handleClick (value) {
      this.$emit('change', value)
    }
  },
  mounted () {
    // 用radioGroup的props覆盖radio中props值为null的属性
    const { shape, checkedColor, disabled } = this.data
    this.updateAllChild({
      shape,
      checkedColor,
      disabled
    })
  }
})