import VueComponent from '../common/component'

VueComponent({
  props: {
    isChecked: {
      type: Boolean,
      value: false
    },
    value: {
      type: null,
      observer (value, old) {
        // 类型校验，支持所有值(除null、undefined。undefined建议统一写成void (0)防止全局undefined被覆盖)
        if (value === null || value === undefined) {
          throw Error('value can\'t be null or undefined')
        }
        // 父组件存在、非第一次给props赋值引发的watch
        if (this.parent && old !== null) {
          this.nodeName = value
          this.parent.renameChild(value, old)
          this.parent.changeSelect(value)
        }
      }
    },
    shape: {
      type: String,
      // value: 'circle',
      value: null,
      observer (target) {
        // type: 'circle', 'dot', 'button'
        const type = ['circle', 'dot', 'button']
        if (type.indexOf(target) === -1) throw Error(`shape must be one of ${type.toString()}`)
      }
    },
    checkedColor: {
      type: String,
      // value: '#0083ff',
      value: null
      // observer (value) {
      //   if (!value || typeof value !== 'string') {
      //     throw Error('checked-color must be String')
      //   }
      // }
    },
    disabled: {
      type: Boolean,
      // value: false,
      value: null
      // observer (value) {
      //   console.log(value)
      //   if (typeof value !== 'boolean') {
      //     throw Error('disabled must be Boolean')
      //   }
      // }
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
      if (this.parent && this.data.value && !this.data.disabled) {
        this.parent.changeSelect(this.data.value)
      }
    }
  },
  created () {
    this.nodeName = this.data.value
  }
})