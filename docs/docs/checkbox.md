## Checkbox 复选框

### 按需引入

### 引入

```json
{
  "usingComponents": {
    "be-checkbox": "/bee-design/checkbox/index",
    "be-checkbox-group": "/bee-design/checkboxGroup/index"
  }
}
```

### 基本用法

`value` 为绑定值，是否选中，单独使用时值为 `boolean` 类型。

```html
<be-checkbox value="{{value}}" bind:change="handleChange">单选框1</be-checkbox>
```
```javascript
Page({
  data: {
    value: true
  },
  handleChange (event) {
    this.setData({value: event.detail})
  }
})
```

### 修改图标形状

修改 `shape` 属性，可选值为 'circle'、'square'、'button'，默认为 'circle'。

```html
<be-checkbox value="{{true}}" shape="square">京麦</be-checkbox>
<be-checkbox value="{{true}}" shape="button">京麦</be-checkbox>
```

### 修改选中的颜色

设置 `checked-color` 属性。

```html
<be-checkbox
   value="{{value}}"
   checked-color="#f00"
   bind:change="handleChange"
>
  京麦
</be-checkbox>
```
```javascript
Page({
  data: {
    value: true
  },
  handleChange (event) {
    this.setData({value: event.detail})
  }
})
```

### 修改选中和非选中的值

设置 `true-value` 和 `false-value` 修改选中值和非选中值。如果不设置，`change`事件的参数 默认为 `true` 和 `false` 切换。

```html
<be-checkbox
  value="{{true}}"
  true-value="京麦"
  false-value="商家后台"
  bind:change="handleChange"
>
  复选框
</be-checkbox>
```
```javascript
Page({
  handleChange (event) {
    console.log(event.detail)
  }
})
```

### 复选框组

`value` 为数组，单个复选框的值通过 `value` 进行设置。

```html
<be-checkbox-group value="{{value}}"  bind:change="handleChange">
  <be-checkbox value="jingmai">京麦</be-checkbox>
  <be-checkbox value="shop">商家后台</be-checkbox>
</be-checkbox-group>
```
```javascript
Page({
  data: {
    value: ['jingmai']
  },
  handleChange (event) {
    this.setData({value: event.detail})
  }
})
```
### 禁用

可以在 `checkbox-group` 上面设置 `disabled`，禁用所有复选框，也可以在单个复选框上面设置 `disabled` 属性，禁用某个复选框。

```html
<be-checkbox-group value="{{value}}" disabled="{{true}}" bind:change="handleChange">
  <be-checkbox value="jingmai">京麦</be-checkbox>
  <be-checkbox value="shop">商家后台</be-checkbox>
</be-checkbox-group>
```
```javascript
Page({
  data: {
    value: ['jingmai']
  },
  handleChange (event) {
    this.setData({value: event.detail})
  }
})
```
### 设置选中数量的上限和下限

`min` 属性设置最小选中的数量，`max` 属性设置最大选中的数量。如果要默认设置某个选项固定被选中，则给该复选框设置 disabled，且 `v-model` 中有该选项的值。

```html
<be-checkbox-group value="{{value}}" min="{{1}}" max="{{3}}" bind:change="handleChange">
  <be-checkbox value="jd">京东</be-checkbox>
  <be-checkbox value="jingmai">京麦</be-checkbox>
  <be-checkbox value="shop">商家后台</be-checkbox>
  <be-checkbox value="market">营销中心</be-checkbox>
</be-checkbox-group>
```
```javascript
Page({
  data: {
    value: ['jd']
  },
  handleChange (event) {
    this.setData({value: event.detail})
  }
})
```
### Checkbox Attributes
| 参数      | 说明                                 | 类型      | 可选值       | 默认值   |
|---------- |------------------------------------ |---------- |------------- |-------- |
| value | 单选框选中时的值 | string / number / boolean | - | - |
| shape | 单选框形状 | string | 'circle', 'square', 'button' | 'circle' |
| checked-color | 选中的颜色 | string | - | '#0083ff' |
| disabled | 禁用 | boolean | - | false |
| true-value | 选中值，在 checkbox-group 中使用无效，需同 false-value 一块使用 | string / number | - | true |
| false-value | 非选中时的值，在 checkbox-group 中使用无效，需同 true-value 一块使用 | string /number | - | false |
### CheckboxGroup Attributes
| 参数      | 说明                                 | 类型      | 可选值       | 默认值   |
|---------- |------------------------------------ |---------- |------------- |-------- |
| value | 绑定值 | Array | - | - |
| shape | 单选框形状 | string | 'circle', 'square', 'button' | 'circle' |
| checked-color | 选中的颜色 | string | - | '#0083ff' |
| disabled | 禁用 | boolean | - | false |
| min | 最小选中的数量 | number | - | 0 |
| max | 最大选中的数量，0 为无限数量，默认为 0 | number | - | 0 |

### Checkbox Methods

| 方法名称      | 说明                                 | 参数     |
|------------- |------------------------------------ |--------- |
| toggle | 切换当前选中状态,同时触发change事件 | - |

### Checkbox Events

| 事件名称      | 说明                                 | 参数     |
|------------- |------------------------------------ |--------- |
| bind:change | 绑定值变化时触发 | true-value、false-value |
### CheckboxGroup Events

| 事件名称      | 说明                                 | 参数     |
|------------- |------------------------------------ |--------- |
| bind:change | 绑定值变化时触发 | 更新后的值,类型Array |


### Checkbox 外部样式类

| 类名     | 说明                 |
|---------|---------------------|
| custom-class | 根结点样式 |
### CheckboxGroup 外部样式类

| 类名     | 说明                |
|---------|---------------------|
| custom-class | 根结点样式 |