## Radio 单选框

### 引入

```json
{
  "usingComponents": {
    "jm-radio": "/jm-design/radio/index",
    "jm-radio-group": "jm-design/radioGroup/index"
  }
}
```

### 基本用法

`value` 为绑定值，即选中的 `jm-radio` 的 `value` 值。  
点击radio会触发`change`事件，同时可以通过修改`value`来调整选中的radio。

```html
<demo-block title="基本用法">
  <jm-radio-group value="{{value}}" bind:change="change">
    <jm-radio value="{{1}}">单选框1</jm-radio>
    <jm-radio value="{{2}}">单选框2</jm-radio>
  </jm-radio-group>
  <view jd:if="{{selectValue}}">当前选中的值为:{{selectValue}}</view>
</demo-block>
```
```javascript
Page({
  data: {
    value: 1,
    selectValue: null
  },
  change (event) {
    this.setData({
      selectValue: event.detail,
      value: event.detail
    })
  }
})
```

### 修改图标形状

修改 `shape` 属性，可选值为 'circle'、'dot'、'button'，默认为 'circle'。

```html
<jm-radio-group value="1" shape="dot">
  <jm-radio value="1">京麦</jm-radio>
  <jm-radio value="2">商家后台</jm-radio>
</jm-radio-group>

<jm-radio-group value="1" shape="button">
  <jm-radio value="1">京麦</jm-radio>
  <jm-radio value="2">商家后台</jm-radio>
</jm-radio-group>
```
可以只修改其中某个radio的图标形状。

```html
<jm-radio-group value="1">
  <jm-radio value="1" shape="dot">京麦</jm-radio>
  <jm-radio value="2">商家后台</jm-radio>
</jm-radio-group>
```
### 修改选中的颜色

设置 `checked-color` 属性。

```html
<jm-radio-group value="1" checked-color="#f00">
  <jm-radio value="1">京麦</jm-radio>
  <jm-radio value="2">商家后台</jm-radio>
</jm-radio-group>
```

### 禁用

可以在 `radio-group` 上面设置 `disabled`，禁用所有单选框，也可以在单个单选框上面设置 `disabled` 属性，禁用某个单选框。
>注意阿凡达小程序不支持单键写法，必须写成键值对`disabled="{{true}}"`

```html
<jm-radio-group value="1" disabled="{{true}}">
  <jm-radio value="1">京麦</jm-radio>
  <jm-radio value="2">商家后台</jm-radio>
</jm-radio-group>
```

### Props优先级

radio设置的props优先级比radioGroup上设置的props优先级更高

```html
  <jm-radio-group value="1" shape="button" disabled="{{true}}" checked-color="#f00">
    <jm-radio value="1" disabled="{{false}}" checked-color="#000" shape="circle">商家后台</jm-radio>
    <jm-radio value="2" disabled="{{false}}" shape="dot">商家前端</jm-radio>
    <jm-radio value="3" disabled="{{false}}">京麦</jm-radio>
    <jm-radio value="4">商家智能</jm-radio>
  </jm-radio-group>
```
### RadioGroup Attributes
| 参数      | 说明                                 | 类型      | 可选值       | 默认值   |
|---------- |------------------------------------ |---------- |------------- |-------- |
| value | 绑定值，单项数据流。会自动选中value对应的单选框 | string / number / boolean | - | - |
| shape | 单选框形状 | string | 'circle', 'dot', 'button' | 'circle' |
| checked-color | 选中的颜色 | string | - | '#0083ff' |
| disabled | 禁用 | boolean | - | false |

### RadioGroup Events

| 事件名称      | 说明                                 | 参数     |
|------------- |------------------------------------ |--------- |
| change | 绑定值变化时触发 | 选中值 |

### Radio Attributes

| 参数      | 说明                                 | 类型      | 可选值       | 默认值   |
|---------- |------------------------------------ |---------- |------------- |-------- |
| value | 单选框选中时的值。会自动匹配radioGroup的value | string / number / boolean | - | - |
| shape | 单选框形状 | string | 'circle', 'dot', 'button' | 'circle' |
| checked-color | 选中的颜色 | string | - | '#0083ff' |
| disabled | 禁用 | boolean | - | false |