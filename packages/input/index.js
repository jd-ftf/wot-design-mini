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
    value: null,
    placeholder: String,
    clearable: {
      type: Boolean,
      value: false,
      observer () {
        const { disabled, readonly, value, clearable } = this.data
        this.setData({
          showClear: !disabled && !readonly && clearable && value
        })
      }
    },
    maxlength: {
      type: String,
      value: '10000'
    },
    minlength: String,
    showPassword: {
      type: Boolean,
      observer () {
        this.setData({
          showPwdVisible: true
        })
      }
    },
    disabled: {
      type: Boolean,
      value: false,
      observer () {
        this._dataLock()
      }
    },
    readonly: {
      type: Boolean,
      value: false,
      observer () {
        this._dataLock()
      }
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
    focus: Boolean,
    showWordCount: {
      type: Boolean,
      value: false,
      observer () {
        const { disabled, readonly, maxlength, showWordLimit } = this.data
        this.setData({
          showWordCount: !disabled && !readonly && maxlength && showWordLimit
        })
      }
    },
    showPwdVisible: {
      type: Boolean,
      value: false
    },
    showClear: {
      type: Boolean,
      value: false
    },
    suffixCount: {
      type: Boolean,
      value: false,
      observer () {
        const { textareaCalcStyle, resize } = this.data
        this.setData({
          suffixCount: Object.assign({}, textareaCalcStyle, {
            resize: resize
          })
        })
      }
    },
    textareaStyle: {
      type: Boolean,
      value: false,
      observer () {
        const { disabled, readonly, showPassword } = this.data
        this.setData({
          showWordCount: !disabled && !readonly && showPassword
        })
      }
    }
  },
  created () {
  },
  methods: {
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
      const { disabled, readonly, clearable, value } = this.data
      if (clearable && !disabled && !readonly) {
        this.setData({
          showClear: !!event.detail.value
        })
      }
      // 当为readonly或者disable时不能输入，无法focus
      if (disabled || readonly) {
        this.setData({
          focused: false,
          value: value
        })
      }
      this.$emit('input', event.detail.value)
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