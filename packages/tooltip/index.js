import VueComponent from '../common/component'

VueComponent({
  externalClasses: [
    'custom-icon-class'
  ],
  data: {
    popLeft: '',
    popTop: '10px'
  },
  props: {
    placement: {
      type: String,
      value: 'top'
    },
    content: String,
    msg: String,
    position: String,
    show: Boolean,
    zIndex: Number
  },
  methods: {
    click (event) {
      const { show } = this.data
      this.initPos()
      this.setData({
        popLeft: event.currentTarget.offsetLeft + 'px',
        show: !show
      })
    },
    initPos () {
      this.posSet()
    },
    posSet () {
      // 获取当前 定位元素位置信息
      this.getRect('.wd-tooltip__target').then(rect => {
        // const placements = getPlacements(rect, placement)
        console.log(rect)
        this.setData({
          popTop: rect.bottom + 10 + 'px'
        })
      })
    },
    posControl () {
      // const { placement } = this.data
      // if (placement === '') { }

    }
  }
})