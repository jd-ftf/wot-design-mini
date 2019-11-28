## Input 输入框

<p style="color: #ff0000;">！！！该组件尚未开发，不可使用</p>

### 引入

```json
{
  "usingComponents": {
    "jm-input": "/jm-design/input/index"
  }
}
```

### 基本用法

`value` 为绑定值。

```html
<jm-input value="{{ value }}" placeholder="请输入用户名" />

<script>
export default {
  data () {
    return {
      input: ''
    }
  }
}
</script>
```

### 禁用

设置 `disabled` 属性。

```html
<jm-input value="input" disabled />
```

### 只读

设置 `readonly` 属性。

```html
<jm-input value="{{ value }}" readonly />
```

### 清空按钮

设置 `clearable` 属性。

```html
<jm-input value="{{ value }}" clearable />
```

### 密码输入框

设置 `show-password` 属性。

```html
<jm-input value="{{ value }}" clearable show-password />
```

### 前后icon

设置前置icon `prefix-icon`，设置后置icon `suffix-icon`。

```html
<jm-input value="{{ value }}" prefix-icon="jm-icon-person" suffix-icon="jm-icon-tickets" />
```

### 限制字数输入

设置 `maxlength` 属性，如果要显示字数限制，设置 `show-word-limit` 属性。

```html
<jm-input value="{{ value }}" maxlength="20" show-word-limit />
```

### 文本域

设置 `type` 为 'textarea`。

```html
<jm-input type="textarea" value="{{ value }}" placeholder="请填写评价..." />
```

设置清空，字数限制，设置 `rows` 行数。也可以设置 `autosize` ，使文本域高度自动增加。`autosize`默认显示`3`行

```html
<jm-input type="textarea" value="{{ value }}" placeholder="请填写评价..." rows="6" maxlength="120" clearable show-word-limit />

```

### 输入框高度边界设置

```html
<jm-input value="{{ value9 }}" autosize="{{ size }}" clearable />
```
### 普通输入框高度自增加

```html
<jm-input value="{{ value }}" autosize rows="1"/>
```

### Attributes

| 参数      | 说明                                 | 类型      | 可选值       | 默认值   |
|---------- |------------------------------------ |---------- |------------- |-------- |
| type | 类型 | string | text, textarea, number, email | text |
| value   |	绑定值                        |	string / number     | -   |	-  |
| placeholder	    | 占位文本                  |	string    |	-         |	'搜索' |
| clearable | 显示清空按钮 | boolean | - | false |
| maxlength | 原生属性，最大长度 | string | - | - |
| showPassword | 显示为密码框 | boolean | - | false |
| disabled | 原生属性，禁用 | boolean | - | false |
| readonly | 只读 | boolean | - | false |
| prefixIcon | 前置图标，京麦icon中的图标类名 | string | - | - |
| suffixIcon | 后置图标，京麦icon中的图标类名 | string | - | - |
| showWordLimit | 显示字数限制，需要同时设置 maxlength | boolean | - | false |
| placeholderStyle | textarea原生属性，指定 placeholder 的样式，目前仅支持color,font-size和font-weight | string | - | - |
| placeholderClass | textarea指定 placeholder 的样式类 | string | - | textarea-placeholder |
| focus | textarea原生属性，获取焦点 | boolean | - | false |
| autofocus | textarea原生属性，自动聚焦，拉起键盘 | boolean | - | false |
| cursorSpacing | textarea原生属性，指定光标与键盘的距离。取textarea距离底部的距离和cursor-spacing指定的距离的最小值作为光标与键盘的距离 | number | - | 0 |
| fixed | textarea原生属性，如果 textarea 是在一个 position:fixed 的区域，需要显示指定属性 fixed 为 true | boolean | - | false |
| cursor | textarea原生属性，指定focus时的光标位置 | number | - | -1 |
| showConfirmBar | textarea原生属性，是否显示键盘上方带有”完成“按钮那一栏 | boolean | - | true |
| selectionStart | textarea原生属性，光标起始位置，自动聚集时有效，需与selection-end搭配使用 | number | - | -1 |
| selectionEnd | textarea原生属性，光标结束位置，自动聚集时有效，需与selection-start搭配使用 | number | - | -1 |
| adjustPosition | textarea原生属性，键盘弹起时，是否自动上推页面 | boolean | - | true |
| holdKeyboard | textarea原生属性，focus时，点击页面的时候不收起键盘 | boolean | - | false |
| autoHeight | textarea原生属性，textarea 行数自适应，组件中建议使用autosize属性替代该属性 | string | - | '3' |
| autosize | 是否高度自适应，可以设置为对象，如 { minRows: 2, maxRows: 6 } | boolean / object | - | - |
| resize | 是否允许用户缩放 | string | 'none', 'both', 'horizontal', 'vertical' | 'none' |
| autofocus | 原生属性，是否自动聚焦，如果在页面加载时让其获得焦点，对于 android 有效， iOS 无效 | boolean | - | false |

### Events

| 事件名称      | 说明                                 | 参数     |
|------------- |------------------------------------ |--------- |
| bind:focus        | 监听输入框focus事件                    | -       |
| bind:blur         | 监听输入框blur事件                     | -       |
| bind:change       | 监听输入框修改事件                      | 搜索输入框文本       |
| bind:clear        | 监听输入框清空按钮事件                   | -       |
| bind:linechange        | 监听输入框行数变化                   | -       |
| bind:confirm        | 点击完成时， 触发 confirm 事件                   | -       |
| bind:keyboardheightchange        | 监听键盘高度发生变化                   | -       |
### Methods

| 方法名称      | 说明       | 参数   |
|------------- |----------- |---------  |
| focus      | 使输入框获得焦点 | —  |
| blur    | 使输入框失去焦点 | -  |
| select | 使输入框内容被选中 | - |