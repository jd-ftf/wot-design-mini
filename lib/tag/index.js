import VueComponent from '../common/component'

VueComponent({
  props: {
    useIconSlot: {
      type: Boolean,
      value: false
    },
    type: {
      type: String,
      observer (s) {
        if (!s) return
        // type: 'primary', 'danger', 'warning', 'success'
        const type = ['primary', 'danger', 'warning', 'success']
        if (type.indexOf(s) === -1) throw Error(`type must be one of ${type.toString()}`)
        this.computeTagClass()
      }
    },
    icon: String,
    closable: {
      type: Boolean,
      value: false
    },
    plain: {
      type: Boolean,
      observer: 'computeTagClass'
    },
    color: String,
    bgColor: String,
    size: {
      type: String,
      value: 'medium',
      observer (s) {
        if (!s) return
        // size: 'small', 'large'
        const size = ['small', 'medium', 'large']
        if (size.indexOf(s) === -1) throw Error(`size must be one of ${size.toString()}`)
        this.computeTagClass()
      }
    }
  },
  data: {
    tagClass: ''
  },
  methods: {
    computeTagClass () {
      const { type, plain, size } = this.data
      let tagClass = []
      type && tagClass.push(`is-${type}`)
      plain && tagClass.push('is-plain')
      size && tagClass.push(`is-${size}`)
      tagClass = tagClass.join(' ')
      this.setData({ tagClass })
    },
    handleClick () {
      this.$emit('click')
    },
    handleClose () {
      this.$emit('close')
    }
  }
})