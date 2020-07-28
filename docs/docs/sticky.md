## Input 输入框

### 引入

```json5
{
  "usingComponents": {
    // 全局吸顶
    "wd-sticky": "/wot-design/sticky/index",
    // 指定容器时引入
    "wd-sticky-box": "/wot-design/stickyBox/index",
  }
}
```

### 基本用法

将需要吸顶的内容包裹在 `wd-sticky` 组件内即可。

```html
<wd-sticky>
  <wd-button type="success">基础用法</wd-button>
</wd-sticky>
```

### 动态生成

`wd-sticky` 支持包裹动态生成的内容。

> 注意包裹动态生成的内容时，内容的宽高不能小于 `10px`

```html
<view style="margin-top: 20px;">
  <wd-sticky>
    <wd-button type="success" jd:if="{{show}}">基础用法</wd-button>
  </wd-sticky>
</view>
```

```javascript
Page({
  data: {
    show: false
  },
  display () {
    this.setData({ show: true })
  },
  onShow () {
    setTimeout(this.display, 5000)
  }
})
```

```css
page{
  height: 200vh;
}
```


### 吸顶距离

通过 `offset-top` 属性可以设置组件在吸顶时与顶部的距离。

```html
<wd-sticky offset-top="{{50}}">
  <wd-button type="primary">吸顶距离</wd-button>
</wd-sticky>
```

### 指定容器

将 `wd-sticky` 组件包裹在自定义容器内，之后再使用 `wd-sticky-box` 包裹自定义容器。

```html
<wd-sticky-box>
  <view class="container">
    <wd-sticky>
      <wd-button type="warning">指定容器</wd-button>
    </wd-sticky>
  </view>
</wd-sticky-box>
```

```css
.container{
    height: 150px;width: 100vw;
}
```




### Sticky Attributes

| 参数      | 说明                                 | 类型      | 可选值       | 默认值   |
|---------- |------------------------------------ |---------- |------------- |-------- |
| z-index | 堆叠顺序 | number | - | 1 |
| offset-top | 吸顶距离 | number | - | 0 |


### Sticky 外部样式类

| 类名     | 说明                |
|---------|---------------------|
| custom-class | 根结点样式 |

### Sticky Box 外部样式类

| 类名     | 说明                |
|---------|---------------------|
| custom-class | 根结点样式 |