## Picker 选择器视图

Picker 组件为 popup 和 pickerView 的组合。

### 引入

```json
{
  "usingComponents": {
    "wd-picker": "/wot-design/picker/index"
  }
}
```

### 基本用法

`columns` 设置数据源，`label` 设置左侧文本内容，`value` 设置选中项的值。label 可以不传。可以通过 `label-width` 设置标题宽度，默认为 '33%'。

```html
<wd-picker columns="{{columns1}}" label="单列选项" value="{{value}}" />
```
```javascript
Page({
  data: {
    columns: ['选项1', '选项2', '选项3', '选项4', '选项5', '选项6', '选项7'],
    value: ''
  }
})
```

### 禁用

设置 `disabled` 属性。

```html
<wd-picker columns="{{columns}}" label="禁用" value="{{value}}" disabled="{{true}}" />
```
```javascript
Page({
  data: {
    columns: ['选项1', '选项2', '选项3', '选项4', '选项5', '选项6', '选项7'],
    value: '选项3'
  }
})
```

### 只读

设置 `readonly` 属性。

```html
<wd-picker columns="{{columns}}" label="只读" value="{{value}}" readonly />
```

### 文案标题

设置 `title` 属性。

```html
<wd-picker label="标题" columns="{{columns7}}" title="文案标题"/>
```
### 加载中

设置 `loading` 属性。

```html
<wd-picker-view columns="{{columns}}" loading="{{true}}" />
```

### 多列

`columns` 属性设置为二维数组，`value` 为数组。

```html
<wd-picker columns="{{columns}}" label="多列" value="{{value}}" />
```
```javascript
Page({
  data: {
   value: ['中南大学', '软件工程'],
   columns: [
     ['中山大学', '中南大学', '华南理工大学'],
     ['计算机科学与技术', '软件工程', '通信工程', '法学', '经济学']
   ],
  }
})
```

### 多级联动

传入 `column-change` 属性，其类型为 `function`，接收 pickerView 实例、选中项、当前修改列的下标 作为入参，根据选中项和列下标进行判断，通过 pickerView 实例暴露出来的 `setColumnData` 方法修改其他列的数据源。

```html
<wd-picker
  columns="{{columns}}"
  label="多列联动"
  value="{{value}}"
  column-change="{{onChangeDistrict}}"
  display-format="{{displayFormat}}"
 />
```

```javascript
const district = {
  '0': [{ label: '北京', value: '110000' }, { label: '广东省', value: '440000' }],
  '110000': [{ label: '北京', value: '110100' }],
  '440000': [{ label: '广州市', value: '440100' }, { label: '深圳市', value: '440300' }],
  '110100': [{ label: '东城区', value: '110101' }, { label: '西城区', value: '110102' }],
  '440100': [{ label: '荔湾区', value: '440103' }, { label: '越秀区', value: '440104' }],
  '440300': [{ label: '罗湖区', value: '440303' }, { label: '福田区', value: '440304' }]
}
Page({
  data: {
    value: ['110000', '110100', '110102'],
    columns: [
      district[0],
      district[district[0][0].value],
      district[district[district[0][0].value][0].value]
    ],

    onChangeDistrict (pickerView, value, columnIndex) {
      const item = value[columnIndex]
      if (columnIndex === 0) {
        pickerView.setColumnData(1, district[item.value])
        pickerView.setColumnData(2, district[district[item.value][0].value])
        return
      }
      if (columnIndex === 1) {
        pickerView.setColumnData(2, district[item.value])
      }
    },

    displayFormat (items) {
      return items.map(item => {
        return item.label
      }).join('-')
    }
  }
})
```

### 选择器大小

通过设置 `size` 修改选择器大小，将 `size` 设置为 'large' 时字号为 16px。

```html
<wd-picker label="单列选项" size="large" value="{{value}}" columns="{{columns}}" />
```

### 错误状态

设置 `error` 属性，选择器的值显示为红色。

```html
<wd-picker label="单列选项" error columns="{{columns}}" value="{{value}}"/>
```

### 值靠右展示

设置 `align-right` 属性，选择器的值靠右展示。

