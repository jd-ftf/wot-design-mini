import VueComponent from '../common/component'

VueComponent({
  props: {
    useActionSlot: {
      type: Boolean,
      value: false
    },
    useLabelSlot: {
      type: Boolean,
      value: false
    },
    placeholder: String,
    cancelTxt: String,
    light: Boolean,
    placeholderLeft: Boolean,
    hideCancel: {
      type: Boolean,
      value: false
    },
    disabled: {
      type: Boolean,
      value: false
    },
    maxlength: String,
    autofocus: Boolean,
    initValue: {
      type: String,
      observer (s) {
        this.setData({ value: s })
      }
    }
  },
  data: {
    value: '',
    isFocus: false
  },
  methods: {
    /**
     * @description input的input事件handle
     * @param value
     */
    input ({ detail: { value } }) {
      this.setData({ value })
      this.$emit('input', value)
    },
    /**
     * @description 点击清空icon的handle
     */
    clearSearch () {
      this.setData({ value: '' })
      this.$emit('clear')
    },
    /**
     * @description 点击搜索按钮时的handle
     * @param value
     */
    search ({ detail: { value } }) {
      // 组件触发search事件
      this.$emit('search', value)
    },
    /**
     * @description 输入框聚焦时的handle
     */
    searchFocus () {
      if (!this.disabled) {
        this.setData({ isFocus: true })
      }
      // 组件触发focus事件
      this.$emit('focus')
    },
    /**
     * @description 输入框失焦的handle
     */
    searchBlur () {
      this.setData({ isFocus: false })
      // 组件触发blur事件
      this.$emit('blur', this.data.value)
    },
    /**
     * @description 点击取消搜索按钮的handle
     */
    handleCancel () {
      // 组件触发cancel事件
      this.$emit('cancel')
    }
  }
})