import VueComponent from '../common/component'

VueComponent({
  relations: {
    '../tabs/index': {
      type: 'parent',
      linked (target) {
        this.parent = target
        this.checkName(this)
      },
      unlinked () {
        this.parent = null
      }
    }
  },
  props: {
    // 唯一标识符
    name: {
      type: String,
      observer (name, old) {
        if (!name) {
          throw Error('name must be set !')
        }
        // 当建立relations关系之后，name改变,以下内容才能执行
        if (!this.parent || old === null) return
        // 检查自己绑定的值是否和其它radio冲突
        this.checkName(this)
      }
    },
    // tab的命名
    title: String,
    // 是否禁用
    disabled: Boolean
  },
  data: {
    // 2.禁用active的功能，使用translate和width控制展示的tab
    width: ''
  },
  methods: {
    /**
     * @description 检测tab绑定的name是否已经被其他节点绑定
     * @param {Object} self 自身
     */
    checkName (self) {
      const { name: myName } = this.data
      this.parent && this.parent.children.forEach(node => {
        if (
          node !== self &&
          node.data.name === myName
        ) {
          throw Error(`The tab's bound value: ${myName} has been used`)
        }
      })
    }
  },
  created () {
    if (!this.data.name) {
      throw Error('name must be set')
    }
  }
})