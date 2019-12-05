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
    firstItem: Boolean,
    disabled: Boolean,
    // 开关
    isExpand: {
      type: Boolean,
      observer () {
        const { isExpand } = this.data
        // this.getRect('.jm-collapse-item__wrapper').then((rect) => {
        //   this.setData({ scrollHeight: rect.height })

        // })
        // console.log(this.data.scrollHeight)
        if (isExpand) {
          this.setData({ height: 0, show: true })
          setTimeout(() => {
            this.setData({ height: 44 })
          }, 30)
        } else {
          this.setData({ height: 44 })
          setTimeout(() => {
            this.setData({ height: 0 })
          }, 30)
        }
      }
    },
    name: String
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