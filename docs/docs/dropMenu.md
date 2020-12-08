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

 `options` 属性是一个一维对象数组，数组项的数据结构为：label（选项文本），value（选项值），tip（选项说明）。

 通过绑定 `bind:change` 事件，获取当前选中项。

```html
<wd-drop-menu>
  <wd-drop-menu-item value="{{ value1 }}" options="{{ option1 }}" bind:change="handleChange1" />
  <wd-drop-menu-item value="{{ value2 }}" options="{{ option2 }}" bind:change="handleChange2" />
</wd-drop-menu>
```

```JavaScript
Page({
  data: {
    value1: 0,
    value2: 0,
    option1: [
      { label: '全部商品', value: 0 },
      { label: '新款商品', value: 1 },
      { label: '活动商品', value: 2 }
    ],
    option2: [
      { label: '综合', value: 0 },
      { label: '销量', value: 1 },
      { label: '上架时间', value: 2 }
    ]
  },
  handleChange1 (event) {
    this.setData({
      value1: event.detail.value
    })
  },
  handleChange2 (event) {
    this.setData({
      value1: event.detail.value
    })
  }
})
```

### 自定义菜单内容

通过插槽 `default` 可以自定义 `DropMenuItem` 的内容，此时需要使用实例上的 `close` 方法手动控制菜单的关闭。

可以通过 `title` 设置菜单标题。

> 这时候不要传入 options 和 value

```html
<wd-drop-menu>
  <wd-drop-menu-item value="{{ value }}" options="{{ option }}" bind:change="handleChange" />
  <wd-drop-menu-item title="筛选" id="drop-menu1">
    <view>
      <wd-cell title="标题文字" value="内容" />
      <wd-cell title="标题文字" label="描述信息" value="内容" />
      <wd-button block size="large" suck bind:click="confirm">主要按钮</wd-button>
    </view>
  </wd-drop-menu-item>
</wd-drop-menu>
```

```JavaScript
Page({
  data: {
    value: 0,
    option: [
      { label: '全部商品', value: 0 },
      { label: '新款商品', value: 1 },
      { label: '活动商品', value: 2 }
    ]
  },
  handleChange (event) {
    this.setData({
      value: event.detail.value
    })
  },
  confirm () {
    // 关闭下拉框
    const drop = this.selectComponent('#drop-menu1')
    drop.close()
  }
})
```

### 自定义菜单选项

自己通过 flex 布局做自定义筛选展示。

```html
<view style="display: flex; background: #fff; text-align: center;">
  <wd-drop-menu style="flex: 1; min-width: 0;">
    <wd-drop-menu-item id="drop-menu2" value="{{ value1 }}" options="{{ option }}" bind:change="handleChange1" />
  </wd-drop-menu>
  <view style="flex: 1;">
    <wd-sort-button value="{{ value2 }}" title="上架时间" bind:change="handleChange2" />
  </view>
</view>
```

### 向上展开

将 `direction` 属性值设置为 `up`，菜单即可向上展开

```html
<wd-drop-menu direction="up">
  <wd-drop-menu-item value="{{ value1 }}" options="{{ option1 }}" bind:change="handleChange1" />
  <wd-drop-menu-item value="{{ value2 }}" options="{{ option2 }}" bind:change="handleChange2" />
</wd-drop-menu>
```

### 禁用菜单

```html
<wd-drop-menu>
  <wd-drop-menu-item value="{{ value1 }}" disabled options="{{ option2 }}" bind:change="handleChange1" />
  <wd-drop-menu-item value="{{ value2 }}" options="{{ option1 }}" bind:change="handleChange2" />
</wd-drop-menu>
```

### 点击外部关闭

微信小程序的逻辑层运行在JSCore中，因而缺少相关的DOM API和BOM API，无法监听全局点击事件，因此微信小程序的点击外部关闭需要在实际页面中进行手动处理。

大致思路：

- 1. `drop-menu-item`使用`bind:open`捕获下拉菜单的展开动作
- 2. 给展示的组件 `drop-menu-item` 绑定id，通过this.selectComponent(idSelector)获取到当前展开的节点
- 3. 可以通过组件内部的  `open()`/`close()` 方法控制弹出下拉菜单的显隐。
- 4. 在当前页面的最外层添加点击外部关闭事件，查看当前是否有展开的弹框。
- 5. 通过`pop.data.showWrapper` 与 `pop.data.showPop`，可以获取该id下下拉菜单的展开情况

