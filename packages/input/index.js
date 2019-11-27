import VueComponent from '../common/component'
import calcTextareaHeight from './calcTextareaHeight'
VueComponent({
  data: {
    isPwdVisible: false,
    textareaCalcStyle: {}
  },
  props: {
    // focused: Boolean,
    focus: Boolean,
    type: {
      type: String,
      value: 'text'
    },
    value: {
      type: null,
      observer (newVal) {
        const { disabled, readonly, clearable } = this.data
        this.setData({
          value: newVal,
          showClear: clearable && !disabled && !readonly && newVal
        })
      }
    },
    placeholder: String,
    clearable: {
      type: Boolean,
      value: false
    },
    maxlength: {
      type: Number,
      value: Number.MAX_SAFE_INTEGER
    },
    minlength: Number,
    showPassword: Boolean,
    disabled: {
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
    prefixIcon: String,
    suffixIcon: String,
    showWordLimit: {
      type: Boolean,
      value: false
    },
    rows: {
      type: String,
      value: '3'
    },
    autosize: null,
    resize: {
      type: String,
      value: 'none'
    },
    showWordCount: {
      type: Boolean,
      value: false
    },
    showClear: {
      type: Boolean,
      value: false
    },
    suffix: {
      type: String
    },
    suffixCount: Number,
    textareaStyle: {
      type: Boolean,
      value: false,
      observer () {
        // const { textareaCalcStyle, rows } = this.data
        // this.setData({
        //   textareaStyle: Object.assign({}, textareaCalcStyle, {
        //     height: 17 * rows + 'px'
        //   })
        // })
      }
    }
  },
  created () {
    this.initState()
  },
  methods: {
    // 状态初始化
    initState () {
      const { showPassword, suffixIcon, showWordCount, useSuffixSlot, disabled, readonly, value, clearable, maxlength, showWordLimit, rows } = this.data
      let count = 0
      clearable && count++
      showPassword && count++
      (suffixIcon || useSuffixSlot) && count++
      showWordCount && count++
      this.setData({
        suffixCount: count,
        showClear: !disabled && !readonly && clearable && value,
        showWordCount: !disabled && !readonly && maxlength && showWordLimit,
        showPwdVisible: !disabled && !readonly && showPassword,
        textareaStyle: 17 * rows + 'px'
      })
    },
    getRect (select) {
      return new Promise(resolve => {
        this.createSelectorQuery()
          .select(select)
          .boundingClientRect(rect => {
            if (rect) {
              console.log(rect)
              resolve(rect)
            }
          }).exec()
      })
    },
    // 获取元素节点，触发当前节点的事件
    getInput () {
      const input = this.getRect('.jm-input__inner')
      const textarea = this.getRect('.jm-input__textarea-inner')
      return input || textarea
    },
    togglePwdVisible () {
      // password属性设置false不生效，置空生效
      this.setData({ isPwdVisible: !this.data.isPwdVisible })
    },
    blur () {
      this.getInput().blur()
    },
    select () {
      this.getInput().select()
    },
    clear () {
      this.setData({ value: '' })
      this.$emit('change', '')
      this.$emit('clear')
      this.setData({ focus: false })
    },
    /**
     * 失去焦点时会先后触发change、blur，未输入内容但失焦不触发change只触发blur
     */
    handleBlur () {
      this.setData({ focus: false })
      this.$emit('change', this.data.value)
      this.$emit('blur', this.data.value)
    },
    handleFocus () {
      this.setData({ focus: true })
      this.$emit('focus')
    },
    handleInput ({ detail: { value } }) {
      this.setData({ value: value })
      this.$emit('input', this.data.value)
      this.$emit('change', this.data.value)
    },
    // textarea重设高度
    resizeTextarea () {
      const { autosize, type } = this.data
      if (type === 'textarea' || (type === 'text' && autosize)) {
        if (!autosize) {
          this.textareaCalcStyle = {
            minHeight: calcTextareaHeight(this.getInput()).minHeight
          }
          return
        }
        let minRows, maxRows
        if (typeof autosize === 'object') {
          minRows = autosize.minRows
          maxRows = autosize.maxRows
        }
        this.textareaCalcStyle = calcTextareaHeight(
          this.getInput(),
          minRows,
          maxRows
        )
      }
    }
  }
})