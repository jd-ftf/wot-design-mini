## Tab 标签页

### 引入

```json
{
  "usingComponents": {
    "jm-tab": "/jm-design/tab/index",
    "jm-tabs": "/jm-design/tabs/index"
  }
}
```

### 基本用法

`value` 为绑定值，可以为 number 类型（选中的tab的下标）和 string 类型（标签名）。

> 当`value`为`number`类型时，`jm-tab`可以不必设置`name`。同时如果value超出了tab数量，会用0自动兜底

```html
<jm-tabs value="{{0}}">
  <block jd:for="{{4}}" jd:key="$this">
    <jm-tab title="标签{{item}}">
      <view class="content">内容{{item}}</view>
    </jm-tab>
  </block>
</jm-tabs>
```
```css
.content{
  line-height: 120px;
  text-align: center;
}
```

### 滑动动画

设置 `animated` 属性，开启tab切换动画。

```html
<jm-tabs value="{{0}}" animated="{{true}}">
  <block jd:for="{{4}}" jd:key="$this">
    <jm-tab title="标签{{item}}">
      <view class="content">内容{{item}}</view>
    </jm-tab>
  </block>
</jm-tabs>

```

### 粘性布局

设置 `sticky` 属性，使用粘性布局。可以设置 `offset-top` 属性，当距离窗口顶部多少像素时，固定标签头。

```html
<jm-tabs value="{{0}}" sticky="{{true}}">
  <block jd:for="{{4}}" jd:key="$this">
    <jm-tab title="标签{{item}}">
      <view class="content">内容{{item}}</view>
    </jm-tab>
  </block>
</jm-tabs>
```

### 禁用Tab

在 `jm-tab` 上设置 `disabled` 属性，禁用某个页签。

```html
<jm-tabs value="{{0}}">
  <block jd:for="{{4}}" jd:key="$this">
    <jm-tab title="标签{{item}}" disabled="{{item === 1}}">
      <view class="content">内容{{item}}</view>
    </jm-tab>
  </block>
</jm-tabs>
```

### 点击事件

监听页签的点击事件.

```html
<jm-tabs value="{{0}}" bind:click="handleClick">
  <block jd:for="{{4}}" jd:key="$this">
    <jm-tab title="标签{{item}}">
      <view class="content">内容{{item}}</view>
    </jm-tab>
  </block>
</jm-tabs>
```
```javascript
Page({
  data: {
    tab: 0
  },
  handleClick ({ detail: { index } }) {
    console.log(`点击了标签${index}`)
  }
})
```
### 延迟渲染

设置 `lazy-render` 属性，只有切换到当前页签时，页签的内容才会渲染。

```html
<jm-tabs value="{{0}}" lazy-render="{{true}}">
  <block jd:for="{{4}}" jd:key="$this">
    <jm-tab title="标签{{item}}">
      <view class="content">内容{{item}}</view>
    </jm-tab>
  </block>
</jm-tabs>

```

### 手势滑动

设置 `swipeable` 属性，支持手势滑动。

```html
<jm-tabs value="{{0}}" swipeable="{{true}}">
  <block jd:for="{{4}}" jd:key="$this">
    <jm-tab title="标签{{item}}">
      <view class="content">内容{{item}}</view>
    </jm-tab>
  </block>
</jm-tabs>
```

---

标签页在标签数大于等于6个时，可以滑动；当标签数大于等于10个时，将会显示导航地图，便于快速定位到某个标签。可以通过设置 `slidable-num` 修改可滑动的数量阈值；设置 `map-num` 修改显示导航地图的阈值。

### Tabs Attributes

| 参数      | 说明                                 | 类型      | 可选值       | 默认值   |
|---------- |------------------------------------ |---------- |------------- |-------- |
| value | 绑定值 | string / number | - | - |
| slidable-num | 可滑动的标签数阈值 | number | - | 6 |
| map-num | 显示导航地图的标签数阈值 | number | - | 10 |
| color | 标题选中时的颜色 | string | - | '#0083ff' |
| inactive-color | 标题未选中时的颜色 | string | - | '#333' |
| sticky | 粘性布局 | boolean | - | false |
| offset-top | 粘性布局时距离窗口顶部距离 | number | - | 0 |
| animated | 开启切换动画 | boolean | - | false |
| swipeable | 开启手势滑动 | boolean | - | false |
| lazy-render | 懒渲染标签页 | boolean | - | false |
| line-width | 底部条宽度，单位像素 | number | - | auto |
| line-height | 底部条高度，单位像素 | number | - | 3 |

### Tabs Events

| 事件名称      | 说明                                 | 参数     |
|------------- |------------------------------------ |--------- |
| bind:change | 绑定值变化时触发 | 下标index, 标题名称name |
| bind:click | 点击标题时触发 | 下标index, 标题名称name |
| bind:disabled | 点击禁用的标题时触发| 下标index, 标题名称name |

### Tab Attributes

| 参数      | 说明                                 | 类型      | 可选值       | 默认值   |
|---------- |------------------------------------ |---------- |------------- |-------- |
| name | 标签页名称 | string | - | - |
| title | 标题 | string | - | - |
| disabled | 禁用 | boolean | - | false |