import VueComponent from '../common/component'

VueComponent({
  props: {
    num: {
      type: Number,
      value: 5,
      observer: 'computeRateList'
    },
    value: {
      type: null,
      observer: 'computeRateList'
    },
    readonly: {
      type: Boolean,
      value: false
    },
    size: {
      type: String,
      value: '16px'
    },
    space: {
      type: String,
      value: '4px'
    },
    color: {
      type: String,
      value: '#E8E8E8'
    },
    activeColor: {
      type: String,
      value: 'linear-gradient(180deg, rgba(255,238,0,1) 0%,rgba(250,176,21,1) 100%)'
    },
    icon: {
      type: String,
      value: 'star-on'
    },
    activeIcon: {
      type: String,
      value: 'star-on'
    },
    disabled: {
      type: Boolean,
      value: false
    },
    disabledColor: {
      type: String,
      value: 'linear-gradient(315deg, rgba(177,177,177,1) 0%,rgba(199,199,199,1) 100%)'
    }
  },
  data: {
    rateList: []
  },
  methods: {
    /**
     * @description 计算当前应当展示的rate数量
     */
    computeRateList () {
      const { value, num } = this.data
      // value和num都准备好才能计算
      if (value === null || !num) return
      if (typeof value !== 'number') {
        console.error('[Wot Design] error: the value of wd-rate should be a number')
        return
      }
      const rateList = []
      const fullLength = Math.ceil(value) - 1
      for (let i = 0; i < num; i++) {
        if (i < fullLength) {
          rateList.push('100%')
        } else if (i === fullLength) {
          const rate = (value - fullLength) > 0.5 ? 1 : 0.5
          rateList.push(rate * 100 + '%')
        } else {
          rateList.push('0')
        }
      }
      this.setData({ rateList })
    },
    /**
     * @description 点击icon触发组件的change事件
     * @param Event
     */
    changeRate ({ currentTarget: { dataset: { index } } }) {
      if (this.data.readonly || this.data.disabled) return
      this.setData({
        value: index + 1
      })
      this.$emit('change', index + 1)
    }
  }
})