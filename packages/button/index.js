import VueComponent from '../common/component'

VueComponent({
  props: {
    plain: Boolean,
    disabled: Boolean,
    round: Boolean,
    suck: Boolean,
    block: Boolean,
    type: {
      type: String,
      value: 'default'
    },
    size: {
      type: String,
      value: 'medium'
    },
    icon: String,
    openType: String,
    formType: String,
    hoverStopPropagation: {
      type: Boolean,
      value: false
    },
    lang: {
      type: String,
      value: 'en'
    },
    sessionFrom: String,
    sendMessageTitle: String,
    sendMessagePath: String,
    sendMessageImg: String,
    appParameter: String,
    showMessageCard: {
      type: Boolean,
      value: false
    }
  },
  data: {
    hoverStartTime: 20,
    hoverStayTime: 70
  },
  methods: {
    handleClick () {
      if (!this.data.disabled && !this.data.loading) {
        this.$emit('click')
      }
    },
    handleGetuserinfo (event) {
      this.$emit('getuserinfo', event.detail)
    },

    handleConcat (event) {
      this.$emit('contact', event.detail)
    },

    handleGetphonenumber (event) {
      this.$emit('getphonenumber', event.detail)
    },

    handleError (event) {
      this.$emit('error', event.detail)
    },

    handleLaunchapp (event) {
      this.$emit('launchapp', event.detail)
    },

    handleOpensetting (event) {
      this.$emit('opensetting', event.detail)
    }
  }
})