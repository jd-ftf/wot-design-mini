import VueComponent from '../common/component'
/**
 * 注意点：
 * 1. 需要控制的位置： 12个
 * 2. 每一个位置改变都需要控制：
 * popLeft(弹出坐标x)/ popTop(弹出坐标Y)/ arrowStyle(三角形位置以及尖角朝向)
 * 尖角朝向class控制，弹出框用js控制
 */
VueComponent({
  externalClasses: [
    'custom-container',
    'custom-arrow',
    'custom-content'
  ],
  data: {
    popStyle: '',
    arrowClass: 'wd-tooltip__arrow',
    visible: false
  },
  props: {
    placement: {
      type: String,
      value: 'top'
    },
    useContentSlot: {
      type: Boolean,
      value: false
    },
    content: null,
    show: {
      type: Boolean,
      observer (newValue) {
        newValue && this.control()
        this.setData({ visible: newValue })
      }
    },
    zIndex: Number,
    // 列表模式 menu 和 普通模式 normal
    mode: {
      type: String,
      value: 'normal'
    }
  },
  mounted () {
    this.getRect('.wd-tooltip__target').then(rect => {
      if (!rect) return
      this.left = rect.left
      this.bottom = rect.bottom
      this.width = rect.width
      this.height = rect.height
      this.top = rect.top
    })
    this.getRect('.wd-tooltip__container').then(rect => {
      if (!rect) return
      this.popWidth = rect.width
      this.popHeight = rect.height
    })
  },
  methods: {
    click (event) {
      const { show } = this.data
      this.setData({
        show: !show
      })
    },
    control () {
      const { placement } = this.data
      const contentWidth = 10
      // 上下位（纵轴）对应的距离左边的距离
      const verticalX = 0 - (this.popWidth - this.width) / 2
      // 上下位（纵轴）对应的距离底部的距离
      const verticalY = contentWidth + this.height
      // 左右位（横轴）对应的距离左边的距离
      const horizontalX = this.width + contentWidth
      // 左右位（横轴）对应的距离底部的距离
      const horizontalY = 0 - (this.popHeight - this.height) / 2

      const placements = new Map([
        // 上
        ['top', `left: ${verticalX}px; bottom: ${verticalY}px;`],
        ['top-start', `left:${0}; bottom: ${verticalY}px;`],
        ['top-end', `right: ${0}; bottom: ${verticalY}px;`],
        // 下
        ['bottom', `left: ${verticalX}px; top: ${verticalY}px;`],
        ['bottom-start', `left:${0}; top: ${verticalY}px;`],
        ['bottom-end', `right: ${0}; top: ${verticalY}px;`],
        // 左
        ['left', `right: ${horizontalX}px; top: ${horizontalY}px;`],
        ['left-start', `right: ${horizontalX}px; top: ${0};`],
        ['left-end', `right: ${horizontalX}px; bottom: ${0};`],
        // 右
        ['right', `left: ${horizontalX}px; top: ${horizontalY}px;`],
        ['right-start', `left: ${horizontalX}px; top: ${0};`],
        ['right-end', `left: ${horizontalX}px; bottom: ${0};`]
      ])

      this.setData({
        popStyle: placements.get(placement),
        arrowClass: `wd-tooltip__arrow-${placement}`
      })
    }
  }
})