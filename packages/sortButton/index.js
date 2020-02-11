import VueComponent from '../common/component'

VueComponent({
  props: {
    value: String,
    direction: {
      type: String,
      value: '',
      observe (direction) {
        this.changeState(direction)
      }
    },
    only: {
      type: Boolean,
      observe () {
        this.changeState(this.data.direction)
      }
    },
    color: {
      type: String,
      value: '#0083ff',
      observe () {
        this.changeState(this.data.direction)
      }
    }
  },
  data: {
    top: {
      display: true,
      color: ''
    },
    bottom: {
      display: true,
      color: ''
    }
  },
  methods: {
    changeState (direction = '') {
      const { only, color } = this.data
      if (
        this.data[direction] &&
        this.data[direction].color === color
      ) {
        return
      }
      const data = {
        top: {
          display: true,
          color: ''
        },
        bottom: {
          display: true,
          color: ''
        }
      }
      if (only && !direction) {
        data.top.display = false
        data.top.color = ''
        data.bottom.display = true
        data.bottom.color = ''
      } else if (only && direction === 'top') {
        data.top.display = true
        data.top.color = color
        data.bottom.display = false
        data.bottom.color = ''
      } else if (only && direction === 'bottom') {
        data.top.display = false
        data.top.color = ''
        data.bottom.display = true
        data.bottom.color = color
      } else if (!only && direction === 'top') {
        data.top.display = true
        data.top.color = color
        data.bottom.display = true
        data.bottom.color = ''
      } else if (!only && direction === 'bottom') {
        data.top.display = true
        data.top.color = ''
        data.bottom.display = true
        data.bottom.color = color
      } else if (!only && !direction) {
        data.top.display = true
        data.top.color = ''
        data.bottom.display = true
        data.bottom.color = ''
      }
      this.setData(Object.assign(data, { direction }))
    },
    handleClick () {
      let { direction } = this.data
      if (direction === 'top') {
        direction = 'bottom'
      } else if (direction === 'bottom') {
        direction = 'top'
      } else {
        direction = 'top'
      }
      this.$emit('click', direction)
      this.changeState(direction)
    }
  },
  created () {
    this.changeState(this.data.direction)
  }
})