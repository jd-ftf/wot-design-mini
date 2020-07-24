import { joy } from '../images/joy'

Page({
  data: {
    joy
  },
  options: {
    multipleSlots: true
  },
  click (event) {
    console.log('跳转成功', event)
  }
})