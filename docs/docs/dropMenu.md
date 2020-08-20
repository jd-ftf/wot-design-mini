# DropMenu 下拉菜单

### 引入

```json
{
  "usingComponents": {
    "wd-drop-menu": "/wot-design/dropMenu/index",
    "wd-drop-menu-item": "/wot-design/dropMenuItem/index"
  }
}
```

## 代码演示

### 基础用法

基础用法需要绑定 `value` 值以及 `options` 属性。

 `options` 属性一般格式为 `[{ text:'', value: '0' }]`, 如果开启内容插槽,应当使用 `string` 类型, 使用说明见后文。

```html
<wd-drop-menu>
  <wd-drop-menu-item value="0" options="{{ option1 }}" />
  <wd-drop-menu-item value="a" options="{{ option2 }}" />
</wd-drop-menu>
```

```JavaScript
Page({
  data: {
    option1: [
      { text: '全部商品', value: '0' },
      { text: '新款商品', value: '1' },
      { text: '活动商品', value: '2' }
    ],
    option2: [
      { text: '综合', value: 'a' },
      { text: '销量', value: 'b' },
      { text: '上架时间', value: 'c' }
    ]
  }
})
```

### 外部控制选项

`value` 值可以绑定静态数据, 也可以绑定变量，通过控制绑定的 `value` 去控制其显示。

动态控制 `value` 时, 需要绑定 `change` 事件, 动态的在外部改变选中的值。

```html
<wd-drop-menu>
  <wd-drop-menu-item value="{{ value1 }}" options="{{ option1 }}" bindchange="choose1"/>
  <wd-drop-menu-item value="{{ value2 }}" options="{{ option1 }}" bindchange="choose2"/>
</wd-drop-menu>
```

```JavaScript
Page({
  data: {
    value1: '0',
    value2: '0',
    option1: [
      { text: '全部商品', value: '0' },
      { text: '新款商品', value: '1' },
      { text: '活动商品', value: '2' }
    ],
    option2: [
      { text: '综合', value: '0' },
      { text: '销量', value: '1' },
      { text: '上架时间', value: '2' }
    ]
  },
  choose1 ({ detail }) {
    this.setData({ value1: detail })
  },
  choose2 ({ detail }) {
    this.setData({ value2: detail })
  }
})
```

### 自定义菜单内容

通过插槽`custom`可以自定义 `DropMenuItem` 的内容，此时需要使用实例上的 `close` 方法手动控制菜单的关闭。

使用 `custom` 插槽过程中, 传入 `string` 类型的 `options` 属性用来展示列表上的显示名称, 开启 `DropMenuItem` 上的属性 `use-drop-item-slot`。

```html
<wd-drop-menu>
  <wd-drop-menu-item value="0" options="{{ option1 }}" />
  <wd-drop-menu-item options="筛选" id="drop-menu" use-drop-item-slot>
    <view slot="custom">
      <wd-cell title="标题文字" value="内容" icon="setting" />
      <wd-cell title="标题文字" value="内容" icon="collect" />
      <wd-cell is-link to="/pages/button/index" title="设置" value="内容" bind:click="onClick" />
      <wd-button block size="large" suck bind:tap="confirm">主要按钮</wd-button>
    </view>
</wd-drop-menu>
```

```JavaScript
Page({
  data: {
    option1: [
      { text: '全部商品', value: '0' },
      { text: '新款商品', value: '1' },
      { text: '活动商品', value: '2' }
    ],
    option2: [
      { text: '综合', value: '0' },
      { text: '销量', value: '1' },
      { text: '上架时间', value: '2' }
    ]
  },
  confirm () {
    // 关闭下拉框
    const drop = this.selectComponent('#dropMenu')
    drop.close()
  }
})
```

### 自定义菜单选项

通过插槽 `menu` 可以自定义 `DropMenu` 某一选项的内容。使用 `menu` 插槽过程中, 开启 `DropMenu` 上的属性 `use-drop-menu-slot`。

