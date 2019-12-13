import VueComponent from '../common/component'

VueComponent({
  relations: {
    '../checkboxGroup/index': {
      type: 'parent',
      linked (target) {
        this.parent = target
        this.checkName(this, this.data.value)
      },
      unlinked () {
        this.parent = null
      }
    }
  },
  props: {
    value: {
      type: null,
      observer (value) {
        if (
          value === null ||
          value === undefined
        ) {
          throw Error('checkbox\'s value can\'t be null or undefined')
        }
        if (!this.data.inited) return
        // 组合使用走这个逻辑
        if (this.parent) {
          this.checkName()
          return this.parent.reset()
        }
        // 非组合使用走这个逻辑
        if (typeof value !== 'boolean') {
          throw Error('checkbox\'s value must be boolean without Group')
        }
        this.setData({ isChecked: value })
      }
    },
    shape: {
      type: String,
      value: null,
      observer (target) {
        const type = ['circle', 'square', 'button']
        if (type.indexOf(target) === -1) throw Error(`shape must be one of ${type.toString()}`)
      }
    },
    checkedColor: {
      type: String,
      value: null
    },
    disabled: {
      type: Boolean,
      value: null
    },
    trueValue: String,
    falseValue: String
  },
  data: {
    isChecked: false,
    inited: false
  },
  methods: {
    /**
     * @description 检测checkbox绑定的value是否和其它checkbox的value冲突
     * @param {Object} self 自身
     * @param  myName 自己的标识符
     */
    checkName (self = this, myName = this.data.value) {
      this.parent && this.parent.children.forEach(node => {
        if (
          node !== self &&
          node.data.value === myName
        ) {
          throw Error(`The checkbox's bound value: ${myName} has been used`)
        }
      })
    },
    /**
     * @description 点击checkbox的Event handle
     */
    toggle (event) {
      const { value, disabled, trueValue, falseValue, isChecked } = this.data
      if (disabled) return
      // 复选框单独使用时点击反选，并且在checkbox上触发change事件
      if (!this.parent) {
        this.setData({ value: !value })
        return this.$emit('change',
          !value ? (trueValue || true) : (falseValue || false)
        )
      }
      /**
       * 复选框组合使用时，如果之前已经被选中，那就把它从Group的value中剔除；
       * 如果之前没有被选中，那就把它加入Group的value中；
       * Group的value有observer，会自动重新匹配选中的checkbox
       * 同时在Group上触发change事件
       */
      const temp = this.parent.data.value.slice(0)
      if (isChecked) {
        if (this.parent.data.value.length === this.parent.data.min) return
        temp.splice(temp.indexOf(value), 1)
      } else {
        if (
          this.parent.data.max !== 0 &&
          this.parent.data.value.length === this.parent.data.max
        ) {
          return
        }
        temp.push(value)
      }
      this.parent.setData({ value: temp })
      this.parent.$emit('change', temp)
    }
  },
  created () {
    if (this.data.value === null) throw Error('checkbox\'s value must be set')
    this.setData({ inited: true })
  },
  mounted () {
    if (this.parent) {
      // 组合使用走这个逻辑
      return this.parent.reset()
    } else if (typeof this.data.value !== 'boolean') {
      // 非组合使用走这个逻辑
      throw Error('checkbox\'s value must be boolean without Group')
    }
    this.setData({ isChecked: this.data.value })
  }
})