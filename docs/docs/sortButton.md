## SortButton 排序按钮

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

`value` 为选中的箭头方向，值：1 升序，0 重置状态，-1 降序。 `title` 为展示文案，按钮默认处于未选中状态。

```html
<wd-sort-button title="价格" value="{{-1}}"/>
```
### 按钮重置

双箭头状态下(默认状态)通过设置 `allow-reset` 允许重置按钮为未选中状态

```html
<wd-sort-button title="价格" allow-reset/>
```

### 仅展示单箭头

通过设置 `one-arrow` 仅展示单箭头。单箭头始终处于选中状态，且默认状态为升序。

```html
<wd-sort-button title="综合" one-arrow/>
```

### 修改选中颜色

可以通过设置 `color` 来修改选中状态的颜色。

```html
<wd-sort-button title="价格" color="#00c740"/>
```
### 修改文案选中颜色

如果箭头处于选中状态，文案相应的也处于选中状态。默认情况下文案的选中颜色跟随箭头的选中颜色，可以通过设置 `title-color` 覆盖。

```html
<wd-sort-button title-color="#ff0000"/>
```

### Attributes
| 参数      | 说明                                 | 类型      | 可选值       | 默认值   |
|---------- |------------------------------------ |---------- |------------- |-------- |
| value | 选中的箭头方向：1 升序，0 重置状态，-1 降序。 | number | -1,0,1 | 0或-1 |
| title | 排序按钮展示的文案。 | string | — |	— |
| color | 箭头/文案选中时的整体颜色。 | sting | 十六进制 | #0083ff |
| title-color | 文案选中时的颜色，优先级高于 color。 | string | 十六进制 |	— |
| one-arrow | 是否只显示一个箭头。 | boolean |	- |	false |
| allow-reset | 展示双箭头时，允许手动重置按钮。 | boolean | - | false |

### Events

| 事件名称      | 说明                                 | 参数     |
|------------- |------------------------------------ |-------- |
| bind:click | 排序按钮的点击事件 | event.detail = value |

### 外部样式类
| 类名     | 说明                |
|---------|---------------------|
| custom-class | 根结点样式 |