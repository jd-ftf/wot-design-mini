import VueComponent from '../common/component'

VueComponent({
  externalClasses: [
    'custom-icon-class',
    'custom-label-class',
    'custom-value-class',
    'custom-title-class'
  ],
  props: {
    title: String,
    value: String,
    icon: String,
    label: String,
    isLabel: String,
    isLink: {
      type: Boolean,
      value: false,
      observer: 'openClickAble'
    },
    to: String,
    noHair: {
      type: Boolean,
      value: true
    },
    replace: {
      type: Boolean,
      value: false
    },
    clickable: {
      type: Boolean,
      value: false
    }
  },
  relations: {
    '../cellGroup/index': {
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
    /**
     * @description 开启点击反馈
     * @param {Boolean} clickAble - 触发订阅的实例本身
     */
    openClickAble (clickAble) {
      if (!clickAble) return
      this.setData({ clickable: true })
    },
    /**
     * @description 从cellGroup获取此组件的索引
     * @return {Number} 此组件的索引
     */
    getIndex () {
      if (!this.parent) return
      return this.parent.children.indexOf(this)
    },
    /**
     * @description 为所有索引非0的组件设置刘海线，此方法由cellGroup调用
     */
    setIndexAndStatus () {
      const index = this.getIndex()
      if (!index || index === 0) return
      this.setData({ noHair: false })
    },
    /**
     * @description 点击cell的handle
     */
    onClick () {
      const url = this.data.to
      if (url && this.data.isLink) {
        jd[(this.data.replace ? 'redirectTo' : 'navigateTo')]({ url })
      }
      if (this.data.clickable) {
        this.$emit('click')
      }
    }
  }
})