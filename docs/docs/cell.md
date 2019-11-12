## Cell单元格

### 引入

```json
{
  "usingComponents": {
    "jm-cell": "../../dist/cell/index",
    "jm-cell-group": "../../dist/cellGroup/index"
  }
}
```

### 基本用法

`Cell` 可以单独使用，也可以和 `CellGroup` 组合使用。

```html
<jm-cell title="标题文字" value="内容" />

<jm-cell-group>
  <jm-cell title="标题文字" value="内容" />
  <jm-cell title="标题文字" label="描述信息" value="内容" />
</jm-cell-group>
```

### 图标设置

设置 `icon` 属性，可以为 Icon 章节中的图标，也可以通过 icon 的 slot 自定义图标位置。

> 自定义图标，如果有多个cell，需保证所有图标的宽度是一致的且垂直居中，可以通过`custom-icon-style`设置。如果使用 icon 属性且为 Icon 章节的字体图标，则宽度会自动一致且垂直居中。

```html
<jm-cell-group>
  <jm-cell title="标题文字" value="内容" icon="setting" />
  <jm-cell title="标题文字" value="内容" icon="collect" />
  <jm-cell title="标题文字" value="内容" custom-icon-style="custom-icon-style">
    <jm-icon slot="icon" name="play"/>
  </jm-cell>
</jm-cell-group>

<style>
.custom-icon-style {
    position: relative;
    min-width: 18px;
    height: 46px;
    line-height: 46px;
    margin-right: 15px;
    font-size: 18px;
}
</style>
```

### 分组标题

可以在 `cell-group` 上设置 `title` 和 `value` 属性。也可以使用 slot 插槽。

```html
<jm-cell-group use-slot title="交易管理">
  <view slot="value" class="blueColor">
    <jm-icon name="cart"/>
      <span>订购</span>
  </view>
  <jm-cell title="标题文字" value="内容" />
  <jm-cell title="标题文字" label="描述信息" value="内容" />
</jm-cell-group>
```

### 页面跳转

通过设置 `is-link` 属性显示导航箭头和点击态，设置 `to` 属性，指定跳转地址。`to` 属性是普通链接。

```html
<jm-cell title="帮助与反馈" is-link to="/pages/button/index" />
```

### 自定义内容

`cell` 提供了 `icon`、`title`、`label`和默认value的插槽。

```html
<jm-cell-group use-slot>
  <view slot="title">交易管理</view>
  <view slot="value" class="blueColor">
    <jm-icon name="cart"/>
    <span>订购</span>
  </view>
  <jm-cell 
    is-link 
    custom-icon-style="custom-icon-style"
    custom-title-style="custom-title-style"
    custom-label-style="custom-label-style"
    custom-value-style="custom-value-style"
  >
    <jm-icon slot="icon" name="play"></jm-icon>
    <view slot="title">
      <text>标题文字</text>
      <view class="end-time">25天后到期</view>
    </view>
    <text slot="label">描述信息</text>
    <text>内容</text>
  </jm-cell>
</jm-cell-group>

<style>
.blueColor {
    color: #0083ff;
}
.custom-icon-style {
    position: relative;
    min-width: 18px;
    height: 46px;
    line-height: 46px;
    margin-right: 15px;
    font-size: 18px;
}
.custom-label-style {
    margin-top: 3px;
    font-size: 12px;
    color: #a7a7a7;
}
.custom-value-style {
    display: inline-block;
    font-size: 14px;
    vertical-align: middle;
}
.custom-title-style{}
.end-time{
    display: inline-block;
    margin-left: 8px;
    border: 1px solid #faa21e;
    padding: 0 4px;
    font-size: 10px;
    color: #faa21e;
}
</style>
```

> 自定义内容如果超出了默认的46px高度，可能需要你自己通过绝对定位使其保持样式一致。

### CellGroup Attributes

| 参数      | 说明                                 | 类型      | 可选值       | 默认值   |
|---------- |------------------------------------ |---------- |------------- |-------- |
| title | 分组标题 | string | - | - |
| value | 分组右侧内容 | string | - | - |
| use-slot | 分组启用插槽 | boolean | - | false |

### Cell Attributes

| 参数      | 说明                                 | 类型      | 可选值       | 默认值   |
|---------- |------------------------------------ |---------- |------------- |-------- |
| title | 标题 | string | - | - |
| value | 右侧内容 | string | - | - |
| icon | 图标类名 | string | - | - |
| label | 描述信息 | string | - | - |
| is-link | 是否为跳转链接 | boolean | - | false |
| to | 跳转地址 | string | - | - |
| clickable | 开启点击反馈,is-link默认开启 | boolean | - | false |

### CellGroup Slot

> CellGroup必须首先开启`use-slot`,插槽才生效

| name      | 说明       |
|------------- |----------- |
| title | 分组标题 |
| value | 分组右侧内容 |

### Cell Slot
| name      | 说明       |
|------------- |----------- |
| title | 标题 |
| default | 右侧内容，使用时不需要设置slot="default" |
| icon | 图标 |
| label | 描述信息 |

### Cell外部样式类

| 类名     | 说明                |
|---------|---------------------|
| custom-class | 根结点样式 |
| custom-icon-style | icon使用slot时的自定义样式 |
| custom-label-style | icon使用label时的自定义样式 |
| custom-value-style | icon使用value时的自定义样式 |
| custom-title-style | icon使用title时的自定义样式 |

### CellGroup外部样式类

| 类名     | 说明                |
|---------|---------------------|
| custom-class | 根结点样式 |