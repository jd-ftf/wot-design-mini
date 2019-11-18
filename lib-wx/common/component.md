### 使用方法
```javascript

import VueComponent from '/packages/common/component.js'

VueComponent({
    props: {}, 
    beforeCreate(){},
    created(){}, 
    mounted(){}, 
    destroyed(){}
})
```

### 映射关系

>如果使用封装的`VueComponent`组件，以下小程序`原生属性/方法`必须替换为对应的`封装属性/方法`

| 封装          | 原生        | 
|--------------|----------- |
| props        | properties |
| beforeCreate | created    |
| created      | attached   |
| mounted      | ready      |
| destroyed    | detached   |

### 全局样式类

* 使用VueComponent组件时，会自动添加custom-class类，外部可以通过此类修改组件内部的样式。
```html
<view>
  <jm-button custom-class="custom">确定</jm-button>
</view>
```
```css
.custom{
    background-color: red;
}
```

