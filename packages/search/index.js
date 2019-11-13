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
    value: {
      type: String,
      observer (s) {
        this.setData({ str: s })
      }
    },
    placeholderLeft: {
      type: Boolean,
      value: false
    }
  },
  data: {
    str: '',
    showPlaceHolder: true
  },
  methods: {
    closePlaceHolder () {
      if (this.data.disabled) return
      this.setData({
        showPlaceHolder: false,
        autofocus: true
      })
    },
    /**
     * @description input的input事件handle
     * @param value
     */
    inputValue ({ detail: { value } }) {
      this.setData({ str: value })
      this.$emit('change', value)
    },
    /**
     * @description 点击清空icon的handle
     */
    clearSearch () {
      this.setData({ str: '' })
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
      // 组件触发focus事件
      this.$emit('focus', this.data.str)
    },
    /**
     * @description 输入框失焦的handle
     */
    searchBlur () {
      this.setData({
        showPlaceHolder: true,
        autofocus: false
      })
      // 组件触发blur事件
      this.$emit('blur', this.data.str)
    },
    /**
     * @description 点击取消搜索按钮的handle
     */
    handleCancel () {
      // 组件触发cancel事件
      this.$emit('cancel', this.data.str)
    }
  }
})