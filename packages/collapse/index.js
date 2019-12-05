import VueComponent from '../common/component'
VueComponent({
  externalClasses: [
    'custom-suffix-class',
    'custom-prefix-class',
    'custom-textarea-class',
    'custom-input-class'
  ],
  props: {
    // [String, Array, Boolean]
    value: {
      type: null,
      observer (newVal) {
        // 类型校验，支持所有值(除null、undefined。undefined建议统一写成void (0)防止全局undefined被覆盖)
        if (newVal === null || newVal === undefined) {
          throw Error('value can\'t be null or undefined')
        }
      }
    },
    // 手风琴模式
    accordion: {
      type: Boolean,
      value: false
    },
    // 查看更多
    viewmore: {
      type: Boolean,
      value: false
    },
    useMoreSlot: {
      type: Boolean,
      value: false
    },
    lienNum: {
      type: Number,
      value: 2
    },
    // 内容行数显示
    contentLineNum: String
  },
  relations: {
    '../collapseItem/index': {
      type: 'child',
      linked (target) {
        this.children = this.children || []
        this.children.push(target)
        this.children && this.children[0].stateControl('firstItem', true)
      },
      unlinked (target) {
        this.children = this.children.filter(child => child !== target)
      }
    }
  },

  created () {
    const { lienNum, viewmore, value } = this.data
    this.setData({ contentLineNum: viewmore && !value ? lienNum : '' })
  },
  methods: {
    /**
     * 折叠控制
     * @param {String} name 当前选中的 item name
     * @param {Boolean} expanded 是否展开 false: 开->关(删除)；true: 关->开(添加)
     */
    switchValue (name, expanded) {
      const { accordion, viewmore, value } = this.data
      if (!accordion && !viewmore) {
        name = expanded
          ? value.concat(name)
          : value.filter(item => item !== name)
      } else if (viewmore) {
        name = !value
      }
      this.$emit('input', name)
      this.$emit('change', name)
    }
  }
})