import VueComponent from '../common/component'

VueComponent({
  props: {
    title: String,
    value: {
      type: String,
      value: '',
      observe (value) {
        this.changeState(value)
      }
    },
    only: {
      type: Boolean,
      observe () {
        this.changeState(this.data.value)
      }
    },
    color: {
      type: String,
      value: '#0083ff',
      observe () {
        this.changeState(this.data.value)
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
    changeState (value = '') {
      const { only, color } = this.data
      if (
        this.data[value] &&
        this.data[value].color === color
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
      if (only && !value) {
        data.top.display = false
        data.top.color = ''
        data.bottom.display = true
        data.bottom.color = ''
      } else if (only && value === 'top') {
        data.top.display = true
        data.top.color = color
        data.bottom.display = false
        data.bottom.color = ''
      } else if (only && value === 'bottom') {
        data.top.display = false
        data.top.color = ''
        data.bottom.display = true
        data.bottom.color = color
      } else if (!only && value === 'top') {
        data.top.display = true
        data.top.color = color
        data.bottom.display = true
        data.bottom.color = ''
      } else if (!only && value === 'bottom') {
        data.top.display = true
        data.top.color = ''
        data.bottom.display = true
        data.bottom.color = color
      } else if (!only && !value) {
        data.top.display = true
        data.top.color = ''
        data.bottom.display = true
        data.bottom.color = ''
      }
      this.setData(Object.assign(data, { value }))
    },
    handleClick () {
      let { value } = this.data
      if (value === 'top') {
        value = 'bottom'
      } else if (value === 'bottom') {
        value = 'top'
      } else {
        value = 'top'
      }
      this.$emit('click', value)
      this.changeState(value)
    }
  },
  created () {
    this.changeState(this.data.value)
  }
})