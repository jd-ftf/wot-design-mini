## DatetimePicker 日期时间选择器

为 Picker 组件的封装，在其内部构建好日期时间选项。

### 引入

```json
{
  "usingComponents": {
    "wd-datetime-picker": "/wot-design/datetimePicker/index"
  }
}
```

### 基本用法

`value` 设置绑定值，默认为 'datetime' 类型，展示年月日时分，绑定值为 `时间戳` 类型，如果为 'time' 类型，绑定值为字符串。

```html
<wd-datetime-picker value="{{value}}" label="日期选择" />
```
```javascript
Page({
  data: {
    value: Date.now(),
  }
})
```

### date 类型

'date' 类型只展示年月日。

```html
<wd-datetime-picker type="date" value="{{value}}" label="年月日" />
```
```javascript
Page({
  data: {
    value: Date.now(),
  }
})
```
### year-month 类型

'year-month' 类型只展示年月。

```html
<wd-datetime-picker type="year-month" value="{{value}}" label="年月" />
```
```javascript
Page({
  data: {
    value: Date.now(),
  }
})
```

### time 类型

'time' 类型只展示时分。

```html
<wd-datetime-picker type="time" value="{{value}}" label="时分" />
```
```javascript
Page({
  data: {
    value: Date.now(),
  }
})
```

### 修改展示格式
> 自定义函数必须写在data中

给 `display-format` 属性传入一个函数，接收所有选中项数组，返回展示的文本内容。

```html
<wd-datetime-picker value="{{value}}" label="展示格式" display-format="{{displayFormat}}" />
```
```javascript
Page({
  data: {
    value: new Date(),
    displayFormat (items) {
        return `${items[0].label}年${items[1].label}月${items[2].label}日 ${items[3].label}:${items[4].label}`
    }
  }
})
```
### 修改弹出层内部格式
> 自定义函数必须写在data中

给 `formatter` 属性传入一个函数，接收 `type` 和 `value` 值，返回展示的文本内容。`type` 有 `year`、`month`、`date`、`hour`、`minute` 类型，`value` 为 `number` 类型。
使用自定义`formatter`会关闭内置的默认`display-format`函数。

```html
<wd-datetime-picker value="{{value}}" label="内部格式" formatter="{{formatter}}" />
```
```javascript
Page({
  data: {
    value: new Date(),
    formatter (type, value) {
      switch (type) {
        case 'year':
          return value + '年'
        case 'month':
          return value + '月'
        case 'date':
          return value + '日'
        case 'hour':
          return value + '时'
        case 'minute':
          return value + '分'
        default:
          return value
      }
    }
  }
})
```
### 过滤选项


给 `filter` 属性传入一个函数，接收 `type` 和 `values` 值，返回列的选项列表。`type` 有 `year`、`month`、`date`、`hour`、`minute` 类型，`values` 为 number数组。
> 自定义函数必须写在data中
```html
<wd-datetime-picker value="{{value}}" label="过滤选项" filter="{{filter}}" />
```
```javascript
Page({
  data: {
    value: new Date(),
    filter (type, values) {
      if (type === 'minute') {
        return values.filter(value => value % 5 === 0)
      }
      return values
    }
  }
})
```

### Attributes

| 参数      | 说明                                 | 类型      | 可选值       | 默认值   |
|---------- |------------------------------------ |---------- |------------- |-------- |
| value | 选中项，当 type 为 time 时，类型为字符串，否则为 Date | string / date | - |
| type | 选择器类型 | string | 'date' / 'year-month' / 'time' | 'datetime' |
| loading | 加载中 | boolean | - | false |
| visible-item-count | 展示的行数 | number | - | 7 |
| item-height | 选项高度 | number | - | 33 |
| title | 弹出层标题 | string | - | - |
| cancel-button-text | 取消按钮文案 | string | - | '取消' |
| confirm-button-text | 确认按钮文案 | string | - | '完成' |
| label | 选择器左侧文案 | string | - | - |
| placeholder | 选择器占位符 | string | - | '请选择' |
| disabled | 禁用 | boolean | - | fasle |
| readonly | 只读 | boolean | - | false |
| display-format | 自定义展示文案的格式化函数，返回一个字符串 | function | - | - |
| formatter | 自定义弹出层选项文案的格式化函数，返回一个字符串 | function | - | - |
| filter | 自定义过滤选项的函数，返回列的选项数组 | function | - | - |
| minDate | 最小日期 | date | - | 当前日期 - 10年 |
| maxDate | 最大日期 | date | - | 当前日志 + 10年 |
| minHour | 最小小时，time类型时生效 | number | - | 0 |
| maxHour | 最大小时，time类型时生效 | number | - | 23 |
| minMinute | 最小分钟，time类型时生效 | number | - | 0 |
| maxMinute | 最大分钟，time类型时生效 | number | - | 59 |

### Events

| 事件名称      | 说明                                 | 参数     |
|------------- |------------------------------------ |--------- |
| bind:confirm | 点击右侧按钮触发 | 选中项 |
| bind:cancel | 点击左侧按钮触发 | - |

