import VueComponent from '../common/component'

VueComponent({
  props: {
    value: {
      type: null,
      observer (value, old) {
        // 类型校验，支持所有值(除null、undefined。undefined建议统一写成void (0)防止全局undefined被覆盖)
        if (value === null || value === undefined) {
          throw Error('value can\'t be null or undefined')
        }
        // 当建立relations关系之后，radio的value改变
        if (this.parent && old !== null) {
          // 会rename此radio在radioGroup中的key
          this.parent.renameChild(value, old)
          // 会判断新value是否和radioGroup的value一致，一致就会被选中。
          this.parent.changeSelect(value)
        }
      }
    },
    shape: {
      type: String,
      value: null,
      observer (target) {
        // type: 'circle', 'dot', 'button'
        const type = ['circle', 'dot', 'button']
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
    }
  },
  relations: {
    '../radioGroup/index': {
      type: 'parent',
      linked (target) {
        this.parent = target
      },
      unlinked () {
        this.parent = null
      }
    }
  },
  data: {
    isChecked: false
  },
  methods: {
    /**
     * 点击子元素，触发父元素切换选中节点的方法
     */
    handleClick () {
      const { value, disabled } = this.data
      if (this.parent && value !== null && value !== undefined && !disabled) {
        // click事件触发的选中，必定触发change事件
        this.parent.inited = true
        this.parent.setData({ value })
        this.parent.changeSelect(value)
      }
    }
  }
})