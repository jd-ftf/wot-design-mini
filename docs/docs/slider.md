## Slider 滑块

支持单向滑块和双向滑块。

### 引入

```json
{
  "usingComponents": {
    "wd-slider": "/wot-design/slider/index"
  }
}
```

### 基本用法

`value` 为绑定值。如果为 number 类型则显示一个滑块，如果为 array 类型则显示两个滑块。
```html
<wd-slider value="{{ value }}" bind:drag-move="handleChange"/>
```
```javascript
page({
  data: {
   value: 30,
  },
  handleChange ({ detail }) {
    this.setData({
      value: detail
    })
  }
})
```
### 双滑块
双滑块模式下 `value` 为 `二元数组` 类型
```html
<wd-slider value="{{ value }}" bind:drag-move="handleChange"/>
```
```javascript
page({
  data: {
   value: [10, 30],
  },
  handleChange ({ detail }) {
    this.setData({
      value: detail
    })
  }
})
```
### 最大值最小值

设置 `min` 最小值，`min` 最大值。

```html
<wd-slider value="{{ value }}" min="{{ 4 }}" max="{{ 10000 }}"  bind:drag-move="handleChange"/>
```

### 隐藏文案

设置 `hide-label` 隐藏滑块当前值。

```html
<wd-slider value="{{ value }}" hide-label bind:drag-move="handleChange"/>
```

设置 `hide-min-max` 隐藏最大最小值。

```html
<wd-slider value="{{ value }}" hide-min-max bind:drag-move="handleChange"/>
```

### 禁用

设置 `disabled` 属性。

```html
<wd-slider value="{{ value }}" disabled bind:drag-move="handleChange"/>
```

### Attributes
| 参数      | 说明                                 | 类型      | 可选值       | 默认值   |
|---------- |------------------------------------ |---------- |------------- |-------- |
| value      |	滑块值，如果为array，则为双向滑块                |	number / array    |	—           |	—       |
| hide-min-max	    | 是否显示左右的最大最小值                      |	boolean    |	-         |	false |
| hide-label      | 是否显示当前滑块值                  | boolean | - | false |
| disabled   | 是否禁用                  | boolean | - | false |
| max      | 最大值        | number | - | 100 |
| min       | 最小值  | number | - | 0 |
| step           | 步进值        | number | - | 1 |
| activeColor           | 进度条激活背景颜色        | string | - | '#0084ff' |
| inactiveColor           | 进度条未激活背景颜色        | string | - | '#e5e5e5' |
### Events

| 事件名称      | 说明                                 | 参数     |
|------------- |------------------------------------ |--------- |
| bind:dragstart | 开始移动时触发 | value |
| bind:dragmove | 移动滑块时触发 | value |
| bind:dragend | 移动结束时触发 | value |

### 外部样式类
| 类名     | 说明                |
|---------|---------------------|
| custom-class | 根结点样式 |
| custom-min-class | 最小值自定义样式 |
| custom-max-class | 最大值自定义样式 |

