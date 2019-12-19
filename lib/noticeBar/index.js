import VueComponent from '../common/component'

VueComponent({
  data: {
    firstPlay: true,
    wrapWidth: 0,
    contentWidth: 0,
    show: true,
    duration: 0,
    animation: ''
  },
  props: {
    text: {
      type: String,
      observer () {
        setTimeout(() => {
          this.scroll()
        }, 20)
      }
    },
    scrollable: {
      type: Boolean,
      value: true
    },
    delay: {
      type: Number,
      value: 1
    },
    speed: {
      type: Number,
      value: 50
    },
    closable: Boolean,
    wrapable: Boolean,
    leftIcon: String,
    color: String,
    backgroundColor: String
  },
  methods: {
    handleClose () {
      this.setData({
        show: false
      })
      this.$emit('close')
    },
    getRect (select) {
      return new Promise(resolve => {
        this.createSelectorQuery()
          .select(select)
          .boundingClientRect(rect => {
            if (rect) {
              resolve(rect)
            }
          }).exec()
      })
    },
    initAnimation (duration, delay, translate) {
      return jd.createAnimation({
        duration,
        delay
      }).translateX(translate)
        .step()
        .export()
    },
    scroll () {
      Promise.all([
        this.getRect('.wd-notice-bar__wrap'),
        this.getRect('.wd-notice-bar__content')
      ]).then(rects => {
        const [wrapRect, contentRect] = rects
        if (!wrapRect || !contentRect || !wrapRect.width || !contentRect.width) return

        const wrapWidth = wrapRect.width
        const contentWidth = contentRect.width
        if (this.data.scrollable && contentWidth > wrapWidth) {
          const animation = this.initAnimation(contentWidth / this.data.speed * 1000, this.data.delay * 1000, -contentWidth)
          this.setData({
            animation: animation,
            wrapWidth,
            contentWidth
          })
        }
      })
    },
    animationEnd () {
      const resetAnimation = this.initAnimation(0, 0, this.data.wrapWidth)
      this.setData({
        animation: resetAnimation
      })
      setTimeout(() => {
        const animation = this.initAnimation((this.data.wrapWidth + this.data.contentWidth) / this.data.speed * 1000, 0, -this.data.contentWidth)
        this.setData({
          animation
        })
      }, 20)
    }
  }
})