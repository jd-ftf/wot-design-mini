import VueComponent from '../common/component'

VueComponent({
  relations: {
    '../tabs/index': {
      type: 'parent',
      linked (target) {
        this.parent = target
        // 和tabs建立关系式，主动检测一下自己的name和别的tab的name是否冲突
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
      observer (name) {
        if (!name) {
          throw Error('name must be set !')
        }
        // 当tab与tabs建立relations关系之后，tab的name改变,需要检测一下与其他tab的name是否冲突
        if (this.parent) {
          this.checkName(this)
          this.parent.setActive(this.parent.data.value)
        }
      }
    },
    // tab的label
    title: String,
    // tab禁用，无法点击
    disabled: Boolean
  },
  data: {
    /**
     * tab的宽度要等于tabs提供`wd-tab__body`的宽度
     * 由于tab是以slot的方式插入tabs，又因为插槽/组件样式隔离，所以tab的width必须要由tabs来设置
     */
    width: '',
    // 初始状态tab不会渲染，必须通过tabs来设置painted使tab渲染
    painted: false
  },
  methods: {
    /**
     * @description 检测tab绑定的name是否和其它tab的name冲突
     * @param {Object} self 自身
     */
    checkName (self) {
      const { name: myName } = this.data
      if (
        myName === undefined ||
        myName === null ||
        myName === ''
      ) {
        return
      }
      this.parent && this.parent.children.forEach(node => {
        if (
          node !== self &&
          node.data.name === myName
        ) {
          throw Error(`The tab's bound value: ${myName} has been used`)
        }
      })
    }
  }
})