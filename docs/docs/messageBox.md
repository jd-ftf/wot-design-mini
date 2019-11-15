## MessageBox 弹框

弹框有三种：alert、confirm 和 prompt。

### 引入

```json
{
  "usingComponents": {
    "jm-message-box": "/jm-design/messageBox/index"
  }
}
```

### Alert 弹框

alert 弹框只有确定按钮，用于强提醒。
> 由于小程序限制，组件必须设置id,默认设置为`jm-message-box`，如需修改请在options中同时传入
```html
<jm-message-box id="jm-message-box" />
<jm-button type="primary" bind:click="alert">alert</jm-button>
```
```javascript
import MessageBox from '/jm-design/messageBox/messageBox'

Page({
  alert () {
    MessageBox.alert('提示文案')
  }
})
```

显示标题的 alert 弹框。

```html
<jm-message-box id="jm-message-box" />
<jm-button type="primary" bind:click="alert">alert</jm-button>
```
```javascript
import MessageBox from '/jm-design/messageBox/messageBox'

Page({
  alert () {
    MessageBox.alert({
      msg: '提示文案',
      title: '标题'
    })
  }
})
```

如果内容文案过长，弹框高度不再增加，而是展示滚动条。

```html
<jm-message-box id="jm-message-box" />
<jm-button type="primary" bind:click="alert">alert</jm-button>
```
```javascript
import MessageBox from '/jm-design/messageBox/messageBox'

Page({
  alert () {
    MessageBox.alert({
      msg: '以上文字是示意以上文字是示意以上文字是示意以上文字是示意以上文字是示意以上文字是示意以上文字是示意以上文字是示意以上文字是示意以上文字是示意以上文字是示意以上文字是示意以上文字是示意以上文字是示意以上文字是示意以上文字是示意以上文字是示意以上文字是示意以上文字是示意以上文字是示意以上文字是示意以上文字是示意以上文字是示意以上文字是示意以上文以上文字是示意以上文字是示意以上文字是示意以上文字是示意以上文字是示意以上文字是示意以上文字是示意以上文字是示意以上文字是示意以上文字是示意以上文字是示意以上文字是示意以上文字是示意以上文字是示意以上文字是示意以上文字是示意以上文字是示意以上文字是示意以上文字是示意以上文字是示意以上文字是示意以上文字是示意以上文字是示意以上文字是示意以上文',
      title: '标题'
    })
  }
})
```

### Confirm 弹框

用于提示用户操作。

```html
<jm-message-box id="jm-message-box" />
<jm-button type="primary" bind:click="confirm">confirm</jm-button>
```
```javascript
import MessageBox from '/jm-design/messageBox/messageBox'

Page({
  confirm () {
    MessageBox.confirm({
      msg: '提示文案',
      title: '标题'
    })
  }
})
```

### Prompt 弹框

prompt 会展示一个输入框，并可以进行输入校验。

```html
<jm-message-box id="jm-message-box" />
<jm-button type="primary" bind:click="prompt">prompt</jm-button>
```
```javascript
import MessageBox from '/jm-design/messageBox/messageBox'

Page({
  prompt () {
    MessageBox.prompt({
      title: '邮箱',
      inputPattern: /.+@.+\..+/i
    })
  }
})
```

### 插槽

如果提供的弹框内容不满足需求，可以使用插槽自定义弹框内容。

```html
<jm-message-box id="jm-message-box-slot" use-slot>
  <jm-rate
    custom-class="custom-rate-class"
    value="{{value}}"
    bind:change="changeValue"
  />
</jm-message-box>
```
```javascript
import MessageBox from '/jm-design/messageBox/messageBox'

Page({
  data: {
    value: 1
  },
  changeValue ({ detail }) {
    this.setData({ value: detail })
  },
  withSlot () {
    MessageBox({
      title: '评分',
      selector: '#jm-message-box-slot'
    })
  }
})
```

```css
.custom-rate-class{
  display: block;
  height: 1.4rem;
}
```

---

弹框在点击确定和取消按钮时，会返回一个promise对象，用 then 接收“确定”按钮事件，用 catch 接收“取消”按钮事件。传入的action值为:'confirm'、'cancel'、'modal'。

`MessageBox(msg)`在调用时直接传入字符串，`MessageBox(options)` 在调用时，需传入 options 参数。alert、confirm 和 prompt 都支持快捷调用：

```javascript
MessageBox(msg)

MessageBox(options) 

MessageBox.alert(options)

MessageBox.confirm(options)

MessageBox.prompt(options)
```

### Options Attributes

| 参数      | 说明                                 | 类型      | 可选值       | 默认值   |
|---------- |------------------------------------ |---------- |------------- |-------- |
| title      |	标题                        |	string    |	- |	- |
| msg	    | 消息文案 |	string    |	-         |	- |
| type      | 弹框类型                      | string    | 'alert', 'confirm', 'prompt'          | 'alert'   |
| closeOnClickModal      | 是否支持点击蒙层进行关闭，点击蒙层回调传入的action为'modal'  | boolean    | -          | true   |
| inputType      | 当type为prompt时，输入框类型   | string    | -          | 'text'   |
| inputValue      | 当type为prompt时，输入框初始值   | string / number    | -          | -   |
| inputPlaceholder      | 当type为prompt时，输入框placeholder      | string    | -          | '请输入内容'   |
| inputPattern      | 当type为prompt时，输入框正则校验，点击确定按钮时进行校验      | regex    | -          | -   |
| inputValidate      | 当type为prompt时，输入框校验函数，点击确定按钮时进行校验      | function    | -          | -   |
| inputError | 当type为prompt时，输入框检验不通过时的错误提示文案 | string | - | '输入的数据不合法' |
| confirmButtonText      | 确定按钮文案      | string    | -          | '确定'   |
| cancelButtonText      | 取消按钮文案     | string    | -          | '取消'   |
| selector      | 组件的id     | string    | - | '#jm-message-box' |

### 外部样式类

| 类名     | 说明                |
|---------|---------------------|
| custom-class | 根结点样式 |
