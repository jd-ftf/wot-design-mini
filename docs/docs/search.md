## Search 搜索框

### 引入

```json
{
  "usingComponents": {
    "jm-search": "/jm-design/search/index"
  }
}
```

### 基本用法

`focus`绑定聚焦事件、`input` 绑定输入事件，`blur`绑定失焦事件，`search` 绑定搜索事件，`cancel` 绑定取消事件，`clear` 绑定清空事件。

```html
<jm-search
  bind:focus="focus"
  bind:blur="blur"
  bind:search="search"
  bind:clear="clear"
  bind:cancel="cancel"
  bind:input="input"
/>

Page({
  focus () {
    console.log('聚焦')
  },
  blur () {
    console.log('失焦')
  },
  search () {
    console.log('搜索')
  },
  clear () {
    console.log('重置')
  },
  cancel () {
    console.log('取消')
  },
  input (e) {
    console.log('输入', e)
  }
})

```

### 浅色主题

设置 `light` 属性，将组件背景色和输入框背景色反转。

```html
<jm-search light />
```


### 隐藏取消按钮

设置 `hide-cancel` 属性。

```html
<jm-search hide-cancel />
```

### 禁用

设置 `disabled` 属性。

```html
<jm-search disabled />
```

可以和 `hide-cancel` 结合使用，用于在本页只展示搜索框，当点击搜索框时，将页面路由切换进搜索页，在搜索页中再使用搜索功能。

```html
<jm-search hide-cancel disabled />
```

### 自定义

通过设置 `placeholder` 修改输入框提示文案，`cancel-txt` 修改取消按钮文案。

```html
<jm-search placeholder="请输入订单号/订单名称" cancel-txt="搜索" />
```

### Attributes

| 参数      | 说明                                 | 类型      | 可选值       | 默认值   |
|---------- |------------------------------------ |---------- |------------- |-------- |
| placeholder	    | 搜索框占位文本                  |	string    |	-         |	'搜索' |
| cancel-txt      | 搜索框右侧文本                   | string    | -          | '取消'   |
| light           | 搜索框亮色（白色）                | boolean   | -          | false   |
| hide-cancel     | 是否隐藏右侧文本                 | boolean    | -          | false   |
| disabled        | 是否禁用搜索框                   | boolean    | -          | false   |
| maxlength | 原生属性，设置最大长度 | string | - | - |

### Events

| 事件名称      | 说明                                 | 参数     |
|------------- |------------------------------------ |--------- |
| focus        | 监听输入框focus事件                    | -       |
| blur         | 监听输入框blur事件                     | -       |
| search       | 监听输入框搜索事件                      | 搜索输入框文本       |
| clear        | 监听输入框清空按钮事件                   | -       |
| cancel       | 监听输入框右侧文本点击事件               | -       |
| input        | 监听输入框input事件                    | Event       |