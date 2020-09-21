## Loading 加载指示器

### 引入

```json
{
  "usingComponents": {
    "wd-loading": "/wot-design/loading/index"
  }
}
```

### 基本用法

默认为 `circle-outline` 类型的加载指示器。

```html
<wd-loading />
```

### 修改指示器类型

通过 `type` 修改指示器的类型，可选值为 'spinner' / 'circle' / 'circle-outline' / 'circular-ring'，默认为 'circle-outline'。

```html
<wd-loading type="spinner" />
<wd-loading type="circular-ring"></wd-loading>
<wd-loading type="circle" />
```

### 修改颜色

通过 `color` 属性修改指示器的颜色。比如修改为白色，同时设置背景为黑色。

注意：当type类型为 `circular-ring` 时，设置指示器颜色必须为16进制色值，且不接受色值缩写。

```html
<wd-loading color="{{#fff}}" custom-class="loading-black" type="circle"/>

<!-- 当 type='circular-ring' 时： -->
<!-- 正确写法 -->
<wd-loading color="#ffffff" type="circular-ring"></wd-loading>
<!-- 错误写法 -->
<wd-loading color="{{#fff}}f" type="circular-ring"></wd-loading>
<wd-loading color="{{'green'}}" type="circular-ring"></wd-loading>
<wd-loading color="{{ 'rgba(255,255,255,1)' }}" type="circular-ring"></wd-loading>
```

```css
.loading-black {
  background: rgba(0, 0, 0, 0.7);
  padding: 10px;
  border-radius: 4px;
}
```

### 修改指示器大小

通过 `size` 属性设置指示器的大小，默认为大小 '32px'，属性支持 `number`/`string` 类型。

```html
<wd-loading size="{{20}}" />
<wd-loading size="{{30}}" />
<wd-loading size="50px" />
```

### Attributes

| 参数      | 说明                                 | 类型      | 可选值       | 默认值   |
|---------- |------------------------------------ |---------- |------------- |-------- |
| type | 加载指示器类型 | string | 'spinner'/'circle-outline'/'circle'/'circular-ring' | 'circle-outline' |
| color | 设置加载指示器颜色 | string | - | '#4D80F0' |
| size | 设置加载指示器大小 | number / string | - | '32px' |

### 外部样式类

| 类名     | 说明                |
|---------|---------------------|
| custom-class | 根结点样式 |
