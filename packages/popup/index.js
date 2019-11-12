import VueComponent from '../common/component'
import transition from '../mixins/transition'

VueComponent({
  mixins: [transition()],
  props: {
    transition: {
      type: String,
      observer: 'observerTransition'
    },
    closable: Boolean,
    position: {
      type: String,
      value: 'center',
      observer: 'observerTransition'
    },
    closeOnClickModal: {
      type: Boolean,
      value: true
    },
    modal: {
      type: Boolean,
      value: true
    },
    zIndex: {
      type: Number,
      value: 10
    }
  },
  methods: {
    handleClickModal () {
      this.$emit('click-modal')

      if (this.data.closeOnClickModal) {
        this.$emit('close')
      }
    },
    observerTransition () {
      const { transition, position } = this.data

      const data = {
        name: transition || position
      }

      if (transition === 'none') {
        data.duration = 0
      }

      this.setData(data)
    }
  },
  created () {
    this.observerTransition()
  }
})