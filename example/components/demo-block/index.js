Component({
  externalClasses: ['custom-class'],
  properties: {
    title: String,
    ver: {
      type: Number,
      value: 10,
      observer: 'setStyle'
    },
    hor: {
      type: Number,
      value: 15,
      observer: 'setStyle'
    },
    transparent: Boolean
  },
  data: {
    style: ''
  },
  methods: {
    setStyle () {
      this.setData({
        style: `margin: ${this.data.ver}px ${this.data.hor}px`
      })
    }
  },
  attached () {
    this.setStyle()
  }
})