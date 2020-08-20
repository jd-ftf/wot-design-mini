import VueComponent from '../common/component'

VueComponent({
  externalClasses: ['custom-title', 'custom-icon'],
  data: {
    showPop: false,
    positionStyle: '',
    transName: '',
    title: '',
    activeColor: '',
    zIndex: '12'
  },
  props: {
    // 当前选中的value
    value: {
      type: String,
      observer (newValue, oldValue) {
        this.checkValueExist()
        if (newValue && this.parent && newValue !== oldValue) {
          // 如果更新值
          this.parent.resetChooseValue()
        }
      }
    },
    // 可能是 array || String
    options: null,
    useDropItemSlot: Boolean,
    closeOnClickModal: {
      type: Boolean,
      value: true
    },
    modal: {
      type: Boolean,
      value: true
    },
    duration: {
      type: null,
      value: { enter: 300, leave: 300 }
    },
    disabled: {
      type: Boolean,
      value: false
    },
    iconName: {
      type: String,
      value: 'check-round'
    }
  },
  relations: {
    '../dropMenu/index': {
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
    this.checkValueExist()
    this.init()
  },
  methods: {
    init () {
      this.setData({
        zIndex: this.parent.data.zIndex,
        activeColor: this.parent.data.activeColor,
        transName: this.parent.data.direction === 'up' ? 'slide-up' : 'slide-down'
      })
    },
    checkValueExist () {
      const { value, options } = this.data
      if (options instanceof Array) {
        let count = 0
        options.forEach(item => {
          (item.value !== value) && count++
          if (count === options.length) {
            throw Error('There is no matching value in the option')
          }
        })
      }
    },
    /**
     * 父组件更改子组件内部 data 值
     * @param {string} key 键名
     * @param {null} value 键值
     */
    set (key, value) {
      this.setData({
        [key]: value
      })
    },
    handleClickModal () {
      if (!this.data.closeOnClickModal) return
      this.close()
    },
    // 模拟单选操作 默认根据 value 选中操作
    choose (event) {
      if (this.data.disabled) return
      const index = event.currentTarget.dataset.index
      const item = this.data.options[index]
      this.setData({
        value: item.value || item
      })
      this.close()
      this.$emit('change', {
        value: item.value || item,
        selectedItem: item
      })
      this.parent.resetChooseValue()
    },
    // 外部关闭弹出框
    close () {
      this.setData({ showPop: false })
      this.parent.fold(-1)
      this.$emit('close')
    },
    open () {
      this.setData({ showPop: true })
      this.$emit('open')
    },
    noop () {}
  }
})