```html
<wd-picker label="单列选项" align-right columns="{{columns}}" value="{{value}}"/>
```

### 确定前校验

设置 `before-confirm` 函数，在用户点击`确定`按钮时，会执行 `before-confirm` 函数，并传入 `value` 、 `resolve` 和 `picker` 参数，可以对 `value` 进行校验，并通过 `resolve` 函数告知组件是否确定通过，`resolve` 接受1个 boolean 值，`resolve(true)` 表示选项通过，`resolve(false)` 表示选项不通过，不通过时不会关闭 `picker`弹窗。可以通过 `picker` 参数直接设置 `loading`、`columns` 等属性。

```html
<wd-picker label="before-confirm" columns="{{columns}}" value="{{value}}" before-confirm="{{beforeConfirm}}" bind:confirm="handleConfirm" />
```

```javascript
Page({
  data: {
    columns: ['选项1', '选项2', '选项3', '选项4', '选项5', '选项6', '选项7'],
    value: '',
    beforeConfirm: function (value, resolve, picker) {
      picker.setData({
        loading: true
      })
      setTimeout(() => {
        picker.setData({
          loading: false
        })
        if (['选项2', '选项3'].indexOf(value) > -1) {
          resolve(false)
          Toast.error('选项校验不通过，请重新选择')
        } else {
          resolve(true)
        }
      }, 2000)
    }
  },
  handleConfirm ({ detail }) {
    this.setData({
      value: detail
    })
  }
})
```

### Attributes

| 参数      | 说明                                 | 类型      | 可选值       | 默认值   |
|---------- |------------------------------------ |---------- |------------- |-------- |
| value | 选中项，如果为多列选择器，则其类型应为数组 | string / number / boolean / array | - |
| columns | 选择器数据，可以为字符串数组，也可以为对象数组，如果为二维数组，则为多列选择器 | array | - | - |
| loading | 加载中 | boolean | - | false |
| visible-item-count | 展示的行数 | number | - | 7 |
| item-height | 选项高度 | number | - | 33 |
| value-key | 选项对象中，value对应的 key | string | - | 'label' |
| label-key | 选项对象中，展示的文本对应的 key | string | - | 'value' |
| title | 弹出层标题 | string | - | - |
| cancel-button-text | 取消按钮文案 | string | - | '取消' |
| confirm-button-text | 确认按钮文案 | string | - | '完成' |
| label | 选择器左侧文案 | string | - | - |
| placeholder | 选择器占位符 | string | - | '请选择' |
| disabled | 禁用 | boolean | - | fasle |
| readonly | 只读 | boolean | - | false |
| display-format | 自定义展示文案的格式化函数，返回一个字符串 | function | - | - |
| column-change | 接收 pickerView 实例、选中项、当前修改列的下标 作为入参，根据选中项和列下标进行判断，通过 pickerView 实例暴露出来的 `setColumnData` 方法修改其他列的数据源。 | function | - | - |
| size | 设置选择器大小 | string | 'large' | - |
| label-width | 设置左侧标题宽度 | string | - | '33%' |
| error | 是否为错误状态，错误状态时右侧内容为红色 | boolean | - | false |
| align-right | 选择器的值靠右展示 | boolean | - | false |
| use-label-slot | label 使用插槽 | boolean | - | false |
| before-confirm | 确定前校验函数，接收 (value, resolve, picker) 参数，通过 resolve 继续执行 picker，resolve 接收1个boolean参数 | function | - | - |

### Events

| 事件名称      | 说明                                 | 参数     |
|------------- |------------------------------------ |--------- |
| bind:confirm | 点击右侧按钮触发 | 单列：选中项值；多列：所有列选中项值 |
| bind:cancel | 点击左侧按钮触发 | - |
| bind:open | 打开选择器弹出层时触发 | - |

### Slot

| name      | 说明       |
|------------- |----------- |
| label | 左侧标题插槽 |

### 外部样式类

| 类名     | 说明                |
|---------|---------------------|
| custom-class | 根结点样式 |
| custom-view-class | pickerView 外部自定义样式 |
| custom-label-class | label 外部自定义样式 |
| custom-value-class | value 外部自定义样式 |