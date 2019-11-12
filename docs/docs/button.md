## Button 按钮

### 引入

```json
{
  "usingComponents": {
    "jm-button": "/jm-design/button/index"
  }
}
```

### 基本用法

基本按钮。

```html
<jm-button>默认按钮</jm-button>
<jm-button type="primary">主要按钮</jm-button>
<jm-button type="success">成功按钮</jm-button>
<jm-button type="info">信息按钮</jm-button>
<jm-button type="warning">警告按钮</jm-button>
<jm-button type="error">危险按钮</jm-button>
```

### 禁用

设置 `disabled` 属性。

```html
<jm-button disabled>默认按钮</jm-button>
```

### 幽灵按钮

设置 `plain` 属性。

```html
<jm-button type="primary" plain>主要按钮</jm-button>
```

### 圆角按钮

设置 `round` 属性。

```html
<jm-button type="primary" round>主要按钮</jm-button>
```

### 按钮大小

设置 `size` ，支持 'small'、'medium'、'large'，默认为 'medium'。

```html
<jm-button type="primary" size="small">小号按钮</jm-button>
<jm-button type="primary" size="medium">中号按钮</jm-button>
<jm-button type="primary" size="large">大号按钮</jm-button>
```

### 加载中按钮

设置 `loading` 属性，让按钮处于加载中状态。加载中的按钮是禁止点击的。

```html
<jm-button type="primary" loading>加载中</jm-button>
```

### 文字按钮

将 `type` 设置为 `text`。文字按钮不支持其他颜色。

```html
<jm-button type="text">文字按钮</jm-button>
```

### 图标按钮

将 `type` 设置为 `icon`，同时设置 `icon` 属性，icon为图标的类名，可以直接使用 `Icon 图标` 章节中的图标类名。

```html
<jm-button type="icon" icon="menu"></jm-button>
```

### 带图标的按钮

设置 `icon` 属性，不需要设置 `type` 为 `icon`，即可以直接使用带图标的按钮。

```html
<jm-button type="primary" icon="edit-outline"></jm-button>
```

### 吸顶按钮

设置 `suck` 属性。

```html
<jm-button type="primary" suck>主要按钮</jm-button>
```

### 块状按钮

设置 `block` 属性。

```html
<jm-button type="primary" block>主要按钮</jm-button>
```

### Attributes

| 参数      | 说明                                 | 类型      | 可选值       | 默认值   |
|---------- |------------------------------------ |---------- |------------- |-------- |
| type   |	按钮类型                        |	string     | 'primary', 'success', 'info', 'warning', 'error', 'text', 'icon' |	-  |
| round	    | 圆角按钮                  |	boolean    |	-         |	false |
| plain | 幽灵按钮 | boolean | - | false |
| loading | 加载中按钮 | boolean | - | false |
| suck | 吸顶按钮 | boolean | - | false |
| block | 块状按钮 | boolean | - | false |
| size | 按钮尺寸 | string | 'small', 'medium', 'large' | 'medium' |
| disabled | 禁用按钮 | boolean | - | false |
| icon | 图标类名 | string | - | - |
| open-type | 微信开放能力 | string | - | - |
| form-type | 用于 form 组件，点击分别会触发 form 组件的 submit/reset 事件 | string | 'submit' / 'reset' | - |
| hover-stop-propagation | 指定是否阻止本节点的祖先节点出现点击态 | boolean | - | false |
| lang | 指定返回用户信息的语言，zh_CN 简体中文，zh_TW 繁体中文，en 英文 | string | 'zh_CN' / 'zh_TW' | 'en' |
| session-from | 会话来源，open-type="contact"时有效 | string | - | - |
| session-message-title | 会话内消息卡片标题，open-type="contact"时有效 | string | - | 当前标题 |
| session-message-path | 会话内消息卡片点击跳转小程序路径，open-type="contact"时有效 | string | - | 当前分享路径 |
| send-message-img | 会话内消息卡片图片，open-type="contact"时有效 | string | - | 截图 |
| app-parameter | 打开 APP 时，向 APP 传递的参数，open-type=launchApp时有效 | string | - | - |
| show-message-card	| 是否显示会话内消息卡片，设置此参数为 true，用户进入客服会话会在右下角显示"可能要发送的小程序"提示，用户点击后可以快速发送小程序消息，open-type="contact"时有效 | boolean | - | false |

### Events

| 事件名称      | 说明                                 | 参数     |
|------------- |------------------------------------ |--------- |
| bind:click | 点击事件 | - |
| bind:getuserinfo | 获取用户信息 | - |
| bind:contact | 客服消息回调，open-type="contact"时有效 | - |
| bind:getphonenumber | 获取用户手机号回调，open-type=getPhoneNumber时有效 | - |
| bind:error | 当使用开放能力时，发生错误的回调，open-type=launchApp时有效 | - |
| bind:launchapp | 打开 APP 成功的回调，open-type=launchApp时有效 | - |
| bind:opensetting | 在打开授权设置页后回调，open-type=openSetting时有效 | - |

### 外部样式类

| 类名     | 说明                |
|---------|---------------------|
| custom-class | 根结点样式 |
