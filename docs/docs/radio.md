## Radio 单选框

### 引入

```json
{
  "usingComponents": {
    "be-radio": "/bee-design/radio/index",
    "be-radio-group": "bee-design/radioGroup/index"
  }
}
```

### 基本用法

`value` 为绑定值，即选中的 `be-radio` 的 `value` 值。
点击radio会触发`change`事件，同时可以通过修改`value`来调整选中的radio。

```html
<demo-block title="基本用法">
  <be-radio-group value="{{value}}" bind:change="change">
    <be-radio value="{{1}}">单选框1</be-radio>
    <be-radio value="{{2}}">单选框2</be-radio>
  </be-radio-group>
  <view>当前选中的值为:{{value}}</view>
</demo-block>
```
```javascript
Page({
  data: {
    value: 1
  },
  change (event) {
    this.setData({
      value: event.detail
    })
  }
})
```

### 修改图标形状

修改 `shape` 属性，可选值为 'circle'、'dot'、'button'，默认为 'circle'。

```html
<be-radio-group value="1" shape="dot">
  <be-radio value="1">京麦</be-radio>
  <be-radio value="2">商家后台</be-radio>
</be-radio-group>

<be-radio-group value="1" shape="button">
  <be-radio value="1">京麦</be-radio>
  <be-radio value="2">商家后台</be-radio>
</be-radio-group>
```
可以只修改其中某个radio的图标形状。

```html
<be-radio-group value="1">
  <be-radio value="1" shape="dot">京麦</be-radio>
  <be-radio value="2">商家后台</be-radio>
</be-radio-group>
```
### 修改选中的颜色

设置 `checked-color` 属性。

```html
<be-radio-group value="1" checked-color="#f00">
  <be-radio value="1">京麦</be-radio>
  <be-radio value="2">商家后台</be-radio>
</be-radio-group>
```

### 禁用

可以在 `radio-group` 上面设置 `disabled`，禁用所有单选框，也可以在单个单选框上面设置 `disabled` 属性，禁用某个单选框。
>注意阿凡达小程序不支持单键写法，必须写成键值对`disabled="{{true}}"`

```html
<be-radio-group value="1" disabled="{{true}}">
  <be-radio value="1">京麦</be-radio>
  <be-radio value="2">商家后台</be-radio>
</be-radio-group>
```

### Props优先级

radio设置的props优先级比radioGroup上设置的props优先级更高

```html
  <be-radio-group value="1" shape="button" disabled="{{true}}" checked-color="#f00">
    <be-radio value="1" disabled="{{false}}" checked-color="#000" shape="circle">商家后台</be-radio>
    <be-radio value="2" disabled="{{false}}" shape="dot">商家前端</be-radio>
    <be-radio value="3" disabled="{{false}}">京麦</be-radio>
    <be-radio value="4">商家智能</be-radio>
  </be-radio-group>
```
### RadioGroup Attributes
| 参数      | 说明                                 | 类型      | 可选值       | 默认值   |
|---------- |------------------------------------ |---------- |------------- |-------- |
| value | 会自动选中value对应的单选框 | string / number / boolean | - | - |
| shape | 单选框形状 | string | 'circle', 'dot', 'button' | 'circle' |
| checked-color | 选中的颜色 | string | - | '#0083ff' |
| disabled | 禁用 | boolean | - | false |

### RadioGroup Events

| 事件名称      | 说明                                 | 参数     |
|------------- |------------------------------------ |--------- |
| bind:change | 绑定值变化时触发 | event.detail = 选中的radio的value  |

### Radio Attributes

| 参数      | 说明                                 | 类型      | 可选值       | 默认值   |
|---------- |------------------------------------ |---------- |------------- |-------- |
| value | 单选框选中时的值。会自动匹配radioGroup的value | string / number / boolean | - | - |
| shape | 单选框形状 | string | 'circle', 'dot', 'button' | 'circle' |
| checked-color | 选中的颜色 | string | - | '#0083ff' |
| disabled | 禁用 | boolean | - | false |