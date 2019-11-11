import VueComponent from '../common/component'

VueComponent({
  props: {
    show: {
      type: Boolean
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
