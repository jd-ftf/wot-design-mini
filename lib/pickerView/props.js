export default {
  // 加载中
  loading: Boolean,
  // 展示的行数
  visibleItemCount: {
    type: Number,
    value: 7
  },
  // 选项高度
  itemHeight: {
    type: Number,
    value: 33
  },
  // 选项对象中，value对应的 key
  valueKey: {
    type: String,
    value: 'value'
  },
  // 选项对象中，展示的文本对应的 key
  labelKey: {
    type: String,
    value: 'label'
  }
};