# Layout 布局

`Layout` 组件由 `wd-col` 组件和 `wd-row` 组成。

### 引入

```json
{
  "usingComponents": {
    "wd-col": "/wot-design/col/index",
    "wd-row": "/wot-design/row/index",
  }
}
```

## 代码演示

### 基本用法

`Layout` 组件提供了 `24列` 栅格，通过在 `wd-col` 上设置 `span` 属性，通过计算当前内容所占百分比进行分栏。

注意: 分栏布局仅提供布局，即元素宽度，内部样式用户可根据需要通过 `custom-class` 或 `修改内部标签` 来自行定义样式。

```html
<wd-row>
  <wd-col span="24" custom-class="dark">span: 24</wd-col>
</wd-row>
<wd-row>
  <wd-col span="12" custom-class="dark">span: 12</wd-col>
  <wd-col span="12" custom-class="light">span: 12</wd-col>
</wd-row>
<wd-row>
  <wd-col span="8" custom-class="dark">span: 8</wd-col>
  <wd-col span="8" custom-class="light">span: 8</wd-col>
  <wd-col span="8" custom-class="dark">span: 8</wd-col>
</wd-row>
<wd-row>
  <wd-col span="6" custom-class="dark">span: 6</wd-col>
  <wd-col span="6" custom-class="light">span: 6</wd-col>
  <wd-col span="6" custom-class="dark">span: 6</wd-col>
  <wd-col span="6" custom-class="light">span: 6</wd-col>
</wd-row>
```

```css
.dark,
.light {
  color: #fff;
  font-size: 12px;
  line-height: 34px;
  height: 34px;
  text-align: center;
  margin-bottom: 10px;
  background-clip: content-box;
}

.dark {
  background-color: #39a9ed;
}

.light {
  background-color: #66c6f2;
}

```

### 分栏偏移

`offset` 属性可以设置分栏的偏移量，计算方式以及偏移大小与 `span` 相同。

```html
<wd-row>
  <wd-col span="4" custom-class="dark">span: 4</wd-col>
  <wd-col span="8" offset="4" custom-class="light">span: 8 offset: 4</wd-col>
</wd-row>
<wd-row>
  <wd-col span="8" offset="4" custom-class="dark">span: 8 offset: 4</wd-col>
  <wd-col span="8" offset="4" custom-class="light">span: 8 offset: 4</wd-col>
</wd-row>
```

### 分栏间隔

通过 `gutter` 属性可以设置列元素之间的间距，默认间距为 0

```html
<wd-row gutter="20">
  <wd-col span="8" custom-class="dark">span: 8</wd-col>
  <wd-col span="8" custom-class="light">span: 8</wd-col>
  <wd-col span="8" custom-class="dark">span: 8</wd-col>
</wd-row>
```

### Row Attributes

| 参数      | 说明                                 | 类型      | 可选值       | 默认值   |
|---------- |------------------------------------ |---------- |------------- |-------- |
| gutter | 列元素之间的间距（单位为px） | number | - | 0 |

### Col Attributes

| 参数      | 说明                                 | 类型      | 可选值       | 默认值   |
|---------- |------------------------------------ |---------- |------------- |-------- |
| span | 列元素宽度 | number | - | 24 |
| offset | 列元素偏移距离 | number | - | 0 |

### Row 外部样式类

| 类名     | 说明                |
|---------|---------------------|
| custom-class | Row 根结点样式 |

### Col 外部样式类

| 类名     | 说明                |
|---------|---------------------|
| custom-class | Col 根结点样式 |
