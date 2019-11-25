import VueComponent from '../common/component'
import { getType } from '../common/util'

VueComponent({
  props: {
    // 初始值
    value: {
      type: null,
      observer (value) {
        this.setSelectIndex(value)
      }
    },
    // 选择器数据
    columns: {
      type: Array,
      value: [],
      observer (columns) {
        if (this.data.selectedIndex.length === 0) return
        this.setData({ formatColumns: this.formatArray(columns) })
      }
    },
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
  },
  data: {
    formatColumns: [],
    selectedIndex: []
  },
  methods: {
    /**
     * @description 根据传入的index设置selectIndex
     * @param value
     */
    setSelectIndex (value) {
      const valueType = getType(value)
      const type = ['string', 'number', 'boolean', 'array']
      if (type.indexOf(valueType) === -1) throw Error(`value must be one of ${type.toString()}`)
      // 初始化的时候需要保证formatColumns已经被设置
      if (this.data.formatColumns.length === 0) {
        this.setData({
          formatColumns: this.formatArray(this.data.columns)
        })
      }
      /**
       * 1.单key转为数组
       * 2.根据formatColumns的长度截取key，保证下面的循环不溢出
       */
      value = value instanceof Array ? value.slice(0, this.data.formatColumns.length) : [value]
      const selectedIndex = value.map((target, index) => {
        return this.data.formatColumns[index].findIndex(({ value }) => value === target)
      }) || []
      this.setData({ selectedIndex })
    },
    /**
     * @description 为props的value为array类型时提供format
     */
    formatArray (array) {
      // 检测第一层的type
      const firstLevelTypeList = new Set(array.map(getType))
      /**
       * 1.数组是一维元素，所有元素都是原始值
       * 2.数组是一维元素，所有元素都是object
       * 3.数组是二维元素，二维元素可以是任意内容
       */
      if (
        firstLevelTypeList.length !== 1 &&
        firstLevelTypeList.has('object')
      ) {
        throw Error('The columns are correct')
      }
      /**
       * 数组的一维子元素的type不是array，说明是一维数组
       * 所以需要把一维的转成二维，这样方便统一处理
       */
      if (!(array[0] instanceof Array)) {
        array = [array]
      }
      // 二维的每一个元素都转换成object
      array = array.map(col => {
        return col.map(row => {
          const isObj = getType(row)
          const { valueKey, labelKey } = this.data
          if (isObj !== 'object') {
            row = {
              [valueKey]: row,
              [labelKey]: row
            }
            return row
          }
          // 如果本来就是object，检查value、key键是否存在，并做兜底
          if (!row.hasOwnProperty(valueKey)) {
            throw Error('Can\'t find valueKey in columns')
          }
          // 如果没有labelKey，用valueKey代替
          if (!row.hasOwnProperty(labelKey)) {
            row[labelKey] = row[valueKey]
          }
          return row
        })
      })
      return array
    },
    /**
     * @description 滚动选择时更新选中的索引、触发change事件
     */
    handleChange ({ detail: { value } }) {
      this.setData({ selectedIndex: value })
      this.$emit('change', {
        value: value.length === 1 ? value[0] : value,
        target: this
      })
    },
    /**
     * @description 获取所有列选中项的文本，返回值为一个数组
     * @return {Array} 每列选中的label
     */
    getLabels () {
      const { selectedIndex, formatColumns, labelKey } = this.data
      return selectedIndex.map((row, col) => formatColumns[col][row][labelKey])
    },
    /**
     * @description 获取某一列的选中项下标
     * @param {Number} columnIndex 列的下标
     * @returns {Number} 下标
     */
    getColumnIndex (columnIndex) {
      return this.data.selectedIndex[columnIndex]
    },
    /**
     * @description 获取某一列的选项
     * @param {Number} columnIndex 列的下标
     * @returns {Array<{value,label}>} 当前列的集合
     */
    getColumnData (columnIndex) {
      return this.data.formatColumns[columnIndex]
    },
    /**
     * @description 获取某一列的选项
     * @param {Number} columnIndex 列的下标
     * @param {Array<原始值|Object>} 一维数组，元素仅限对象和原始值
     */
    setColumnData (columnIndex, data) {
      // 设置formatColumns
      const formatColumns = this.data.formatColumns
      formatColumns[columnIndex] = this.formatArray(data).flat(1)
      this.setData({
        formatColumns: formatColumns
      })
      // 同时修改selectIndex
      this.setSelectIndex(this.data.value)
    }
  }
})