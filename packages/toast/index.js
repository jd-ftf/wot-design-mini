Component({
  behaviors: [],
  properties: {
    iconName: String,
    iconClass: String,
    msg: String,
    position: {
      type: String,
      default: 'middle'
    },
    show: Boolean
  },
  data () {
  },
  // 在组件实例刚刚被创建时执行
  created () {
  },
  // 在组件实例进入页面节点树时执行
  attached () {
  },
  // 在组件在视图层布局完成后执行
  ready () {
  },
  // 在组件实例被移动到节点树另一个位置时执行
  moved () {
  },
  // 在组件实例被从页面节点树移除时执行
  detached () {
  },
  // 每当组件方法抛出错误时执行
  error () {
  },

  pageLifetimes: {
    // 组件所在的页面被展示时执行
    show () {
    },
    // 组件所在的页面被隐藏时执行
    hide () {
    },
    // 组件所在的页面尺寸变化时执行
    resize () {
    }
  },

  methods: {}
})
