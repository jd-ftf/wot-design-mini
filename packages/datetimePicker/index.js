import VueComponent from '../common/component'
import pickerProps from '../picker/props'
import datetimePickerView, { defaultDisplayFormat } from '../mixins/datetimePickerView'

import { getType } from '../common/util'

VueComponent({
  /**
   * 注意，datetimePickerView和datetimePicker有公共逻辑，抽离成/mixins/datetimePickerView，通过mixins options注入
   */
  externalClasses: ['custom-view-class'],
  mixins: [datetimePickerView()],
  props: {
    ...pickerProps,
    // 选中项，当 type 为 time 时，类型为字符串，否则为 时间戳
    value: {
      type: null,
      observer (value) {
        // 每次value更新时都需要刷新整个列表
        this.updateValue()
        if (!value && this.picker) {
          // 如果传入的value为空，会启用默认时间戳代替value，此时需要手动把picker的选中文案置空
          this.picker.setData({
            showValue: ''
          })
        }
      }
    },
    // 自定义展示文案的格式化函数，返回一个字符串
    displayFormat: {
      type: null,
      observer (fn) {
        if (getType(fn) !== 'function') {
          throw Error('The type of displayFormat must be Function')
        }
        // 每次变化需要重置picker的displayFormat
        this.picker && this.picker.setData({
          displayFormat: fn
        })
        this.updateValue()
      }
    }
  },
  data: {
    pickerId: 'wd-picker'
  },
  methods: {
    onChange ({ detail: { picker } }) {
      // 更新pickerView的value
      const value = picker.getLabels()
      this.setData({
        pickerValue: value instanceof Array ? value : [value]
      })
    },
    /** picker触发confirm事件，同步触发confirm事件 */
    onConfirm ({ detail }) {
      this.$emit('confirm', detail)
    },
    /** picker触发cancel事件，同步触发cancel事件 */
    onCancel () {
      this.$emit('cancel')
    }
  },
  beforeCreate () {
    // this.picker是wd-picker，this.picker.picker是wd-picker-view
    this.pickerView = this.picker.picker
  },
  created () {
    // 小程序基础库v1.9.91无法初始化时兼容JM客户端props传入function
    const { displayFormat } = this.data
    /**
     * 外部展示直接挂载到picker
     * 多级联动挂载到picker上，通过picker自动挂载到pickerView
     */
    this.picker.setData({
      displayFormat: (displayFormat || defaultDisplayFormat).bind(this),
      columnChange: this.columnChange.bind(this)
    })
    // 初始化完毕，打开observer触发render的开关
    this.setData({ created: true })
    // 手动进行一次render
    const innerValue = this.correctValue(this.data.value)
    this.updateColumnValue(innerValue)
  }
})