# Switch 开关

### 引入

在`app.json`或`index.json`中引入组件，默认为`ES6`版本，`ES5`引入方式参见[快速上手](#/quickstart)

```json
"usingComponents": {
  "van-switch": "path/to/vant-weapp/dist/switch/index"
}
```

## 代码演示

### 基础用法

```html
<jmd-switch checked="{{ checked }}"/>
```

```javascript
Page({
  data: {
    checked: true
  },

  onChange({ detail }) {
    // 需要手动对 checked 状态进行更新
    this.setData({ checked: detail });
  }
});
```

### 禁用状态

```html
 <jmd-switch checked="{{ true }}"  disabled/>
```

### 加载状态

```html
 <jmd-switch checked="{{ true }}"  loading/>
```

### 自定义大小

```html
<jmd-switch 
          checked="{{ true }}" 
          size="3"
          font-size="15px"/>
```
### 自定义内容

```html
<jmd-switch 
          checked="{{ true }}" 
          active-text="开启"
          inactive-text="关闭"/>
```

### 自定义颜色

```html
<jmd-switch
          checked="{{ true }}" 
          active-color="#07c160"
          inactive-color="#f44"
          active-textColor="#f44"
          inactive-textColor="#07c160"/>
```

### 异步控制

```html
<jmd-switch
          checked="{{ checked }}" 
          async-change
          bind:change="asyncChange"/>
```

```js
Page({
  data: {
    checked: true
  },

  asyncChange({ detail }) {
    let _this = this;
    wx.showToast({
      title: '加载中',
      icon: 'loading',
      duration: 10000
    })

    setTimeout(function () {
      wx.hideToast();
      _this.setData({
        checked2: detail
      })
    }, 1000)
  }
});
```

### Props

| 参数 | 说明 | 类型 | 默认值 |
|-----------|-----------|-----------|-------------|
| name | 在表单内提交时的标识符 | *string* | - |
| checked | 开关选中状态 | *boolean*  | `false` |
| loading | 是否为加载状态 | *boolean* | `false` |
| disabled | 是否为禁用状态 | *boolean* | `false` |
| async-change | 是否异步调用 | *boolean* | `false` |
| size | 开关尺寸 | *string* | `30px` |
| font-size | 开关尺寸 | *string* | `12px` |
| active-color | 打开时的背景色 | *string* | `#1989fa` |
| inactive-color | 关闭时的背景色 | *string* | `#fff` |
| active-text-color | 打开时的文字色 | *string* | `white` |
| inactive-text-color | 关闭时的文字色 | *string* | `gray` |
| active-text | 打开时的值 | *string*  | `` |
| inactive-text | 关闭时的值 | *string* | `` |

### Events

| 事件名 | 说明 | 参数 |
|-----------|-----------|-----------|
| bind:change | 开关状态切换回调 | event.detail: 是否选中开关 |

### 外部样式类

| 类名 | 说明 |
|-----------|-----------|
| hover-class | 根节点样式类 |
| input-class | 输入框样式类 |
| node-class | 圆点样式类 |
