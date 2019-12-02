import VueComponent from '../common/component'
import {
  getType
} from '../common/util'

import {
  currentYear,
  isValidDate,
  range,
  padZero,
  times,
  getTrueValue,
  getMonthEndDay
} from './timeTool'

const defaultFormatter = (type, value) => value
const defaultFilter = (type, value) => value
const defaultDisplayFormat = function (items) {
  if (items.length === 0) return ''
  switch (this.data.type) {
  case 'date':
    return `${items[0].label}年${items[1].label}月${items[2].label}日`
  case 'year-month':
    return `${items[0].label}年${items[1].label}月`
  case 'time':
    return `${items[0].label}:${items[1].label}`
  case 'datetime':
    return `${items[0].label}年${items[1].label}月${items[2].label}日 ${items[3].label}:${items[4].label}`
  }
}

VueComponent({
  props: {
    // 选中项，当 type 为 time 时，类型为字符串，否则为 Date
    value: {
      type: null,
      observer (value) {
        this.updateValue()
        if (!value && this.picker) {
          this.picker.setData({
            showValue: ''
          })
        }
      }
    },
    // 选择器类型
    type: {
      type: String,
      value: 'datetime',
      observer (target) {
        const type = ['date', 'year-month', 'time', 'datetime']
        if (type.indexOf(target) === -1) {
          throw Error(`type must be one of ${type}`)
        }
        this.updateValue()
      }
    },
    // 自定义展示文案的格式化函数，返回一个字符串
    displayFormat: {
      type: null,
      observer (fn) {
        if (getType(fn) !== 'function') {
          throw Error('The type of displayFormat must be Function')
        }
        if (this.picker) {
          this.picker.setData({
            displayFormat: fn
          })
        }
      }
    },
    // 自定义过滤选项的函数，返回列的选项数组
    filter: {
      type: null,
      observer (fn) {
        if (getType(fn) !== 'function') {
          throw Error('The type of filter must be Function')
        }
      }
    },
    // 自定义弹出层选项文案的格式化函数，返回一个字符串
    formatter: {
      type: null,
      observer (fn) {
        if (getType(fn) !== 'function') {
          throw Error('The type of formatter must be Function')
        }
      }
    },
    // 最小日期 20(x-10)年1月1日
    minDate: {
      type: Number,
      value: new Date(currentYear - 10, 0, 1).getTime(),
      observer: 'updateValue'
    },
    // 最大日期 20(x+10)年1月1日
    maxDate: {
      type: Number,
      value: new Date(currentYear + 10, 11, 31).getTime(),
      observer: 'updateValue'
    },
    // 最小小时
    minHour: {
      type: Number,
      value: 0,
      observer: 'updateValue'
    },
    // 最大小时
    maxHour: {
      type: Number,
      value: 23,
      observer: 'updateValue'
    },
    // 最小分钟
    minMinute: {
      type: Number,
      value: 0,
      observer: 'updateValue'
    },
    // 最大分钟
    maxMinute: {
      type: Number,
      value: 59,
      observer: 'updateValue'
    }
  },
  data: {
    pickerId: 'jm-picker',
    innerValue: null,
    columns: [],
    pickerValue: null
  },
  methods: {
    /**
     * @description observer触发重计算
     */
    updateValue () {
      // 只有等created hook初始化数据之后，observer才能执行此操作
      if (!this.data.created) return
      const { data } = this
      const val = this.correctValue(this.data.value)
      const isEqual = val === data.innerValue
      if (!isEqual) {
        this.updateColumnValue(val)
      } else {
        this.setData({ columns: this.updateColumns() })
      }
    },
    /**
     * @description 使用formatter更新columns
     */
    updateColumns () {
      const { formatter = defaultFormatter } = this.data
      return this.getOriginColumns().map(column => {
        return column.values.map(value => formatter(column.type, value))
      })

      // return this.setData({ columns: results })
    },
    /**
     * @description 计算展示所有的列
     */
    getOriginColumns () {
      const { filter } = this.data
      const results = this.getRanges().map(({ type, range }) => {
        let values = times(range[1] - range[0] + 1, index => {
          let value = range[0] + index
          value = type === 'year' ? `${value}` : padZero(value)
          return value
        })

        if (filter) {
          values = filter(type, values)
        }

        return {
          type,
          values
        }
      })

      return results
    },
    /**
     * @description 根据时间戳生成年月日时分的边界范围
     * @return {Array<{type:String,range:Array<Number>}>}
     */
    getRanges () {
      const { data } = this
      if (data.type === 'time') {
        return [
          {
            type: 'hour',
            range: [data.minHour, data.maxHour]
          },
          {
            type: 'minute',
            range: [data.minMinute, data.maxMinute]
          }
        ]
      }

      const {
        maxYear,
        maxDate,
        maxMonth,
        maxHour,
        maxMinute
      } = this.getBoundary('max', data.innerValue)
      const {
        minYear,
        minDate,
        minMonth,
        minHour,
        minMinute
      } = this.getBoundary('min', data.innerValue)

      const result = [
        {
          type: 'year',
          range: [minYear, maxYear]
        },
        {
          type: 'month',
          range: [minMonth, maxMonth]
        },
        {
          type: 'date',
          range: [minDate, maxDate]
        },
        {
          type: 'hour',
          range: [minHour, maxHour]
        },
        {
          type: 'minute',
          range: [minMinute, maxMinute]
        }
      ]

      if (data.type === 'date') result.splice(3, 2)
      if (data.type === 'year-month') result.splice(2, 3)
      return result
    },
    /**
     * @description 修正时间入参
     * @param {String | Number} value
     * @return {String | Number} innerValue
     */
    correctValue (value) {
      const { data } = this
      const isDateType = data.type !== 'time'
      if (isDateType && !isValidDate(value)) {
        // 是Date类型，但入参不可用，使用最小时间戳代替
        value = data.minDate
      } else if (!isDateType && !value) {
        // 非Date类型，无入参，使用最小小时代替
        const { minHour } = data
        value = `${padZero(minHour)}:00`
      }

      if (!isDateType) {
        // 非Date类型，直接走此逻辑
        let [hour, minute] = value.split(':')
        hour = padZero(range(hour, data.minHour, data.maxHour))
        minute = padZero(range(minute, data.minMinute, data.maxMinute))

        return `${hour}:${minute}`
      }

      // date type
      value = Math.max(value, data.minDate)
      value = Math.min(value, data.maxDate)

      return value
    },
    /**
     * @description 根据时间戳，计算type对应的值的范围
     * @param {'date'|'year-month'| 'time'|'datetime'} type 类型
     * @param {Number} innerValue 时间
     * @return {{[p: string]: number}}
     */
    getBoundary (type, innerValue) {
      const value = new Date(innerValue)
      const boundary = new Date(this.data[`${type}Date`])
      const year = boundary.getFullYear()
      let month = 1
      let date = 1
      let hour = 0
      let minute = 0

      if (type === 'max') {
        month = 12
        date = getMonthEndDay(value.getFullYear(), value.getMonth() + 1)
        hour = 23
        minute = 59
      }

      if (value.getFullYear() === year) {
        month = boundary.getMonth() + 1
        if (value.getMonth() + 1 === month) {
          date = boundary.getDate()
          if (value.getDate() === date) {
            hour = boundary.getHours()
            if (value.getHours() === hour) {
              minute = boundary.getMinutes()
            }
          }
        }
      }

      return {
        [`${type}Year`]: year,
        [`${type}Month`]: month,
        [`${type}Date`]: date,
        [`${type}Hour`]: hour,
        [`${type}Minute`]: minute
      }
    },
    /**
     * @description 根据传入的value以及type，初始化innerValue，期间会使用format格式化数据
     * @param value
     * @return {Array}
     */
    updateColumnValue (value) {
      const values = []
      const { type, formatter = defaultFormatter } = this.data
      const date = new Date(value)

      if (type === 'time') {
        const pair = value.split(':')
        values.push(
          formatter('hour', pair[0]),
          formatter('minute', pair[1])
        )
      } else {
        values.push(
          formatter('year', `${date.getFullYear()}`),
          formatter('month', padZero(date.getMonth() + 1))
        )
        if (type === 'date') {
          values.push(formatter('date', padZero(date.getDate())))
        } else if (type === 'datetime') {
          values.push(
            formatter('date', padZero(date.getDate())),
            formatter('hour', padZero(date.getHours())),
            formatter('minute', padZero(date.getMinutes()))
          )
        }
      }
      this.setData({ innerValue: value })
      // 更新pickerView的value,columns
      this.setData({
        columns: this.updateColumns(),
        pickerValue: values
      })
    },
    /**
     * @description 多级联动，修正时间
     * @param picker
     */
    columnChange (picker) {
      const { type } = this.data
      // time 和 year-mouth 无需联动
      if (
        type === 'time' ||
        type === 'year-mouth'
      ) {
        return
      }
      const values = picker.getLabels()
      const year = getTrueValue(values[0])
      const month = getTrueValue(values[1])
      const maxDate = getMonthEndDay(year, month)
      let date = getTrueValue(values[2])
      if (type === 'year-month') {
        date = 1
      }
      date = date > maxDate ? maxDate : date
      let hour = 0
      let minute = 0
      if (type === 'datetime') {
        hour = getTrueValue(values[3])
        minute = getTrueValue(values[4])
      }
      const value = new Date(year, month - 1, date, hour, minute)
      const innerValue = this.correctValue(value)
      // 更新选中时间戳，重新生成对应的数据源
      this.setData({ innerValue })
      // 深拷贝联动之前的选中项
      const selectedIndex = picker.data.selectedIndex.slice(0)
      // 获取最新的时间表
      const newColumns = this.updateColumns().slice(0, 3)
      // 更新列表
      newColumns.forEach((columns, index) => {
        const nextColumnIndex = index + 1
        const nextColumnData = newColumns[nextColumnIndex]
        // `日`不控制任何其它列
        if (index === 2) return
        picker.setColumnData(
          nextColumnIndex,
          nextColumnData,
          (selectedIndex[nextColumnIndex] <= nextColumnData.length - 1)
            ? selectedIndex[nextColumnIndex]
            : 0
        )
      })
    },
    onChange ({ detail: { picker } }) {
      // 更新pickerView的value
      const value = picker.getLabels()
      this.setData({
        pickerValue: value instanceof Array ? value : [value]
      })
    }

  },
  beforeCreate () {
    // picker、pickerView挂载到全局
    this.picker = this.selectComponent(`#${this.data.pickerId}`)
    this.pickerView = this.picker.picker
  },
  created () {
    // 初始化时兼容JM客户端props传入function
    const { displayFormat, filter, formatter } = this.data
    this.setData({
      filter: filter || defaultFilter,
      formatter: formatter || defaultFormatter
    })
    // 外部展示直接挂载到picker
    this.picker.setData({
      displayFormat: displayFormat || defaultDisplayFormat.bind(this)
    })
  },
  mounted () {
    // 多级联动直接挂载到pickerView
    this.pickerView.setData({
      columnChange: this.columnChange.bind(this)
    })
    // 初始化数据
    const innerValue = this.correctValue(this.data.value)
    this.updateColumnValue(innerValue)
    // 如果传入的值是空值，直接把picker的showValue置空
    if (!this.data.value) {
      this.picker.setData({
        showValue: ''
      })
    }
  }
})