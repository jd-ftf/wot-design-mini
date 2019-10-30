# Counter 计数器

### 引入

在`app.json`或`index.json`中引入组件，默认为`ES6`版本，`ES5`引入方式参见[快速上手](#/quickstart)

```json
"usingComponents": {
    "jmd-counter": "",
}
```

## 代码演示

### 基础用法

```html
 <jmd-counter value="{{ 1 }}" />
```

### 禁用状态

通过设置`disabled`属性来禁用计数器

```html
<jmd-counter
                disabled
                value="{{ value }}"
                bind:change="handleChange" />
```

### 高级用法

默认是每次加减为1，可以对组件设置`step`、`min`、`max`属性

```html
 <jmd-counter
                value="{{ 0 }}"
                step="{{ 0.1 }}"
                min="0"
                max="5"/>
```
异步调用

```html
<jmd-counter
                async-change
                value="{{ value1 }}"
                bind:change="asyncChange" />
```
### Props

| 参数 | 说明 | 类型 | 默认值 |
|-----------|-----------|-----------|-------------|
| name | 在表单内提交时的标识符 | *string* | - |
| mode | 表单模式:no-custom不可自定义数量，不显示input框；custom可自定义（默认状态） | *string* | `custom` |
| value | 输入值 | *string* | *number* | 最小值 |
| min | 最小值 | *string* | *number* | `1` |
| max | 最大值 | *string* | *number* | - |
| step | 步数 | *string* | *number* | `1` |
| integer | 是否只允许输入整数 | *boolean* | `false` |
| disabled | 是否禁用 | *boolean* | `false` |
| inputLock | 是否禁用输入框 | *boolean* | `false` |
| minusLock | 是否禁用减按钮 | *boolean* | `false` |
| plusLock | 是否禁用加按钮 | *boolean* | `false` |
| async-change | 异步变更，为 `true` 时input值不变化，仅触发事件 | *boolean* | `false` |
| input-width | 输入框宽度，须指定单位 | *string* | `30px` |

### Events

| 事件名 | 说明 | 回调参数 |
|-----------|-----------|-----------|
| bind:change | 当绑定值变化时触发的事件 | event.detail.data: 当前输入的值；event.detail.type: 加法/减法操作|
| bind:focus | 输入框聚焦时触发 | - |
| bind:blur | 输入框失焦时触发 | - |
| bind:input | 输入框输入时触发 | - |

### 外部样式类

| 类名 | 说明 |
|-----------|-----------|
| hover-class | 根节点样式类 |
| input-class | 输入框样式类 |
| plus-class | 加号按钮样式类 |
| minus-class | 减号按钮样式类 |
