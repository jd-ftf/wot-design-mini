import VueComponent from '../common/component'
import { getType, defaultDisplayFormat, defaultFunction } from '../common/util'
import selfProps from './props'
import pickerViewProps from '../pickerView/props'

VueComponent({
  props: {
    ...selfProps,
    // 外部展示格式化函数
    displayFormat: {
      type: null,
      observer (fn) {
        if (getType(fn) !== 'function') {
          throw Error('The type of displayFormat must be Function')
        }
        if (
          this.picker &&
          this.picker.data.selectedIndex &&
          this.picker.data.selectedIndex.length !== 0
        ) {
          this.setShowValue(this.picker.getSelects())
        }
      }
    },
    /* 参考pickerView组件 */
    value: null,
    columns: Array,
    ...pickerViewProps,
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
      const { valueKey, labelKey } = this.data
      this.setData({
        showValue: this.data.displayFormat(items, { valueKey, labelKey })
      })
    }
  },
  beforeCreate () {
    // pickerView挂载到全局
    this.picker = this.selectComponent(`#${this.data.pickerId}`)
  },
  created () {
    // 为picker的displayFormat设置默认值
    this.data.displayFormat || this.setData({
      displayFormat: defaultDisplayFormat
    })
    // JM小程序无法透传function类型的props，此处手动透传
    this.data.columnChange || this.picker.setData({
      columnChange: defaultFunction
    })
    // 获取初始选中项,并展示初始选中文案
    this.setShowValue(this.picker.getSelects())
  }
})