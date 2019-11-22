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
        // 当建立relations关系之后，radio的value改变,以下内容才能执行
        if (!this.parent || old === null) return
        // 会rename此radio在radioGroup中的key
        this.parent.renameChild(value, old)
        // 会判断新value是否和radioGroup的value一致，一致就会调用radio的方法选中此节点。
        if (value === this.parent.data.value) {
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
     * 点击子元素，通知父元素触发change事件
     */
    handleClick () {
      const { value, disabled } = this.data
      if (
        !disabled &&
        this.parent &&
        value !== null &&
        value !== undefined
      ) {
        this.parent.handleClick(value)
      }
    }
  },
  mounted () {
    /**
     * relations在props之后才建立，所以初始化的时候props无法拿到relations的值，因此挂载后需要手动执行一下。
     * 判断此节点是否可以被选中，可以的话通知radioGroup选中。
     */
    if (
      this.parent &&
      this.data.value === this.parent.data.value
    ) {
      this.parent.changeSelect(this.data.value)
    }
  }
})