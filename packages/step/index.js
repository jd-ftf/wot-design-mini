Component({
  properties: {
    title: String,
    description: String,
    icon: String,
    status: String
  },
  relations: {
    '../steps/index': {
      type: 'parent',
      linked (target) {
        this.parent = target
      },
      unlinked () {
        this.parent = null
      }
    }
  }
})
