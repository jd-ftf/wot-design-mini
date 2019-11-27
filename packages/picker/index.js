import VueComponent from '../common/component'

VueComponent({
  props: {
    // 选择器左侧文案
    label: String,
    // 选择器占位符
    placeholder: {
      type: String,
      value: '请选择',
      observer (str) {
        if (str === '') {
          // 阻止无意义占位符
          this.setData({ placeholder: '请选择' })
        }
      }
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
    }
  },
  data: {
    // 弹出层是否显示
    popupShow: false,
    // pickerView选择器
    pickerId: 'jm-picker-view'
  },
  methods: {
    showPopup () {
      if (this.data.disabled || this.data.readonly) return

      this.setData({ popupShow: true })
    },
    onCancel () {
      this.setData({ popupShow: false })
      this.$emit('cancel')
    },
    onConfirm () {
      const selects = this.picker.getSelects()
      this.setData({
        popupShow: false,
        placeholder: selects.map(item => item[this.data.labelKey]).toString() ||
          this.data.placeholder
      })
      this.$emit('confirm', selects)
    },
    handleChange (event) {
      this.$emit('change', event.detail)
    }
  },
  created () {
    // pickerView挂载到全局
    this.picker = this.selectComponent(`#${this.data.pickerId}`)
    // 获取初始选中项
    const pickerValue = this.picker.getLabels().toString()
    // 渲染初始选中文案
    if (pickerValue) {
      this.setData({
        placeholder: pickerValue || this.data.placeholder
      })
    }
  }
})