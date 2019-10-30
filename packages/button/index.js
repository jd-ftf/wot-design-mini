Component({
  properties: {
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
      value: "medium"
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
      value: "en"
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
    handleClick() {
      if (!this.data.disabled && !this.data.loading) {
        this.triggerEvent("click");
      }
    },
    handleGetuserinfo(event) {
      this.triggerEvent("getuserinfo", event.detail);
    },

    handleConcat(event) {
      this.triggerEvent("contact", event.detail);
    },

    handleGetphonenumber(event) {
      this.triggerEvent("getphonenumber", event.detail);
    },

    handleError(event) {
      this.triggerEvent("error", event.detail);
    },

    handleLaunchapp(event) {
      this.triggerEvent("launchapp", event.detail);
    },

    handleOpensetting(event) {
      this.triggerEvent("opensetting", event.detail);
    }
  }
});
