Page({
  data: {
    list: [
      {
        id: 'widget',
        name: '基础组件',
        open: false,
        pages: [
          {
            id: 'badge',
            name: 'Badge 徽章'
          }, {
            id: 'button',
            name: 'Button 按钮'
          }, {
            id: 'icon',
            name: 'Icon 图标'
          }, {
            id: 'popup',
            name: 'Popup 弹出层'
          }, {
            id: 'transition',
            name: 'Transition 动画'
          }
        ]
      }, {
        id: 'nav',
        name: '导航组件',
        open: false,
        pages: [
          {
            id: 'cell',
            name: 'Cell 单元格'
          }, {
            id: 'tabs',
            name: 'Tabs 标签页'
          }
        ]
      }, {
        id: 'form',
        name: '表单',
        open: false,
        pages: [
          {
            id: 'checkbox',
            name: 'Checkbox 复选框'
          }, {
            id: 'datetimePicker',
            name: 'DatetimePicker 时间选择器'
          }, {
            id: 'datetimePickerView',
            name: 'DatetimePickerView 时间选择器视图'
          }, {
            id: 'input',
            name: 'Input 输入框'
          }, {
            id: 'inputNumber',
            name: 'InputNumber 计数器'
          }, {
            id: 'picker',
            name: 'Picker 选择器'
          }, {
            id: 'pickerView',
            name: 'PickerView 选择器视图'
          }, {
            id: 'radio',
            name: 'Radio 单选框'
          }, {
            id: 'rate',
            name: 'Rate 评分'
          }, {
            id: 'search',
            name: 'Search 搜索'
          }, {
            id: 'switch',
            name: 'Switch 开关'
          }
        ]
      }, {
        id: 'feedback',
        name: '交互组件',
        open: false,
        pages: [
          {
            id: 'actionSheet',
            name: 'ActionSheet 上拉菜单'
          }, {
            id: 'loading',
            name: 'Loading 加载指示器'
          }, {
            id: 'messageBox',
            name: 'MessageBox 弹框'
          }, {
            id: 'slider',
            name: 'Slider 滑块'
          }, {
            id: 'toast',
            name: 'Toast 轻提示'
          }, {
            id: 'tooltip',
            name: 'Tooltip 文字提示'
          }
        ]
      }, {
        id: 'show',
        name: '展示组件',
        open: false,
        pages: [
          {
            id: 'collapse',
            name: 'Collapse 折叠面板'
          }, {
            id: 'loadmore',
            name: 'Loadmore 加载更多'
          }, {
            id: 'noticeBar',
            name: 'NoticeBar 通知栏'
          }, {
            id: 'steps',
            name: 'Steps 步骤条'
          }, {
            id: 'tag',
            name: 'Tag 标签'
          }, {
            id: 'progress',
            name: 'Progress 进度条'
          }
        ]
      }
    ]
  },
  kindToggle: function (e) {
    var id = e.currentTarget.id,
      list = this.data.list
    for (var i = 0, len = list.length; i < len; ++i) {
      if (list[i].id == id) {
        list[i].open = !list[i].open
      } else {
        list[i].open = false
      }
    }
    this.setData({
      list: list
    })
  }
})