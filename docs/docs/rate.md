## Rate 评分

### 引入

```json
{
  "usingComponents": {
    "be-rate": "/bee-design/rate/index"
  }
}
```

### 基本用法

设置`value`分数，设置`num`总分数。

```html
<be-rate value="{{5}}" num="{{6}}" />
```

### 只读

设置 `readonly` 属性。

```html
<be-rate value="{{3}}" readonly />
```

### 禁用

设置 `disabled` 属性和`disabled-color`

```html
<be-rate value="{{2}}" disabled="{{true}}" />
```

### 修改颜色

可以通过 `color` 属性修改未选中的颜色，`active-color` 修改选中的颜色。

```html
<be-rate value="{{3}}" active-color="#FFAE16"/>
<be-rate value="{{2}}" disabled="{{true}}" disabled-color="rgb(197, 197, 197,0.5)"/>
```

### 修改icon

可以通过 `icon` 属性修改未选中的图标，`active-icon` 修改选中的图标。

```html
<be-rate value="{{3}}" icon="be-icon-good" active-icon="be-icon-good"/>
```

### 修改大小、间隔

可以通过 `size` 属性修改图标的大小，`space` 修改图标之间的间隔。

```html
<be-rate value="{{3}}" size="30px" space="10px"/>
```

### 监听change事件

可以通过监听 `change` 实现点击修改分值。

```html
  <be-rate value="{{value}}" bind:change="changeValue"/>
```
```javascript
Page({
  data: {
    value: 1
  },
  changeValue ({ detail }) {
    this.setData({ value: detail })
  }
})
```


### Attributes
| 参数      | 说明                                 | 类型      | 可选值       | 默认值   |
|---------- |------------------------------------ |---------- |------------- |-------- |
| value     |	当前分数                |	number    |	—           |	—       |
| num	    | 评分最大值                      |	number    |	-         |	5 |
| readonly      | 是否只读                  | boolean | - | false |
| size   | 图标大小                  | string | - | '20px' |
| space      | 图标间距        | string | - | '4px' |
| color       | 未选中的图标颜色  | string | - | '#c5c5c5' |
| active-color           | 选中的图标颜色        | string | - | '#e2231a' |
| icon           | 未选中的图标类名                  | string | - | 'be-icon-star' |
| active-icon    | 选中的图标类名                  | string | - | 'be-icon-star-fill' |
| disabled           | 是否禁用                  | boolean | - | false |
| disabled-color    | 禁用的图标颜色                  | string | - | '#c5c5c5' |

### Events

| 事件名称      | 说明                                 | 参数     |
|------------- |------------------------------------ |--------- |
| bind:change       | 点击icon，修改分值事件              | event.detail = 被点击icon的节点顺序下标  |

### 外部样式类

| 类名     | 说明                |
|---------|---------------------|
| custom-class | 根结点样式 |