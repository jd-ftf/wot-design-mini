import VueComponent from '../common/component'
import calcTextareaHeight from './calcTextareaHeight'
VueComponent({
  data: {
    focused: false,
    isPwdVisible: false,
    textareaCalcStyle: {}
  },
  props: {
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
        console.log(this.data.showClear)
      }
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
    suffixIcon: String,
    showWordLimit: {
      type: Boolean,
      value: false
    },
    max: String,
    min: String,
    step: String,
    rows: {
      type: String,
      value: '3'
    },
    autosize: null,
    resize: {
      type: String,
      value: 'none'
    },
    autofocus: Boolean,
    showWordCount: {
      type: Boolean,
      value: false,
      observer () {
        console.log('初始化')
        const { disabled, readonly, maxlength, showWordLimit } = this.data
        this.setData({
          showWordCount: !disabled && !readonly && maxlength && showWordLimit
        })
      }
    },
    showPwdVisible: {
      type: Boolean,
      value: false,
      observer () {
        const { disabled, readonly, showPassword } = this.data
        this.setData({
          showPwdVisible: !disabled && !readonly && showPassword
        })
      }
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
    this._initState()
  },
  methods: {
    _initState () {
      if (this.data.readonly) {
        this.setData({
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
      // const input = this._getRect('.jm-input__inner')
      // const textarea = this._getRect('.jm-input__textarea-inner')
      // return input || textarea
      return this._getRect('.jm-input__inner')
    },
    _togglePwdVisible () {
      this.setData({
        isPwdVisible: !this.data.isPwdVisible
      })
    },
    focus () {
      console.log('focus')
      // this._getInput().focus()
      this._getInput()
    },
    blur () {
      console.log('blur')
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
      this.focus()
    },
    // 失去焦点时会先后触发change、blur，未输入内容但失焦不触发change只触发blur
    handleBlur (event) {
      console.log('"触发了失焦"', event.detail.value)
      this.setData({
        focused: false
      })
      this.$emit('change', event.detail.value)
      this.$emit('blur', event.detail.value)
    },
    handleFocus (event) {
      this.setData({
        focused: true
      })
      this.$emit('focus')
    },
    handleInput (event) {
      const { disabled, readonly, clearable } = this.data
      if (clearable && !disabled && !readonly) {
        this.setData({
          showClear: !!event.detail.value
        })
      }
      this.$emit('input', event.detail.value)
    },
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