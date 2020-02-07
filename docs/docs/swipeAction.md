## SwipeAction 滑动操作

### 引入

```json
{
  "usingComponents": {
    "wd-swipe-action": "/wot-design/swipeAction/index"
  }
}
```

### 基本用法

`wd-swipe-action`分为三部分：'自定义左按钮内容'、'自定义内容'、'自定义右按钮内容'。自定义按钮内容需要设置`slot`开启，自定义内容为默认插槽，无需手动开启。

```html
<wd-swipe-action>
  <wd-cell title="标题文字" value="内容"/>
  <view slot="right" class="action">
    <view class="button" style="background: #C8C7CD;" bindtap="handleAction" data-action="操作1">操作1</view>
    <view class="button" style="background: #FFB300;" bindtap="handleAction" data-action="操作2">操作2</view>
    <view class="button" style="background: #E2231A;" bindtap="handleAction" data-action="操作3">操作3</view>
  </view>
</wd-swipe-action>
```
```javascript
import Toast from '../../dist/toast/toast'

Page({
  handleAction (event) {
    Toast(`点击了${event.target.dataset.action}`)
  }
})
```
```css
.action {
  height: 100%;
}
.button{
  display: inline-block;
  padding: 0 11px;
  height: 100%;
  color: white;
  line-height: 42px;
}
```

### 左右滑动

> `wd-swipe-action`组件提供`left`/`right`两个滑动按钮，通过设置插槽`slot="left"`和`slot="right"`开启

```html
<wd-swipe-action>
  <view slot="left" class="action">
    <view class="button" style="background: #C8C7CD;">操作1</view>
    <view class="button" style="background: #FFB300;">操作2</view>
    <view class="button" style="background: #E2231A;">操作3</view>
  </view>
  <wd-cell title="标题文字" value="内容" />
  <view slot="right" class="action">
    <view class="button" style="background: #cdb86e;">操作4</view>
    <view class="button" style="background: #42ffd1;">操作5</view>
    <view class="button" style="background: #383fe2;">操作6</view>
  </view>
</wd-swipe-action>
```

### 切换按钮

> 可以通过设置`state`来控制开启关闭滑动按钮，可选值为:`left`、`close`、`right`分别表示："打开左滑动按钮"、"关闭滑动按钮""打开右滑动按钮"

```html
<wd-swipe-action state="{{state}}">
  <view slot="left" class="action">
    <view class="button" style="background: #C8C7CD;">操作1</view>
    <view class="button" style="background: #FFB300;">操作2</view>
    <view class="button" style="background: #E2231A;">操作3</view>
  </view>
  <wd-cell title="标题文字" value="内容"/>
  <view slot="right" class="action">
    <view class="button" style="background: #cdb86e;">操作4</view>
    <view class="button" style="background: #42ffd1;">操作5</view>
    <view class="button" style="background: #383fe2;">操作6</view>
  </view>
</wd-swipe-action>

<view class="button-group">
  <wd-button data-state='left' type="primary" bindclick="changeState">打开左边</wd-button>
  <wd-button data-state='close' type="primary" bindclick="changeState">关闭所有</wd-button>
  <wd-button data-state='right' type="primary" bindclick="changeState">打开右边</wd-button>
</view>
```
```javascript
Page({
  data: {
    state: 'outside'
  },
  changeState (event) {
    const { state } = event.target.dataset
    this.setData({ state })
  }
})
```

### 按钮关闭前的钩子函数

> 通过`before-close`属性传入一个函数，注意传入的变量必须定义在`data`在。回调函数会在滑动按钮关闭前执行。

钩子函数接收两个参数:`reason`、`position`。
`reason`表示滑动按钮关闭的原因，值为:`click`、`swipe`、`state`，分别代表:点击关闭按钮、滑动关闭按钮、通过控制`state`关闭按钮;
`position`代表被关闭的操作按钮，值为：`left`、`right`。当`reason`为`click`时，表示点击`position`位置关闭滑动按钮，值为：`left`、`right`、`outside`。

```html
<demo-block transparent title="切换按钮">
  <wd-swipe-action state="{{state}}" before-close="{{beforeClose}}">
    <view slot="left" class="action">
      <view class="button" style="background: #C8C7CD;">操作1</view>
      <view class="button" style="background: #FFB300;">操作2</view>
      <view class="button" style="background: #E2231A;">操作3</view>
    </view>
    <wd-cell title="标题文字" value="内容"/>
    <view slot="right" class="action">
      <view class="button" style="background: #cdb86e;">操作4</view>
      <view class="button" style="background: #42ffd1;">操作5</view>
      <view class="button" style="background: #383fe2;">操作6</view>
    </view>
  </wd-swipe-action>

  <view class="button-group">
    <wd-button data-state='left' type="primary" bindclick="changeState">打开左边</wd-button>
    <wd-button data-state='close' type="primary" bindclick="changeState">关闭所有</wd-button>
    <wd-button data-state='right' type="primary" bindclick="changeState">打开右边</wd-button>
  </view>
</demo-block>
```
```javascript
import Toast from '../../dist/toast/toast'

Page({
  data: {
    state: 'outside',
    beforeClose (reason, position) {
      Toast(`${reason}导致${position}操作按钮关闭`)
    }
  },
  changeState (event) {
    const { state } = event.target.dataset
    this.setData({ state: state })
  }
})
```

### 点击事件

> `click`事件只会在关闭滑动按钮时触发。

回调函数的参数表示点击的位置，其中`left`、`right`表示点击了左右滑动按钮，`outside`表示点击了容器内按钮以外的地方。

```html
  <wd-swipe-action bind:click="handleClick">
    <wd-cell title="标题文字" value="内容"/>
    <view slot="right" class="action">
      <view class="button" style="background: #C8C7CD;">操作1</view>
      <view class="button" style="background: #FFB300;">操作2</view>
      <view class="button" style="background: #E2231A;">操作3</view>
    </view>
  </wd-swipe-action>
```
```javascript
import Toast from '../../dist/toast/toast'

Page({
  handleClick (event) {
    Toast(`点击${event.detail}关闭操作按钮`)
  }
})
```

### 禁用滑动按钮

> 设置`disabled`属性禁用滑动

```html
<wd-swipe-action disabled>
  <wd-cell title="标题文字" value="内容" />
  <view slot="right" class="action">
    <view class="button" style="background: #C8C7CD;">操作1</view>
    <view class="button" style="background: #FFB300;">操作2</view>
    <view class="button" style="background: #E2231A;">操作3</view>
  </view>
</wd-swipe-action>
```

### Attributes

| 参数      | 说明                                 | 类型      | 可选值       | 默认值   |
|---------- |------------------------------------ |---------- |------------- |-------- |
| state | 滑动按钮的状态 | string | 'left'、'close'、'right' | 'close' |
| disabled | 是否禁用滑动操作 | boolean | - | false |
| before-close | 关闭滑动按钮前的钩子函数 | function | - | - |

### Events

| 事件名称      | 说明                                 | 参数     |
|------------- |------------------------------------ |--------- |
| bind:click | 当滑动按钮打开时，点击整个滑动操作容器触发click事件 | event.detail='left'、'outside'、'right' |

### Slot

| name      | 说明       |
|------------- |----------- |
| left | 自定义左按钮 |
| default | 自定义内容 |
| right | 自定义右按钮 |

### Cell 外部样式类

| 类名     | 说明                |
|---------|---------------------|
| custom-class | 根结点样式 |
