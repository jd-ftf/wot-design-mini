## loadmore 加载更多

### 引入

```json
{
  "usingComponents": {
    "jm-loadmore": "../../dist/loadmore/index"
  }
}
```

### 基本用法

在需要进行加载的列表的底部引入该组件即可。当滑动到列表底部时，通过设置`state`展示不同的文案。


```html
  <jm-loadmore custom-class="loadmore" state="loading"/>

  <jm-loadmore custom-class="loadmore" state="finished"/>

  <jm-loadmore custom-class="loadmore" state="error"/>

<style>
.loadmore{
  background-color: #f4f4f4;
  margin: 20px 0;
}
</style>
```

### 自定义文案

通过设置`loading-text`、`finished-text`、`error-text`配合`state`展示不同状态时的文案


```html
  <jm-loadmore custom-class="loadmore" state="loading" loading-text="自定义加载文案" />

  <jm-loadmore custom-class="loadmore" state="finished" finished-text="自定义完成文案"/>

  <jm-loadmore custom-class="loadmore" state="error" error-text="自定义错误文案"/>
```

### 点击继续加载

当state为error时，点击文案，组件会触发`loadmore`事件


```html
  <jm-loadmore
    custom-class="loadmore"
    state="error"
    bind:loadmore="loadmore"
  />
```

### Attributes
| 参数      | 说明                                 | 类型      | 可选值       | 默认值   |
|---------- |------------------------------------ |---------- |------------- |-------- |
| state      |	加载状态                |	string    |	loading/finished/error |	—     |
| loading-text    | 加载提示文案                      |	string    |	-         |	'加载中...' |
| finished-text      | 全部加载完的提示文案                  | string | - | '没有更多了' |
| error-text  | 加载失败的提示文案                  | string | - | '加载失败，点击重试' |

### Events

| 事件名称      | 说明                                 | 参数     |
|------------- |------------------------------------ |--------- |
| reload        | 加载事件                    | -       |

### 外部样式类

| 类名     | 说明                |
|---------|---------------------|
| custom-class | 根结点样式 |
