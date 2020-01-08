## ActionSheet 上拉菜单

### 引入

```json
{
  "usingComponents": {
    "wd-action-sheet": "/wot-design/actionSheet/index"
  }
}
```

### 基本用法

通过 `show` 属性设置显示隐藏，监听 `bind:close` 事件，隐藏菜单。

```html
<wd-button type="primary" bind:click="showActions">弹出菜单</wd-button>
<wd-action-sheet show="{{ show }}" actions="{{ actions }}" bind:close="close" />
```

```javascript
page({
  data: {
    show: false,
    actions: [
      {
        name: '选项1'
      }, {
        name: '选项2'
      }, {
        name: '选项3',
        subname: '描述信息'
      }
    ]
  },
  showActions () {
    this.setData({
      show: true
    })
  },
  close () {
    this.setData({
      show: false
    })
  }
})
```

### 选项状态

可以设置 颜色、禁用、加载 等状态。

```html
<wd-button type="primary" bind:click="showActions">弹出菜单</wd-button>
<wd-action-sheet show="{{ show }}" actions="{{ actions }}" bind:close="close" />
```

```javascript
page({
  data: {
    show: false,
    actions: [
      {
        name: '颜色',
        color: '#0083ff'
      }, {
        name: '禁用',
        disabled: true
      }, {
        loading: true
      }
    ]
  },
  showActions () {
    this.setData({
      show: true
    })
  },
  close () {
    this.setData({
      show: false
    })
  }
})
```

### 取消按钮

设置 `cancel-text` 取消按钮文案，展示取消按钮。

```html
<wd-action-sheet
  show="{{ show }}"
  actions="{{ actions }}"
  bind:close="close"
  cancel-text="取消" />
```

### 标题

设置 `title` 展示标题。

```html
<wd-action-sheet show="{{ show }}" title="标题" bind:close="close">
  <view style="padding: 15px 15px 150px 15px;">内容</view>
</wd-action-sheet>
```

### Attributes

| 参数      | 说明                                 | 类型      | 可选值       | 默认值   |
|---------- |------------------------------------ |---------- |------------- |-------- |
| show | 设置菜单显示隐藏 | boolean | - | - |
| actions | 菜单选项 | array | - | [] |
| title | 标题 | string | - | - |
| cancel-text | 取消按钮文案 | string | - | - |
| close-on-click-action | 点击选项后是否关闭菜单 | boolean | - | true |
| close-on-click-modal | 点击遮罩是否关闭 | boolean | - | true |
| duration | 动画持续时间 | number | - | 300(ms) |
| z-index | 菜单层级 | number | - | 10 |

### Events

| 事件名称      | 说明                                 | 参数     |
|------------- |------------------------------------ |--------- |
| bind:select | 点击选项时触发 | item: 选项对象, index: 选项下标 |
| bind:open | 弹出层打开时触发 | - |
| bind:opened | 弹出层打开动画结束时触发 | - |
| bind:close | 弹出层关闭时触发 | - |
| bind:closed | 弹出层关闭动画结束时触发 | - |
| bind:click-modal | 点击遮罩时触发 | - |
| bind:cancel | 点击取消按钮时触发 | - |

### Action 数据结构

| 键名 | 说明 | 类型 |
|----- |----- |----- |
| name | 选项名称 | string |
| subname | 描述信息 | string |
| color | 颜色 | string |
| disabled | 禁用 | boolean |
| loading | 加载中状态 | boolean |
