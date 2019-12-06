import VueComponent from '../common/component'
VueComponent({
  externalClasses: ['custom-class'],
  data: {
    height: '',
    show: false,
    name: '',
    firstItem: false
  },
  props: {
    title: String,
    disabled: Boolean,
    name: String,
    // 开关
    isExpand: {
      type: Boolean,
      observer () {
        this.scrollHeight('.jm-collapse-item__body')
      }
    }
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
  created () {
    // 初始化show，isExpand 控制 show 的显示与隐藏
    this.setData({ show: this.data.isExpand })
  },
  mounted () {
    const { isExpand, name } = this.data
    const { accordion, value } = this.parent.data
    if (!value) {
      console.warn('[jm-design warning]there is no value with parent.')
      return true
    }
    this.setData({
      show: isExpand,
      isExpand: accordion ? value === name : value.indexOf(name) > -1
    })
  },
  methods: {
    getRect (select) {
      return new Promise(resolve => {
        this.createSelectorQuery()
          .select(select)
          .boundingClientRect(rect => {
            if (rect) {
              resolve(rect)
            }
          }).exec()
      })
    },
    async scrollHeight (select) {
      const { height } = await this.getRect(select)
      if (this.data.isExpand) {
        this.setData({ height: 0, show: true })
        setTimeout(() => {
          this.setData({ height: height + 'px' })
        }, 30)
      } else {
        this.setData({ height: height + 'px' })
        setTimeout(() => {
          this.setData({ height: 0 })
        }, 30)
      }
    },
    stateControl (key, value) {
      this.setData({ [key]: value })
    },
    toggle () {
      const { disabled, name, isExpand } = this.data
      const { accordion } = this.parent.data
      if (disabled) return
      // 如果是手风琴模式, 那么只展开一个，其余全部折叠
      if (accordion) {
        this.parent.children.forEach(item => {
          item.stateControl('isExpand', item.data.name === name)
        })
      } else {
        this.setData({ isExpand: !isExpand })
      }
      // 调用父组件方法switchValue 当前选中的是什么，判断当前是否处于选中状态
      this.parent.switchValue(name, !isExpand)
    },
    onTransitionend (event) {
      if (!this.data.isExpand) {
        this.setData({ show: false })
      } else {
        this.setData({ height: '' })
      }
    }
  }
})