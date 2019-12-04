import VueComponent from '../common/component'
VueComponent({
  externalClasses: [
    'custom-suffix-class',
    'custom-prefix-class',
    'custom-textarea-class',
    'custom-input-class'
  ],
  data: {
    handleRadius: 0,
    axleWidth: 0
  },
  relations: {
    '../collapseItem/index': {
      type: 'child',
      linked (target) {
        console.log('子组件被插入')
        this.children = this.children || []
        this.children.push(target)
      },
      unlinked (target) {
        this.children = this.children.filter(child => child !== target)
      }
    }
  },
  props: {
    hideMinMax: Boolean,
    hideLabel: Boolean,
    disabled: {
      type: Boolean,
      value: false
    },
    maxValue: {
      type: Number,
      value: 100
    },
    minValue: {
      type: Number,
      value: 0
    },
    value: {
      type: null,
      value: 0
    },
    step: {
      type: Number,
      value: 1
    }
  },
  created () {
  },
  methods: {
    switchValue (name, expanded) {
      const { accordion, viewmore, value } = this.data
      if (!accordion && !viewmore) {
        name = expanded
          ? value.concat(name)
          : value.filter(item => item !== name)
      }
      console.log('子组件value')
      this.$emit('input', name)
      this.$emit('change', name)
    }
  }
})