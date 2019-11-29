import VueComponent from '../common/component'
function isObject (obj) {
  return obj !== null && typeof obj === 'object'
}
VueComponent({
  externalClasses: [
    'custom-suffix-class',
    'custom-prefix-class',
    'custom-textarea-class',
    'custom-input-class'
  ],
  data: {
    isPwdVisible: false
  },
  props: {
    // 原生属性
    placeholder: String,
    placeholderStyle: String,
    placeholderClass: String,
    autofocus: {
      type: Boolean,
      value: false
    },
    autoHeight: {
      type: Boolean,
      value: false
    },
    fixed: {
      type: Boolean,
      value: false
    },
    cursorSpacing: {
      type: Number,
      value: 0
    },
    cursor: {
      type: Number,
      value: -1
    },
    showConfirmBar: {
      type: Boolean,
      value: true
    },
    selectionStart: {
      type: Number,
      value: -1
    },
    selectionEnd: {
      type: Number,
      value: -1
    },
    adjustPosition: {
      type: Boolean,
      value: true
    },
    holdKeyboard: {
      type: Boolean,
      value: false
    },
    confirmType: {
      type: String,
      value: 'done'
    },
    confirmHold: {
      type: Boolean,
      value: false
    },
    focus: {
      type: Boolean,
      value: false
    },
    type: {
      type: String,
      value: 'text'
    },
    maxlength: {
      type: Number,
      value: -1
    },
    disabled: {
      type: Boolean,
      value: false
    },
    // 原生属性结束
    value: {
      type: null,
      observer (newVal) {
        const { disabled, readonly, clearable } = this.data
        this.setData({
          value: newVal,
          showClear: clearable && !disabled && !readonly && newVal
        })
        this.resizeTextarea()
      }
    },
    minlength: Number,
    showPassword: Boolean,
    clearable: {
      type: Boolean,
      value: false
    },
    showClear: {
      type: Boolean,
      value: false
    },
    readonly: {
      type: Boolean,
      value: false
    },
    useSuffixSlot: {
      type: Boolean,
      value: false
    },
    usePrefixSlot: {
      type: Boolean,
      value: false
    },
    prefixIcon: String,
    suffixIcon: String,
    showWordLimit: {
      type: Boolean,
      value: false
    },
    showWordCount: {
      type: Boolean,
      value: false
    },
    suffix: String,
    suffixCount: Number,
    autosize: null,
    resize: {
      type: String,
      value: 'none'
    },
    rows: {
      type: String,
      value: '3'
    },
    textareaStyle: String
  },
  created () {
    this.initState()
  },
  mounted () {
    this.data.autosize && this.resizeTextarea()
  },
  methods: {
    // 状态初始化
    initState () {
      const { showPassword, disabled, readonly, value, clearable, maxlength, showWordLimit } = this.data
      this.setData({
        showClear: !disabled && !readonly && clearable && value,
        showWordCount: !disabled && !readonly && maxlength && showWordLimit,
        showPwdVisible: !disabled && !readonly && showPassword
      })
      this.resizeTextarea()
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
    togglePwdVisible () {
      // password属性设置false不生效，置空生效
      this.setData({ isPwdVisible: !this.data.isPwdVisible })
    },
    clear () {
      this.setData({ value: '' })
      this.$emit('change', '')
      this.$emit('clear')
      this.setData({ focus: false })
    },
    // 失去焦点时会先后触发change、blur，未输入内容但失焦不触发 change 只触发 blur
    handleBlur () {
      this.setData({ focus: false })
      this.$emit('change', this.data.value)
      this.$emit('blur', this.data.value)
    },
    handleFocus (event) {
      // this.setData({ focus: true })
      this.$emit('focus', event)
    },
    handleInput ({ detail }) {
      this.setData({ value: detail.value })
      this.$emit('input', detail)
      this.$emit('change', detail.value)
    },
    handleKeyboardheightchange (event) {
      console.log('键盘高度改变')
      this.$emit('keyboardheightchange', event)
    },
    handleConfirm (event) {
      console.log('点击完成')
      this.$emit('confirm', event)
    },
    handleLineChange (event) {
      console.log('行改变事件')
      this.$emit('linechange', event)
    },
    // textarea重设高度
    resizeTextarea () {
      const { autosize, type, rows, value } = this.data
      const { minRows, maxRows } = isObject(autosize) ? autosize : { minRows: '', maxRows: '' }
      // 如果是文本域状态 或 input自适应高度
      if (type === 'textarea' || (type === 'text' && autosize)) {
        if (!autosize) {
          this.setData({ textareaStyle: 'height:' + 17 * rows + 'px' })
        } else {
          // 如有最小最大限制，那么是自适应的，但自适应受限制
          // 文本域情况下直接设置
          Promise.all([
            this.getRect('.jm-input__wrap'),
            this.getRect('.jm-input__wrap-content')
          ]).then(rects => {
            const [wrapRect, contentRect] = rects
            if (!wrapRect || !contentRect) return
            const wrapWidth = wrapRect.width
            const contentWidth = contentRect.width
            const currentRows = Math.ceil(contentWidth / wrapWidth)
            let newRows
            if (minRows || maxRows) {
              if (!value) {
                newRows = minRows || rows
              } else {
                newRows = currentRows || minRows
                newRows = minRows ? (newRows < minRows ? minRows : newRows) : newRows
                newRows = maxRows ? (newRows > maxRows ? maxRows : newRows) : newRows
              }
            } else {
              newRows = currentRows ? Math.max(rows, currentRows) : rows
            }
            this.setData({ textareaStyle: 'height:' + 17 * newRows + 'px' })
          })
        }
      }
    }
  }
})