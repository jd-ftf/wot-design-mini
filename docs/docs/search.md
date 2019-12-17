## Search 搜索框

### 引入

```json
{
  "usingComponents": {
    "jm-search": "/jm-design/search/index"
  }
}
```

### 基本用法

`value`设置输入框绑定值、`focus`绑定聚焦事件、`change` 绑定输入事件，`blur`绑定失焦事件，`search` 绑定搜索事件，`cancel` 绑定取消事件，`clear` 绑定清空事件。

```html
<jm-search
  value="{{value}}"
  bind:focus="focus"
  bind:blur="blur"
  bind:search="search"
  bind:clear="clear"
  bind:cancel="cancel"
  bind:change="change"
  maxlength="10"
/>
```

```javascript
Page({
  data: {
   value: ''
  },
  focus () {
    console.log('聚焦')
  },
  blur () {
    console.log('失焦')
  },
  search () {
    console.log('搜索')
  },
  clear () {
    console.log('重置')
  },
  cancel () {
    console.log('取消')
  },
  change (event) {
    console.log('输入', event.detail)
    this.setData({ value: event.detail })
  },
})
```

### 浅色主题

设置 `light` 属性，将组件背景色和输入框背景色反转。

```html
<jm-search light />
```

### 输入框提示文案靠左
设置 `placeholder-left` 属性。
```html
<jm-search placeholder-left />
```

### 隐藏取消按钮

设置 `hide-cancel` 属性。

```html
<jm-search hide-cancel />
```

### 禁用

设置 `disabled` 属性。

```html
<jm-search disabled="{{true}}" />
```

可以和 `hide-cancel` 结合使用，用于在本页只展示搜索框，当点击搜索框时，将页面路由切换进搜索页，在搜索页中再使用搜索功能。

```html
<jm-search hide-cancel disabled="{{true}}" />
```

### 自定义

通过设置 `placeholder` 修改输入框提示文案，`cancel-txt` 修改取消按钮文案。

```html
<jm-search placeholder="请输入订单号/订单名称" cancel-txt="搜索" />
```
通过设置 `use-action-slot` 来自定义输入框左边内容，设置`use-action-slot` 使用自定义内容替换取消按钮。
```html
<jm-search use-label-slot use-action-slot>
  <view slot="label" style="line-height: 14px;margin-right: 10px;">左侧</view>
  <view slot="action" style="padding: 5px 10px;color: #ff0000;">右侧</view>
</jm-search>
```

### Attributes

| 参数      | 说明                                 | 类型      | 可选值       | 默认值   |
|---------- |------------------------------------ |---------- |------------- |-------- |
| placeholder	    | 搜索框占位文本                  |	string    |	-         |	'搜索' |
| placeholder-left  | placeholder居左边              | boolean    | -          | false   |
| cancel-txt      | 搜索框右侧文本                   | string    | -          | '取消'   |
| light           | 搜索框亮色（白色）                | boolean   | -          | false   |
| hide-cancel     | 是否隐藏右侧文本                 | boolean    | -          | false   |
| disabled        | 是否禁用搜索框                   | boolean    | -          | false   |
| maxlength | 原生属性，设置最大长度。-1表示无限制 | string/number | - | -1 |
| value | 输入框文案，单向数据绑定 | string | - | - |
| use-label-slot | 是否使用输入框左侧插槽 | boolean | - | false |
| use-action-slot | 是否使用输入框右侧插槽 | boolean | - | false |

### Events

| 事件名称      | 说明                                 | 参数     |
|------------- |------------------------------------ |--------- |
| bind:focus        | 输入框聚焦事件                    | event.detail = 输入框内容 |
| bind:blur         | 监听输入框失焦事件                     | event.detail = 输入框内容 |
| bind:search       | 监听输入框搜索事件                      | event.detail = 输入框内容 |
| bind:clear        | 监听输入框清空按钮事件                   | - |
| bind:cancel       | 监听输入框右侧文本点击事件               | event.detail = 输入框内容 |
| bind:change       | 监听输入框内容变化事件                   | event.detail = 输入框内容 |

### Slots

| name      | 说明                                 |
|------------- |--------------------------------- |
| label       | 输入框左侧自定义内容 |
| action       | 输入框左侧自定义内容 |

### 外部样式类

| 类名      | 说明                                 |
|------------- |--------------------------------- |
| custom-class | 根结点样式 |