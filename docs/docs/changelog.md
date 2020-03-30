## 更新日志

### 1.4.0

*2020-03-13*

#### 新特性

- Col
  - 新增组件 (by [@HXCStudio123](https://github.com/HXCStudio123) )
- DropMenu
  - 新增组件 (by [@HXCStudio123](https://github.com/HXCStudio123) )
- Grid
  - 新增组件 (by [@HXCStudio123](https://github.com/HXCStudio123) )
- Img
  - 新增组件 (by [@HXCStudio123](https://github.com/HXCStudio123) )
- Row
  - 新增组件 (by [@HXCStudio123](https://github.com/HXCStudio123) )
- SortButton
  - 新增组件 (by [@Gkxie](https://github.com/Gkxie) )
- StatusTip
  - 新增组件 (by [@RedJoy](https://github.com/RedJoy) )

#### Bug 修复

- Collapse
  - 修正初始动画展示 (by [@HXCStudio123](https://github.com/HXCStudio123) )
- Picker
  - 修复 picker 组件 Toolbar 滑动穿透 (by [@HXCStudio123](https://github.com/HXCStudio123) )
  - 修复多级联动，修改内部值后取消恢复数据源 (by [@yawuling](https://github.com/yawuling) )
  - 修复 column-change 异步情况下无法准确获取值的问题 (by [@yawuling](https://github.com/yawuling) )
- Rate
  - 修正单向数据传输 (by [@yawuling](https://github.com/yawuling) )
- Slider
  - 修正样式和偏移比例计算问题 (by [@yawuling](https://github.com/yawuling) )
- Search
  - 高度问题修复 (by [@HXCStudio123](https://github.com/HXCStudio123) )
- Tooltip
  - 解决tooltip关闭后透明未隐藏问题 (by [@HXCStudio123](https://github.com/HXCStudio123) )
  
#### 优化

- Doc
  - 自定义主题 (by [@yawuling](https://github.com/yawuling) )
  - 新增Col/Row组合使用Layout文档 (by [@HXCStudio123](https://github.com/HXCStudio123) )
  - 添加开发指南 (by [@HXCStudio123](https://github.com/HXCStudio123) )

### 1.3.0

*2020-02-11*

#### 新特性

- Cell
  - 新增属性`size`, `title-width`, `center` (by [@yawuling](https://github.com/yawuling) )
- Checkbox
  - 新增属性`inline` (by [@yawuling](https://github.com/yawuling) )
- DatetimePicker
  - 新增属性`size`, `label-width`, `error`, `align-right`, `use-label-slot`, `before-confirm` (by [@yawuling](https://github.com/yawuling) )
  - 新增自定义样式类 `custom-label-class`, `custom-value-class`(by [@yawuling](https://github.com/yawuling) )
  - 添加与 CellGroup 组件的关联 (by [@yawuling](https://github.com/yawuling) )
- Input
  - 新增属性`label`, `label-width`, `use-label-slot`, `size`, `error`, `center` (by [@yawuling](https://github.com/yawuling) )
  - 新增自定义样式类 `custom-label-class`(by [@yawuling](https://github.com/yawuling) )
  - 添加与 CellGroup 组件的关联 (by [@yawuling](https://github.com/yawuling) )
- Picker
  - 新增属性`size`, `label-width`, `error`, `align-right`, `use-label-slot`, `before-confirm` (by [@yawuling](https://github.com/yawuling) )
  - 新增自定义样式类 `custom-label-class`, `custom-value-class`(by [@yawuling](https://github.com/yawuling) )
  - 添加与 CellGroup 组件的关联 (by [@yawuling](https://github.com/yawuling) )
  - 新增自定义事件 `open` (by [@yawuling](https://github.com/yawuling) )
- Popup
  - 新增属性 `hide-when-close` (by [@yawuling](https://github.com/yawuling) )
- Radio
  - 新增属性`inline` (by [@yawuling](https://github.com/yawuling) )
- SwipeAction
  - 新增组件 (by [@Gkxie](https://github.com/Gkxie) )

#### Bug 修复

- ActionSheet
  - 修复自定义事件连字符无法在京东小程序中触发的问题 (by [@yawuling](https://github.com/yawuling) )
- Button
  - 修复文本垂直居中问题 (by [@yawuling](https://github.com/yawuling) )
- Checkbox
  - 修复disabled 在设置 min 和 max 时非正常展示问题 (by [@yawuling](https://github.com/yawuling) )
- MesageBox
  - 修复点击蒙层无法关闭弹框的问题 (by [@yawuling](https://github.com/yawuling) )
- Picker
  - 修复快速滑动picker后关闭重新打开，选择器选项重置为第一项问题 (by [@yawuling](https://github.com/yawuling) )
- Popup
  - 修复自定义事件连字符无法在京东小程序中触发的问题 (by [@yawuling](https://github.com/yawuling) )
- Tabs
  - 修复map功能样式展示问题(by [@yawuling](https://github.com/yawuling) )
- Transition
  - 修复自定义事件连字符无法在京东小程序中触发的问题 (by [@yawuling](https://github.com/yawuling) )
#### 优化
- Checkbox
  - 优化单个复选框的 true-value 和 false-value 切换的 value 值，不再限制只能 boolean 值 (by [@yawuling](https://github.com/yawuling) )
- Doc
  - 新增Form表单组合使用文档 (by [@yawuling](https://github.com/yawuling) )
- Input
  - 删除无用的自定义样式类 `custom-prefix-class`, `custom-suffix-class` (by [@yawuling](https://github.com/yawuling) )
- Picker
  - 删除无用事件 `bind:change` (by [@yawuling](https://github.com/yawuling) )
  - `bind:confirm` 事件增加 value 入参 (by [@yawuling](https://github.com/yawuling) )
  - 优化内部选中和关闭回退逻辑
- DatetimePicker
  - 删除无用事件 `bind:change` (by [@yawuling](https://github.com/yawuling) )
  - `bind:confirm` 事件入参优化为时间戳或字符串 (by [@yawuling](https://github.com/yawuling) )
  - 内部逻辑优化：日期数据源拆分为 value 和 label 两个值，方便将 value 传给调用者 (by [@yawuling](https://github.com/yawuling) )
- DatetimePickerView
  - `bind:change` 事件入参优化为时间戳或字符串 (by [@yawuling](https://github.com/yawuling) )
- Radio
  - 删除 `circle` 类型的单选框 (by [@yawuling](https://github.com/yawuling) )
- Switch
  - 优化内部值更新方式 (by [@yawuling](https://github.com/yawuling) )

### 1.2.0

*2020-01-09*

#### 新特性
- ToolTip
  - 新增弹出提示组件 (by [@HXCStudio123](https://github.com/HXCStudio123))
  - 新增属性`open-delay`，`visibleArrow`  (by [@HXCStudio123](https://github.com/HXCStudio123))
  - 样式抽离，主题实现 (by [@HXCStudio123](https://github.com/HXCStudio123))
- Tag
  - 新增属性`dynamic`属性 (by [@awjing](https://github.com/awjing))
#### Bug 修复
- DateTimePicker
  - 相同组件复用同一个实例，导致防抖函数被复用。 (by [@Gkxie](https://github.com/Gkxie))
  - 当未传入value，组件ready时label会闪烁 (by [@Gkxie](https://github.com/Gkxie))
#### 优化
- Chore
  - 删除 github page 无用文件 (by [@Gkxie](https://github.com/Gkxie))
  - 优化 travis 配置 (by [@Gkxie](https://github.com/Gkxie))
- Doc
  - 文档更换logo (by [@HXCStudio123](https://github.com/HXCStudio123))
  - 新增搜索功能 (by [@HXCStudio123](https://github.com/HXCStudio123))
  - 新文档版本切换 (by [@HXCStudio123](https://github.com/HXCStudio123))
  - 文档更新:tooltip (by [@HXCStudio123](https://github.com/HXCStudio123))
  - 文档更新:tag (by [@awjing](https://github.com/awjing))

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