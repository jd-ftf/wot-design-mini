import VueComponent from '../common/component'
import { debounce } from '../common/util'

VueComponent({
  externalClasses: ['custom-title', 'custom-icon'],
  data: {
    showWrapper: false,
    showPop: false,
    position: '',
    positionStyle: '',
    transName: '',
    zIndex: '12',
    displayTitle: '',
    modal: true,
    closeOnClickModal: true,
    duration: 0
  },
  props: {
    // 当前选中的value
    value: {
      type: null,
      observer (val) {
        if (typeof val !== 'number' && typeof val !== 'string') {
          console.warn('[wot-design warning]the type of value should be a number or a string.')
          return
        }

        this.updateTitle()
      }
    },
    // 可能是 array || String
    options: {
      type: Array,
      observer () {
        this.updateTitle()
      }
    },
    useDropItemSlot: Boolean,
    disabled: Boolean,
    iconName: {
      type: String,
      value: 'check'
    },
    title: {
      type: String,
      observer () {
        this.updateTitle()
      }
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
  beforeCreate () {
    this.updateTitle = debounce(this.updateTitle, 50)
  },
  mounted () {
    this.setDisplayTitle()
  },
  methods: {
    setDisplayTitle () {
      const { title, value, options } = this.data

      if (title) {
        this.setData({
          displayTitle: title
        })
        return
      }
      for (let i = 0, len = options.length; i < len; i++) {
        if (value === options[i].value) {
          this.setData({
            displayTitle: options[i].label
          })
          return
        }
      }

      console.warn('[wot-design warning]no value is matched in the options option.')
    },
    updateTitle () {
      this.setDisplayTitle()
      this.parent && this.parent.updateTitle()
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
        value: (item.value !== '' && item.value !== undefined) ? item.value : item,
        selectedItem: item
      })
      this.parent.updateTitle()
    },
    // 外部关闭弹出框
    close () {
      console.log('drop-menu-item', Date.now())
      this.setData({ showPop: false })
      this.parent.fold(-1)
    },
    open () {
      const { direction, modal, closeOnClickModal, duration, offset } = this.parent.data
      this.setData({
        showWrapper: true,
        showPop: true,
        duration,
        modal,
        closeOnClickModal,
        position: direction === 'down' ? 'top' : 'bottom',
        positionStyle: direction === 'down' ? `top: ${offset}px; bottom: 0;` : `top: 0; bottom: ${offset}px`
      })
      this.$emit('open')
    },
    onPopupClose () {
      this.setData({
        showWrapper: false
      })
      this.$emit('closed')
    },
    handleOpen () {
      this.$emit('open')
    },
    handleOpened () {
      this.$emit('opened')
    },
    handleClose () {
      this.$emit('close')
    }
  }
})