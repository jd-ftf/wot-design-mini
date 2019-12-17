## Switch 开关

### 引入

```json
{
  "usingComponents": {
    "be-switch": "/bee-design/switch/index"
  }
}
```

### 基本用法

设置 `value` 值，监听 `change` 事件修改值。

```html
<be-switch value="{{ checked }}" bind:change="handleChange" />

Page({
  data: {
    checked: true
  },
  handleChange ({ detail }) {
    this.setData({
      checked: detail
    })
  }
})
```

### 修改值

通过 `active-value` 属性修改开关打开时的值，`inactive-value` 属性修改开关关闭时的值。

```html
<be-switch value="{{ checked }}" active-value="京麦" inactive-value="商家后台" />
```

### 修改颜色

通过 `active-color` 属性修改开关打开时的颜色，`inactive-color` 属性修改开关关闭时的颜色。

```html
<be-switch value="{{ checked }}" active-color="#13ce66" inactive-color="#f00" />
```

### 修改大小

设置 `size` 修改开关大小。

```html
<be-switch value="{{ checked }}" size="20px" />
```

### 禁用

设置 `disabled` 属性。

### Attributes

| 参数      | 说明                                 | 类型      | 可选值       | 默认值   |
|---------- |------------------------------------ |---------- |------------- |-------- |
| value/v-model   |	绑定值 |	boolean / string / number | - |	-  |
| disabled | 禁用 | boolean | - | false |
| active-value | 打开时的值 | boolean / string / number | - | true |
| inactive-value | 关闭时的值 | boolean / string / number | - | false |
| active-color | 打开时的背景色 | string | - | '#0083ff' |
| inactive-color | 关闭时的背景色，默认为白色，所以有灰色边框，如果设置了该值，则会自动去除灰色边框 | string | - | '#fff' |
| size | 开关大小，可以为任何单位的字符串尺寸 | string | - | '28px' |

### Events

| 事件名称      | 说明                                 | 参数     |
|------------- |------------------------------------ |--------- |
| bind:change | 值修改事件 | event.detail: 当前值 |

### 外部样式类

| 类名     | 说明                |
|---------|---------------------|
| custom-class | 根结点样式 |
