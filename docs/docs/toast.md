## Toast 轻提示

### 引入

```json
{
  "usingComponents": {
    "be-toast": "/bee-design/toast/index"
  }
}
```

### 基本用法

需要在页面中引入该组件，作为挂载点。

```html
<be-toast id="be-toast"/>
<be-button type="primary" bind:click="showToast">toast</be-button>
```

```javascript
import Toast from '/bee-design/toast/toast.js'

Page({
  showToast () {
    Toast('提示信息')
  }
})
```

### 成功、异常、警告

```javascript
Toast.success('操作成功')
Toast.error('手机验证码输入错误，请重新输入')
Toast.warning('提示信息')
```

### 提示位置

```javascript
// 顶部提示
Toast({
  position: 'top',
  msg: '提示信息'
})

// 底部提示
Toast({
  position: 'bottom',
  msg: '提示信息'
})
```

### 关闭提示

```javascript
Toast.close()
```

### Attributes

| 参数      | 说明                                 | 类型      | 可选值       | 默认值   |
|---------- |------------------------------------ |---------- |------------- |-------- |
| options    |	配置项，可以直接传入字符串作为提示信息     |	string / object   |	—           |	—       |

### options
| 参数      | 说明                                 | 类型      | 可选值       | 默认值   |
|---------- |------------------------------------ |---------- |------------- |-------- |
| msg        |	消息内容                             |	string   |	—           |	—       |
| duration   | 持续时间，单位 ms，为0时表示不自动关闭     |	Number   |	—           |	2000 |
| iconName   |	图标类型                             |	string    |	'success', 'error', 'warning' |	—      |
| customIcon |	自定义图标，开启后可以通过 custom-icon-class 类名自定义图标 |	Boolean   |	—	            | false   |
| position   |	提示信息框的位置                      |	string   |	'top', 'middle', 'bottom'  |	'middle'  |
| zIndex  	 | toast 层级                           |	number   |	—            |	100     |

### Methods
| 方法名称      | 说明       | 参数   |
|------------- |----------- |---------  |
| close         |手动关闭消息提示框，是Toast实例上的方法| —  |

### 外部样式类

| 类名     | 说明                |
|---------|---------------------|
| custom-class | 根结点样式 |
| custom-icon-class | 自定义图标类名 |