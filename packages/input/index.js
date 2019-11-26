import VueComponent from '../common/component'
import calcTextareaHeight from './calcTextareaHeight'
VueComponent({
  data: {
    isPwdVisible: false,
    textareaCalcStyle: {}
  },
  props: {
    focused: Boolean,
    type: {
      type: String,
      value: 'text'
    },
    value: {
      type: null,
      observer (newVal) {
        if (!this.data.value) {
          this.setData({
            showClear: false
          })
        }
      }
    },
    placeholder: String,
    clearable: {
      type: Boolean,
      value: false
    },
    maxlength: {
      type: String,
      value: '10000'
    },
    minlength: String,
    showPassword: Boolean,
    disabled: {
      type: Boolean,
      value: false
    },
    readonly: {
      type: Boolean,
      value: false
    },
    prefixIcon: String,
    useSuffixSlot: {
      type: Boolean,
      value: false
    },
    suffixIcon: {
      type: String
    },
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
    focus: Boolean,
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
        const { textareaCalcStyle, resize } = this.data
        this.setData({
          textareaStyle: Object.assign({}, textareaCalcStyle, {
            resize: resize
          })
        })
      }
    }
  },
  created () {
    this.initState()
  },
  methods: {
    // 初始化数据
    initState () {
      const { showPassword, suffixIcon, showWordCount, useSuffixSlot, disabled, readonly, value, clearable, maxlength, showWordLimit } = this.data
      let count = 0
      clearable && count++
      showPassword && count++
      //  this.$slots.suffix 微信小程序当前版本暂不支持 判断slot是否插入
      (suffixIcon || useSuffixSlot) && count++
      showWordCount && count++
      this.setData({
        suffixCount: count,
        showClear: !disabled && !readonly && clearable && value,
        showWordCount: !disabled && !readonly && maxlength && showWordLimit,
        showPwdVisible: !disabled && !readonly && showPassword
      })
    },
    _dataLock () {
      const { disabled, readonly } = this.data
      if (disabled || readonly) {
        this.setData({
          showWordCount: false,
          showPwdVisible: false,
          showClear: false,
          focused: false
        })
      }
    },
    _getRect (select) {
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
    // 获取元素节点，触发当前节点的事件
    _getInput () {
      const input = this._getRect('.jm-input__inner')
      const textarea = this._getRect('.jm-input__textarea-inner')
      return input || textarea
    },
    togglePwdVisible () {
      // password属性设置false不生效，置空生效
      this.setData({
        isPwdVisible: !this.data.isPwdVisible
      })
    },
    blur () {
      this.getInput().blur()
    },
    select () {
      this.getInput().select()
    },
    clear () {
      this.setData({
        value: ''
      })
      this.$emit('input', '')
      this.$emit('clear')
      this.setData({
        focused: true
      })
    },
    // 失去焦点时会先后触发change、blur，未输入内容但失焦不触发change只触发blur
    handleBlur (event) {
      const { readonly, value, disabled } = this.data
      const newVal = readonly || disabled ? value : event.detail.value
      this.setData({
        focused: false,
        value: newVal
      })
      this.$emit('change', newVal)
      this.$emit('blur', newVal)
    },
    handleFocus (event) {
      this.setData({
        focused: true
      })
      this.$emit('focus')
    },
    handleInput (event) {
      const newVal = event.detail.value
      const { disabled, readonly, clearable } = this.data

      if (clearable && !disabled && !readonly) {
        this.setData({
          showClear: !!event.detail.value
        })
      }
      this.setData({
        value: newVal
      })
      this.$emit('input', newVal)
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