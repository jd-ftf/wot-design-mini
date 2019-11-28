import VueComponent from '../common/component'

VueComponent({
  props: {
    // 选择器左侧文案
    label: String,
    // 选择器占位符
    placeholder: {
      type: String,
      value: '请选择'
    },
    // 禁用
    disabled: {
      type: Boolean,
      value: false
    },
    // 只读
    readonly: {
      type: Boolean,
      value: false
    },
    /* popup */
    // 弹出层标题
    title: String,
    // 取消按钮文案
    cancelButtonText: {
      type: String,
      value: '取消'
    },
    // 确认按钮文案
    confirmButtonText: {
      type: String,
      value: '完成'
    },
    /* 参考pickerView组件 */
    value: null,
    columns: Array,
    loading: {
      type: Boolean,
      value: false
    },
    visibleItemCount: {
      type: Number,
      value: 7
    },
    itemHeight: {
      type: Number,
      value: 33
    },
    valueKey: {
      type: String,
      value: 'value'
    },
    labelKey: {
      type: String,
      value: 'label'
    },
    displayFormat: {
      type: String,
      value: ','
    }
  },
  data: {
    // 弹出层是否显示
    popupShow: false,
    // pickerView选择器
    pickerId: 'jm-picker-view',
    // 选定后展示的选中项
    showValue: ''
  },
  methods: {
    /**
     * @description 展示popup
     */
    showPopup () {
      if (this.data.disabled || this.data.readonly) return

      this.setData({ popupShow: true })
    },
    /**
     * @description 点击取消按钮触发。关闭popup，触发cancel事件。
     */
    onCancel () {
      this.setData({ popupShow: false })
      this.$emit('cancel')
    },
    /**
     * @description 点击确定按钮触发。展示选中值，触发cancel事件。
     */
    onConfirm () {
      const selects = this.picker.getSelects()
      this.setData({ popupShow: false })
      const resolve = this.setShowValue.bind(this)
      resolve(
        selects.map(item => item[this.data.labelKey]).join(this.data.displayFormat) ||
        this.data.placeholder
      )
      // 把setShowValue透传给调用者，优先展示调用者传入的参数
      this.$emit('confirm', {
        value: selects,
        resolve
      })
    },
    handleChange (event) {
      this.$emit('change', event.detail)
    },
    /**
     * @description 设置展示值
     * @param {String} str
     */
    setShowValue (str) {
      this.setData({
        showValue: str
      })
    }
  },
  created () {
    // pickerView挂载到全局
    this.picker = this.selectComponent(`#${this.data.pickerId}`)
    // 获取初始选中项,并展示初始选中文案
    const pickerValue = this.picker.getLabels().join(this.data.displayFormat) ||
      this.data.placeholder
    this.setShowValue(pickerValue)
  }
})