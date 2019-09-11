# NoticeBar 通告栏

### 引入

在`app.json`或`index.json`中引入组件，默认为`ES6`版本，`ES5`引入方式参见[快速上手](#/quickstart)

```json
"usingComponents": {
  "jmd-notice-bar": "dist/noticeBar/index"
}
```

## 代码演示

### 基础用法

```html
 <jmd-notice-bar 
    text="京东JD.COM-专业的综合网上购物商城，销售超数万品牌、4020万种商品，囊括家电、手机、电脑、母婴、服装等13大品类。"/>
```

### 禁用滚动
文字内容多于一行时，可通过`scrollable`参数控制是否开启滚动

```html
 <jmd-notice-bar text="{{ text }}" wrapabled show-icon="{{false}}"/>
```
### 多行显示
文字内容多于一行时，如不想滚动，可通过`wrapabled`参数控制是否多行显示，在多行显示情况下，滚动被禁用。

```html
 <jmd-notice-bar
     scrollable="{{ false }}"
     text="京东JD.COM-专业的综合网上购物商城，销售超数万品牌、4020万种商品，囊括家电、手机、电脑、母婴、服装等13大品类。"
      />
```
### 通告栏模式
默认模式为空，支持`info`和`link`。

```html
<!-- info 模式，在右侧显示关闭按钮 -->
 <jmd-notice-bar text="{{ text }}" mode="info"/>

<!-- link 模式，在右侧显示链接箭头 -->
 <jmd-notice-bar text="{{ text }}" mode="link" />
```

### Props

| 参数 | 说明 | 类型 | 默认值 |
|-----------|-----------|-----------|-------------|
| mode | 通告栏模式，可选值为 `info` `link` | *string* | `''` |
| delay | 动画延迟时间 (s) | *number* | `1` |
| speed | 滚动速率 (px/s) | *number* | `50` |
| scrollable | 是否在长度溢出时滚动播放 | *boolean* | `true` |
| showIcon | 左侧按钮显示 | *boolean* |`true`|
| left-icon | 左侧图标名称或图片链接，可选值见 Icon 组件 | *string* | - |
| color | 文本颜色 | *string* | `#ed6a0c` |
| backgroundColor | 滚动条背景 | *string* | `#fffbe8` |

### Events

| 事件名 | 说明 | 参数 |
|-----------|-----------|-----------|
| bind:click | 点击事件回调 | - |

### 外部样式类

| 类名 | 说明 |
|-----------|-----------|
| hover-class | 根节点样式类 |
