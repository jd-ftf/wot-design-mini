import VueComponent from '../common/component'

VueComponent({
  props: {
    title: String,
    value: String,
    useSlot: {
      type: Boolean,
      value: false
    }

  },
  relations: {
    '../cell/index': {
      type: 'child',
      linked (target) {
        this.children = this.children || []
        this.children.push(target)
        setTimeout(() => {
          this.children.forEach(child => child.setIndexAndStatus())
        }, 30)
      },
      unlinked (target) {
        this.children = this.children.filter(child => child !== target)
        this.children.forEach(child => child.setIndexAndStatus())
      }
    }
  }
})