import VueComponent from '../common/component'

VueComponent({
  props: {
    state: {
      type: String,
      observer (s) {
        if (!s) return
        // state: 'loading'、'error'、'finished'
        const state = ['loading', 'error', 'finished']
        if (state.indexOf(s) === -1) throw Error(`state must be one of ${state.toString()}`)
        this.setData({
          showText: this.data[`${s}Text`]
        })
      }
    },
    loadingText: {
      type: String,
      value: '加载中...'
    },
    finishedText: {
      type: String,
      value: '没有更多了'
    },
    errorText: {
      type: String,
      value: '加载失败，点击重试'
    }
  },
  data: {
    showText: ''
  },
  methods: {
    reload () {
      if (this.data.state !== 'error') return
      this.setData({
        state: 'loading'
      })
      this.$emit('reload')
    }
  }
})