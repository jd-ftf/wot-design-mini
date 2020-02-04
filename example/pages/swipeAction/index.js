Page({
  data: {
    beforeClose (position, swipe) {
      console.log('关闭前')
    }
  },
  clickHandle (event) {
    console.log(event)
  }
})