## Popover 气泡

常用于展示提示信息。


### 引入

```json
{
  "usingComponents": {
    "wd-popover": "/wot-design/popover/index"
  }
}
```

### 基本用法

Popover 的属性与 [Tooltip](/#/components/tooltip) 很类似，因此对于重复属性，请参考 [Tooltip](/#/components/tooltip) 的文档，在此文档中不做详尽解释。

```html
<div>
  <wd-popover content="这是一段信息。">
    <wd-button >点击展示</wd-button>
  </wd-popover>
</div>
```

### 模式 mode

使用 `mode` 属性控制当前文字提示的模式。

`mode` 有两个值，一种是 `normal` 普通文字模式，另一种是 `menu` 列表模式:

* **normal**: 当 `mode` 处于默认状态，`content` 属性传入要显示的 `String` 字符串。

* **menu**: 文字提示框会展示成列表形式，此时 `content` 属性传入 `Array` 类型，数组中每一个对象以 `[{ iconClass: 'read', content: '内容' }]` 命名。如果不需要icon，那么传入 `[{ content: '内容' }]`。绑定事件 `menu-click` ，在选择结束后，执行操作，列表关闭。

**注意：iconClass 属性值为组件库内部的 icon 图标名。**

```html
<wd-popover mode="menu" content="{{ menu }}" bind:menu-click="link">
  <wd-button >列表</wd-button>
</wd-popover>
```

```javascript
Page({
  data: {
    menu: [
      {
        iconClass: 'read',
        content: '全部标记已读'
      },
      {
        iconClass: 'delete',
        content: '清空最近会话'
      },
      {
        iconClass: 'detection',
        content: '消息订阅设置'
      },
      {
        iconClass: 'subscribe',
        content: '消息异常检测'
      }
    ]
  },
  link (param) {
    const data = param.detail.item
    Toast('选择了' + data.content)
  }
})
```

### 嵌套信息

可以在 Popover 中嵌套多种类型信息，以下为嵌套标签的例子。

```html
<wd-popover use-content-slot>
  <view slot="content" class="tag-wrapper">
    <wd-tag type="primary" style="margin-right: 5px;">标签</wd-tag>
    <wd-tag type="danger" style="margin-right: 5px;">标签</wd-tag>
    <wd-tag type="warning">标签</wd-tag>
  </view>
  <wd-button>点击展示</wd-button>
</wd-popover>
```

### Popover Attributes

| 参数               | 说明                                                     | 类型              | 可选值      | 默认值 |
|--------------------|----------------------------------------------------------|-------------------|-------------|--------|
|  value / v-model |  手动状态是否可见  | Boolean           | — |  false |
|  content        |  显示的内容，也可以通过 `slot#content` 传入  | String/Array（当模式为菜单模式时，content属性格式为Array）            | — | — |
|  mode        |  当前显示的模式，决定内容的展现形式  | String | 'normal'（普通模式）/'menu'（菜单模式） | 'normal' |
|  placement        |  popover 的出现位置  | String           |  top/top-start/top-end/bottom/bottom-start/bottom-end/left/left-start/left-end/right/right-start/right-end |  bottom |
|  visible-arrow   |  是否显示 popover 箭头 | Boolean | — | true |
|  disabled       |  popover 是否可用  | Boolean           | — |  false |
|  offset        |  出现位置的偏移量  | Number           | — |  5 |

### Slot

| name      | 说明       |
|------------- |----------- |
| content | 多行内容或用户自定义样式 |

### Events

| 事件名称           | 说明             | 回调参数                                     |
| -------------- | -------------- | ---------------------------------------- |
| show     |显示时触发       | - |
| hide | 隐藏时触发 | - |
| menu-click | menu 模式下点击某一选项触发 | 当前选项内容{name,content}, 当前选项索引index |
