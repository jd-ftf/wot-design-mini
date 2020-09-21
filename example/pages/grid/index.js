import { joy } from '../images/joy'
import Toast from '../../dist/toast/toast'

Page({
  data: {
    joy
  },
  options: {
    multipleSlots: true
  },
  click (event) {
    Toast('成功跳转')
  }
})