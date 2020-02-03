## Form 表单组合

本章节主要讲如何将多个 form 表单组件进行组合，形成一个完整的表单页面。

常见的 form 表单为`单元格`形式的展示，即左侧为表单的标题描述，右侧为表单的输入。

其中，`Input 输入框`、`Picker 选择器`和 `DatetimePicker 日期时间选择器`具有`单元格`的展示形式，而 `Checkbox 复选框`、`Radio 单选框`、`InputNumber 计数器`和 `Switch 开关`需要使用 `Cell 单元格`进行包裹使用。

以下表单页面示例使用了 Button、Cell、CellGroup、DatetimePicker、Input、Picker、Radio、RadioGroup、Switch、Toast、MessageBox：

index.json 文件代码：

```json
{
  "navigationBarTitleText": "Form 表单组件组合",
  "usingComponents": {
    "wd-button": "/wot-design/dist/button/index",
    "wd-cell": "/wot-design/dist/cell/index",
    "wd-cell-group": "/wot-design/dist/cellGroup/index",
    "wd-datetime-picker": "/wot-design/dist/datetimePicker/index",
    "wd-input": "/wot-design/dist/input/index",
    "wd-picker": "/wot-design/dist/picker/index",
    "wd-radio": "/wot-design/dist/radio/index",
    "wd-radio-group": "/wot-design/dist/radioGroup/index",
    "wd-switch": "/wot-design/dist/switch/index",
    "wd-toast": "/wot-design/dist/toast/index",
    "wd-message-box": "/wot-design/dist/messageBox/index"
  }
}
```

index.jxml 文件代码：

```html
<wd-message-box id="wd-message-box" />
<wd-toast id="wd-toast"/>
<wd-cell-group>
  <wd-input label="用户名" error="{{ usernameError }}" clearable value="{{ username }}" placeholder="请输入用户名" bind:change="handleUsername" />
  <wd-input label="密码" error="{{ passwordError }}" show-password clearable value="{{ password }}" placeholder="请输入密码" bind:change="handlePassword" />
  <wd-cell title="性别" center>
    <wd-radio-group value="{{ gender }}" bind:change="handleGender">
      <wd-radio inline value="{{ 1 }}">男</wd-radio>
      <wd-radio inline value="{{ 2 }}">女</wd-radio>
    </wd-radio-group>
  </wd-cell>
  <wd-cell title="是否订阅" center>
    <wd-switch value="{{ subscribe }}" bind:change="handleSubscribe" size="20px" />
  </wd-cell>
  <wd-picker label="注册类型" error="{{ userTypeError }}" columns="{{ typeList }}" value="{{ userType }}" bind:confirm="handleUserType" align-right />
  <wd-datetime-picker label="生日" error="{{ birthdayError }}" type="date" formatter="{{ birthdayFormat }}" value="{{ birthday }}" bind:confirm="handleBirthday" align-right />
</wd-cell-group>
<view class="wrapper">
  <wd-button type="primary" block size="large" bind:click="handleClick">提交</wd-button>
</view>

<!-- 展示当前表单的实际值 -->
<view>
  <view class="display-item">
    用户名: {{ username }}
  </view>
  <view class="display-item">
    密码: {{ password }}
  </view>
  <view class="display-item">
    性别: {{ gender }}
  </view>
  <view class="display-item">
    是否订阅: {{ subscribe }}
  </view>
  <view class="display-item">
    注册类型: {{ userType }}
  </view>
  <view class="display-item">
    生日: {{ birthday }}
  </view>
</view>
```

index.js 文件代码：

```javascript
import MessageBox from '/wot-design/dist/messageBox/messageBox'
import Toast from '/wot-design/dist/toast/toast.js'

Page({
  data: {
    username: '', // 用户名输入框绑定值
    usernameError: false, // 设置用户名输入框是否错误
    password: '', // 密码输入框绑定值
    passwordError: false, // 设置密码输入框是否错误
    gender: 1, // 性别单选框绑定值
    subscribe: true, // 是否订阅，开关绑定值
    typeList: [
      {
        label: '类型1',
        value: 1
      }, {
        label: '类型2',
        value: 2
      }, {
        label: '类型3',
        value: 3
      }
    ], // 注册类型选择器数据源
    userType: '', // 注册类型选择器绑定值
    userTypeError: false,  // 设置注册类型选择器是否错误
    birthday: '', // 生日日期选择器绑定值
    birthdayError: false,  // 设置生日日期选择器是否错误
    birthdayFormat (type, value) {
      switch (type) {
        case 'year':
          return value + '年'
        case 'month':
          return value + '月'
        case 'date':
          return value + '日'
        default:
          return value
      }
    } // 生日日期选择器内部格式化函数
  },
  handleUsername ({ detail }) {
    // 监听用户名输入框的change事件，当用户重新输入时，不管是否有值，都将错误置为false，在提交表单时再做校验，以下同理
    this.setData({
      username: detail,
      usernameError: false
    })
  },
  handlePassword ({ detail }) {
    this.setData({
      password: detail,
      passwordError: false
    })
  },
  handleGender ({ detail }) {
    this.setData({
      gender: detail
    })
  },
  handleSubscribe ({ detail }) {
    this.setData({
      subscribe: detail
    })
  },
  handleUserType ({ detail }) {
    this.setData({
      userType: detail,
      userTypeError: false
    })
  },
  handleBirthday ({ detail }) {
    this.setData({
      birthday: detail,
      birthdayError: false
    })
  },
  handleClick () {
    const { username, password, userType, birthday } = this.data

    // 校验表单是否有未填项，如果有，将其置为错误，并停止提交表单
    if (!username || !password || !userType || !birthday) {
      this.setData({
        usernameError: !username,
        passwordError: !password,
        userTypeError: !userType,
        birthdayError: !birthday
      })
      
      Toast.error('有未填的选项')
      return
    }

    // 校验通过后，则请求后端接口将表单数据传输过去，这里省略，只做简单的弹窗提示
    MessageBox.alert({
      title: '提交提示',
      msg: '提交成功'
    })
  }
})
```

> 在 `CellGroup 组件` 中，每个 Cell 组件都有0.5像素的下边框，最后1个 Cell 组件会自动判断并去掉下边框，只有支持 Cell 类型的组件才支持这种判断。
