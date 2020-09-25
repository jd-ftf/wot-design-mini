import Toast from '../../dist/toast/toast'

Page({
  data: {
    tab: 0
  },
  handleClick ({ detail: { index } }) {
    Toast(`点击了标签${index}`)
  },
  handleChange (event) {
    console.log('change', event)
  }
})