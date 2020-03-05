import VueComponent from '../common/component'
import cell from '../mixins/cell'

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
    cell: {
      type: 'descendant',
      target: cell,
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