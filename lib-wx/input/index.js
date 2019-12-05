import VueComponent from '../common/component';
VueComponent({
  externalClasses: ['custom-suffix-class', 'custom-prefix-class', 'custom-textarea-class', 'custom-input-class'],
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

      observer(newVal) {
        const {
          disabled,
          readonly,
          clearable
        } = this.data; // 类型校验，支持所有值(除null、undefined。undefined建议统一写成void (0)防止全局undefined被覆盖)

        if (newVal === null || newVal === undefined) {
          throw Error('value can\'t be null or undefined');
        }

        this.setData({
          value: newVal,
          showClear: clearable && !disabled && !readonly && newVal
        });
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
    suffixCount: Number
  },

  created() {
    this.initState();
  },

  methods: {
    // 状态初始化
    initState() {
      const {
        showPassword,
        disabled,
        readonly,
        value,
        clearable,
        maxlength,
        showWordLimit
      } = this.data;
      let newVal;

      if (showWordLimit && maxlength && value.toString().length > maxlength) {
        newVal = value.toString().substring(0, maxlength);
      }

      this.setData({
        showClear: !disabled && !readonly && clearable && value,
        showWordCount: !disabled && !readonly && maxlength && showWordLimit,
        showPwdVisible: !disabled && !readonly && showPassword,
        value: newVal || value
      });
    },

    togglePwdVisible() {
      // password属性设置false不生效，置空生效
      this.setData({
        isPwdVisible: !this.data.isPwdVisible
      });
    },

    clear() {
      setTimeout(() => {
        this.setData({
          value: ''
        });
        this.$emit('clear');
        this.$emit('change', '');
      }, 30);
    },

    // 失去焦点时会先后触发change、blur，未输入内容但失焦不触发 change 只触发 blur
    handleBlur() {
      this.setData({
        focus: false
      });
      this.$emit('change', this.data.value);
      this.$emit('blur', this.data.value);
    },

    handleFocus(event) {
      this.$emit('focus', event);
    },

    // input事件需要传入
    handleInput({
      detail
    }) {
      this.setData({
        value: detail.value
      });
      this.$emit('input', detail);
    },

    handleKeyboardheightchange(event) {
      this.$emit('keyboardheightchange', event);
    },

    handleConfirm(event) {
      this.$emit('confirm', event);
    },

    handleLineChange(event) {
      this.$emit('linechange', event);
    },

    handleMapTextarea(event) {
      this.$emit('linechange', event);
    }

  }
});