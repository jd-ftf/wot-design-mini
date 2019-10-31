Component({
  properties: {
    value: null,
    disabled: Boolean,
    activeValue: {
      type: null,
      value: true
    },
    inactiveValue: {
      type: null,
      value: false
    },
    activeColor: String,
    inactiveColor: String,
    size: {
      type: String,
      value: '28px'
    }
  },
  methods: {
    switchValue () {
      if (this.data.disabled) return

      this.triggerEvent('change', this.data.value === this.data.activeValue ? this.data.inactiveValue : this.data.activeValue)
    }
  },
  attached () {
    if ([this.data.activeValue, this.data.inactiveValue].indexOf(this.data.value) === -1) {
      this.triggerEvent('change', this.data.inactiveValue)
    }
  }
})
