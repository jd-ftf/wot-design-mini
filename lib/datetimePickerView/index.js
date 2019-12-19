import VueComponent from '../common/component'
import datetimePickerView from '../mixins/datetimePickerView'

VueComponent({
  /**
   * 注意，datetimePickerView和datetimePicker有公共逻辑，抽离成/mixins/datetimePickerView，通过mixins options注入
   */
  mixins: [datetimePickerView()],
  props: {
    value: {
      type: null,
      observer: 'updateValue'
    }
  },
  data: {
    // pickerView的id选择器
    pickerId: 'wd-picker-view'
  },
  methods: {
    /** pickerView触发change事件，同步修改pickerValue */
    onChange ({ detail: { picker } }) {
      // 更新pickerView的value
      const value = picker.getLabels()
      this.setData({
        pickerValue: value instanceof Array ? value : [value]
      })
      this.$emit('change', this.data.pickerValue)
    }
  },
  created () {
    // 多级联动挂载到pickerView
    this.picker.setData({
      columnChange: this.columnChange.bind(this)
    })
    // 初始化完毕，打开observer触发render的开关
    this.setData({ created: true })
    // 手动进行一次render
    const innerValue = this.correctValue(this.data.value)
    this.updateColumnValue(innerValue)
  }
})