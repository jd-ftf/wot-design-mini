import VueComponent from '../common/component'

VueComponent({
  data: {
    minDisabled: false,
    maxDisabled: false
  },
  props: {
    value: {
      type: null,
      observer (value) {
        this.setData({
          minDisabled: this.data.disabled || value <= this.data.min || this.changeStep(value, -this.data.step) < this.data.min,
          maxDisabled: this.data.disabled || value >= this.data.max || this.changeStep(value, this.data.step) > this.data.max
        })
      }
    },
    min: {
      type: Number,
      value: 1
    },
    max: {
      type: Number,
      value: Number.MAX_SAFE_INTEGER
    },
    step: {
      type: Number,
      value: 1
    },
    stepStrictly: Boolean,
    precision: {
      type: Number,
      value: 0
    },
    disabled: {
      type: Boolean,
      observer (val) {
        this.setData({
          minDisabled: val,
          maxDisabled: val
        })
      }
    },
    withoutInput: Boolean,
    inputWidth: String
  },
  created () {
    this.$emit('change', this.formatValue(this.data.value))
  },
  methods: {
    toPrecision (value) {
      return parseFloat(Math.round(value * Math.pow(10, this.data.precision)) / Math.pow(10, this.data.precision)).toFixed(this.data.precision)
    },
    getPrecision (value) {
      if (value === undefined) return 0
      const valueString = value.toString()
      const dotPosition = valueString.indexOf('.')
      let precision = 0
      if (dotPosition !== -1) {
        precision = valueString.length - dotPosition - 1
      }
      return precision
    },
    toStrictlyStep (value) {
      const stepPrecision = this.getPrecision(this.data.step)
      const precisionFactory = Math.pow(10, stepPrecision)
      return Math.round(value / this.data.step) * precisionFactory * this.data.step / precisionFactory
    },
    setValue (value) {
      if (this.data.stepStrictly) {
        value = this.toStrictlyStep(value)
      }
      if ((value || value === 0) && this.data.precision !== undefined) {
        value = this.toPrecision(value)
      }
      if (value > this.data.max) value = this.toPrecision(this.data.max)
      if (value < this.data.min) value = this.toPrecision(this.data.min)
      this.$emit('change', value)
    },
    changeStep (val, step) {
      val = Number(val)

      if (isNaN(val)) {
        return this.data.min
      }

      const precisionFactory = Math.pow(10, this.data.precision)
      return this.toPrecision((val * precisionFactory + step * precisionFactory) / precisionFactory)
    },
    sub () {
      if (this.data.minDisabled) return

      const newValue = this.changeStep(this.data.value, -this.data.step)
      this.$emit('change', newValue)
    },
    add () {
      if (this.data.maxDisabled) return

      const newValue = this.changeStep(this.data.value, this.data.step)
      this.$emit('change', newValue)
    },
    handleInput (event) {
      const value = event.detail.value || ''
      this.$emit('change', value)
    },
    handleFocus (event) {
      this.$emit('focus', event.detail)
    },
    handleBlur () {
      const value = this.formatValue(this.data.value)
      this.setValue(value)
      this.$emit('blur', value)
    },
    formatValue (value) {
      value = Number(value)

      if (isNaN(value)) {
        value = this.data.min
      }

      if (this.data.stepStrictly) {
        value = this.toStrictlyStep(value)
      }

      if (this.data.precision !== undefined) {
        value = value.toFixed(this.data.precision)
      }

      return value
    }
  }
})