注意: 使用 `dropMenu` 插槽的过程中，菜单内容和展开方式也需要用户自行控制。如果只需要控制选项卡上的选项(如: `sortButton`), 则不需要展开折叠。

```html
<wd-drop-menu use-drop-menu-slot>
  <wd-drop-menu-item value="0" options="{{ option1 }}" />
  <view slot="menu" style="line-height: 14px;">
    <wd-sort-button title="价格" allow-reset/>
  </view>
</wd-drop-menu>
```

### 自定义选中态颜色

通过`active-color`属性可以自定义菜单标题和选项的选中态颜色

```html
<wd-drop-menu active-color="#ee0a24">
  <wd-drop-menu-item value="0" options="{{ option1 }}" />
  <wd-drop-menu-item value="1" options="{{ option2 }}" />
</wd-drop-menu>
```

### 向上展开

将`direction`属性值设置为`up`，菜单即可向上展开

```html
<wd-drop-menu direction="up">
  <wd-drop-menu-item value="0" options="{{ option1 }}" />
  <wd-drop-menu-item value="1" options="{{ option2 }}" />
</wd-drop-menu>
```

### 禁用菜单

```html
<wd-drop-menu>
  <wd-drop-menu-item value="0" disabled options="{{ option2 }}" />
  <wd-drop-menu-item value="0" disabled options="{{ option1 }}" />
</wd-drop-menu>
```

### DropMenu Attributes

| 参数      | 说明                                 | 类型      | 可选值       | 默认值   |
|---------- |------------------------------------ |---------- |------------- |-------- |
| active-color | 菜单标题和选项的选中态颜色 | string | - | '#0083ff'|
| direction | 菜单展开方向，可选值为`up` 或 `down` | string | - | 'down' |
| z-index | 菜单栏 z-index 层级 | number | - | 12 |
| use-menu-slot | 是否开启菜单头部插槽，注：开启头部插槽后，内容需用户自定义 | boolean | - | false |

### DropMenuItem Attributes

| 参数      | 说明                                 | 类型      | 可选值       | 默认值   |
|---------- |------------------------------------ |---------- |------------- |-------- |
| value | 当前选中项对应的 value | string | - | - |
| disabled | 禁用菜单 | boolean | - | false |
| options | 选项`options`类型为`Array`时: 展示列表, 对应数据结构 `[{text: '标题', value: '0'}]`; 类型为`string`: 使用自定义菜单内容; | Array / String | - | - | - |
| modal | 是否显示遮罩层 | boolean | - | false |
| icon-name | 选中的图标名称(可选名称在wd-icon组件中) | string | - | 'check-round' |
| duration | 动画执行时间 | number / object | - | 300 或{ enter: 300, leave: 300 } |
| use-drop-item-slot | 是否开启菜单内容插槽 | boolean | - | false |
| close-on-click-modal | 是否在点击遮罩层后关闭菜单 | boolean | - | true |

### DropMenu Events

| 事件名称      | 说明                                 | 参数     |
|------------- |------------------------------------ |--------- |

### DropdownItem Events

通过 `this.selectComponent('#selector')` 可以获取到 DropdownItem 实例并调用实例方法

| 方法名 | 说明 | 参数 | 返回值 |
|------|------|------|------|
| bind:change | 绑定值变化时触发 | event.detail = { value, selectedItem }, value 为选中值，selectedItem 为选中项 |
| close | 关闭菜单 | - | - |
| open | 展开菜单 | - | - |

### DropMenu Slot

| name      | 说明       |
|------------- |----------- |
| default | 菜单内容 |
| custom | 菜单内容插槽 |

### DropMenuItem Slot

| name      | 说明       |
|------------- |----------- |
| menu | 菜单选项卡中的一个自定义选项插槽 |

### DropMenu 外部样式类

| 类名     | 说明                |
|---------|---------------------|
| custom-class | DropMenu 根结点样式 |

### DropMenuItem 外部样式类

| 类名     | 说明                |
|---------|---------------------|
| custom-class | DropMenuItem 根结点样式 |
| custom-title | DropMenuItem 左侧文字样式 |
| custom-icon | DropMenuItem 右侧icon样式 |
