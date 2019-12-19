import VueComponent from '../common/component'
VueComponent({
  externalClasses: ['custom-class'],
  data: {
    height: '',
    show: false,
    firstItem: false,
    isExpand: false
  },
  props: {
    title: String,
    disabled: Boolean,
    name: {
      type: String,
      observer (newVal) {
        const condition = this.parent && this.parent.checkRepeat(this.parent.children, newVal, 'name')
        // 比较数组中是否存在重复数据
        if (condition > -1) {
          throw Error('Name attribute cannot be defined repeatedly')
        }
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
  mounted () {
    this.initState()
  },
  methods: {
    initState () {
      const { isExpand, name } = this.data
      const { accordion, value } = this.parent.data
      if (!value) {
        console.warn('[wot-design warning]there is no value with parent.')
        return
      }
      this.setData({
        show: isExpand,
        isExpand: accordion ? value === name : value.indexOf(name) > -1
      })
      this.scrollHeight('.wd-collapse-item__body')
    },
    stateControl (key, value) {
      this.setData({ [key]: value })
    },
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
    toggle () {
      const { disabled, name, isExpand } = this.data
      const { accordion } = this.parent.data
      if (disabled) return
      // 如果是手风琴模式, 那么只展开一个，其余全部折叠
      if (accordion) {
        this.parent.children.forEach(item => {
          item.stateControl('isExpand', item.data.name === name)
          item.scrollHeight('.wd-collapse-item__body')
        })
      } else {
        this.setData({ isExpand: !isExpand })
        this.scrollHeight('.wd-collapse-item__body')
      }
      // 调用父组件方法 switchValue 当前选中的是什么，判断当前是否处于选中状态
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