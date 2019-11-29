import VueComponent from '../common/component'
import { getType, defaultDisplayFormat, defaultFunction } from '../common/util'

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
    // 外部展示格式化函数
    displayFormat: {
      type: null,
      observer (fn) {
        if (getType(fn) !== 'function') {
          throw Error('The type of displayFormat must be Function')
        }
      }
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
    columnChange: {
      type: null,
      observer (fn) {
        if (getType(fn) !== 'function') {
          throw Error('The type of columnChange must be Function')
        }
        // 外部props更新，手动透传保持同步
        if (this.picker) {
          this.picker.setData({ columnChange: this.data.columnChange })
        }
      }
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
      this.setShowValue(selects)
      this.$emit('confirm', selects)
    },
    /**
     * @description 初始change事件
     * @param event
     */
    handleChange (event) {
      this.$emit('change', event.detail)
    },
    /**
     * @description 设置展示值
     * @param {Array<String>} items
     */
    setShowValue (items) {
      // 兼容JM客户端写法
      // this.setData({
      //   showValue: this.data.displayFormat
      //     ? this.data.displayFormat(items)
      //     : displayFormat.call(this, items)
      // })
      this.setData({
        showValue: this.data.displayFormat(items)
      })
    }
  },
  beforeCreate () {
    // pickerView挂载到全局
    this.picker = this.selectComponent(`#${this.data.pickerId}`)
  },
  created () {
    // 为picker的displayFormat设置默认值
    this.setData({
      displayFormat: (this.data.displayFormat || defaultDisplayFormat).bind(this)
    })
    // JM小程序无法透传function类型的props，此处手动透传
    this.picker.setData({
      columnChange: this.data.columnChange || defaultFunction
    })
    // 获取初始选中项,并展示初始选中文案
    this.setShowValue(this.picker.getSelects())
  }
})