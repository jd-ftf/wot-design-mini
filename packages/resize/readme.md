# Onresize 被动监听元素尺寸变化

当组件包裹的文档流尺寸发生变化时，触发 `size` 事件。


### 引入

```json
{
  "usingComponents": {
    "wd-resize": "/wot-design/resize/index"
  }
}
```

### 基本用法

> 不要给此组件增加任何外部样式


```html
<wd-resize bindsize="resizeHandler">
    <div style="width: {{width}};height: {{height}}"></div>
</wd-resize>
```

```javascript
page({
  data:{
    width:'100px',
    height:'100px'
  },
  resizeHandler ({detail}) {
    // 现在的元素各个边的左边以及尺寸
    const {height,width,bottom,top,left,right} = detail
    console.log('变化了',height,width,bottom,top,left,right)
  }
})
```

### Events

| 事件名称      | 说明                                 | 参数     |
|------------- |------------------------------------ |--------- |
| bind:size | 尺寸发生变化时触发 | event.detail |

### 外部样式类

| 类名     | 说明                |
|---------|---------------------|
| - | - |
