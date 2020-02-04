import VueComponent from '../common/component'
import { getType, defaultDisplayFormat, defaultFunction } from '../common/util'
import selfProps from './props'
import pickerViewProps from '../pickerView/props'
import cell from '../mixins/cell'

VueComponent({
  externalClasses: [
    'custom-view-class',
    'custom-label-class',
    'custom-value-class'
  ],
  behaviors: [cell],
  relations: {
    '../cellGroup/index': {
      type: 'ancestor',
      linked (target) {
        this.parent = target
      },
      unlinked () {
        this.parent = null
      }
    }
  },
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
          if (this.data.value) {
            this.setShowValue(this.picker.getSelects())
          } else {
            this.setData({
              showValue: ''
            })
          }
        }
      }
    },
    /* 参考pickerView组件 */
    value: {
      type: null,
      observer (value) {
        if (value === this.data.pickerValue) return

        this.setData({
          pickerValue: value
        })
        // 为picker的displayFormat设置默认值
        this.data.displayFormat || this.setData({
          displayFormat: defaultDisplayFormat
        })
        // JM小程序无法透传function类型的props，此处手动透传
        this.data.columnChange || this.picker.setData({
          columnChange: defaultFunction
        })
        // 获取初始选中项,并展示初始选中文案
        if (value) {
          this.setShowValue(this.picker.getSelects())
        } else {
          this.setData({
            showValue: ''
          })
        }
      }
    },
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
    pickerId: 'wd-picker-view',
    // 选定后展示的选中项
    showValue: '',
    pickerValue: ''
  },
  methods: {
    /**
     * @description 展示popup，小程序有个bug，在picker-view弹出时设置value，会触发change事件，而且会将picker-view的value多次触发change重置为第一项
     */
    showPopup () {
      if (this.data.disabled || this.data.readonly) return

      this.$emit('open')
      // 打开时还原内部选中值
      this.setData({
        popupShow: true,
        pickerValue: this.data.value
      })
    },
    /**
     * @description 点击取消按钮触发。关闭popup，触发cancel事件。
     */
    onCancel () {
      this.setData({
        popupShow: false
      })
      this.$emit('cancel')
    },
    /**
     * @description 点击确定按钮触发。展示选中值，触发cancel事件。
     */
    onConfirm () {
      const { beforeConfirm } = this.data
      if (beforeConfirm && getType(beforeConfirm) === 'function') {
        beforeConfirm(this.data.pickerValue, isPass => {
          isPass && this.handleConfirm()
        }, this)
      } else {
        this.handleConfirm()
      }
    },
    handleConfirm () {
      if (this.data.loading || this.data.disabled) {
        this.setData({
          popupShow: false
        })
        return
      }

      const selects = this.picker.getSelects()
      const values = this.picker.getValues()
      this.setData({
        popupShow: false,
        value: values
      })
      this.setShowValue(selects)
      this.$emit('confirm', values)
    },
    /**
     * @description 初始change事件
     * @param event
     */
    pickerViewChange ({ detail }) {
      this.setData({
        pickerValue: detail.value
      })
    },
    /**
     * @description 设置展示值
     * @param {Array<String>} items
     */
    setShowValue (items) {
      // 避免值为空时调用自定义展示函数
      if ((items instanceof Array && !items.length) || !items) return

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
  }
})