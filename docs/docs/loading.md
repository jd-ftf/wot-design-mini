## Loading 加载指示器

### 按需引入

```javascript
import Vue from 'vue'
import { Loading } from 'bee-design'

Vue.use(Loading)
```

### 基本用法

默认为 `circle` 类型的加载指示器。

```html
<be-loading />
```

### 修改类型

通过 `type` 修改指示器的类型，可选值为 'spinner' 和 'circle'，默认为 'circle'。

```html
<be-loading type="spinner" />
```

### 修改指示器大小

通过 `size` 属性设置指示器的大小，默认为 '32px' 大小。

```html
<be-loading size="20px" />
<be-loading size="30px" />
<be-loading size="50px" />
```

### Attributes

| 参数      | 说明                                 | 类型      | 可选值       | 默认值   |
|---------- |------------------------------------ |---------- |------------- |-------- |
| type      |	加载指示器类型                        |	string    |	'spinner'   |	'circle'  |
| color	    | 设置加载指示器颜色                      |	string    |	-         |	'#c5c5c5' |
| size      | 设置加载指示器大小                      | string    | -          | '32px'   |
