## 更新日志

### 1.3.0

*2020-02-11*

#### 新特性
- Cell
  - 新增属性`size`, `title-width`, `center` (by @yawuling )
- Checkbox
  - 新增属性`inline` (by @yawuling )
- DatetimePicker
  - 新增属性`size`, `label-width`, `error`, `align-right`, `use-label-slot`, `before-confirm` (by @yawuling )
  - 新增自定义样式类 `custom-label-class`, `custom-value-class`(by @yawuling )
  - 添加与 CellGroup 组件的关联 (by @yawuling )
- Input
  - 新增属性`label`, `label-width`, `use-label-slot`, `size`, `error`, `center` (by @yawuling )
  - 新增自定义样式类 `custom-label-class`(by @yawuling )
  - 添加与 CellGroup 组件的关联 (by @yawuling )
- Picker
  - 新增属性`size`, `label-width`, `error`, `align-right`, `use-label-slot`, `before-confirm` (by @yawuling )
  - 新增自定义样式类 `custom-label-class`, `custom-value-class`(by @yawuling )
  - 添加与 CellGroup 组件的关联 (by @yawuling )
  - 新增自定义事件 `open` (by @yawuling )
- Popup
  - 新增属性 `hide-when-close` (by @yawuling )
- Radio
  - 新增属性`inline` (by @yawuling )
- SwipeAction
  - 新增组件 (by @Gkxie )
#### Bug 修复
- ActionSheet
  - 修复自定义事件连字符无法在京东小程序中触发的问题 (by @yawuling )
- Button
  - 修复文本垂直居中问题 (by @yawuling )
- Checkbox
  - 修复disabled 在设置 min 和 max 时非正常展示问题 (by @yawuling )
- MesageBox
  - 修复点击蒙层无法关闭弹框的问题 (by @yawuling )
- Picker
  - 修复快速滑动picker后关闭重新打开，选择器选项重置为第一项问题 (by @yawuling )
- Popup
  - 修复自定义事件连字符无法在京东小程序中触发的问题 (by @yawuling )
- Tabs
  - 修复map功能样式展示问题(by @yawuling )
- Transition
  - 修复自定义事件连字符无法在京东小程序中触发的问题 (by @yawuling )
#### 优化
- Checkbox
  - 优化单个复选框的 true-value 和 false-value 切换的 value 值，不再限制只能 boolean 值 (by @yawuling )
- Doc
  - 新增Form表单组合使用文档 (by @yawuling )
- Input
  - 删除无用的自定义样式类 `custom-prefix-class`, `custom-suffix-class` (by @yawuling )
- Picker
  - 删除无用事件 `bind:change` (by @yawuling )
  - `bind:confirm` 事件增加 value 入参 (by @yawuling )
  - 优化内部选中和关闭回退逻辑
- DatetimePicker
  - 删除无用事件 `bind:change` (by @yawuling )
  - `bind:confirm` 事件入参优化为时间戳或字符串 (by @yawuling )
  - 内部逻辑优化：日期数据源拆分为 value 和 label 两个值，方便将 value 传给调用者 (by @yawuling )
- DatetimePickerView
  - `bind:change` 事件入参优化为时间戳或字符串 (by @yawuling )
- Radio
  - 删除 `circle` 类型的单选框 (by @yawuling )
- Switch
  - 优化内部值更新方式 (by @yawuling )

### 1.2.0

*2020-01-09*

#### 新特性
- ToolTip
  - 新增弹出提示组件 (by @HXCStudio123)
  - 新增属性`open-delay`，`visibleArrow`  (by @HXCStudio123)
  - 样式抽离，主题实现 (by @HXCStudio123)
- Tag
  - 新增属性`dynamic`属性 (by @awjing)
#### Bug 修复
- DateTimePicker
  - 相同组件复用同一个实例，导致防抖函数被复用。 (by @Gkxie)
  - 当未传入value，组件ready时label会闪烁 (by @Gkxie)
#### 优化
- Chore
  - 删除 github page 无用文件 (by @Gkxie)
  - 优化 travis 配置 (by @Gkxie)
- Doc
  - 文档更换logo (by @HXCStudio123)
  - 新增搜索功能 (by @HXCStudio123)
  - 新文档版本切换 (by @HXCStudio123)
  - 文档更新:tooltip (by @HXCStudio123)
  - 文档更新:tag (by @awjing)

### 1.1.0

*2019-01-02*

- Tag添加新增标签功能

### 1.0.2

*2019-12-27*

- 文档更新

### 1.0.1

*2019-12-26*

- 修复search组件快速点击切换状态

### 1.0.0

*2019-12-26*

- 发布30个组件