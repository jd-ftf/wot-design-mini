## Slider 滑块

支持单向滑块和双向滑块。

### 引入

```json
{
  "usingComponents": {
    "jm-slider": "/jm-design/slider/index"
  }
}
```

### 基本用法

`value` 为绑定值。如果为 number 类型则显示一个滑块，如果为 array 类型则显示两个滑块。

```JavaScript
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

双滑块。

```JavaScript
page({
  data: {
   value: [30,40],
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
<jm-slider value="{{ value }}" min="{{ 4 }}" max="{{ 10000 }}"  bind:touchmove="handleChange"/>
```

### 隐藏文案

设置 `hide-label` 隐藏滑块当前值。

```html
<jm-slider value="{{ value }}" hide-label bind:touchmove="handleChange"/>
```

设置 `hide-min-max` 隐藏最大最小值。

```html
<jm-slider value="{{ value }}" hide-min-max bind:touchmove="handleChange"/>
```

### 禁用

设置 `disabled` 属性。

```html
<jm-slider value="{{ value }}" disabled bind:touchmove="handleChange"/>
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