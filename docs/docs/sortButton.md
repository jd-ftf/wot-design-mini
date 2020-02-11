## sortButton 排序按钮

### 引入

```json
{
  "navigationBarTitleText": "SortButton 排序按钮",
  "usingComponents": {
    "wd-sort-button": "../../dist/sortButton/index"
  }
}

```

### 基本用法

`value` 为展示文案。
```html
<wd-sort-button value="价格"/>
```

### 单独显示

如果仅需要展示一个箭头，可以通过 `only` 进行设置。
```html
<wd-sort-button value="综合" only/>
```

### 选中颜色

如果需要修改选中状态的颜色，可以通过 `color` 进行设置。
```html
<wd-sort-button value="价格" color="#00c740"/>
```

### 初始状态

初始状态时组件未选中任何方向的箭头，如果需要指定选中的箭头，可以通过 `direction` 进行设置。

```html
<wd-sort-button value="价格" direction="top"/>
<wd-sort-button value="综合" only direction="top"/>
```

### 事件监听

当点击组件时，箭头会自动切换选中的方向，可以通过监听 `click` 事件来获取当前被选中的按钮的方向。

```html
<wd-sort-button value="价格" bind:click="handleClick"/>
```

```javascript
import Toast from '../../dist/toast/toast'
Page({
  handleClick (event) {
    Toast(`当前状态：${event.detail}`)
  }
})
```

### Attributes
| 参数      | 说明                                 | 类型      | 可选值       | 默认值   |
|---------- |------------------------------------ |---------- |------------- |-------- |
| value | 排序按钮展示的文案 | string |	— |	— |
| only | 是否只显示一个箭头 | boolean |	- |	false |
| direction | 选中的箭头方向,direction为设置时默认未选中 | sting | 'top','bottom' | - |
| color | 选中的箭头/文案的颜色 | sting | 十六进制 | #0083ff |
### Events

| 事件名称      | 说明                                 | 参数     |
|------------- |------------------------------------ |-------- |
| bind:click | 排序按钮的点击事件 | event.detail = direction |

### 外部样式类
| 类名     | 说明                |
|---------|---------------------|
| custom-class | 根结点样式 |