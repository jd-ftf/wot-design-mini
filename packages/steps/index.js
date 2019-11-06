Component({
  data: {
    canAlignCenter: false
  },
  properties: {
    active: {
      type: Number,
      value: 0
    },
    vertical: {
      type: Boolean,
      observer: 'canAlignCenter'
    },
    dot: Boolean,
    space: String,
    alignCenter: {
      type: Boolean,
      observer: 'canAlignCenter'
    }
  },
  relations: {
    '../step/index': {
      type: 'child',
      linked (target) {
        this.children = this.cbhildren || []
        this.children.push(target)
      },
      unlinked (target) {
        this.children = this.children.filter(child => child !== target)
      }
    }
  },
  methods: {
    canAlignCenter () {
      this.setData({
        canAlignCenter: !this.data.vertical && this.data.alignCenter
      })
    }
  }
})
