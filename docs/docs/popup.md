## Popup 弹出层

### 引入

```json
{
  "usingComponents": {
    "jm-popup": "/jm-design/popup/index"
  }
}
```

### 基本用法

通过 `show` 属性设置显示隐藏，监听 `bind:close` 事件修改 `show`。

```html
<jm-popup show="{{ show }}" custom-style="padding: 30px 40px;" bind:close="handleClose">内容</jm-popup>
```

### 弹出位置

设置 `position`，默认为 'center'，可选值 'top', 'right', 'bottom', 'left'。

```html
<jm-popup show="{{ show }}" position="top" custom-style="height: 200px;" bind:close="handleClose"></jm-popup>
```

### 关闭按钮

设置 `closable` 属性。

```html
<jm-popup show="{{ show }}" position="bottom" closable custom-style="height: 200px;" bind:close="handleClose"></jm-popup>
```

### Attributes

| 参数      | 说明                                 | 类型      | 可选值       | 默认值   |
|---------- |------------------------------------ |---------- |------------- |-------- |
| show | 弹出层是否显示 | boolean | - | - |
| position | 弹出位置 | string | 'center', 'top', 'right', 'bottom', 'left' | 'center' |
| closable | 关闭按钮 | boolean | - | false |
| close-on-click-modal | 点击遮罩是否关闭 | boolean | - | true | 
| duration | 动画持续时间 | number / boolean | - | 300(ms) |
| z-index | 设置层级 | number | - | 1 |
| modal | 是否显示遮罩 | boolean | - | true |

### Events

| 事件名称      | 说明                                 | 参数     |
|------------- |------------------------------------ |--------- |
| bind:close | 弹出层关闭时触发 | - |
| bind:click-modal | 点击遮罩时触发 | - |
| bind:before-enter | 进入前触发 | - |
| bind:enter | 进入时触发 | - |
| bind:after-enter | 进入后触发 | - |
| bind:before-leave | 离开前触发 | - |
| bind:leave | 离开时触发 | - |
| bind:after-leave | 离开后触发| - |