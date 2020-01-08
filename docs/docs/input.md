## Input 输入框

### 引入

```json
{
  "usingComponents": {
    "wd-input": "/wot-design/input/index"
  }
}
```

### 基本用法

`value` 为绑定值。
`bindChange`为绑定change事件。
**微信小程序非双向绑定，需要手动赋值到当前页面。**
```javascript
page({
  data: {
    value: '',
  },
  handleChange ({ detail }) {
    this.setData({
      value: detail
    })
  }
})
```
```html
<wd-input type="text" value="{{ value }}" placeholder="请输入..." bind:change="handleChange"/>
```
### input事件使用示例
组件自定义，input事件无法直接return赋值，因此也需要手动赋值。
```javascript
page({
  handleInput({ detail }) {
    var value = detail.value
    this.setData({
      value: value.replace(/11/g, '2')
    })
  },
})
```
```html
<wd-input value="{{ value }}" type="text" bind:input="handleInput" placeholder="连续的两个1会变成2" />
```

### 禁用

设置 `disabled` 属性。

```html
<wd-input value="input" disabled="{{ true }}" />
```

### 只读

设置 `readonly` 属性。

```html
<wd-input value="{{ value }}" readonly="{{ true }}" />
```

### 清空按钮

设置 `clearable` 属性。

```html
<wd-input value="{{ value }}" clearable bind:change="handleChange"/>
```

### 密码输入框

设置 `show-password` 属性。

```html
<wd-input value="{{ value }}" clearable="{{ true }}" show-password="{{ true }}" bind:change="handleChange"/>
```

### 前后icon

设置前置icon `prefix-icon`，设置后置icon `suffix-icon`。

`prefix-icon`、`suffix-icon`属性名对应显示。

```html
<wd-input
  value="{{ value }}"
  prefix-icon="wd-icon-person"
  suffix-icon="wd-icon-tickets"
  bind:change="handleChange"/>
```
### 前后icon

设置前置icon `prefix-icon`，设置后置icon `suffix-icon`。
```html
<wd-input 
  value="{{ value }}" 
  clearable="{{ true }}" 
  use-suffix-slot="{{ true }}" 
  use-prefix-slot="{{ true }}" 
  custom-suffix-class="suffix-slot" 
  bind:change="handleChange">
    <view slot="prefix">1</view>
    <view slot="suffix">2</view>
</wd-input>
```
```css
/* 插槽样式 */
.suffix-slot{
  display: inline-block;
  margin-left: 8px;
  vertical-align: middle;
}
```
### 限制字数输入

设置 `maxlength` 属性，如果要显示字数限制，设置 `show-word-limit` 属性。

```html
<wd-input value="{{ value }}" maxlength="20" show-word-limit="{{ true }}" bind:change="handleChange"/>
```
### 文本域

设置 `type` 为 'textarea`。

```html
<wd-input type="textarea" value="{{ value }}" placeholder="请输入..." bind:change="handleChange"/>
```

设置清空，字数限制。

```html
<wd-input
  type="textarea"
  value="{{ value }}"
  placeholder="请输入..."
  maxlength="120"
  clearable="{{ true }}"
  show-word-limit="{{ true }}"
  bind:change="handleChange"/>
```
也可以设置`auto-height`使高度自增加。

```html
<wd-input value="{{ value }}" auto-height="{{ true }}" bind:change="handleChange"/>
```

### Attributes

| 参数      | 说明                                 | 类型      | 可选值       | 默认值   |
|---------- |------------------------------------ |---------- |------------- |-------- |
| type | 类型 | string | text, textarea, number, digit, idcard | text |
| value   |	绑定值                        |	string / number     | -   |	-  |
| placeholder	    | 占位文本                  |	string    |	-         |	'请输入...' |
| clearable | 显示清空按钮 | boolean | - | false |
| maxlength | 原生属性，最大长度 | string | - | - |
| showPassword | 显示为密码框 | boolean | - | false |
| disabled | 原生属性，禁用 | boolean | - | false |
| readonly | 只读 | boolean | - | false |
| prefixIcon | 前置图标，icon组件中的图标类名 | string | - | - |
| suffixIcon | 后置图标，icon组件中的图标类名 | string | - | - |
| showWordLimit | 显示字数限制，需要同时设置 maxlength | boolean | - | false |
| confirm-type | 设置键盘右下角按钮的文字，仅在type='text'时生效 | string | done, go, next, search, send | done |
| placeholderStyle | 原生属性，指定 placeholder 的样式，目前仅支持color,font-size和font-weight | string | - | - |
| placeholderClass | textarea指定 placeholder 的样式类 | string | - | textarea-placeholder |
| focus | 原生属性，获取焦点 | boolean | - | false |
| autofocus | 原生属性，自动聚焦，拉起键盘 | boolean | - | false |
| cursorSpacing | 原生属性，指定光标与键盘的距离。取textarea距离底部的距离和cursor-spacing指定的距离的最小值作为光标与键盘的距离 | number | - | 0 |
| fixed | textarea原生属性，如果 textarea 是在一个 position:fixed 的区域，需要显示指定属性 fixed 为 true | boolean | - | false |
| cursor | 原生属性，指定focus时的光标位置 | number | - | -1 |
| showConfirmBar | 原生属性，是否显示键盘上方带有”完成“按钮那一栏 | boolean | - | true |
| selectionStart | 原生属性，光标起始位置，自动聚集时有效，需与selection-end搭配使用 | number | - | -1 |
| selectionEnd | 原生属性，光标结束位置，自动聚集时有效，需与selection-start搭配使用 | number | - | -1 |
| adjustPosition | 原生属性，键盘弹起时，是否自动上推页面 | boolean | - | true |
| autoHeight | textarea原生属性，textarea 行数自适应，从1行开始显示 | string | - | - |

### Events

| 事件名称      | 说明                                 | 参数     |
|------------- |------------------------------------ |--------- |
| bind:input        | 监听输入框focus事件                    | event.detail = {value, cursor, keyCode}       |
| bind:focus        | 监听输入框focus事件                    | event.detail = { value, height }       |
| bind:blur         | 监听输入框blur事件                     | 搜索输入框文本value       |
| bind:change       | 监听输入框修改事件                      | 搜索输入框文本value       |
| bind:clear        | 监听输入框清空按钮事件                   | -       |
| bind:linechange        | 监听输入框行数变化(仅限textarea)                   | event.detail = {height: 0, heightRpx: 0, lineCount: 0}       |
| bind:confirm        | 点击完成时， 触发 confirm 事件                   | event.detail = {value: value}       |

### 外部样式类

| 类名     | 说明                |
|---------|---------------------|
| custom-class | 根结点样式 |
| custom-textarea-class | textarea外部自定义样式 |
| custom-input-class | input外部自定义样式 |