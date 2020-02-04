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

```html
<wd-swipe-action>
  <view slot="left">选择</view>
  <view>内容</view>
  <view slot="right">删除</view>
</wd-swipe-action>
```

### Attributes

| 参数      | 说明                                 | 类型      | 可选值       | 默认值   |
|---------- |------------------------------------ |---------- |------------- |-------- |
| autoplay | 自动轮播 | boolean | - | true |
| interval | 自动轮播时间，单位 ms | number | - | 3000 |
| duration | 轮播动画时间，单位 ms | number | - | 500 |
| initial-index | 轮播初始下标 | number | - | 0 |
| loop | 是否循环轮播，当设置了 space 属性，则不循环轮播 | boolean | - | true |
| hide-indicators | 隐藏指示器 | boolean | - | false |
| indicator-color | 指示器颜色 | string | - | rgba(0, 0, 0, 0.3) |
| indicator-active-color | 指示器高亮颜色 | string | - | #fff |
| touchable | 是否支持手势滑动 | boolean | - | true |
| vertical | 纵向轮播 | boolean | - | false |
| height | 轮播高度 | string | - | - |
| space | 留白率，轮播子项左右留白总和 / 轮播宽度 得出 | number | - | - |
