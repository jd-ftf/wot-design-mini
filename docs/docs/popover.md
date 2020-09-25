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
<wd-popover show="{{show}}" content="这是一段信息。" bind:change="handleChange">
  <wd-button >点击展示</wd-button>
</wd-popover>
```

```javascript
Page({
  data: {
    show: false
  },

  handleChange (event) {
    this.setData({ show: event.detail.show })
  }
})
```

### 模式 mode

使用 `mode` 属性控制当前文字提示的展示模式。`mode` 可选参数为 `normal` / `menu`：

- **normal**（普通文字模式）:
  - 当 `mode` 处于默认状态，`content` 属性传入要显示的 `String` 字符串。

- **menu**（列表模式）:
  - 文字提示框会展示成列表形式，此时 `content` 属性传入 `Array` 类型，数组内对象数据结构如下方列表所示。
  - 绑定事件 `menu-click`，在选择结束后，执行操作，列表关闭。

列表模式下 `content` 数组内对象的数据结构：

| 键名 | 说明 | 类型 | 是否必填 |
|----- |----- |----- | ----- |
| content | 选项名 | string | 是 |
| iconClass（不设置该属性时只展示标题） | 选项值 | string | 否 |

**注意：iconClass 属性值为组件库内部的 icon 图标名。**

```html
<wd-popover show="{{show}}" mode="menu" content="{{ menu }}" bind:menu-click="link" bind:change="handleChange">
  <wd-button >列表</wd-button>
</wd-popover>
```

```javascript
Page({
  data: {
    show: false,
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
  },
  handleChange (event) {
    this.setData({ show: event.detail.show })
  }
})
```

### 嵌套信息

开启属性 `use-content-slot`，使用插槽 `content`， 可以在 Popover 中嵌套多种类型信息。

```html
<wd-popover use-content-slot>
  <view slot="content">
    <view class="pop-content">这是一段自定义样式的内容。</view>
  </view>
  <wd-button>点击展示</wd-button>
</wd-popover>
```

```css
.pop-content{
  color: #8268de;
  font-weight: bolder;
  padding: 10px;
  width: 150px;
}
```

### 点击外部关闭

微信小程序的逻辑层运行在JSCore中，因而缺少相关的DOM API和BOM API，无法监听全局点击事件，因此微信小程序的点击外部关闭需要在实际页面中进行手动处理。

大致思路：

- 1. 唤起项使用`catch`绑定展示逻辑，可以手动操作popover组件展示。
- 2. 给展示的组件 popover 绑定id，通过this.selectComponent(idSelector)获取到当前展开的节点
- 3. 可以通过组件内部的  `open()`/`close()` 方法控制弹框的显隐。
- 4. 在当前页面的最外层添加点击外部关闭事件，查看当前是否有展开的弹框。
- 5. 通过`pop.data.show`或与pop绑定的`show`变量，可以获取该id下pop的展开情况

页面单个popover情况：

```html
<!-- 当前子页面的最外层 -->
<view catchtap="clickOutside">
  <wd-popover id="pop" content="这是一段信息。">
    <wd-button bind:tap="showPop">点击展示</wd-button>
  </wd-popover>
</view>
```

```JavaScript
Page({
  // 点击外部触发的事件
  clickOutside () {
    this.closeOtherPop()
  },

  // 关闭当前页面展开的其他pop
  closeOtherPop () {
    if (this.pop && this.pop.data.show) {
      this.pop.close()
      this.pop = null
    }
  },

  // 展示popover时，根据id保存当前节点
  showPop () {
    if (this.pop && (this.pop.id !== 'pop')) {
      this.closeOtherPop()
    }
    this.pop = this.selectComponent('#pop')
  }
})
```

页面多个popover情况：

```html
<!-- 当前子页面的最外层 -->
<view catchtap="clickOutside">
  <wd-popover id="pop1" content="这是一段信息。">
    <wd-button bind:tap="showPop" data-id="pop1">点击展示</wd-button>
  </wd-popover>
  <wd-popover id="pop2" content="这是一段信息。">
    <wd-button bind:tap="showPop" data-id="pop2">点击展示</wd-button>
  </wd-popover>
  <wd-popover id="pop3" content="这是一段信息。">
    <wd-button bind:tap="showPop" data-id="pop3">点击展示</wd-button>
  </wd-popover>
</view>
```

```JavaScript
Page({
  clickOutside () {
    this.closeOtherPop()
  },

  closeOtherPop () {
    if (this.pop && this.pop.data.show) {
      this.pop.close()
      this.pop = null
    }
  },

  showPop (event) {
    const id = event.currentTarget.dataset.id
    if (this.pop && (this.pop.id !== id)) {
      this.closeOtherPop()
    }
    this.pop = this.selectComponent('#' + id)
  }
})
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
| open     |显示时触发       | - |
| close | 隐藏时触发 | - |
| change | pop显隐值变化时触发 | - |
| menuclick | menu 模式下点击某一选项触发 | event.detail = { item, index } |

### Methods

| 方法名称      | 说明       | 参数   |
|------------- |----------- |---------  |
| open | 打开文字提示弹框 |
| close | 关闭文字提示弹框 |

### Popover 外部样式类

| 类名     | 说明                |
|---------|---------------------|
| custom-class | 根结点样式 |
| custom-arrow | 尖角样式 |
| custom-pop | 文字提示样式 |
