import VueComponent from '../common/component'
VueComponent({
  data: {
    scrollHeight: 0,
    height: '',
    show: false,
    name: ''
  },
  props: {
    title: String,
    disabled: Boolean,
    // 开关
    isExpand: Boolean
  },
  relations: {
    '../collapse/index': {
      type: 'parent',
      linked (target) {
        this.parent = target
      },
      unlinked () {
        this.parent = null
      }
    }
  },
  methods: {
    toggle () {
      const { disabled, name, isExpand } = this.data
      if (disabled) return
      // 调用父组件方法switchValue
      this.parent.switchValue(name, !isExpand)
      // this.data.collapse.switchValue(this.data.name, !this.data.isExpand)
    },
    onTransitionend () {
      if (!this.data.isExpand) {
        this.data.show = false
      } else {
        this.data.height = ''
      }
    }
  },
  created () {
    console.log('显示item')
    this.data.show = this.data.isExpand
  }
})