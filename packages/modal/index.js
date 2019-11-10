import VueComponent from '../common/component'

VueComponent({
  props: {
    show: {
      type: Boolean,
      observer (value) {
        console.log(value)
      }
    },
    duration: {
      type: null,
      value: 300
    },
    zIndex: {
      type: Number,
      value: 1
    }
  },
  methods: {
    handleClick () {
      this.$emit('click')
    }
  }
})
