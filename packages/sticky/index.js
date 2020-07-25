import VueComponent from '../common/component'
import { renderData } from '../common/util'

VueComponent({
  props: {
    zIndex: {
      type: Number,
      value: 0
    },
    offsetTop: {
      type: Number,
      value: 0,
      observer: 'observerContentScroll'
    }
  },
  relations: {
    '../stickyBox/index': {
      type: 'parent',
      linked (target) {
        this.parent = target
        this.setData({ parent: false })
      },
      unlinked () {
        this.parent = null
      }
    }
  },
  data: {
    openBox: false,
    position: 'absolute',
    top: 0,
    height: 0,
    width: 0,
    observerList: []
  },
  methods: {
    /**
     * @description 清除无用的 viewport 观察者
     */
    clearObserver () {
      const { observerList } = this.data
      while (observerList.length !== 0) {
        observerList.pop().disconnect()
      }
    },
    /**
     * @description 创建新的 viewport 观察者
     */
    createObserver () {
      const { observerList } = this.data
      observerList.push(this.createIntersectionObserver())
      return observerList.slice(-1)[0]
    },
    /**
     * @description 监听到吸顶元素尺寸大小变化时，立即重新模拟吸顶
     */
    resizeHandler ({ detail: { width, height } }) {
      // 当吸顶内容处于absolute、fixed时，为了防止父容器坍塌，需要手动设置父容器高宽。
      renderData(this, {
        width,
        height
      })
      // 如果和 wd-sticky-box 配套使用，吸顶逻辑交由 wd-sticky-box 进行处理
      if (this.parent) return
      this.observerContentScroll()
    },
    /**
     * @description 模拟吸顶逻辑
     */
    observerContentScroll () {
      const { offsetTop, height, width } = this.data
      // 视图在 render tree 中未呈现，吸顶无任何意义。
      if (height === 0 && width === 0) return
      const offset = offsetTop + height
      this.clearObserver()
      this.createObserver().relativeToViewport({
        top: -offset // viewport上边界往下拉
      }).observe('.wd-sticky', this.scrollHandler.bind(this))
      this.getRect('.wd-sticky').then(res => {
        // 当 wd-sticky 位于 viewport 外部时不会触发 observe，此时根据位置手动修复位置。
        if (res.bottom <= offset) this.scrollHandler({ boundingClientRect: res })
      })
    },
    /**
     * @description 根据位置进行吸顶
     */
    scrollHandler ({ boundingClientRect }) {
      const { offsetTop } = this.data
      // boundingClientRect : 目标节点各个边在 viewport 中的坐标
      if (boundingClientRect.top <= offsetTop) {
        // 开始吸顶，固定到顶部
        renderData(this, {
          openBox: false,
          position: 'fixed',
          top: offsetTop
        })
      } else if (boundingClientRect.top > offsetTop) {
        // 完全展示，结束吸顶
        renderData(this, {
          openBox: false,
          position: 'absolute',
          top: 0
        })
      }
    }
  }
})