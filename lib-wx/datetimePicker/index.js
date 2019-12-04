import VueComponent from '../common/component';
import pickerProps from '../picker/props';
import pickerViewProps from '../pickerView/props';
import { getType, debounce } from '../common/util';
import { currentYear, isValidDate, range, padZero, times, getTrueValue, getMonthEndDay, defaultFormatter, defaultFilter, defaultDisplayFormat } from './timeTool';
VueComponent({
  props: { ...pickerProps,
    ...pickerViewProps,
    // 选中项，当 type 为 time 时，类型为字符串，否则为 时间戳
    value: {
      type: null,

      observer(value) {
        // 每次value更新时都需要刷新整个列表
        this.updateValue();

        if (!value && this.picker) {
          // 如果传入的value为空，会启用默认时间戳代替value，此时需要手动把picker的选中文案置空
          this.picker.setData({
            showValue: ''
          });
        }
      }

    },
    // 时间选择器的类型
    type: {
      type: String,
      value: 'datetime',

      observer(target) {
        const type = ['date', 'year-month', 'time', 'datetime'];

        if (type.indexOf(target) === -1) {
          throw Error(`type must be one of ${type}`);
        } // 每次type更新时都需要刷新整个列表


        this.updateValue();
      }

    },
    // 自定义展示文案的格式化函数，返回一个字符串
    displayFormat: {
      type: null,

      observer(fn) {
        if (getType(fn) !== 'function') {
          throw Error('The type of displayFormat must be Function');
        } // 每次变化需要重置picker的displayFormat


        this.picker && this.picker.setData({
          displayFormat: fn
        });
        this.updateValue();
      }

    },
    // 自定义过滤选项的函数，返回列的选项数组
    filter: {
      type: null,

      observer(fn) {
        if (getType(fn) !== 'function') {
          throw Error('The type of filter must be Function');
        }

        this.updateValue();
      }

    },
    // 自定义弹出层选项文案的格式化函数，返回一个字符串
    formatter: {
      type: null,

      observer(fn) {
        if (getType(fn) !== 'function') {
          throw Error('The type of formatter must be Function');
        }

        this.updateValue();
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
    pickerValue: null,
    created: false
  },
  methods: {
    /**
     * @description observer触发选项重计算，防抖50秒
     */
    updateValue: debounce(function () {
      // 只有等created hook初始化数据之后，observer才能执行此操作
      if (!this.data.created) return;
      const {
        data
      } = this;
      const val = this.correctValue(this.data.value);
      const isEqual = val === data.innerValue;

      if (!isEqual) {
        this.updateColumnValue(val);
      } else {
        this.setData({
          columns: this.updateColumns()
        });
      }
    }, 50),

    /**
     * @description 使用formatter格式化getOriginColumns的结果
     * @return {Array<Array<Number>>} 用于传入picker的columns
     */
    updateColumns() {
      const {
        formatter = defaultFormatter
      } = this.data;
      return this.getOriginColumns().map(column => {
        return column.values.map(value => formatter(column.type, value));
      });
    },

    /**
     * @description 根据getRanges得到的范围计算所有的列的数据
     * @return {{values: any[], type: String}[]} 年
     */
    getOriginColumns() {
      const {
        filter
      } = this.data;
      return this.getRanges().map(({
        type,
        range
      }) => {
        let values = times(range[1] - range[0] + 1, index => {
          let value = range[0] + index;
          value = type === 'year' ? `${value}` : padZero(value);
          return value;
        });

        if (filter) {
          values = filter(type, values);
        }

        return {
          type,
          values
        };
      });
    },

    /**
     * @description 根据时间戳生成年月日时分的边界范围
     * @return {Array<{type:String,range:Array<Number>}>}
     */
    getRanges() {
      const {
        data
      } = this;

      if (data.type === 'time') {
        return [{
          type: 'hour',
          range: [data.minHour, data.maxHour]
        }, {
          type: 'minute',
          range: [data.minMinute, data.maxMinute]
        }];
      }

      const {
        maxYear,
        maxDate,
        maxMonth,
        maxHour,
        maxMinute
      } = this.getBoundary('max', data.innerValue);
      const {
        minYear,
        minDate,
        minMonth,
        minHour,
        minMinute
      } = this.getBoundary('min', data.innerValue);
      const result = [{
        type: 'year',
        range: [minYear, maxYear]
      }, {
        type: 'month',
        range: [minMonth, maxMonth]
      }, {
        type: 'date',
        range: [minDate, maxDate]
      }, {
        type: 'hour',
        range: [minHour, maxHour]
      }, {
        type: 'minute',
        range: [minMinute, maxMinute]
      }];
      if (data.type === 'date') result.splice(3, 2);
      if (data.type === 'year-month') result.splice(2, 3);
      return result;
    },

    /**
     * @description 修正时间入参
     * @param {String | Number} value
     * @return {String | Number} innerValue
     */
    correctValue(value) {
      const {
        data
      } = this;
      const isDateType = data.type !== 'time';

      if (isDateType && !isValidDate(value)) {
        // 是Date类型，但入参不可用，使用最小时间戳代替
        value = data.minDate;
      } else if (!isDateType && !value) {
        // 非Date类型，无入参，使用最小小时代替
        const {
          minHour
        } = data;
        value = `${padZero(minHour)}:00`;
      }

      if (!isDateType) {
        // 非Date类型，直接走此逻辑
        let [hour, minute] = value.split(':');
        hour = padZero(range(hour, data.minHour, data.maxHour));
        minute = padZero(range(minute, data.minMinute, data.maxMinute));
        return `${hour}:${minute}`;
      } // date type


      value = Math.min(Math.max(value, data.minDate), data.maxDate);
      return value;
    },

    /**
     * @description 根据时间戳，计算所有选项的范围
     * @param {'min'|'max'} type 类型
     * @param {Number} innerValue 时间戳
     */
    getBoundary(type, innerValue) {
      const value = new Date(innerValue);
      const boundary = new Date(this.data[`${type}Date`]);
      const year = boundary.getFullYear();
      let month = 1;
      let date = 1;
      let hour = 0;
      let minute = 0;

      if (type === 'max') {
        month = 12;
        date = getMonthEndDay(value.getFullYear(), value.getMonth() + 1);
        hour = 23;
        minute = 59;
      }

      if (value.getFullYear() === year) {
        month = boundary.getMonth() + 1;

        if (value.getMonth() + 1 === month) {
          date = boundary.getDate();

          if (value.getDate() === date) {
            hour = boundary.getHours();

            if (value.getHours() === hour) {
              minute = boundary.getMinutes();
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
      };
    },

    /**
     * @description 根据传入的value以及type，初始化innerValue，期间会使用format格式化数据
     * @param value
     * @return {Array}
     */
    updateColumnValue(value) {
      const values = [];
      const {
        type,
        formatter = defaultFormatter
      } = this.data;
      const date = new Date(value);

      if (type === 'time') {
        const pair = value.split(':');
        values.push(formatter('hour', pair[0]), formatter('minute', pair[1]));
      } else {
        values.push(formatter('year', `${date.getFullYear()}`), formatter('month', padZero(date.getMonth() + 1)));

        if (type === 'date') {
          values.push(formatter('date', padZero(date.getDate())));
        } else if (type === 'datetime') {
          values.push(formatter('date', padZero(date.getDate())), formatter('hour', padZero(date.getHours())), formatter('minute', padZero(date.getMinutes())));
        }
      }

      this.setData({
        innerValue: value
      }); // 更新pickerView的value,columns

      this.setData({
        columns: this.updateColumns(),
        pickerValue: values
      });
    },

    /**
     * @description 选中项改变，多级联动
     */
    columnChange(picker) {
      const {
        type
      } = this.data; // time 和 year-mouth 无需联动

      if (type === 'time' || type === 'year-month') {
        return;
      }
      /** 重新计算年月日时分秒，修正时间。 */


      const values = picker.getLabels();
      const year = getTrueValue(values[0]);
      const month = getTrueValue(values[1]);
      const maxDate = getMonthEndDay(year, month);
      let date = getTrueValue(values[2]);

      if (type === 'year-month') {
        date = 1;
      }

      date = date > maxDate ? maxDate : date;
      let hour = 0;
      let minute = 0;

      if (type === 'datetime') {
        hour = getTrueValue(values[3]);
        minute = getTrueValue(values[4]);
      }

      const value = new Date(year, month - 1, date, hour, minute);
      /** 根据计算选中项的时间戳，重新计算所有的选项列表 */
      // 更新选中时间戳

      const innerValue = this.correctValue(value); // 根据innerValue获取最新的时间表，重新生成对应的数据源

      this.setData({
        innerValue
      });
      const newColumns = this.updateColumns().slice(0, 3); // 深拷贝联动之前的选中项

      const selectedIndex = picker.data.selectedIndex.slice(0);
      /**
       * 选中年会修改对应的年份的月数，和月份对应的日期。
       * 选中月，会修改月份对应的日数
       */

      newColumns.forEach((columns, index) => {
        const nextColumnIndex = index + 1;
        const nextColumnData = newColumns[nextColumnIndex]; // `日`不控制任何其它列

        if (index === 2) return;
        picker.setColumnData(nextColumnIndex, nextColumnData, selectedIndex[nextColumnIndex] <= nextColumnData.length - 1 ? selectedIndex[nextColumnIndex] : 0);
      });
    },

    /** picker触发change事件，同步修改pickerValue */
    onChange({
      detail: {
        picker
      }
    }) {
      // 更新pickerView的value
      const value = picker.getLabels();
      this.setData({
        pickerValue: value instanceof Array ? value : [value]
      });
    },

    /** picker触发confirm事件，同步触发confirm事件 */
    onConfirm({
      detail
    }) {
      this.$emit('confirm', detail);
    },

    /** picker触发cancel事件，同步触发cancel事件 */
    onCancel() {
      this.$emit('cancel');
    }

  },

  beforeCreate() {
    // picker、pickerView挂载到全局
    this.picker = this.selectComponent(`#${this.data.pickerId}`);
    this.pickerView = this.picker.picker;
  },

  created() {
    // 小程序基础库v1.9.91无法初始化时兼容JM客户端props传入function
    const {
      displayFormat,
      filter,
      formatter
    } = this.data;
    this.setData({
      filter: filter || defaultFilter,
      formatter: formatter || defaultFormatter
    });
    /**
     * 外部展示直接挂载到picker
     * 多级联动挂载到picker上，通过picker自动挂载到pickerView
     */

    this.picker.setData({
      displayFormat: (displayFormat || defaultDisplayFormat).bind(this),
      columnChange: this.columnChange.bind(this)
    }); // 初始化完毕，打开observer触发render的开关

    this.setData({
      created: true
    }); // 手动进行一次render

    const innerValue = this.correctValue(this.data.value);
    this.updateColumnValue(innerValue);
  },

  mounted() {
    // 如果传入的值是空值，直接把picker的showValue置空
    if (!this.data.value) {
      this.picker.setData({
        showValue: ''
      });
    }
  }

});