```html
<!-- 当前子页面的最外层 -->
<view catchtap="clickOutside">
  <wd-drop-menu>
    <wd-drop-menu-item
      id="drop-menu1"
      value="{{ value1 }}"
      options="{{ option1 }}"
      bind:change="handleChange1"
      bind:open="showDropMenu"
    />
    <wd-drop-menu-item
      id="drop-menu2"
      value="{{ value2 }}"
      options="{{ option2 }}"
      bind:change="handleChange2"
      bind:open="showDropMenu"
    />
  </wd-drop-menu>
</view>
```

```JavaScript
Page({
  data: {
    value1: 1,
    value2: 0,
    option1: [
      { label: '全部商品', value: 0 },
      { label: '新款商品', value: 1, tip: '这是补充信息' },
      { label: '这是比较长的筛选条件这是比较长的筛选条件', value: 2 }
    ],
    option2: [
      { label: '综合', value: 0 },
      { label: '销量', value: 1 },
      { label: '上架时间', value: 2 }
    ]
  },

  clickOutside () {
    this.closeOtherDrop()
  },

  closeOtherDrop () {
    if (this.drop && this.drop.data.showWrapper && this.drop.data.showPop) {
      this.drop.close()
      this.drop = null
    }
  },
  showDropMenu (event) {
    const id = event.currentTarget.id
    if (this.drop && (this.drop.id !== id)) {
      this.closeOtherDrop()
    }
    this.drop = this.selectComponent('#' + id)
  },
  handleChange1 ({ detail }) {
    this.setData({
      value1: detail.value
    })
  },
  handleChange2 ({ detail }) {
    this.setData({
      value2: detail.value
    })
  }
})
```

### DropMenu Attributes

| 参数      | 说明                                 | 类型      | 可选值       | 默认值   |
|---------- |------------------------------------ |---------- |------------- |-------- |
| direction | 菜单展开方向，可选值为`up` 或 `down` | string | 'up' / 'down' | 'down' |
| modal | 是否展示蒙层 | boolean | - | true |
| close-on-click-modal | 是否点击蒙层时关闭 | boolean | - | true |
| duration | 菜单展开收起动画时间，单位 ms | number | - | 200 |

### DropMenuItem Attributes

| 参数      | 说明                                 | 类型      | 可选值       | 默认值   |
|---------- |------------------------------------ |---------- |------------- |-------- |
| value | 当前选中项对应选中的 value | string / number | - | - |
| disabled | 禁用菜单 | boolean | - | false |
| options | 列表数据，对应数据结构 `[{text: '标题', value: '0', tip: '提示文字'}]` | array | - | - |
| icon-name | 选中的图标名称(可选名称在wd-icon组件中) | string | - | 'check' |
| title | 菜单标题 | string | - | - |
| value-key | 选项对象中，value对应的 key | string | - | 'value' |
| label-key | 选项对象中，展示的文本对应的 key | string | - | 'label' |
| tip-key | 选项对象中，选项说明对应的 key | string | - | 'tip' |

### DropdownItem Events

| 方法名 | 说明 | 参数 | 返回值 |
|------|------|------|------|
| bind:change | 绑定值变化时触发 | event.detail = { value, selectedItem }, value 为选中值，selectedItem 为选中项 |
| bind:close | 关闭菜单 | - | - |
| bind:open | 展开菜单 | - | - |

### DropdownItem Methods

通过 `this.selectComponent('#selector')` 可以获取到 DropdownItem 实例并调用实例方法

| 方法名 | 说明 | 参数 | 返回值 |
|------|------|------|------|
| close | 关闭菜单 | - | - |
| open | 展开菜单 | - | - |

### DropMenu Slot

| name      | 说明       |
|------------- |----------- |
| default | 菜单内容 |

### DropMenuItem Slot

| name      | 说明       |
|------------- |----------- |
| default | 菜单自定义内部内容 |

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
