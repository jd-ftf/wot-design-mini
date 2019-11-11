import { addUnit } from '../common/util'

Component({
  properties: {
    size: {
      type: String | Number,
      observer: 'setSizeWithUnit'
    },
    type: {
      type: String,
      value: 'circular'
    },
    color: {
      type: String,
      value: '#c9c9c9'
    },
    textSize: {
      type: String,
      observer: 'setTextSizeWithUnit'
    },
    vertical: Boolean
  },
  data: {
    sizeWithUnit: '30px',
    textSizeWithUnit: '14px'
  },
  methods: {
    setSizeWithUnit (size) {
      this.setData({
        sizeWithUnit: addUnit(size)
      })
    },
    setTextSizeWithUnit (size) {
      this.setData({
        textSizeWithUnit: addUnit(size)
      })
    }
  }
})