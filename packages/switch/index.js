import VueComponent from '../common/component'

VueComponent({
  behaviors: ['jd://form-field'],
  props: {
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

      const newVal = this.data.value === this.data.activeValue ? this.data.inactiveValue : this.data.activeValue
      this.setData({
        value: newVal
      })
      this.$emit('change', {
        value: newVal
      })
    }
  },
  attached () {
    if ([this.data.activeValue, this.data.inactiveValue].indexOf(this.data.value) === -1) {
      this.$emit('change', {
        value: this.data.inactiveValue
      })
    }
  }
})