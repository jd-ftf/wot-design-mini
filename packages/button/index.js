Component({
  properties: {
    plain: Boolean,
    disabled: Boolean,
    round: Boolean,
    type: {
      type: String,
      value: 'default'
    },
    size: {
      type: String,
      value: "medium"
    },
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
    onClick() {
      if (!this.data.disabled && !this.data.loading) {
        this.triggerEvent("click");
      }
    },
    bindGetUserInfo(event) {
      this.triggerEvent("getuserinfo", event.detail);
    },

    bindContact(event) {
      this.triggerEvent("contact", event.detail);
    },

    bindGetPhoneNumber(event) {
      this.triggerEvent("getphonenumber", event.detail);
    },

    bindError(event) {
      this.triggerEvent("error", event.detail);
    },

    bindLaunchApp(event) {
      this.triggerEvent("launchapp", event.detail);
    },

    bindOpenSetting(event) {
      this.triggerEvent("opensetting", event.detail);
    }
  }
});
